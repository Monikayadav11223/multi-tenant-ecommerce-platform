# Week 1 Day 5 — RBAC and Tenant Authorization

## Authorization flow

Protected routes use the existing middleware in this order:

1. `authenticate` validates the Bearer JWT and attaches the authenticated user to `req.user`.
2. `authorizeRoles(...allowedRoles)` verifies that the authenticated user's role is permitted.
3. The route handler reads identity and role from `req.user`, not from client-supplied identity fields.

The `GET /api/auth/vendor-access` route demonstrates a role-restricted resource. It allows
`vendor` and `super_admin` users and rejects authenticated customers with HTTP 403.

## Current tenant boundary

The current Day 1–4 API exposes authentication only; store, product, and order CRUD routes
have not been introduced yet. Those database tables already carry the relationships needed
for future tenant checks, but there is no tenant-scoped resource handler to authorize today.

When those resources are added, ownership must be derived server-side from the authenticated
user and the related store/vendor relationship. A client-provided store ID must never be
treated as sufficient authorization, and every cross-tenant lookup must be rejected.