DO $$ BEGIN
 CREATE TYPE "public"."contactProfileTypeEnum" AS ENUM('EMAIL', 'PHONE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "loading" ADD VALUE 'KRAN';--> statement-breakpoint
ALTER TYPE "notificationType" ADD VALUE 'MESSAGE';--> statement-breakpoint
ALTER TYPE "notificationType" ADD VALUE 'SUBSCRIPTION';--> statement-breakpoint
ALTER TYPE "notificationType" ADD VALUE 'SUBSCRIPTION_ALMOST_EXPIRED';--> statement-breakpoint
ALTER TYPE "notificationType" ADD VALUE 'SUBSCRIPTION_REDEEMED';--> statement-breakpoint
ALTER TYPE "notificationType" ADD VALUE 'SUBSCRIPTION_RENEWAL';--> statement-breakpoint
ALTER TYPE "notificationType" ADD VALUE 'SUBSCRIPTION_UPGRADED';--> statement-breakpoint
ALTER TYPE "notificationType" ADD VALUE 'WELCOME';--> statement-breakpoint
ALTER TYPE "notificationType" ADD VALUE 'OFFER';--> statement-breakpoint
ALTER TYPE "notificationType" ADD VALUE 'NEWS';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "conversationFolder" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"color" text,
	"icon" text,
	"userId" text,
	"position" integer,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "deleteUserToken" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"token" text,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "folder_conversation" (
	"folderId" uuid,
	"userId" text,
	"conversationId" uuid,
	CONSTRAINT "folder_conversation_folderId_conversationId_pk" PRIMARY KEY("folderId","conversationId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notificationUnauthorized" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"notificationType" "notificationType",
	"title" text,
	"content" text,
	"link" text,
	"imageUrl" text,
	"showAuthorizedUsers" boolean DEFAULT false,
	"isPublic" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "paymentMethods" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text,
	"creditCard" boolean DEFAULT false NOT NULL,
	"paypal" boolean DEFAULT false NOT NULL,
	"barGeld" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userContactProfiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"content" text,
	"profileType" "contactProfileTypeEnum"
);
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "businessAddress" ADD COLUMN "title" text;--> statement-breakpoint
ALTER TABLE "conversation" ADD COLUMN "conversationFolder" text;--> statement-breakpoint
ALTER TABLE "conversation" ADD COLUMN "lastMessageId" uuid;--> statement-breakpoint
ALTER TABLE "inserat" ADD COLUMN "minTime" text;--> statement-breakpoint
ALTER TABLE "inserat" ADD COLUMN "color" text;--> statement-breakpoint
ALTER TABLE "userSubscription" ADD COLUMN "isGift" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "paymentMethodsId" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversationFolder" ADD CONSTRAINT "conversationFolder_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "deleteUserToken" ADD CONSTRAINT "deleteUserToken_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "folder_conversation" ADD CONSTRAINT "folder_conversation_folderId_conversationFolder_id_fk" FOREIGN KEY ("folderId") REFERENCES "public"."conversationFolder"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "folder_conversation" ADD CONSTRAINT "folder_conversation_conversationId_conversation_id_fk" FOREIGN KEY ("conversationId") REFERENCES "public"."conversation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "paymentMethods" ADD CONSTRAINT "paymentMethods_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversation" ADD CONSTRAINT "conversation_lastMessageId_message_id_fk" FOREIGN KEY ("lastMessageId") REFERENCES "public"."message"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_paymentMethodsId_paymentMethods_id_fk" FOREIGN KEY ("paymentMethodsId") REFERENCES "public"."paymentMethods"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
