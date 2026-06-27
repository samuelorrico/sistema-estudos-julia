import "server-only";
import { and, asc, eq, sql, type SQL } from "drizzle-orm";

import { db } from "./index";
import { flashcards, questoes, type Flashcard, type Questao } from "./schema";
import { rotuloMateria, type Dificuldade, type Materia } from "@/lib/materias";

export { rotuloMateria };
export type { Dificuldade, Materia };

export type FiltroQuestoes = {
  materia?: Materia;
  assunto?: string;
  dificuldade?: Dificuldade;
  fonte?: string;
  limite?: number;
};

// Distribuição oficial da prova objetiva (PROSEL 2026.2): 30 questões.
const COTAS_SIMULADO: Record<Materia, number> = {
  portugues: 8,
  ingles: 4,
  historia: 3,
  geografia: 3,
  matematica: 3,
  biologia: 5,
  fisica: 2,
  quimica: 2,
};

function condicoes(f: FiltroQuestoes): SQL | undefined {
  const conds: SQL[] = [];
  if (f.materia) conds.push(eq(questoes.materia, f.materia));
  if (f.assunto) conds.push(eq(questoes.assunto, f.assunto));
  if (f.dificuldade) conds.push(eq(questoes.dificuldade, f.dificuldade));
  if (f.fonte) conds.push(eq(questoes.fonte, f.fonte));
  return conds.length ? and(...conds) : undefined;
}

/** Questões filtradas (Modo Treino), em ordem aleatória. */
export async function listarQuestoes(f: FiltroQuestoes = {}): Promise<Questao[]> {
  return db
    .select()
    .from(questoes)
    .where(condicoes(f))
    .orderBy(sql`random()`)
    .limit(f.limite ?? 30);
}

/** Total de questões que casam com o filtro (sem trazer as linhas). */
export async function contarQuestoes(f: FiltroQuestoes = {}): Promise<number> {
  const [row] = await db
    .select({ total: sql<number>`count(*)::int` })
    .from(questoes)
    .where(condicoes(f));
  return row?.total ?? 0;
}

/** Matérias disponíveis com a contagem de questões em cada. */
export async function materiasComContagem(): Promise<
  { materia: Materia; rotulo: string; total: number }[]
> {
  const rows = await db
    .select({ materia: questoes.materia, total: sql<number>`count(*)::int` })
    .from(questoes)
    .groupBy(questoes.materia);
  return rows
    .map((r) => ({ materia: r.materia, rotulo: rotuloMateria(r.materia), total: r.total }))
    .sort((a, b) => a.rotulo.localeCompare(b.rotulo, "pt-BR"));
}

/** Assuntos distintos (opcionalmente de uma matéria) com contagem. */
export async function assuntosComContagem(
  materia?: Materia,
): Promise<{ assunto: string; total: number }[]> {
  return db
    .select({ assunto: questoes.assunto, total: sql<number>`count(*)::int` })
    .from(questoes)
    .where(materia ? eq(questoes.materia, materia) : undefined)
    .groupBy(questoes.assunto)
    .orderBy(asc(questoes.assunto));
}

/** Provas/fontes disponíveis com contagem e ano, ordenadas por ano desc. */
export async function fontesComContagem(): Promise<
  { fonte: string; total: number; ano: number | null }[]
> {
  const rows = await db
    .select({
      fonte: questoes.fonte,
      total: sql<number>`count(*)::int`,
      ano: sql<number | null>`max(${questoes.ano})`,
    })
    .from(questoes)
    .groupBy(questoes.fonte);
  return rows.sort(
    (a, b) =>
      (b.ano ?? 0) - (a.ano ?? 0) || a.fonte.localeCompare(b.fonte, "pt-BR"),
  );
}

/** Todas as questões de uma prova, na ordem original (por número). */
export async function questoesPorFonte(fonte: string): Promise<Questao[]> {
  return db
    .select()
    .from(questoes)
    .where(eq(questoes.fonte, fonte))
    .orderBy(asc(questoes.numero), asc(questoes.id));
}

/** Uma questão por id (revisão/feedback). */
export async function questaoPorId(id: number): Promise<Questao | undefined> {
  const [row] = await db.select().from(questoes).where(eq(questoes.id, id)).limit(1);
  return row;
}

/**
 * Monta um simulado de 30 questões na distribuição real da prova
 * (8/4/3/3/3/5/2/2), sorteando dentro de cada matéria. Se faltar questão em
 * alguma matéria, retorna o que houver (o chamador sinaliza o déficit).
 */
export async function montarSimulado(): Promise<Questao[]> {
  const entradas = Object.entries(COTAS_SIMULADO) as [Materia, number][];
  const blocos = await Promise.all(
    entradas.map(([materia, n]) =>
      db
        .select()
        .from(questoes)
        .where(eq(questoes.materia, materia))
        .orderBy(sql`random()`)
        .limit(n),
    ),
  );
  // Embaralha entre matérias para a ordem parecer com a da prova real.
  const todas = blocos.flat();
  for (let i = todas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [todas[i], todas[j]] = [todas[j], todas[i]];
  }
  return todas;
}

export { COTAS_SIMULADO };

// ---------------- Flashcards ----------------

export type FiltroFlashcards = {
  materia?: Materia;
  assunto?: string;
  limite?: number;
};

export async function listarFlashcards(
  f: FiltroFlashcards = {},
): Promise<Flashcard[]> {
  const conds: SQL[] = [];
  if (f.materia) conds.push(eq(flashcards.materia, f.materia));
  if (f.assunto) conds.push(eq(flashcards.assunto, f.assunto));
  return db
    .select()
    .from(flashcards)
    .where(conds.length ? and(...conds) : undefined)
    .orderBy(sql`random()`)
    .limit(f.limite ?? 40);
}

export async function materiasFlashcards(): Promise<
  { materia: Materia; rotulo: string; total: number }[]
> {
  const rows = await db
    .select({ materia: flashcards.materia, total: sql<number>`count(*)::int` })
    .from(flashcards)
    .groupBy(flashcards.materia);
  return rows
    .map((r) => ({ materia: r.materia, rotulo: rotuloMateria(r.materia), total: r.total }))
    .sort((a, b) => a.rotulo.localeCompare(b.rotulo, "pt-BR"));
}

export async function assuntosFlashcards(
  materia?: Materia,
): Promise<{ assunto: string; total: number }[]> {
  return db
    .select({ assunto: flashcards.assunto, total: sql<number>`count(*)::int` })
    .from(flashcards)
    .where(materia ? eq(flashcards.materia, materia) : undefined)
    .groupBy(flashcards.assunto)
    .orderBy(asc(flashcards.assunto));
}
