import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// Matérias da prova objetiva (modelo ENEM / PROSEF)
export const materiaEnum = pgEnum("materia", [
  "portugues",
  "ingles",
  "historia",
  "geografia",
  "matematica",
  "biologia",
  "fisica",
  "quimica",
]);

export const dificuldadeEnum = pgEnum("dificuldade", [
  "facil",
  "media",
  "dificil",
]);

export type Alternativa = { id: string; texto: string };

export const questoes = pgTable("questoes", {
  id: serial("id").primaryKey(),
  enunciado: text("enunciado").notNull(),
  materia: materiaEnum("materia").notNull(),
  assunto: text("assunto").notNull(),
  dificuldade: dificuldadeEnum("dificuldade").notNull().default("media"),
  // Fonte da questão: "PROSEF" (base) ou "ENEM" (complemento) — ver AD-002
  fonte: text("fonte").notNull().default("PROSEF"),
  ano: integer("ano"),
  // [{ id: "A", texto: "..." }, ...]
  alternativas: jsonb("alternativas").$type<Alternativa[]>().notNull(),
  // id da alternativa correta, ex.: "A"
  gabarito: text("gabarito").notNull(),
  explicacao: text("explicacao"),
  criadoEm: timestamp("criado_em").defaultNow().notNull(),
});

export type Questao = typeof questoes.$inferSelect;
export type NovaQuestao = typeof questoes.$inferInsert;
