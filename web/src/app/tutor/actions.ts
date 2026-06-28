"use server";

import { db } from "@/db";
import { questoes } from "@/db/schema";
import {
  gerarQuestoes,
  gerarQuestoesBaseadas,
  questaoGeradaSchema,
  type QuestaoGerada,
} from "@/lib/agente";
import { questaoPorId } from "@/db/queries";
import { ehDificuldade, ehMateria } from "@/lib/materias";

export type ResultadoGeracao =
  | { ok: true; questoes: QuestaoGerada[] }
  | { ok: false; erro: string };

export async function gerarAction(input: {
  materia?: string;
  assunto?: string;
  dificuldade?: string;
  quantidade: number;
}): Promise<ResultadoGeracao> {
  try {
    const materia = ehMateria(input.materia) ? input.materia : undefined;
    const dificuldade = ehDificuldade(input.dificuldade)
      ? input.dificuldade
      : undefined;
    const assunto = input.assunto?.trim() || undefined;
    const quantidade = Math.min(
      Math.max(Math.trunc(input.quantidade) || 3, 1),
      6,
    );

    const geradas = await gerarQuestoes({
      materia,
      assunto,
      dificuldade,
      quantidade,
    });
    return { ok: true, questoes: geradas };
  } catch (e) {
    return {
      ok: false,
      erro: e instanceof Error ? e.message : "Falha ao gerar questões.",
    };
  }
}

export async function gerarBaseadaAction(input: {
  questaoBaseId: number;
  dificuldade?: string;
  quantidade: number;
}): Promise<ResultadoGeracao> {
  try {
    const base = await questaoPorId(input.questaoBaseId);
    if (!base) return { ok: false, erro: "Questão modelo não encontrada." };
    const dificuldade = ehDificuldade(input.dificuldade)
      ? input.dificuldade
      : undefined;
    const quantidade = Math.min(
      Math.max(Math.trunc(input.quantidade) || 3, 1),
      6,
    );
    const geradas = await gerarQuestoesBaseadas(
      {
        materia: base.materia,
        assunto: base.assunto,
        dificuldade: base.dificuldade,
        textoApoio: base.textoApoio,
        enunciado: base.enunciado,
        alternativas: base.alternativas,
        gabarito: base.gabarito,
      },
      { quantidade, dificuldade },
    );
    return { ok: true, questoes: geradas };
  } catch (e) {
    return {
      ok: false,
      erro: e instanceof Error ? e.message : "Falha ao gerar questões.",
    };
  }
}

export async function salvarAction(
  geradas: QuestaoGerada[],
): Promise<{ ok: boolean; salvas: number; erro?: string }> {
  try {
    // Revalida no servidor antes de inserir (não confia no cliente).
    const validas = geradas.map((q) => questaoGeradaSchema.parse(q));
    if (validas.length === 0) {
      return { ok: false, salvas: 0, erro: "Nada para salvar." };
    }
    await db.insert(questoes).values(
      validas.map((q) => ({
        enunciado: q.enunciado,
        textoApoio: q.textoApoio ?? null,
        materia: q.materia,
        assunto: q.assunto,
        dificuldade: q.dificuldade,
        fonte: "IA",
        ano: null,
        numero: null,
        imagens: [],
        alternativas: q.alternativas,
        gabarito: q.gabarito,
        explicacao: q.explicacao,
      })),
    );
    return { ok: true, salvas: validas.length };
  } catch (e) {
    return {
      ok: false,
      salvas: 0,
      erro: e instanceof Error ? e.message : "Falha ao salvar.",
    };
  }
}
