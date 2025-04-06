CREATE TABLE IF NOT EXISTS "transferAccountToken" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nativePasscode" text,
	"userId" text,
	"expirationDate" timestamp NOT NULL
);
