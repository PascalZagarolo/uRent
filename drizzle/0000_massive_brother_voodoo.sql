DO $$ BEGIN
 CREATE TYPE "public"."application" AS ENUM('ABSETZKIPPERAUFBAU', 'CONTAINERTRANSPORT', 'DEICHSELANHAENGER', 'FAHRZEUGTRANSPORT', 'FLUESSIGKEITSTRANSPORT', 'KASTENWAGEN', 'KOFFERAUFBAU', 'KIPPER', 'KIPPERAUFBAU', 'KRANWAGEN', 'KUEHLWAGEN', 'MOEBELTRANSPORT', 'PERSONENTRANSPORT', 'PLANWAGEN', 'PRITSCHENWAGEN', 'SATTELSCHLEPPER', 'VERANSTALTUNG', 'SONSTIGES');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."brand" AS ENUM('Abarth', 'Acura', 'Audi', 'Alfa Romeo', 'Alpina', 'Alpine', 'Aston Martin', 'Bentley', 'BMW', 'Bugatti', 'Buick', 'BYD', 'Cadillac', 'Chevrolet', 'Chrysler', 'Citroën', 'Corvette', 'Cupra', 'Dacia', 'Daihatsu', 'Dodge', 'Ferrari', 'Fiat', 'Ford', 'GMC', 'Honda', 'Hummer', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Koenigsegg', 'KTM', 'Lada', 'Lancia', 'Land Rover', 'Lamborghini', 'Lexus', 'Lincoln', 'Lotus', 'Maserati', 'Mazda', 'McLaren', 'Mercedes-Benz', 'MG', 'Mini', 'Mitsubishi', 'NIO', 'Nissan', 'Opel', 'Pagani', 'Peugeot', 'Plymouth', 'Polestar', 'Pontiac', 'Porsche', 'RAM', 'Renault', 'Rolls Royce', 'Rover', 'Saab', 'Seat', 'Škoda', 'Smart', 'Subaru', 'Suzuki', 'Tesla', 'Volkswagen', 'Volvo', 'Sonstige');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."carType" AS ENUM('KOMBI', 'COUPE', 'PICKUP', 'SUV', 'LIMOUSINE', 'VAN', 'KASTENWAGEN', 'KLEINBUS', 'CABRIO', 'KLEIN', 'SPORT', 'SUPERSPORT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."category" AS ENUM('PKW', 'LKW', 'TRAILER', 'TRANSPORT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."coupling" AS ENUM('KUGELKOPFKUPPLUNG', 'MAULKUPPLUNG');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."drive" AS ENUM('D4x2', 'D4x4', 'D6x2', 'D6x4', 'D6x6', 'D8x4', 'D8x6', 'D8x8');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."extraType" AS ENUM('CONTAINERTRANSPORT', 'FAHRZEUGTRANSPORT', 'FLUESSIGKEITSTRANSPORT', 'KASTENWAGEN', 'KIPPER', 'KIPPERAUFBAU', 'KOFFERAUFBAU', 'KUEHLAUFBAU', 'MOEBELTRANSPORT', 'MULDENKIPPER', 'PERSONENTRANSPORT', 'PLANE', 'PRITSCHE', 'VERANSTALTUNG');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."fuelType" AS ENUM('ELEKTRISCH', 'DIESEL', 'BENZIN', 'HYBRID');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."priceType" AS ENUM('FREE', 'BASIS', 'PREMIUM', 'ENTERPRISE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."license" AS ENUM('B', 'BE', 'C1', 'C', 'CE', 'CE1');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."lkwBrand" AS ENUM('DAF', 'Demag', 'Ford', 'Iveco', 'Liebherr', 'Magirus Deutz', 'MAN', 'Meiller', 'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'Opel', 'Palfinger', 'Peugeot', 'Renault', 'Scania', 'Skoda', 'Steyr', 'Tatra', 'Toyota', 'Volkswagen', 'Volvo', 'Sonstige');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."loading" AS ENUM('AUFFAHRRAMPE', 'LADERAMPE', 'LADEBORDWAND', 'KRAN', 'MITNAHMESTAPLER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."notificationType" AS ENUM('MESSAGE', 'BOOKING', 'BOOKING_REQUEST', 'EMAIL', 'FAVOURITE', 'REPORT_ACTION');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."trailer" AS ENUM('KLEIN', 'SATTEL', 'ANHAENGER', 'VERANSTALTUNG');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."transmission" AS ENUM('MANUAL', 'AUTOMATIC', 'SEMI_AUTOMATIC');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."transportBrand" AS ENUM('Citroën', 'Dacia', 'DAF', 'Fiat', 'Ford', 'Hyundai', 'Iveco', 'Man', 'Mazda', 'Maxus', 'Mercedes-Benz', 'Mitsubishi', 'Multicar', 'Nissan', 'Opel', 'Peugeot', 'Renault', 'SEAT', 'Škoda', 'Suzuki', 'Toyota', 'Volkswagen', 'Volvo', 'Sonstige');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "address" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"postalCode" integer,
	"state" text,
	"locationString" text,
	"longitude" text,
	"latitude" text,
	"inseratId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "block" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text,
	"conversationId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "booking" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"inseratId" uuid NOT NULL,
	"userId" text,
	"vehicleId" uuid,
	"name" text,
	"buchungsnummer" text,
	"content" text,
	"startDate" timestamp,
	"endDate" timestamp,
	"startPeriod" text,
	"endPeriod" text,
	"isAvailability" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookingRequest" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"inseratId" uuid NOT NULL,
	"userId" text NOT NULL,
	"content" text,
	"startDate" timestamp,
	"endDate" timestamp,
	"startPeriod" text,
	"endPeriod" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "business" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text,
	"description" text,
	"openingHours" text,
	"telephone_number" text,
	"email" text,
	"website" text,
	"impressum" text,
	"fax" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "businessAddress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"businessId" uuid,
	"postalCode" integer,
	"image" text,
	"state" text,
	"city" text,
	"street" text,
	"isPrimary" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "businessFaqs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question" text,
	"answer" text,
	"position" integer,
	"businessId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "businessImages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"position" integer,
	"url" text,
	"businessId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "changeEmailToken" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"newEmail" text,
	"userId" text NOT NULL,
	"token" text,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contactOptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"email" boolean DEFAULT false NOT NULL,
	"emailAddress" text,
	"website" boolean DEFAULT false NOT NULL,
	"websiteAddress" text,
	"phone" boolean DEFAULT false NOT NULL,
	"phoneNumber" text,
	"userAddressId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "conversation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"blocked" boolean DEFAULT false NOT NULL,
	"user1" text NOT NULL,
	"user2" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favourite" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"inseratId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "giftCode" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"plan" "priceType",
	"inseratAmount" integer,
	"months" integer,
	"userAmount" integer,
	"availableAmount" integer,
	"expirationDate" timestamp,
	"code" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"position" integer,
	"url" text NOT NULL,
	"inseratId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inserat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"category" "category",
	"price" numeric,
	"isPublished" boolean DEFAULT false NOT NULL,
	"multi" boolean DEFAULT false NOT NULL,
	"amount" integer DEFAULT 1 NOT NULL,
	"isHighlighted" boolean DEFAULT false NOT NULL,
	"emailAddress" text,
	"phoneNumber" text,
	"priceType" "priceType" DEFAULT 'FREE',
	"begin" timestamp,
	"end" timestamp,
	"annual" boolean DEFAULT false NOT NULL,
	"dailyPrice" boolean DEFAULT false NOT NULL,
	"license" "license",
	"caution" numeric,
	"reqAge" integer,
	"priceHour" numeric,
	"priceWeekend" numeric,
	"priceKilometer" numeric,
	"firstRelease" timestamp,
	"views" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"userId" text NOT NULL,
	"addressId" uuid,
	"pkwId" uuid,
	"lkwId" uuid,
	"trailerId" uuid,
	"transportId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lkwAttribute" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lkwBrand" "lkwBrand",
	"model" text,
	"seats" integer,
	"axis" integer,
	"power" integer,
	"fuel" "fuelType",
	"loading_volume" numeric,
	"transmission" "transmission",
	"initial" timestamp,
	"loading_l" numeric,
	"loading_b" numeric,
	"loading_h" numeric,
	"loading_size" numeric,
	"weightClass" integer,
	"drive" "drive",
	"loading" "loading",
	"application" "application",
	"inseratId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "message" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" text,
	"image" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	"isInterest" boolean DEFAULT false NOT NULL,
	"seen" boolean DEFAULT false NOT NULL,
	"inseratId" uuid,
	"senderId" text NOT NULL,
	"conversationId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"notificationType" "notificationType",
	"content" text,
	"userId" text,
	"conversationId" text,
	"inseratId" text,
	"seen" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oauth_account" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text,
	"provider" text NOT NULL,
	"provider_user_id" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"expiresAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "openingTimes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"businessId" uuid,
	"monday" text,
	"tuesday" text,
	"wednesday" text,
	"thursday" text,
	"friday" text,
	"saturday" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pkwAttribute" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"brand" "brand",
	"model" text,
	"seats" integer,
	"doors" integer,
	"freeMiles" integer,
	"extraCost" numeric,
	"loading" "loading",
	"extraType" "extraType",
	"weightClass" integer,
	"transmission" "transmission",
	"type" "carType",
	"fuel" "fuelType",
	"loading_volume" numeric,
	"loading_l" numeric,
	"loading_b" numeric,
	"loading_h" numeric,
	"loading_size" numeric,
	"ahk" boolean DEFAULT false NOT NULL,
	"initial" timestamp,
	"power" integer,
	"inseratId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "priceprofile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"description" text,
	"price" numeric,
	"freeMiles" integer,
	"extraCost" numeric,
	"position" integer,
	"inseratId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "purchase" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"inseratId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "report" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text,
	"inseratId" uuid,
	"messageId" uuid,
	"conversationId" uuid,
	"reportType" text,
	"content" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resetPasswordToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "resetPasswordToken_email_token_pk" PRIMARY KEY("email","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rezension" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" text,
	"image" text,
	"rating" integer NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"editedAt" timestamp,
	"isEdited" boolean DEFAULT false NOT NULL,
	"receiverId" text NOT NULL,
	"senderId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "savedSearch" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"link" text,
	"title" text,
	"createdAt" timestamp DEFAULT now(),
	"receivesUpdates" boolean DEFAULT false NOT NULL,
	"receiveAvailability" boolean DEFAULT false NOT NULL,
	"receivedAvailability" boolean DEFAULT false NOT NULL,
	"userId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stripeCustomer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"stripeCustomerId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "stripeCustomer_stripeCustomerId_unique" UNIQUE("stripeCustomerId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trailerAttribute" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "trailer",
	"coupling" "coupling",
	"loading" "loading",
	"extraType" "extraType",
	"initial" timestamp,
	"loading_volume" numeric,
	"loading_l" numeric,
	"loading_b" numeric,
	"loading_h" numeric,
	"loading_size" numeric,
	"axis" integer,
	"weight" integer,
	"brake" boolean DEFAULT false NOT NULL,
	"inseratId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transportAttribute" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"loading" "loading",
	"transmission" "transmission",
	"extraType" "extraType",
	"loading_volume" numeric,
	"initial" timestamp,
	"loading_l" numeric,
	"loading_b" numeric,
	"loading_h" numeric,
	"loading_size" numeric,
	"transportBrand" "transportBrand",
	"weightClass" integer,
	"power" integer,
	"seats" integer,
	"doors" integer,
	"fuel" "fuelType",
	"inseratId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "twoFactorConfirmation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "twoFactorToken" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text,
	"token" text,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userAddress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"contactOptionsId" uuid,
	"postalCode" integer,
	"city" text,
	"street" text,
	"houseNumber" integer,
	"locationString" text,
	"longitude" text,
	"latitude" text,
	CONSTRAINT "userAddress_userId_unique" UNIQUE("userId"),
	CONSTRAINT "userAddress_contactOptionsId_unique" UNIQUE("contactOptionsId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userSubscription" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text,
	"subscriptionType" "priceType",
	"amount" integer DEFAULT 0 NOT NULL,
	"stripe_customer_id" text,
	"stripe_subscription_id" text,
	"stripe_product_id" text,
	"stripe_price_id" text,
	"stripe_current_period_end" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"vorname" text,
	"lastname" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"password" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"confirmedMail" boolean DEFAULT false NOT NULL,
	"description" text,
	"sharesEmail" boolean DEFAULT true NOT NULL,
	"sharesRealName" boolean DEFAULT true NOT NULL,
	"sharesPhoneNumber" boolean DEFAULT true NOT NULL,
	"newsletter" boolean DEFAULT false,
	"usesTwoFactor" boolean DEFAULT false NOT NULL,
	"isBusiness" boolean DEFAULT false,
	"enableSocialLogin" boolean DEFAULT true,
	"isAdmin" boolean DEFAULT false,
	"businessId" uuid,
	"contactId" uuid,
	"subscriptionId" uuid,
	"userAddressId" uuid,
	"twoFactorConfirmationId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicle" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"inseratId" uuid NOT NULL,
	"title" text,
	"registration" text,
	"internalId" text,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"email" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "public"."inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "block" ADD CONSTRAINT "block_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "block" ADD CONSTRAINT "block_conversationId_conversation_id_fk" FOREIGN KEY ("conversationId") REFERENCES "public"."conversation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "public"."inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_vehicleId_vehicle_id_fk" FOREIGN KEY ("vehicleId") REFERENCES "public"."vehicle"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookingRequest" ADD CONSTRAINT "bookingRequest_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "public"."inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookingRequest" ADD CONSTRAINT "bookingRequest_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "business" ADD CONSTRAINT "business_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "businessAddress" ADD CONSTRAINT "businessAddress_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "public"."business"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "businessFaqs" ADD CONSTRAINT "businessFaqs_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "public"."business"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "businessImages" ADD CONSTRAINT "businessImages_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "public"."business"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "changeEmailToken" ADD CONSTRAINT "changeEmailToken_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contactOptions" ADD CONSTRAINT "contactOptions_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contactOptions" ADD CONSTRAINT "contactOptions_userAddressId_userAddress_id_fk" FOREIGN KEY ("userAddressId") REFERENCES "public"."userAddress"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversation" ADD CONSTRAINT "conversation_user1_user_id_fk" FOREIGN KEY ("user1") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversation" ADD CONSTRAINT "conversation_user2_user_id_fk" FOREIGN KEY ("user2") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favourite" ADD CONSTRAINT "favourite_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favourite" ADD CONSTRAINT "favourite_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "public"."inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "images" ADD CONSTRAINT "images_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "public"."inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inserat" ADD CONSTRAINT "inserat_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inserat" ADD CONSTRAINT "inserat_addressId_address_id_fk" FOREIGN KEY ("addressId") REFERENCES "public"."address"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inserat" ADD CONSTRAINT "inserat_pkwId_pkwAttribute_id_fk" FOREIGN KEY ("pkwId") REFERENCES "public"."pkwAttribute"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inserat" ADD CONSTRAINT "inserat_lkwId_lkwAttribute_id_fk" FOREIGN KEY ("lkwId") REFERENCES "public"."lkwAttribute"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inserat" ADD CONSTRAINT "inserat_trailerId_trailerAttribute_id_fk" FOREIGN KEY ("trailerId") REFERENCES "public"."trailerAttribute"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inserat" ADD CONSTRAINT "inserat_transportId_transportAttribute_id_fk" FOREIGN KEY ("transportId") REFERENCES "public"."transportAttribute"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lkwAttribute" ADD CONSTRAINT "lkwAttribute_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "public"."inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "message" ADD CONSTRAINT "message_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "public"."inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "message" ADD CONSTRAINT "message_senderId_user_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "message" ADD CONSTRAINT "message_conversationId_conversation_id_fk" FOREIGN KEY ("conversationId") REFERENCES "public"."conversation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notification" ADD CONSTRAINT "notification_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oauth_account" ADD CONSTRAINT "oauth_account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "openingTimes" ADD CONSTRAINT "openingTimes_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "public"."business"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pkwAttribute" ADD CONSTRAINT "pkwAttribute_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "public"."inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "priceprofile" ADD CONSTRAINT "priceprofile_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "public"."inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "purchase" ADD CONSTRAINT "purchase_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "purchase" ADD CONSTRAINT "purchase_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "public"."inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report" ADD CONSTRAINT "report_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report" ADD CONSTRAINT "report_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "public"."inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report" ADD CONSTRAINT "report_messageId_message_id_fk" FOREIGN KEY ("messageId") REFERENCES "public"."message"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report" ADD CONSTRAINT "report_conversationId_conversation_id_fk" FOREIGN KEY ("conversationId") REFERENCES "public"."conversation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rezension" ADD CONSTRAINT "rezension_receiverId_user_id_fk" FOREIGN KEY ("receiverId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rezension" ADD CONSTRAINT "rezension_senderId_user_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "savedSearch" ADD CONSTRAINT "savedSearch_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stripeCustomer" ADD CONSTRAINT "stripeCustomer_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trailerAttribute" ADD CONSTRAINT "trailerAttribute_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "public"."inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transportAttribute" ADD CONSTRAINT "transportAttribute_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "public"."inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "twoFactorConfirmation" ADD CONSTRAINT "twoFactorConfirmation_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userAddress" ADD CONSTRAINT "userAddress_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userAddress" ADD CONSTRAINT "userAddress_contactOptionsId_contactOptions_id_fk" FOREIGN KEY ("contactOptionsId") REFERENCES "public"."contactOptions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userSubscription" ADD CONSTRAINT "userSubscription_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "public"."business"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_contactId_contactOptions_id_fk" FOREIGN KEY ("contactId") REFERENCES "public"."contactOptions"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_subscriptionId_userSubscription_id_fk" FOREIGN KEY ("subscriptionId") REFERENCES "public"."userSubscription"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_userAddressId_userAddress_id_fk" FOREIGN KEY ("userAddressId") REFERENCES "public"."userAddress"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_twoFactorConfirmationId_twoFactorConfirmation_id_fk" FOREIGN KEY ("twoFactorConfirmationId") REFERENCES "public"."twoFactorConfirmation"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "public"."inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
