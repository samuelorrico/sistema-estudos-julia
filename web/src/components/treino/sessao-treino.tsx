"use client";

import { useState } from "react";
import { ChevronRight, RotateCcw } from "lucide-react";

import { QuestaoView } from "@/components/questao/questao-view";
import { Button } from "@/components/ui/button";
import type { Questao } from "@/db/schema";

export function SessaoTreino({ questoes }: { questoes: Questao[] }) {
  const total = questoes.length;
  const [idx, setIdx] = useState(0);
  const [selecionada, setSelecionada] = useState<string | null>(null);
  const [revelado, setRevelado] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

  const atual = questoes[idx];

  function responder(id: string) {
    if (revelado) return;
    setSelecionada(id);
    setRevelado(true);
    if (id === atual.gabarito) setAcertos((a) => a + 1);
  }

  function avancar() {
    if (idx < total - 1) {
      setIdx((i) => i + 1);
      setSelecionada(null);
      setRevelado(false);
    } else {
      setFinalizado(true);
    }
  }

  function refazer() {
    setIdx(0);
    setSelecionada(null);
    setRevelado(false);
    setAcertos(0);
    setFinalizado(false);
  }

  if (finalizado) {
    const pct = total ? Math.round((acertos / total) * 100) : 0;
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border bg-card p-8 text-center ring-1 ring-foreground/10">
        <div className="text-5xl font-bold tracking-tight">
          {acertos}
          <span className="text-2xl text-muted-foreground">/{total}</span>
        </div>
        <p className="text-muted-foreground">
          Você acertou {pct}% das questões deste treino.
        </p>
        <Button onClick={refazer} variant="outline">
          <RotateCcw /> Refazer treino
        </Button>
      </div>
    );
  }

  const progresso = total ? Math.round(((idx + (revelado ? 1 : 0)) / total) * 100) : 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">
          Questão {idx + 1} de {total}
        </span>
        <span className="text-muted-foreground">
          {acertos} {acertos === 1 ? "acerto" : "acertos"}
        </span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${progresso}%` }}
        />
      </div>

      <div className="rounded-xl border bg-card p-5 ring-1 ring-foreground/10">
        <QuestaoView
          questao={atual}
          selecionada={selecionada}
          revelado={revelado}
          onSelecionar={responder}
        />
      </div>

      {revelado && (
        <div className="flex justify-end">
          <Button onClick={avancar} size="lg">
            {idx < total - 1 ? "Próxima questão" : "Ver resultado"}
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}
