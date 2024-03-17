DO $$ BEGIN
 CREATE TYPE "application" AS ENUM('DEICHSELANHAENGER', 'FAHRZEUGTRANSPORT', 'FLUESSIGKEITSTRANSPORT', 'KASTENWAGEN', 'KOFFERAUFBAU', 'KUEHLWAGEN', 'MOEBELTRANSPORT', 'PERSONENTRANSPORT', 'PLANWAGEN', 'PRITSCHENWAGEN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "brand" AS ENUM(' Acura ', ' Alfa_Romeo ', ' Alpha_Motor_Corporation ', ' Arcimoto ', ' Arrinera_Automotive ', ' Aptera_Motors ', ' Aston_Martin ', ' Atlis_Motor_Vehicles ', ' Audi ', ' BMW ', ' Bentley ', ' Bollinger_Motors ', ' Bugatti ', ' Buick ', ' BYD ', ' BYTON ', ' Cadillac ', ' Canoo ', ' Chery ', ' Chevrolet ', ' Chrysler ', ' Citroen ', ' Dacia ', ' Daihatsu ', ' Dodge ', ' Electra_Meccanica ', ' Electrameccanica_Vehicles_Corp ', ' Elio_Motors ', ' Faraday_Future ', ' Ferrari ', ' Fiat ', ' Fisker_Inc ', ' Ford ', ' Genesis ', ' Geely ', ' GMC ', ' Great_Wall ', ' Haval ', ' Honda ', ' Hummer ', ' Hyundai ', ' Infiniti ', ' Isuzu ', ' JAC ', ' Jaguar ', ' Jeep ', ' Karma_Automotive ', ' Kia ', ' Kreisel_Electric ', ' Land_Rover ', ' Lamborghini ', ' Lexus ', ' Lincoln ', ' Local_Motors ', ' Lordstown_Motors ', ' Lotus ', ' Lucid_Motors ', ' Mahindra ', ' Maserati ', ' Mazda ', ' McLaren ', ' Mercedes_Benz ', ' MG ', ' Micro_Mobility_Systems ', ' Mini ', ' Mitsubishi ', ' NIO ', ' Nikola_Corporation ', ' Nissan ', ' Opel ', ' Peugeot ', ' Polestar ', ' Porsche ', ' Proton ', ' RAM ', ' Renault ', ' Rimac ', ' Rivian ', ' Rolls_Royce ', ' Saab ', ' SEAT ', ' Smart ', ' SsangYong ', ' Subaru ', ' Suzuki ', ' Skoda ', ' Tesla ', ' Terrafugia ', ' Toyota ', ' Vanderhall_Motor_Works ', ' Vauxhall ', ' VinFast ', ' Volkswagen ', ' Volvo ', ' Workhorse_Group_Inc ', ' Wuling ', ' Zoyte ');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "carType" AS ENUM('KOMBI', 'COUPE', 'SUV', 'LIMOUSINE', 'VAN', 'KLEINBUS', 'CABRIO', 'KLEIN', 'SPORT', 'SUPERSPORT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "category" AS ENUM('PKW', 'LKW', 'TRAILER', 'TRANSPORT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "coupling" AS ENUM('KUGELKOPFKUPPLUNG', 'MAULKUPPLUNG');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "drive" AS ENUM('D4x2', 'D4x4', 'D6x2', 'D6x4', 'D6x6', 'D8x4', 'D8x6', 'D8x8');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "extraType" AS ENUM('CONTAINERTRANSPORT', 'FAHRZEUGTRANSPORT', 'FLUESSIGKEITSTRANSPORT', 'KASTENWAGEN', 'KOFFERAUFBAU', 'KUEHLAUFBAU', 'MOEBELTRANSPORT', 'MULDENKIPPER', 'PERSONENTRANSPORT', 'PLANE', 'PRITSCHE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "fuelType" AS ENUM('ELEKTRISCH', 'DIESEL', 'BENZIN', 'HYBRID');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "license" AS ENUM('A1', 'A2', 'A', 'AM', 'B', 'B17', 'B96', 'B196', 'B197', 'BE', 'C1', 'C1E', 'C', 'CE', 'D1', 'D1E', 'DE', 'L', 'T');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "lkwBrand" AS ENUM('Anhui_Jianghuai_Automobile', 'Ashok_Leyland', 'Beiben_Trucks', 'Bedford_Vehicles', 'Beiqi_Foton', 'BYD_Auto', 'Changan_Automobile', 'Changan_Motors', 'Changfeng_Group', 'Changhe', 'Chery_Automobile', 'Chevrolet_Trucks', 'Daihatsu', 'DAF_Trucks', 'Dongfeng_Liuzhou_Motor', 'Dongfeng_Motor_Corporation', 'Dodge_Trucks', 'Eicher_Motors', 'FAW_Group', 'FAW_Group_Corporation', 'FAW_Jiefang', 'FAW_Jilin_Automobile', 'Fiat_Professional', 'Ford_Trucks', 'Freightliner_Trucks', 'Fuso', 'GAC_Group', 'GAZ_Group', 'Geely_Auto', 'GMC_Trucks', 'Great_Wall_Motors', 'Hafei', 'Haima_Automobile', 'Haval', 'Hawtai', 'Higer_Bus', 'Hino_Motors', 'Hyundai_Trucks', 'International_Trucks', 'Isuzu_Motors', 'Iveco', 'JAC_Motors', 'Jiefang', 'Jinhua_Youngman_Vehicle', 'Jinbei', 'Kamaz', 'Kenworth', 'King_Long', 'KrAZ', 'Land_Rover', 'Landwind', 'Leyland_Trucks', 'Lifan_Group', 'Mack_Trucks', 'MAN_Truck_Bus', 'Maruti_Suzuki', 'Mazda_Trucks', 'Maxus', 'Mercedes_Benz_Trucks', 'Mitsubishi_Fuso_Truck_and_Bus_Corporation', 'Navistar_International', 'Nissan_Trucks', 'Peterbilt', 'Piaggio_Commercial_Vehicles', 'Renault_Trucks', 'SAF_HOLLAND', 'SAIC_Motor', 'Scania', 'Shaanxi_Automobile_Group', 'Shacman', 'Shandong_Tangjun_Ouling_Automobile_Manufacture', 'Sichuan_Tengzhong', 'Sinotruk', 'Sisu_Auto', 'Tata_Motors', 'Tatra_Trucks', 'Toyota_Trucks', 'UD_Trucks', 'Ural_Automotive_Plant', 'Volkswagen_Commercial_Vehicles', 'Volvo_Trucks', 'Western_Star_Trucks', 'Wuling_Motors', 'Xiamen_Golden_Dragon_Bus', 'Yutong_Group', 'Zotye_Auto', 'Zhejiang_Geely_Holding_Group', 'ZIL');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "loading" AS ENUM('AUFFAHRRAMPE', 'LADERAMPE', 'KRAN', 'MITNAHMESTAPLER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "trailer" AS ENUM('KLEIN', 'SATTEL', 'ANHAENGER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "transmission" AS ENUM('MANUAL', 'AUTOMATIC', 'SEMI_AUTOMATIC');
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
	"id" serial PRIMARY KEY NOT NULL,
	"postalCode" integer,
	"state" text,
	"locationString" text,
	"longitude" text,
	"latitude" text,
	"inseratId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "booking" (
	"id" serial PRIMARY KEY NOT NULL,
	"inseratId" integer NOT NULL,
	"userId" integer NOT NULL,
	"content" text,
	"begin" timestamp,
	"end" timestamp,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookingRequest" (
	"id" serial PRIMARY KEY NOT NULL,
	"inseratId" integer NOT NULL,
	"userId" integer NOT NULL,
	"content" text,
	"begin" timestamp,
	"end" timestamp,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contactOptions" (
	"userId" integer PRIMARY KEY NOT NULL,
	"email" boolean DEFAULT false NOT NULL,
	"emailAddress" text,
	"website" boolean DEFAULT false NOT NULL,
	"websiteAddress" text,
	"phone" boolean DEFAULT false NOT NULL,
	"phoneNumber" text,
	"userAddressId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "conversation" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"userId" integer NOT NULL,
	"userId2" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favourite" (
	"userId" integer NOT NULL,
	"inseratId" integer NOT NULL,
	CONSTRAINT "favourite_userId_inseratId_pk" PRIMARY KEY("userId","inseratId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"position" integer,
	"url" text NOT NULL,
	"inseratId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inserat" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"category" "category",
	"price" numeric(2),
	"isPublished" boolean DEFAULT false NOT NULL,
	"multi" boolean DEFAULT false NOT NULL,
	"amount" integer DEFAULT 1 NOT NULL,
	"emailAddress" text,
	"phoneNumber" text,
	"begin" timestamp,
	"end" timestamp,
	"annual" boolean DEFAULT false NOT NULL,
	"license" "license",
	"caution" numeric(2),
	"reqAge" integer,
	"views" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"userId" text NOT NULL,
	"pkwId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lkwAttribute" (
	"id" serial PRIMARY KEY NOT NULL,
	"lkwBrand" "lkwBrand",
	"model" text,
	"seats" integer,
	"weightClass" integer,
	"drive" "drive",
	"loading" "loading",
	"application" "application",
	"inseratId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "message" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text,
	"image" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	"inseratId" integer NOT NULL,
	"senderId" integer NOT NULL,
	"conversationId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pkwAttribute" (
	"id" serial PRIMARY KEY NOT NULL,
	"brand" "brand",
	"model" text,
	"seats" integer,
	"doors" integer,
	"freeMiles" integer,
	"extraCost" numeric(2),
	"transmission" "transmission",
	"type" "carType",
	"fuel" "fuelType",
	"initial" timestamp,
	"power" integer,
	"inseratId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "purchase" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"inseratId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now()
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
	"id" serial PRIMARY KEY NOT NULL,
	"content" text,
	"image" text,
	"rating" integer NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"editedAt" timestamp,
	"isEdited" boolean DEFAULT false NOT NULL,
	"receiverId" integer NOT NULL,
	"senderId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stripeCustomer" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"stripeCustomerId" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "stripeCustomer_stripeCustomerId_unique" UNIQUE("stripeCustomerId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trailerAttribute" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "trailer",
	"coupling" "coupling",
	"loading" "loading",
	"extraType" "extraType",
	"axis" integer,
	"weight" integer,
	"brake" boolean DEFAULT false NOT NULL,
	"inseratId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transportAttribute" (
	"id" serial PRIMARY KEY NOT NULL,
	"loading" "loading",
	"transmission" "transmission",
	"seats" integer,
	"doors" integer,
	"fuel" "fuelType",
	"inseratId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userAddress" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"contactOptionsId" integer,
	"postalCode" integer,
	"locationString" text,
	"longitude" text,
	"latitude" text,
	CONSTRAINT "userAddress_userId_unique" UNIQUE("userId"),
	CONSTRAINT "userAddress_contactOptionsId_unique" UNIQUE("contactOptionsId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"password" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"confirmedMail" boolean DEFAULT false NOT NULL,
	"description" text,
	"sharesEmail" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookingRequest" ADD CONSTRAINT "bookingRequest_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookingRequest" ADD CONSTRAINT "bookingRequest_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contactOptions" ADD CONSTRAINT "contactOptions_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contactOptions" ADD CONSTRAINT "contactOptions_userAddressId_userAddress_id_fk" FOREIGN KEY ("userAddressId") REFERENCES "userAddress"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversation" ADD CONSTRAINT "conversation_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversation" ADD CONSTRAINT "conversation_userId2_user_id_fk" FOREIGN KEY ("userId2") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favourite" ADD CONSTRAINT "favourite_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favourite" ADD CONSTRAINT "favourite_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "images" ADD CONSTRAINT "images_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inserat" ADD CONSTRAINT "inserat_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inserat" ADD CONSTRAINT "inserat_pkwId_pkwAttribute_id_fk" FOREIGN KEY ("pkwId") REFERENCES "pkwAttribute"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lkwAttribute" ADD CONSTRAINT "lkwAttribute_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "message" ADD CONSTRAINT "message_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "message" ADD CONSTRAINT "message_senderId_user_id_fk" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "message" ADD CONSTRAINT "message_conversationId_conversation_id_fk" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pkwAttribute" ADD CONSTRAINT "pkwAttribute_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "purchase" ADD CONSTRAINT "purchase_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "purchase" ADD CONSTRAINT "purchase_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rezension" ADD CONSTRAINT "rezension_receiverId_user_id_fk" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rezension" ADD CONSTRAINT "rezension_senderId_user_id_fk" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stripeCustomer" ADD CONSTRAINT "stripeCustomer_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trailerAttribute" ADD CONSTRAINT "trailerAttribute_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transportAttribute" ADD CONSTRAINT "transportAttribute_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userAddress" ADD CONSTRAINT "userAddress_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userAddress" ADD CONSTRAINT "userAddress_contactOptionsId_contactOptions_userId_fk" FOREIGN KEY ("contactOptionsId") REFERENCES "contactOptions"("userId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
