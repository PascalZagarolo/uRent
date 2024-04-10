ALTER TABLE "user" DROP CONSTRAINT "user_contactId_contactOptions_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_contactId_contactOptions_id_fk" FOREIGN KEY ("contactId") REFERENCES "contactOptions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
