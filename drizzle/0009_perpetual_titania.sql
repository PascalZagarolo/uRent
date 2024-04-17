CREATE TABLE IF NOT EXISTS "businessImages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"position" integer,
	"url" text,
	"businessId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "openingTimes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"businessId" uuid,
	"monday" text,
	"tuesday" text,
	"wednesday" text,
	"thursday" text,
	"friday" text,
	"saturday" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userSubscription" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text,
	"subscriptionType" "priceType",
	"amount" integer DEFAULT 0 NOT NULL,
	"stripe_customer_id" text,
	"stripe_subscription_id" text,
	"stripe_product_id" text,
	"stripe_price_id" text,
	"stripe_current_period_end" timestamp
);
--> statement-breakpoint
DROP TABLE "inseratSubscription";--> statement-breakpoint
DROP TABLE "session";--> statement-breakpoint
ALTER TABLE "inserat" DROP CONSTRAINT "inserat_subscriptionId_inseratSubscription_id_fk";
--> statement-breakpoint
ALTER TABLE "business" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "business" ADD COLUMN "website" text;--> statement-breakpoint
ALTER TABLE "business" ADD COLUMN "impressum" text;--> statement-breakpoint
ALTER TABLE "business" ADD COLUMN "fax" text;--> statement-breakpoint
ALTER TABLE "businessAddress" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "businessAddress" ADD COLUMN "isPrimary" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "inserat" ADD COLUMN "priceHour" numeric;--> statement-breakpoint
ALTER TABLE "inserat" ADD COLUMN "priceWeekend" numeric;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "subscriptionId" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_subscriptionId_userSubscription_id_fk" FOREIGN KEY ("subscriptionId") REFERENCES "userSubscription"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "inserat" DROP COLUMN IF EXISTS "subscriptionId";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "businessImages" ADD CONSTRAINT "businessImages_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "openingTimes" ADD CONSTRAINT "openingTimes_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
