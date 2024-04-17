ALTER TABLE "account" ALTER COLUMN "userId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "userId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "bookingRequest" ALTER COLUMN "userId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "business" ALTER COLUMN "userId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "contactOptions" ALTER COLUMN "userId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "conversation" ALTER COLUMN "user1" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "conversation" ALTER COLUMN "user2" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "favourite" ALTER COLUMN "userId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "message" ALTER COLUMN "senderId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "notification" ALTER COLUMN "userId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "purchase" ALTER COLUMN "userId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "report" ALTER COLUMN "userId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "rezension" ALTER COLUMN "receiverId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "rezension" ALTER COLUMN "senderId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "stripeCustomer" ALTER COLUMN "userId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "twoFactorConfirmation" ALTER COLUMN "userId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "userAddress" ALTER COLUMN "userId" SET DATA TYPE text;