import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  googleId: text("google_id").unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const scanHistory = pgTable("scan_history", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  content: text("content").notNull(),
  type: text("type").notNull(), // 'url', 'text', 'email', etc.
  scannedAt: timestamp("scanned_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  googleId: true,
});

export const insertScanHistorySchema = createInsertSchema(scanHistory).pick({
  userId: true,
  content: true,
  type: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertScanHistory = z.infer<typeof insertScanHistorySchema>;
export type ScanHistory = typeof scanHistory.$inferSelect;
