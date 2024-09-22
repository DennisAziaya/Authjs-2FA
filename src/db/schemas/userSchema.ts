import {boolean, pgTable, serial, text, timestamp} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
        id: serial("id").primaryKey(),
        email: text("email").unique(),
        password: text("password"),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow(),
        twoFactorSecret: text("2fa_secret"),
        twoFactorEnabled: boolean("two_factor_enabled").default(false),
    });
// Compare this snippet from src/db/schemas/userSchema.ts: