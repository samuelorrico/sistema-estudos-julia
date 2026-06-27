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
// Figura hospedada no site (src relativo a /public), com texto alternativo.
export type Imagem = { src: string; alt: string };

export const questoes = pgTable("questoes", {
  id: serial("id").primaryKey(),
  // Comando/pergunta da questão (o que ela tem que responder).
  enunciado: text("enunciado").notNull(),
  // Estímulo/base (texto de apoio, citação, tabela) — separado do comando. Ver AD-006.
  textoApoio: text("texto_apoio"),
  materia: materiaEnum("materia").notNull(),
  assunto: text("assunto").notNull(),
  dificuldade: dificuldadeEnum("dificuldade").notNull().default("media"),
  // Fonte/prova de origem, ex.: "BAHIANA_MED_2025.1" (base) ou "IA" (gerada) — ver AD-002/AD-006
  fonte: text("fonte").notNull().default("PROSEF"),
  ano: integer("ano"),
  // Número original da questão na prova de origem (1..N), quando aplicável.
  numero: integer("numero"),
  // Figuras da questão hospedadas no site: [{ src: "/questoes/...", alt: "..." }]
  imagens: jsonb("imagens").$type<Imagem[]>().notNull().default([]),
  // [{ id: "A", texto: "..." }, ...]
  alternativas: jsonb("alternativas").$type<Alternativa[]>().notNull(),
  // id da alternativa correta, ex.: "A"
  gabarito: text("gabarito").notNull(),
  explicacao: text("explicacao"),
  criadoEm: timestamp("criado_em").defaultNow().notNull(),
});

export type Questao = typeof questoes.$inferSelect;
export type NovaQuestao = typeof questoes.$inferInsert;
