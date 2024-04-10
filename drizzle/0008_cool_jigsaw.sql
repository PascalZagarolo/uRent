CREATE TABLE IF NOT EXISTS "business" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid,
	"description" text,
	"openingHours" text,
	"telephone_number" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "businessAddress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"businessId" uuid,
	"postalCode" integer,
	"state" text,
	"city" text,
	"street" text
);
--> statement-breakpoint
ALTER TABLE "contactOptions" DROP CONSTRAINT "contactOptions_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "userAddress" DROP CONSTRAINT "userAddress_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_contactId_contactOptions_id_fk";
--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "inseratId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "isBusiness" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "businessId" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contactOptions" ADD CONSTRAINT "contactOptions_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userAddress" ADD CONSTRAINT "userAddress_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_contactId_contactOptions_id_fk" FOREIGN KEY ("contactId") REFERENCES "contactOptions"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "business" ADD CONSTRAINT "business_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "businessAddress" ADD CONSTRAINT "businessAddress_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
