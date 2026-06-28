"use server";

import { explicarQuestao } from "@/lib/agente";
import { questaoPorId } from "@/db/queries";

export type ResultadoExplicacao =
  | { ok: true; explicacao: string }
  | { ok: false; erro: string };

/** Gera (sob demanda) uma explicação para a questão errada. Não grava no banco. */
export async function explicarAction(
  questaoId: number,
): Promise<ResultadoExplicacao> {
  try {
    const q = await questaoPorId(questaoId);
    if (!q) return { ok: false, erro: "Questão não encontrada." };
    // Explicação já existente no banco? Usa-a (evita custo de IA).
    if (q.explicacao && q.explicacao.trim().length > 0) {
      return { ok: true, explicacao: q.explicacao };
    }
    const explicacao = await explicarQuestao({
      materia: q.materia,
      assunto: q.assunto,
      dificuldade: q.dificuldade,
      textoApoio: q.textoApoio,
      enunciado: q.enunciado,
      alternativas: q.alternativas,
      gabarito: q.gabarito,
    });
    return { ok: true, explicacao };
  } catch (e) {
    return {
      ok: false,
      erro: e instanceof Error ? e.message : "Falha ao gerar a explicação.",
    };
  }
}
