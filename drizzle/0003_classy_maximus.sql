ALTER TYPE "brand" ADD VALUE 'Citroen';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Skoda';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blog" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"category" text,
	"tags" text,
	"title" text,
	"content" text,
	"isPublic" boolean DEFAULT false NOT NULL,
	"imageUrl" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "faqs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lastUpdated" timestamp DEFAULT now(),
	"category" text,
	"question" text,
	"answer" text,
	"position" integer,
	"isPublic" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "report" ADD COLUMN "reportedUser" text;--> statement-breakpoint
ALTER TABLE "report" ADD COLUMN "reportStatus" text;--> statement-breakpoint
ALTER TABLE "userContactprofiles" ADD COLUMN "userId" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report" ADD CONSTRAINT "report_reportedUser_user_id_fk" FOREIGN KEY ("reportedUser") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userContactprofiles" ADD CONSTRAINT "userContactprofiles_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
