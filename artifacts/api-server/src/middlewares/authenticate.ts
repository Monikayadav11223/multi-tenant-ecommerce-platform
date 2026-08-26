import type { RequestHandler } from "express";
import { AppError } from "../lib/errors";
import { verifyAccessToken } from "../utils/jwt";

export const authenticate: RequestHandler = (req, _res, next) => {
  const authorizationHeader = req.header("authorization");

  if (!authorizationHeader) {
    next(new AppError(401, "Authentication is required."));
    return;
  }

  const bearerToken = /^Bearer\s+(.+)$/i.exec(authorizationHeader)?.[1];

  if (!bearerToken) {
    next(new AppError(401, "Authorization header must use a Bearer token."));
    return;
  }

  try {
    req.user = verifyAccessToken(bearerToken);
    next();
  } catch (error) {
    next(error);
  }
};