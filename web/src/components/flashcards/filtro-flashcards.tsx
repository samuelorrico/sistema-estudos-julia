"use client";

import { useRouter } from "next/navigation";

import type { Materia } from "@/lib/materias";

const selectCls =
  "h-9 min-w-44 flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50";

type Props = {
  materias: { materia: Materia; rotulo: string; total: number }[];
  assuntos: { assunto: string; total: number }[];
  valores: { materia?: Materia; assunto?: string };
  total: number;
};

export function FiltroFlashcards({ materias, assuntos, valores, total }: Props) {
  const router = useRouter();

  function navega(next: { materia?: string; assunto?: string }) {
    const params = new URLSearchParams();
    if (next.materia) params.set("materia", next.materia);
    if (next.assunto) params.set("assunto", next.assunto);
    const qs = params.toString();
    router.push(qs ? `/flashcards?${qs}` : "/flashcards");
  }

  const temFiltro = !!(valores.materia || valores.assunto);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <select
          aria-label="Matéria"
          className={selectCls}
          value={valores.materia ?? ""}
          onChange={(e) => navega({ materia: e.target.value || undefined })}
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
            navega({ materia: valores.materia, assunto: e.target.value || undefined })
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
      </div>

      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span>
          {total} {total === 1 ? "flashcard" : "flashcards"}
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
