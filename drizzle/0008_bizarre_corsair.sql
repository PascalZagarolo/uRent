ALTER TABLE "conversation" ADD COLUMN "inseratId" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversation" ADD CONSTRAINT "conversation_inseratId_inserat_id_fk" FOREIGN KEY ("inseratId") REFERENCES "public"."inserat"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
