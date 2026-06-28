"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { tentativas, type NovaTentativa } from "@/db/schema";

// Dados mínimos que o cliente envia ao responder uma questão.
export type RegistroTentativa = Pick<
  NovaTentativa,
  | "questaoId"
  | "materia"
  | "assunto"
  | "dificuldade"
  | "fonte"
  | "acertou"
  | "selecionada"
  | "modo"
>;

/** Registra uma resposta (modo Treino — feedback imediato). */
export async function registrarTentativa(t: RegistroTentativa): Promise<void> {
  await db.insert(tentativas).values(t);
  revalidatePath("/desempenho");
}

/** Registra várias respostas de uma vez (modo Simulado — ao finalizar). */
export async function registrarTentativas(
  ts: RegistroTentativa[],
): Promise<void> {
  if (ts.length === 0) return;
  await db.insert(tentativas).values(ts);
  revalidatePath("/desempenho");
}

/** Zera todo o histórico de tentativas (para limpar os testes antes de entregar). */
export async function zerarHistorico(): Promise<void> {
  await db.delete(tentativas);
  revalidatePath("/desempenho");
}
