ALTER TYPE "transportBrand" ADD VALUE 'Citroen';--> statement-breakpoint
ALTER TYPE "transportBrand" ADD VALUE 'Skoda';--> statement-breakpoint
ALTER TABLE "lkwAttribute" ADD COLUMN "ahk" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "transportAttribute" ADD COLUMN "ahk" boolean DEFAULT false NOT NULL;