DO $$ BEGIN
 CREATE TYPE "priceType" AS ENUM('FREE', 'BASIS', 'PREMIUM', 'ENTERPRISE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "notificationType" AS ENUM('MESSAGE', 'BOOKING', 'BOOKING_REQUEST', 'EMAIL', 'FAVOURITE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "application" ADD VALUE 'KRANWAGEN';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Abarth';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Alfa Romeo';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Alpina';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Alpine';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Aston Martin';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Bugatti';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Citroën';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Corvette';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Cupra';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Koenigsegg';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'KTM';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Lada';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Lancia';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Land Rover';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Lamborghini';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Lexus';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Lincoln';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Mercedes-Benz';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Pagani';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Plymouth';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Pontiac';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Rolls Royce';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Rover';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Seat';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Škoda';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Sonstige';--> statement-breakpoint
ALTER TYPE "carType" ADD VALUE 'KASTENWAGEN';--> statement-breakpoint
ALTER TYPE "lkwBrand" ADD VALUE 'DAF';--> statement-breakpoint
ALTER TYPE "lkwBrand" ADD VALUE 'Demag';--> statement-breakpoint
ALTER TYPE "lkwBrand" ADD VALUE 'Ford';--> statement-breakpoint
ALTER TYPE "lkwBrand" ADD VALUE 'Liebherr';--> statement-breakpoint
ALTER TYPE "lkwBrand" ADD VALUE 'Magirus Deutz';--> statement-breakpoint
ALTER TYPE "lkwBrand" ADD VALUE 'MAN';--> statement-breakpoint
ALTER TYPE "lkwBrand" ADD VALUE 'Meiller';--> statement-breakpoint
ALTER TYPE "lkwBrand" ADD VALUE 'Mercedes-Benz';--> statement-breakpoint
ALTER TYPE "lkwBrand" ADD VALUE 'Mitsubishi';--> statement-breakpoint
ALTER TYPE "lkwBrand" ADD VALUE 'Nissan';--> statement-breakpoint
ALTER TYPE "lkwBrand" ADD VALUE 'Opel';--> statement-breakpoint
ALTER TYPE "lkwBrand" ADD VALUE 'Palfinger';--> statement-breakpoint
ALTER TYPE "lkwBrand" ADD VALUE 'Peugeot';--> statement-breakpoint
ALTER TYPE "lkwBrand" ADD VALUE 'Renault';--> statement-breakpoint
ALTER TYPE "lkwBrand" ADD VALUE 'Skoda';--> statement-breakpoint
ALTER TYPE "lkwBrand" ADD VALUE 'Steyr';--> statement-breakpoint
ALTER TYPE "lkwBrand" ADD VALUE 'Tatra';--> statement-breakpoint
ALTER TYPE "lkwBrand" ADD VALUE 'Toyota';--> statement-breakpoint
ALTER TYPE "lkwBrand" ADD VALUE 'Volkswagen';--> statement-breakpoint
ALTER TYPE "lkwBrand" ADD VALUE 'Volvo';--> statement-breakpoint
ALTER TYPE "lkwBrand" ADD VALUE 'Sonstige';--> statement-breakpoint
ALTER TYPE "transportBrand" ADD VALUE 'Dacia';--> statement-breakpoint
ALTER TYPE "transportBrand" ADD VALUE 'DAF';--> statement-breakpoint
ALTER TYPE "transportBrand" ADD VALUE 'Mazda';--> statement-breakpoint
ALTER TYPE "transportBrand" ADD VALUE 'Maxus';--> statement-breakpoint
ALTER TYPE "transportBrand" ADD VALUE 'Mercedes-Benz';--> statement-breakpoint
ALTER TYPE "transportBrand" ADD VALUE 'Multicar';--> statement-breakpoint
ALTER TYPE "transportBrand" ADD VALUE 'SEAT';--> statement-breakpoint
ALTER TYPE "transportBrand" ADD VALUE 'Škoda';--> statement-breakpoint
ALTER TYPE "transportBrand" ADD VALUE 'Suzuki';--> statement-breakpoint
ALTER TYPE "transportBrand" ADD VALUE 'Volvo';--> statement-breakpoint
ALTER TYPE "transportBrand" ADD VALUE 'Sonstige';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inseratSubscription" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"inseratId" text,
	"userId" text,
	"subscriptionType" "priceType",
	"stripe_customer_id" text,
	"stripe_subscription_id" text,
	"stripe_price_id" text,
	"stripe_current_period_end" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"notificationType" "notificationType",
	"content" text,
	"userId" uuid,
	"conversationId" text,
	"inseratId" text,
	"seen" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "report" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid,
	"inseratId" uuid,
	"messageId" uuid,
	"reportType" text,
	"content" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "twoFactorConfirmation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "twoFactorToken" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text,
	"token" text,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "contactOptions" DROP CONSTRAINT "contactOptions_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "inserat" DROP CONSTRAINT "inserat_addressId_address_id_fk";
--> statement-breakpoint
ALTER TABLE "userAddress" DROP CONSTRAINT "userAddress_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_twoFactorConfirmationId_twoFactorConfirmation_id_fk";
--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "userId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "booking" ADD COLUMN "isAvailability" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "inserat" ADD COLUMN "priceType" "priceType" DEFAULT 'FREE';--> statement-breakpoint
ALTER TABLE "inserat" ADD COLUMN "firstRelease" timestamp;--> statement-breakpoint
ALTER TABLE "inserat" ADD COLUMN "subscriptionId" uuid;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "vorname" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "lastname" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contactOptions" ADD CONSTRAINT "contactOptions_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inserat" ADD CONSTRAINT "inserat_subscriptionId_inseratSubscription_id_fk" FOREIGN KEY ("subscriptionId") REFERENCES "inseratSubscription"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inserat" ADD CONSTRAINT "inserat_addressId_address_id_fk" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userAddress" ADD CONSTRAINT "userAddress_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_twoFactorConfirmationId_twoFactorConfirmation_id_fk" FOREIGN KEY ("twoFactorConfirmationId") REFERENCES "twoFactorConfirmation"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notification" ADD CONSTRAINT "notification_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report" ADD CONSTRAINT "report_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report" ADD CONSTRAINT "report_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report" ADD CONSTRAINT "report_messageId_message_id_fk" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "twoFactorConfirmation" ADD CONSTRAINT "twoFactorConfirmation_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
