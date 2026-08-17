import { db, insertUserSchema, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../lib/errors";
import {
  USER_ROLES,
  type AuthenticatedUser,
} from "../types/auth";
import { generateAccessToken } from "../utils/jwt";
import { comparePassword, hashPassword } from "../utils/password";

const registerBodySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(128),
  role: z.enum(USER_ROLES).optional(),
});

const loginBodySchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(1),
});

const safeUserColumns = {
  id: usersTable.id,
  name: usersTable.name,
  email: usersTable.email,
  role: usersTable.role,
  createdAt: usersTable.createdAt,
  updatedAt: usersTable.updatedAt,
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function sendValidationError(res: Response, error: z.ZodError): void {
  res.status(400).json({
    error: "Invalid request body.",
    details: error.flatten().fieldErrors,
  });
}

function isUniqueViolation(error: unknown): boolean {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return false;
  }

  return error.code === "23505";
}

function createToken(user: {
  id: string;
  email: string;
  role: AuthenticatedUser["role"];
}): string {
  return generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const parsedBody = registerBodySchema.safeParse(req.body);

  if (!parsedBody.success) {
    sendValidationError(res, parsedBody.error);
    return;
  }

  if (parsedBody.data.role === "super_admin") {
    res.status(403).json({
      error: "Public registration cannot create a super admin.",
    });
    return;
  }

  const email = normalizeEmail(parsedBody.data.email);

  try {
    const [existingUser] = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (existingUser) {
      res.status(409).json({
        error: "A user with this email already exists.",
      });
      return;
    }

    const passwordHash = await hashPassword(parsedBody.data.password);
    const userValues = insertUserSchema.parse({
      name: parsedBody.data.name,
      email,
      passwordHash,
      role: parsedBody.data.role ?? "customer",
    });

    const [user] = await db
      .insert(usersTable)
      .values(userValues)
      .returning(safeUserColumns);

    if (!user) {
      throw new AppError(500, "User registration failed.");
    }

    res.status(201).json({
      user,
      token: createToken(user),
    });
  } catch (error) {
    if (isUniqueViolation(error)) {
      res.status(409).json({
        error: "A user with this email already exists.",
      });
      return;
    }

    next(error);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const parsedBody = loginBodySchema.safeParse(req.body);

  if (!parsedBody.success) {
    sendValidationError(res, parsedBody.error);
    return;
  }

  const email = normalizeEmail(parsedBody.data.email);

  try {
    const [user] = await db
      .select({
        ...safeUserColumns,
        passwordHash: usersTable.passwordHash,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (!user || !(await comparePassword(parsedBody.data.password, user.passwordHash))) {
      res.status(401).json({
        error: "Invalid email or password.",
      });
      return;
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token: createToken(user),
    });
  } catch (error) {
    next(error);
  }
}

export async function getCurrentUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (!req.user) {
    next(new AppError(401, "Authentication is required."));
    return;
  }

  try {
    const [user] = await db
      .select(safeUserColumns)
      .from(usersTable)
      .where(eq(usersTable.id, req.user.id))
      .limit(1);

    if (!user) {
      res.status(404).json({
        error: "Authenticated user was not found.",
      });
      return;
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
}