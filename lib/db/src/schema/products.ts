import { createInsertSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { z } from "zod/v4";
import { storesTable } from "./stores";

export const productsTable = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    storeId: uuid("store_id")
      .notNull()
      .references(() => storesTable.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    name: varchar("name", { length: 200 }).notNull(),
    description: text("description"),
    price: numeric("price", {
      precision: 12,
      scale: 2,
      mode: "number",
    }).notNull(),
    stockQuantity: integer("stock_quantity").notNull().default(0),
    imageUrl: text("image_url"),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("products_store_id_idx").on(table.storeId),
    check("products_price_non_negative", sql`${table.price} >= 0`),
    check(
      "products_stock_quantity_non_negative",
      sql`${table.stockQuantity} >= 0`,
    ),
  ],
);

export const insertProductSchema = createInsertSchema(productsTable, {
  price: (schema) => schema.nonnegative(),
  stockQuantity: (schema) => schema.int().nonnegative(),
  imageUrl: (schema) => schema.url(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;