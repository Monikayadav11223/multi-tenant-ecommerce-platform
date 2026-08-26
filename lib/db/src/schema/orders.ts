import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import {
  check,
  index,
  numeric,
  pgEnum,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { z } from "zod/v4";
import { storesTable } from "./stores";
import { usersTable } from "./users";

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);

export const ordersTable = pgTable(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    storeId: uuid("store_id")
      .notNull()
      .references(() => storesTable.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    customerId: uuid("customer_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    orderNumber: varchar("order_number", { length: 50 }).notNull(),
    status: orderStatusEnum("status").notNull().default("pending"),
    totalAmount: numeric("total_amount", {
      precision: 12,
      scale: 2,
      mode: "number",
    }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("orders_store_id_idx").on(table.storeId),
    index("orders_customer_id_idx").on(table.customerId),
    uniqueIndex("orders_order_number_uidx").on(table.orderNumber),
    check("orders_total_amount_non_negative", sql`${table.totalAmount} >= 0`),
  ],
);

export const insertOrderSchema = createInsertSchema(ordersTable, {
  totalAmount: (schema) => schema.nonnegative(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof ordersTable.$inferSelect;