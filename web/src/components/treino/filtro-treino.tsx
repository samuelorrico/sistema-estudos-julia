"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  DIFICULDADES,
  DIFICULDADE_LABEL,
  rotuloFonte,
  type Dificuldade,
  type Materia,
} from "@/lib/materias";

type Props = {
  materias: { materia: Materia; rotulo: string; total: number }[];
  assuntos: { assunto: string; total: number }[];
  fontes: { fonte: string; total: number; ano: number | null }[];
  valores: {
    materia?: Materia;
    assunto?: string;
    dificuldade?: Dificuldade;
    fonte?: string;
  };
  total: number;
};

const selectCls =
  "h-9 min-w-44 flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50";

export function FiltroTreino({
  materias,
  assuntos,
  fontes,
  valores,
  total,
}: Props) {
  const router = useRouter();

  function navega(next: {
    materia?: string;
    assunto?: string;
    dificuldade?: string;
    fonte?: string;
  }) {
    const params = new URLSearchParams();
    if (next.materia) params.set("materia", next.materia);
    if (next.assunto) params.set("assunto", next.assunto);
    if (next.dificuldade) params.set("dificuldade", next.dificuldade);
    if (next.fonte) params.set("fonte", next.fonte);
    const qs = params.toString();
    router.push(qs ? `/treino?${qs}` : "/treino");
  }

  const temFiltro = !!(
    valores.materia ||
    valores.assunto ||
    valores.dificuldade ||
    valores.fonte
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <select
          aria-label="Matéria"
          className={selectCls}
          value={valores.materia ?? ""}
          onChange={(e) =>
            navega({
              materia: e.target.value || undefined,
              dificuldade: valores.dificuldade,
              fonte: valores.fonte,
            })
          }
        >
          <option value="">Todas as matérias</option>
          {materias.map((m) => (
            <option key={m.materia} value={m.materia}>
              {m.rotulo} ({m.total})
            </option>
          ))}
        </select>

        <select
          aria-label="Assunto"
          className={selectCls}
          value={valores.assunto ?? ""}
          disabled={!valores.materia}
          onChange={(e) =>
            navega({
              materia: valores.materia,
              assunto: e.target.value || undefined,
              dificuldade: valores.dificuldade,
              fonte: valores.fonte,
            })
          }
        >
          <option value="">
            {valores.materia ? "Todos os assuntos" : "Escolha a matéria primeiro"}
          </option>
          {assuntos.map((a) => (
            <option key={a.assunto} value={a.assunto}>
              {a.assunto} ({a.total})
            </option>
          ))}
        </select>

        <select
          aria-label="Dificuldade"
          className={cn(selectCls, "min-w-40")}
          value={valores.dificuldade ?? ""}
          onChange={(e) =>
            navega({
              materia: valores.materia,
              assunto: valores.assunto,
              dificuldade: e.target.value || undefined,
              fonte: valores.fonte,
            })
          }
        >
          <option value="">Qualquer dificuldade</option>
          {DIFICULDADES.map((d) => (
            <option key={d} value={d}>
              {DIFICULDADE_LABEL[d]}
            </option>
          ))}
        </select>

        <select
          aria-label="Prova"
          className={selectCls}
          value={valores.fonte ?? ""}
          onChange={(e) =>
            navega({
              materia: valores.materia,
              assunto: valores.assunto,
              dificuldade: valores.dificuldade,
              fonte: e.target.value || undefined,
            })
          }
        >
          <option value="">Todas as provas</option>
          {fontes.map((f) => (
            <option key={f.fonte} value={f.fonte}>
              {rotuloFonte(f.fonte)} ({f.total})
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span>
          {total} {total === 1 ? "questão encontrada" : "questões encontradas"}
        </span>
        {temFiltro && (
          <button
            type="button"
            className="text-foreground underline-offset-4 hover:underline"
            onClick={() => navega({})}
          >
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  );
}
