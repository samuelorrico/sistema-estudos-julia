ALTER TABLE "questoes" ADD COLUMN "texto_apoio" text;--> statement-breakpoint
ALTER TABLE "questoes" ADD COLUMN "numero" integer;--> statement-breakpoint
ALTER TABLE "questoes" ADD COLUMN "imagens" jsonb DEFAULT '[]'::jsonb NOT NULL;