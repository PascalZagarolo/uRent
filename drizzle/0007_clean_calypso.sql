ALTER TABLE "user" ADD COLUMN "displayname" text;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_name_unique" UNIQUE("name");