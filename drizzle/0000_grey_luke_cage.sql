CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"password" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"2fa_secret" text,
	"two_factor_enabled" boolean DEFAULT false,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
