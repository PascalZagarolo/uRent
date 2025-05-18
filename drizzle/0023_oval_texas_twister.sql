CREATE TABLE IF NOT EXISTS "carBrands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"brand" "brand"
);
--> statement-breakpoint
ALTER TABLE "carModels" ADD COLUMN "series" text;