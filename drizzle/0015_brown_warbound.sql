CREATE TABLE IF NOT EXISTS "cancelMail" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"email" text,
	"stripe_customer_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userGifts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"userId" text,
	"giftCodeId" uuid
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userGifts" ADD CONSTRAINT "userGifts_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userGifts" ADD CONSTRAINT "userGifts_giftCodeId_giftCode_id_fk" FOREIGN KEY ("giftCodeId") REFERENCES "public"."giftCode"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
