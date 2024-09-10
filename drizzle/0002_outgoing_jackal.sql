CREATE TABLE IF NOT EXISTS "userContactprofiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"content" text,
	"profileType" "contactProfileTypeEnum"
);
--> statement-breakpoint
DROP TABLE "userContactProfiles";