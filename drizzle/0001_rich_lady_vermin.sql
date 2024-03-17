ALTER TABLE "inserat" ALTER COLUMN "userId" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "inserat" ALTER COLUMN "pkwId" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "purchase" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "stripeCustomer" ALTER COLUMN "stripeCustomerId" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE serial;