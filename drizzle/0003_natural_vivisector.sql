DO $$ BEGIN
 CREATE TYPE "transportBrand" AS ENUM('Chevrolet', 'Citroën', 'Citroën Jumper', 'Fiat', 'Ford', 'Ford Transit', 'GMC', 'Hyundai', 'Iveco', 'Isuzu', 'Mercedes_Benz', 'Mitsubishi', 'Nissan', 'Opel', 'Peugeot', 'Ram', 'Renault', 'Sprinter', 'Toyota', 'Volkswagen');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "application" ADD VALUE 'CONTAINERTRANSPORT';--> statement-breakpoint
ALTER TYPE "application" ADD VALUE 'KIPPER';--> statement-breakpoint
ALTER TYPE "application" ADD VALUE 'SATTELSCHLEPPER';--> statement-breakpoint
ALTER TYPE "application" ADD VALUE 'SONSTIGES';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Acura';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Alfa_Romeo';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Alpha_Motor_Corporation';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Arcimoto';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Arrinera_Automotive';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Aptera_Motors';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Aston_Martin';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Atlis_Motor_Vehicles';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Audi';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'BMW';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Bentley';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Bollinger_Motors';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Buick';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'BYD';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'BYTON';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Cadillac';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Canoo';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Chery';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Chevrolet';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Chrysler';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Citroen';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Dacia';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Daihatsu';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Dodge';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Electra_Meccanica';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Electrameccanica_Vehicles_Corp';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Elio_Motors';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Faraday_Future';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Ferrari';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Fiat';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Fisker_Inc';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Ford';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Genesis';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Geely';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'GMC';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Great_Wall';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Haval';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Honda';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Hummer';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Hyundai';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Infiniti';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Isuzu';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'JAC';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Jaguar';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Jeep';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Karma_Automotive';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Kia';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Kreisel_Electric';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Land_Rover';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Lordstown_Motors';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Lotus';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Lucid_Motors';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Mahindra';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Maserati';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Mazda';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'McLaren';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Mercedes_Benz';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'MG';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Micro_Mobility_Systems ';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Mini';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Mitsubishi';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'NIO';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Nikola_Corporation';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Nissan';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Opel';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Peugeot';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Polestar';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Porsche';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Proton';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'RAM';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Renault';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Rimac';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Rivian';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Rolls_Royce';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Saab';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'SEAT';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Smart';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'SsangYong';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Subaru';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Suzuki';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Skoda';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Tesla';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Terrafugia';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Toyota';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Vanderhall_Motor_Works';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Vauxhall';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'VinFast';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Volkswagen';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Volvo';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Workhorse_Group_Inc';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Wuling';--> statement-breakpoint
ALTER TYPE "brand" ADD VALUE 'Zoyte';--> statement-breakpoint
ALTER TYPE "extraType" ADD VALUE 'KIPPER';--> statement-breakpoint
ALTER TYPE "loading" ADD VALUE 'LADEBORDWAND';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicle" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"inseratId" uuid NOT NULL,
	"title" text,
	"registration" text,
	"image" text
);
--> statement-breakpoint
ALTER TABLE "conversation" DROP CONSTRAINT "conversation_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "conversation" DROP CONSTRAINT "conversation_userId2_user_id_fk";
--> statement-breakpoint
ALTER TABLE "userAddress" DROP CONSTRAINT "userAddress_contactOptionsId_contactOptions_userId_fk";
--> statement-breakpoint
ALTER TABLE "favourite" DROP CONSTRAINT "favourite_userId_inseratId_pk";--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "userId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "address" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "address" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "address" ALTER COLUMN "inseratId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "inseratId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "booking" ALTER COLUMN "userId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "bookingRequest" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "bookingRequest" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "bookingRequest" ALTER COLUMN "inseratId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "bookingRequest" ALTER COLUMN "userId" SET DATA TYPE uuid;--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'contactOptions'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "contactOptions" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "contactOptions" ALTER COLUMN "userId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "contactOptions" ALTER COLUMN "userAddressId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "conversation" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "conversation" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "favourite" ALTER COLUMN "userId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "favourite" ALTER COLUMN "inseratId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "inseratId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "inserat" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "inserat" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "inserat" ALTER COLUMN "price" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "inserat" ALTER COLUMN "caution" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "inserat" ALTER COLUMN "userId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "inserat" ALTER COLUMN "pkwId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "lkwAttribute" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "lkwAttribute" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "lkwAttribute" ALTER COLUMN "inseratId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "message" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "message" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "message" ALTER COLUMN "inseratId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "message" ALTER COLUMN "inseratId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "message" ALTER COLUMN "senderId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "message" ALTER COLUMN "conversationId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "pkwAttribute" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "pkwAttribute" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "pkwAttribute" ALTER COLUMN "extraCost" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "pkwAttribute" ALTER COLUMN "inseratId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "purchase" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "purchase" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "purchase" ALTER COLUMN "userId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "purchase" ALTER COLUMN "inseratId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "rezension" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "rezension" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "rezension" ALTER COLUMN "receiverId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "rezension" ALTER COLUMN "senderId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "userId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "stripeCustomer" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "stripeCustomer" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "stripeCustomer" ALTER COLUMN "userId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "stripeCustomer" ALTER COLUMN "stripeCustomerId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "trailerAttribute" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "trailerAttribute" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "trailerAttribute" ALTER COLUMN "inseratId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "transportAttribute" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "transportAttribute" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "transportAttribute" ALTER COLUMN "inseratId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "userAddress" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "userAddress" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "userAddress" ALTER COLUMN "userId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "userAddress" ALTER COLUMN "contactOptionsId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "booking" ADD COLUMN "vehicleId" uuid;--> statement-breakpoint
ALTER TABLE "booking" ADD COLUMN "startDate" timestamp;--> statement-breakpoint
ALTER TABLE "booking" ADD COLUMN "endDate" timestamp;--> statement-breakpoint
ALTER TABLE "bookingRequest" ADD COLUMN "startDate" timestamp;--> statement-breakpoint
ALTER TABLE "bookingRequest" ADD COLUMN "endDate" timestamp;--> statement-breakpoint
ALTER TABLE "contactOptions" ADD COLUMN "id" uuid DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "conversation" ADD COLUMN "user1" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "conversation" ADD COLUMN "user2" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "favourite" ADD COLUMN "id" uuid DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "inserat" ADD COLUMN "dailyPrice" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "inserat" ADD COLUMN "addressId" uuid;--> statement-breakpoint
ALTER TABLE "inserat" ADD COLUMN "lkwId" uuid;--> statement-breakpoint
ALTER TABLE "inserat" ADD COLUMN "trailerId" uuid;--> statement-breakpoint
ALTER TABLE "inserat" ADD COLUMN "transportId" uuid;--> statement-breakpoint
ALTER TABLE "lkwAttribute" ADD COLUMN "axis" integer;--> statement-breakpoint
ALTER TABLE "lkwAttribute" ADD COLUMN "power" integer;--> statement-breakpoint
ALTER TABLE "lkwAttribute" ADD COLUMN "loading_volume" numeric;--> statement-breakpoint
ALTER TABLE "lkwAttribute" ADD COLUMN "transmission" "transmission";--> statement-breakpoint
ALTER TABLE "lkwAttribute" ADD COLUMN "loading_l" numeric;--> statement-breakpoint
ALTER TABLE "lkwAttribute" ADD COLUMN "loading_b" numeric;--> statement-breakpoint
ALTER TABLE "lkwAttribute" ADD COLUMN "loading_h" numeric;--> statement-breakpoint
ALTER TABLE "lkwAttribute" ADD COLUMN "loading_size" numeric;--> statement-breakpoint
ALTER TABLE "message" ADD COLUMN "isInterest" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "pkwAttribute" ADD COLUMN "loading" "loading";--> statement-breakpoint
ALTER TABLE "pkwAttribute" ADD COLUMN "extraType" "extraType";--> statement-breakpoint
ALTER TABLE "pkwAttribute" ADD COLUMN "weightClass" integer;--> statement-breakpoint
ALTER TABLE "pkwAttribute" ADD COLUMN "loading_volume" numeric;--> statement-breakpoint
ALTER TABLE "pkwAttribute" ADD COLUMN "loading_l" numeric;--> statement-breakpoint
ALTER TABLE "pkwAttribute" ADD COLUMN "loading_b" numeric;--> statement-breakpoint
ALTER TABLE "pkwAttribute" ADD COLUMN "loading_h" numeric;--> statement-breakpoint
ALTER TABLE "pkwAttribute" ADD COLUMN "loading_size" numeric;--> statement-breakpoint
ALTER TABLE "pkwAttribute" ADD COLUMN "ahk" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "trailerAttribute" ADD COLUMN "loading_volume" numeric;--> statement-breakpoint
ALTER TABLE "trailerAttribute" ADD COLUMN "loading_l" numeric;--> statement-breakpoint
ALTER TABLE "trailerAttribute" ADD COLUMN "loading_b" numeric;--> statement-breakpoint
ALTER TABLE "trailerAttribute" ADD COLUMN "loading_h" numeric;--> statement-breakpoint
ALTER TABLE "trailerAttribute" ADD COLUMN "loading_size" numeric;--> statement-breakpoint
ALTER TABLE "transportAttribute" ADD COLUMN "extraType" "extraType";--> statement-breakpoint
ALTER TABLE "transportAttribute" ADD COLUMN "loading_volume" numeric;--> statement-breakpoint
ALTER TABLE "transportAttribute" ADD COLUMN "loading_l" numeric;--> statement-breakpoint
ALTER TABLE "transportAttribute" ADD COLUMN "loading_b" numeric;--> statement-breakpoint
ALTER TABLE "transportAttribute" ADD COLUMN "loading_h" numeric;--> statement-breakpoint
ALTER TABLE "transportAttribute" ADD COLUMN "loading_size" numeric;--> statement-breakpoint
ALTER TABLE "transportAttribute" ADD COLUMN "transportBrand" "transportBrand";--> statement-breakpoint
ALTER TABLE "transportAttribute" ADD COLUMN "weightClass" integer;--> statement-breakpoint
ALTER TABLE "transportAttribute" ADD COLUMN "power" integer;--> statement-breakpoint
ALTER TABLE "userAddress" ADD COLUMN "city" text;--> statement-breakpoint
ALTER TABLE "userAddress" ADD COLUMN "street" text;--> statement-breakpoint
ALTER TABLE "userAddress" ADD COLUMN "houseNumber" integer;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "usesTwoFactor" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "twoFactorConfirmationId" uuid;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "contactId" uuid;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "userAddressId" uuid;--> statement-breakpoint
ALTER TABLE "verificationToken" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_vehicleId_vehicle_id_fk" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversation" ADD CONSTRAINT "conversation_user1_user_id_fk" FOREIGN KEY ("user1") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversation" ADD CONSTRAINT "conversation_user2_user_id_fk" FOREIGN KEY ("user2") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inserat" ADD CONSTRAINT "inserat_addressId_address_id_fk" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inserat" ADD CONSTRAINT "inserat_lkwId_lkwAttribute_id_fk" FOREIGN KEY ("lkwId") REFERENCES "lkwAttribute"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inserat" ADD CONSTRAINT "inserat_trailerId_trailerAttribute_id_fk" FOREIGN KEY ("trailerId") REFERENCES "trailerAttribute"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inserat" ADD CONSTRAINT "inserat_transportId_transportAttribute_id_fk" FOREIGN KEY ("transportId") REFERENCES "transportAttribute"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userAddress" ADD CONSTRAINT "userAddress_contactOptionsId_contactOptions_id_fk" FOREIGN KEY ("contactOptionsId") REFERENCES "contactOptions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_twoFactorConfirmationId_twoFactorConfirmation_id_fk" FOREIGN KEY ("twoFactorConfirmationId") REFERENCES "twoFactorConfirmation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_contactId_contactOptions_id_fk" FOREIGN KEY ("contactId") REFERENCES "contactOptions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_userAddressId_userAddress_id_fk" FOREIGN KEY ("userAddressId") REFERENCES "userAddress"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "booking" DROP COLUMN IF EXISTS "begin";--> statement-breakpoint
ALTER TABLE "booking" DROP COLUMN IF EXISTS "end";--> statement-breakpoint
ALTER TABLE "bookingRequest" DROP COLUMN IF EXISTS "begin";--> statement-breakpoint
ALTER TABLE "bookingRequest" DROP COLUMN IF EXISTS "end";--> statement-breakpoint
ALTER TABLE "conversation" DROP COLUMN IF EXISTS "userId";--> statement-breakpoint
ALTER TABLE "conversation" DROP COLUMN IF EXISTS "userId2";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
