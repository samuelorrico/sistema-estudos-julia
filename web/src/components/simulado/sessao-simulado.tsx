"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { QuestaoView } from "@/components/questao/questao-view";
import { Button } from "@/components/ui/button";
import { registrarTentativas } from "@/actions/tentativas";
import { cn } from "@/lib/utils";
import type { Questao } from "@/db/schema";

function formatarTempo(seg: number): string {
  const s = Math.max(0, seg);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  const mm = String(m).padStart(2, "0");
  const sss = String(ss).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${sss}` : `${mm}:${sss}`;
}

export function SessaoSimulado({
  questoes,
  // < 6/30 elimina no edital PROSEL 2026.2 (20%); escala para provas de outro tamanho.
  corte = Math.max(1, Math.round(questoes.length / 5)),
  iaDisponivel = false,
  // Tempo total: ~3 min por questão (30 questões → 90 min), no espírito da prova.
  duracaoMin = Math.round(questoes.length * 3),
}: {
  questoes: Questao[];
  corte?: number;
  iaDisponivel?: boolean;
  duracaoMin?: number;
}) {
  const total = questoes.length;
  const CORTE_ELIMINATORIO = corte;
  const [respostas, setRespostas] = useState<Record<number, string>>({});
  const [idx, setIdx] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

  const atual = questoes[idx];
  const respondidas = Object.keys(respostas).length;
  const acertos = questoes.filter((q) => respostas[q.id] === q.gabarito).length;

  function selecionar(id: string) {
    setRespostas((r) => ({ ...r, [atual.id]: id }));
  }

  // Envia a prova (sem confirmação) — usado pelo botão e pelo fim do tempo.
  function enviar() {
    setFinalizado(true);
    window.scrollTo({ top: 0 });
    // Registra todas as questões da prova (em branco conta como erro, como na prova real).
    void registrarTentativas(
      questoes.map((q) => {
        const sel = respostas[q.id] ?? null;
        return {
          questaoId: q.id,
          materia: q.materia,
          assunto: q.assunto,
          dificuldade: q.dificuldade,
          fonte: q.fonte,
          acertou: sel === q.gabarito,
          selecionada: sel,
          modo: "simulado" as const,
        };
      }),
    ).catch(() => {});
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
    enviar();
  }

  // ----- Cronômetro -----
  const [restanteSeg, setRestanteSeg] = useState(duracaoMin * 60);
  const [fimEm] = useState(() => Date.now() + duracaoMin * 60 * 1000);
  // Ref para o `enviar` mais recente (evita closure obsoleta no setInterval).
  const enviarRef = useRef(enviar);
  useEffect(() => {
    enviarRef.current = enviar;
  });

  useEffect(() => {
    if (finalizado) return;
    const t = setInterval(() => {
      const r = Math.round((fimEm - Date.now()) / 1000);
      if (r <= 0) {
        setRestanteSeg(0);
        clearInterval(t);
        enviarRef.current(); // autoenvia ao zerar
      } else {
        setRestanteSeg(r);
      }
    }, 1000);
    return () => clearInterval(t);
  }, [finalizado, fimEm]);

  const tempoAcabando = restanteSeg <= 300; // últimos 5 min

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
              <Icon name="refresh" className="text-[18px]" /> Novo simulado
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
                <QuestaoView
                  questao={q}
                  selecionada={resp}
                  revelado
                  iaDisponivel={iaDisponivel}
                />
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
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="font-medium">
          Questão {idx + 1} de {total}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground">
            {respondidas}/{total} respondidas
          </span>
          <span
            aria-label="Tempo restante"
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold tabular-nums",
              tempoAcabando
                ? "animate-pulse bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-200"
                : "bg-secondary text-secondary-foreground",
            )}
          >
            <Icon name="schedule" className="text-[18px]" />
            {formatarTempo(restanteSeg)}
          </span>
        </div>
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
          <Icon name="chevron_left" /> Anterior
        </Button>

        {idx < total - 1 ? (
          <Button onClick={() => setIdx((i) => Math.min(total - 1, i + 1))}>
            Próxima <Icon name="chevron_right" />
          </Button>
        ) : (
          <Button onClick={finalizar}>
            <Icon name="flag" /> Finalizar prova
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
