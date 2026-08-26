import { createInsertSchema } from "drizzle-zod";
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const storesTable = pgTable(
  "stores",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    vendorId: uuid("vendor_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    name: varchar("name", { length: 150 }).notNull(),
    slug: varchar("slug", { length: 180 }).notNull().unique(),
    description: text("description"),
    logoUrl: text("logo_url"),
    contactEmail: varchar("contact_email", { length: 255 }),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index("stores_vendor_id_idx").on(table.vendorId)],
);

export const insertStoreSchema = createInsertSchema(storesTable, {
  contactEmail: (schema) => schema.email(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertStore = z.infer<typeof insertStoreSchema>;
export type Store = typeof storesTable.$inferSelect;