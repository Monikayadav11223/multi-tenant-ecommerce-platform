export const USER_ROLES = [
  "super_admin",
  "vendor",
  "customer",
] as const;

export type UserRole = (typeof USER_ROLES)[number];

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
}