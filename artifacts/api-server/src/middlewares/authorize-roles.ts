import type { RequestHandler } from "express";
import { AppError } from "../lib/errors";
import type { UserRole } from "../types/auth";

export function authorizeRoles(...allowedRoles: UserRole[]): RequestHandler {
  return (req, _res, next) => {
    if (!req.user) {
      next(new AppError(401, "Authentication is required."));
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      next(new AppError(403, "You do not have permission to access this route."));
      return;
    }

    next();
  };
}