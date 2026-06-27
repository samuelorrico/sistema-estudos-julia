"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Flag, RotateCcw } from "lucide-react";

import { QuestaoView } from "@/components/questao/questao-view";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Questao } from "@/db/schema";

const CORTE_ELIMINATORIO = 6; // < 6/30 elimina (edital PROSEL 2026.2)

export function SessaoSimulado({ questoes }: { questoes: Questao[] }) {
  const total = questoes.length;
  const [respostas, setRespostas] = useState<Record<number, string>>({});
  const [idx, setIdx] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

  const atual = questoes[idx];
  const respondidas = Object.keys(respostas).length;
  const acertos = questoes.filter((q) => respostas[q.id] === q.gabarito).length;

  function selecionar(id: string) {
    setRespostas((r) => ({ ...r, [atual.id]: id }));
  }

  function finalizar() {
    const brancos = total - respondidas;
    if (
      brancos > 0 &&
      !window.confirm(
        `Você deixou ${brancos} ${brancos === 1 ? "questão em branco" : "questões em branco"}. Finalizar mesmo assim?`,
      )
    ) {
      return;
    }
    setFinalizado(true);
    window.scrollTo({ top: 0 });
  }

  // ----- Revisão final -----
  if (finalizado) {
    const pct = total ? Math.round((acertos / total) * 100) : 0;
    const eliminado = acertos < CORTE_ELIMINATORIO;
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 rounded-xl border bg-card p-8 text-center ring-1 ring-foreground/10">
          <div className="text-5xl font-bold tracking-tight">
            {acertos}
            <span className="text-2xl text-muted-foreground">/{total}</span>
          </div>
          <p className="text-muted-foreground">{pct}% de acertos</p>
          <p
            className={cn(
              "mt-1 rounded-full px-3 py-1 text-xs font-medium",
              eliminado
                ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-200"
                : "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-200",
            )}
          >
            {eliminado
              ? `Abaixo do corte eliminatório (mín. ${CORTE_ELIMINATORIO}/${total})`
              : `Acima do corte eliminatório (mín. ${CORTE_ELIMINATORIO}/${total})`}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <a
              href="/simulado"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/80"
            >
              <RotateCcw className="size-4" /> Novo simulado
            </a>
            <Link
              href="/"
              className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-sm font-medium hover:bg-muted"
            >
              Início
            </Link>
          </div>
        </div>

        <h2 className="text-lg font-semibold">Revisão questão por questão</h2>
        <ol className="flex flex-col gap-4">
          {questoes.map((q, i) => {
            const resp = respostas[q.id] ?? null;
            const status =
              resp == null ? "branco" : resp === q.gabarito ? "acerto" : "erro";
            return (
              <li
                key={q.id}
                className="rounded-xl border bg-card p-5 ring-1 ring-foreground/10"
              >
                <div className="mb-3 flex items-center gap-2 text-xs font-medium">
                  <span className="text-muted-foreground">#{i + 1}</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5",
                      status === "acerto" &&
                        "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-200",
                      status === "erro" &&
                        "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-200",
                      status === "branco" && "bg-muted text-muted-foreground",
                    )}
                  >
                    {status === "acerto"
                      ? "Acertou"
                      : status === "erro"
                        ? "Errou"
                        : "Em branco"}
                  </span>
                </div>
                <QuestaoView questao={q} selecionada={resp} revelado />
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  // ----- Durante o simulado -----
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">
          Questão {idx + 1} de {total}
        </span>
        <span className="text-muted-foreground">
          {respondidas}/{total} respondidas
        </span>
      </div>

      {/* Navegador de questões */}
      <div className="flex flex-wrap gap-1.5">
        {questoes.map((q, i) => {
          const respondida = respostas[q.id] !== undefined;
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Ir para a questão ${i + 1}`}
              className={cn(
                "size-7 rounded-md border text-xs font-medium transition-colors",
                i === idx
                  ? "border-primary bg-primary text-primary-foreground"
                  : respondida
                    ? "border-primary/40 bg-primary/10 text-foreground"
                    : "border-border bg-card text-muted-foreground hover:bg-muted",
              )}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border bg-card p-5 ring-1 ring-foreground/10">
        <QuestaoView
          questao={atual}
          selecionada={respostas[atual.id] ?? null}
          revelado={false}
          onSelecionar={selecionar}
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <Button
          variant="outline"
          disabled={idx === 0}
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
        >
          <ChevronLeft /> Anterior
        </Button>

        {idx < total - 1 ? (
          <Button onClick={() => setIdx((i) => Math.min(total - 1, i + 1))}>
            Próxima <ChevronRight />
          </Button>
        ) : (
          <Button onClick={finalizar}>
            <Flag /> Finalizar prova
          </Button>
        )}
      </div>

      <button
        type="button"
        onClick={finalizar}
        className="self-center text-sm text-muted-foreground underline-offset-4 hover:underline"
      >
        Finalizar e ver o resultado
      </button>
    </div>
  );
}
