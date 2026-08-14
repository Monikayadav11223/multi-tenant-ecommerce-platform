# Week 1 Day 1: Database and Project Foundation

## Folder structure

```text
artifacts/api-server/
├── docs/
│   └── week-1-day-1-database-schema.md
└── src/
    ├── config/
    │   └── database.ts
    ├── controllers/
    ├── lib/
    │   └── logger.ts
    ├── middlewares/
    ├── models/
    │   ├── index.ts
    │   ├── order.model.ts
    │   ├── product.model.ts
    │   ├── store.model.ts
    │   └── user.model.ts
    ├── routes/
    │   ├── health.ts
    │   └── index.ts
    ├── services/
    └── utils/
```

The empty MVC directories are reserved for controllers, middleware, services, and
shared utilities that will be added in later features.

## Relationships

- A `User` with the `vendor` role can own multiple `Store` documents.
- A `Store` belongs to one vendor and contains multiple `Product` documents.
- A `Product` belongs to one store and one vendor. The vendor reference makes
  tenant-scoped product queries direct and keeps access checks explicit.
- An `Order` belongs to one customer, one store, and one vendor.
- Each order stores product references plus product name, SKU, price, and subtotal
  snapshots. Historical orders therefore remain readable if a product changes.
- An order is scoped to one store. This keeps vendor ownership and order
  fulfillment boundaries clear for the first version of the platform.

## Model notes

- `passwordHash` is intentionally stored instead of a plaintext password. Bcrypt
  hashing will be added with authentication.
- Orders use embedded item and shipping-address subdocuments because they are
  historical snapshots that should be read with the order.
- `Store.slug` is globally unique. Product slugs are unique within a store.
- Vendor SKU values are unique per vendor.
- Product, store, and order records use status fields and timestamps so records
  can be archived or deactivated without destructive deletes.

## Database connection

Set `MONGODB_URI` before calling `connectToDatabase()` from the application
startup code. The connection helper is not called by the health-only server yet,
so the API can still start while the authentication and application bootstrap
features are built.