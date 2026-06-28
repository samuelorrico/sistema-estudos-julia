import {
  boolean,
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

// Flashcards: conceitos (frente = pergunta/conceito, verso = resposta).
// fonte: "base" (curadoria inicial) ou "IA" (geradas pelo tutor — TUTOR-06).
export const flashcards = pgTable("flashcards", {
  id: serial("id").primaryKey(),
  frente: text("frente").notNull(),
  verso: text("verso").notNull(),
  materia: materiaEnum("materia").notNull(),
  assunto: text("assunto").notNull(),
  fonte: text("fonte").notNull().default("base"),
  criadoEm: timestamp("criado_em").defaultNow().notNull(),
});

export type Flashcard = typeof flashcards.$inferSelect;
export type NovoFlashcard = typeof flashcards.$inferInsert;

// Tentativas: cada resposta dada (Treino/Simulado) — base do painel de desempenho.
// Campos de matéria/assunto/dificuldade/fonte são desnormalizados para que as
// estatísticas sobrevivam a um re-seed (que recria os ids das questões).
export const modoEstudoEnum = pgEnum("modo_estudo", ["treino", "simulado"]);

export const tentativas = pgTable("tentativas", {
  id: serial("id").primaryKey(),
  // Referência frouxa à questão (sem FK: o re-seed recria os ids).
  questaoId: integer("questao_id"),
  materia: materiaEnum("materia").notNull(),
  assunto: text("assunto").notNull(),
  dificuldade: dificuldadeEnum("dificuldade").notNull().default("media"),
  fonte: text("fonte").notNull().default("PROSEF"),
  acertou: boolean("acertou").notNull(),
  // Alternativa marcada (null = deixada em branco, possível no simulado).
  selecionada: text("selecionada"),
  modo: modoEstudoEnum("modo").notNull(),
  criadoEm: timestamp("criado_em").defaultNow().notNull(),
});

export type Tentativa = typeof tentativas.$inferSelect;
export type NovaTentativa = typeof tentativas.$inferInsert;
