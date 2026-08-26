import type { SignOptions } from "jsonwebtoken";

export function getJwtSecret(): string {
  const jwtSecret = process.env["JWT_SECRET"];

  if (!jwtSecret) {
    throw new Error("JWT_SECRET must be configured.");
  }

  return jwtSecret;
}

export function getJwtExpiresIn(): SignOptions["expiresIn"] {
  const configuredExpiry = process.env["JWT_EXPIRES_IN"];

  if (!configuredExpiry) {
    return "1d";
  }

  if (/^\d+$/.test(configuredExpiry)) {
    return Number(configuredExpiry);
  }

  return configuredExpiry as SignOptions["expiresIn"];
}