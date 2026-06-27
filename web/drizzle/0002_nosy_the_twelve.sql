CREATE TABLE "flashcards" (
	"id" serial PRIMARY KEY NOT NULL,
	"frente" text NOT NULL,
	"verso" text NOT NULL,
	"materia" "materia" NOT NULL,
	"assunto" text NOT NULL,
	"fonte" text DEFAULT 'base' NOT NULL,
	"criado_em" timestamp DEFAULT now() NOT NULL
);
