ALTER TYPE "license" ADD VALUE 'CE1';--> statement-breakpoint
ALTER TYPE "notificationType" ADD VALUE 'REPORT_ACTION';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "block" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text,
	"conversationId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "changeEmailToken" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"newEmail" text,
	"userId" text NOT NULL,
	"token" text,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "giftCode" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"plan" "priceType",
	"inseratAmount" integer,
	"months" integer,
	"userAmount" integer,
	"availableAmount" integer,
	"expirationDate" timestamp,
	"code" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oauth_account" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text,
	"provider" text NOT NULL,
	"provider_user_id" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"expiresAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "savedSearch" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"link" text,
	"title" text,
	"createdAt" timestamp DEFAULT now(),
	"receivesUpdates" boolean DEFAULT false NOT NULL,
	"receiveAvailability" boolean DEFAULT false NOT NULL,
	"receivedAvailability" boolean DEFAULT false NOT NULL,
	"userId" text
);
--> statement-breakpoint
DROP TABLE "account";--> statement-breakpoint
ALTER TABLE "conversation" DROP CONSTRAINT "conversation_user1_user_id_fk";
--> statement-breakpoint
ALTER TABLE "conversation" DROP CONSTRAINT "conversation_user2_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "sharesEmail" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "booking" ADD COLUMN "name" text;--> statement-breakpoint
ALTER TABLE "booking" ADD COLUMN "buchungsnummer" text;--> statement-breakpoint
ALTER TABLE "booking" ADD COLUMN "startPeriod" text;--> statement-breakpoint
ALTER TABLE "booking" ADD COLUMN "endPeriod" text;--> statement-breakpoint
ALTER TABLE "conversation" ADD COLUMN "blocked" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "conversation" ADD COLUMN "user1Id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "conversation" ADD COLUMN "user2Id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "inserat" ADD COLUMN "priceKilometer" numeric;--> statement-breakpoint
ALTER TABLE "message" ADD COLUMN "seen" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "pkwAttribute" ADD COLUMN "unlimitedMiles" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "report" ADD COLUMN "conversationId" uuid;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "sharesRealName" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "newsletter" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "enableSocialLogin" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "isAdmin" boolean DEFAULT false;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "block" ADD CONSTRAINT "block_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "block" ADD CONSTRAINT "block_conversationId_conversation_id_fk" FOREIGN KEY ("conversationId") REFERENCES "public"."conversation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "changeEmailToken" ADD CONSTRAINT "changeEmailToken_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oauth_account" ADD CONSTRAINT "oauth_account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "savedSearch" ADD CONSTRAINT "savedSearch_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversation" ADD CONSTRAINT "conversation_user1Id_user_id_fk" FOREIGN KEY ("user1Id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversation" ADD CONSTRAINT "conversation_user2Id_user_id_fk" FOREIGN KEY ("user2Id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report" ADD CONSTRAINT "report_conversationId_conversation_id_fk" FOREIGN KEY ("conversationId") REFERENCES "public"."conversation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userSubscription" ADD CONSTRAINT "userSubscription_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "conversation" DROP COLUMN IF EXISTS "user1";--> statement-breakpoint
ALTER TABLE "conversation" DROP COLUMN IF EXISTS "user2";