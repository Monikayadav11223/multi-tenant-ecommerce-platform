import type { ErrorRequestHandler } from "express";
import { AppError } from "../lib/errors";

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  _next,
) => {
  const appError =
    error instanceof AppError
      ? error
      : new AppError(500, "An unexpected server error occurred.");

  if (appError.statusCode >= 500) {
    req.log.error({ err: error }, appError.message);
  } else {
    req.log.warn({ err: error }, appError.message);
  }

  res.status(appError.statusCode).json({
    error: appError.message,
  });
};