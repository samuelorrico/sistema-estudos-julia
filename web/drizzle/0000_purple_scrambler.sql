CREATE TYPE "public"."dificuldade" AS ENUM('facil', 'media', 'dificil');--> statement-breakpoint
CREATE TYPE "public"."materia" AS ENUM('portugues', 'ingles', 'historia', 'geografia', 'matematica', 'biologia', 'fisica', 'quimica');--> statement-breakpoint
CREATE TABLE "questoes" (
	"id" serial PRIMARY KEY NOT NULL,
	"enunciado" text NOT NULL,
	"materia" "materia" NOT NULL,
	"assunto" text NOT NULL,
	"dificuldade" "dificuldade" DEFAULT 'media' NOT NULL,
	"fonte" text DEFAULT 'PROSEF' NOT NULL,
	"ano" integer,
	"alternativas" jsonb NOT NULL,
	"gabarito" text NOT NULL,
	"explicacao" text,
	"criado_em" timestamp DEFAULT now() NOT NULL
);
