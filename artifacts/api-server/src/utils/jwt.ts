import jwt, { type JwtPayload } from "jsonwebtoken";
import { getJwtExpiresIn, getJwtSecret } from "../config/auth";
import { AppError } from "../lib/errors";
import {
  USER_ROLES,
  type AuthenticatedUser,
  type UserRole,
} from "../types/auth";

function isUserRole(value: unknown): value is UserRole {
  return (
    typeof value === "string" &&
    (USER_ROLES as readonly string[]).includes(value)
  );
}

function isAuthenticatedUserPayload(
  value: JwtPayload,
): value is JwtPayload & AuthenticatedUser {
  return (
    typeof value.id === "string" &&
    typeof value.email === "string" &&
    isUserRole(value.role)
  );
}

export function generateAccessToken(user: AuthenticatedUser): string {
  return jwt.sign(user, getJwtSecret(), {
    expiresIn: getJwtExpiresIn(),
  });
}

export function verifyAccessToken(token: string): AuthenticatedUser {
  try {
    const decodedToken = jwt.verify(token, getJwtSecret());

    if (
      typeof decodedToken === "string" ||
      !isAuthenticatedUserPayload(decodedToken)
    ) {
      throw new AppError(401, "Invalid access token.");
    }

    return {
      id: decodedToken.id,
      email: decodedToken.email,
      role: decodedToken.role,
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(401, "Invalid or expired access token.");
  }
}