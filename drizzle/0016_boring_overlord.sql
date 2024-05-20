CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "priceprofile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"description" text,
	"price" numeric,
	"freeMiles" integer,
	"extraCost" numeric,
	"inseratId" uuid
);
--> statement-breakpoint
ALTER TABLE "resetPasswordToken" DROP CONSTRAINT "undefined";--> statement-breakpoint
ALTER TABLE "lkwAttribute" ADD COLUMN "initial" timestamp;--> statement-breakpoint
ALTER TABLE "transportAttribute" ADD COLUMN "initial" timestamp;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "priceprofile" ADD CONSTRAINT "priceprofile_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "public"."inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "sharesPhoneNumber";