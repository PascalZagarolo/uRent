ALTER TABLE "resetPasswordToken" ADD CONSTRAINT "undefined" PRIMARY KEY("email","token");--> statement-breakpoint
ALTER TABLE "priceprofile" ADD COLUMN "position" integer;--> statement-breakpoint
ALTER TABLE "transportAttribute" DROP COLUMN IF EXISTS "initial";