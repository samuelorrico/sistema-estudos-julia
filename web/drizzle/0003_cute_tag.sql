CREATE TYPE "public"."modo_estudo" AS ENUM('treino', 'simulado');--> statement-breakpoint
CREATE TABLE "tentativas" (
	"id" serial PRIMARY KEY NOT NULL,
	"questao_id" integer,
	"materia" "materia" NOT NULL,
	"assunto" text NOT NULL,
	"dificuldade" "dificuldade" DEFAULT 'media' NOT NULL,
	"fonte" text DEFAULT 'PROSEF' NOT NULL,
	"acertou" boolean NOT NULL,
	"selecionada" text,
	"modo" "modo_estudo" NOT NULL,
	"criado_em" timestamp DEFAULT now() NOT NULL
);
