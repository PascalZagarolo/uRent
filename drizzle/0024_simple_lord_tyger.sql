ALTER TABLE "carModels" ALTER COLUMN "brand" SET DATA TYPE brand;--> statement-breakpoint
ALTER TABLE "carModels" ADD COLUMN "isLabel" boolean DEFAULT false NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "carModels" ADD CONSTRAINT "carModels_brand_carBrands_brand_fk" FOREIGN KEY ("brand") REFERENCES "public"."carBrands"("brand") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "carBrands" DROP COLUMN IF EXISTS "id";