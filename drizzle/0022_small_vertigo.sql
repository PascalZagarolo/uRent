CREATE TABLE IF NOT EXISTS "carModels" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category" text,
	"modelName" text,
	"brand" text
);
