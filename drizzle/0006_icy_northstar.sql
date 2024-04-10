ALTER TABLE "contactOptions" DROP CONSTRAINT "contactOptions_userAddressId_userAddress_id_fk";
--> statement-breakpoint
ALTER TABLE "userAddress" DROP CONSTRAINT "userAddress_userId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contactOptions" ADD CONSTRAINT "contactOptions_userAddressId_userAddress_id_fk" FOREIGN KEY ("userAddressId") REFERENCES "userAddress"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userAddress" ADD CONSTRAINT "userAddress_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
