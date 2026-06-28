"use client";

import { useState, useTransition } from "react";

import { Icon } from "@/components/ui/icon";
import { GeminiLogo } from "@/components/ui/gemini-logo";
import { explicarAction } from "@/actions/explicacao";
import { cn } from "@/lib/utils";
import {
  DIFICULDADE_LABEL,
  rotuloMateria,
  type Dificuldade,
} from "@/lib/materias";
import type { Questao } from "@/db/schema";

// Em produção, as figuras são servidas pelo Vercel Blob (NEXT_PUBLIC_BLOB_BASE);
// em dev, ficam locais em /public/questoes.
const BLOB_BASE = process.env.NEXT_PUBLIC_BLOB_BASE ?? "";
function srcFigura(src: string): string {
  return BLOB_BASE && src.startsWith("/questoes/") ? `${BLOB_BASE}${src}` : src;
}

type Props = {
  questao: Questao;
  /** id da alternativa marcada (ex.: "A") ou null */
  selecionada: string | null;
  /** quando true, mostra cores/gabarito (verde na correta, vermelho na errada marcada) */
  revelado: boolean;
  /** ao marcar uma alternativa (omitido = somente leitura/revisão) */
  onSelecionar?: (id: string) => void;
  /** permite gerar explicação por IA ao errar (precisa de chave configurada) */
  iaDisponivel?: boolean;
  indice?: number;
  total?: number;
};

function Badge({
  children,
  tom = "neutro",
}: {
  children: React.ReactNode;
  tom?: "neutro" | "muted";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        tom === "muted"
          ? "bg-muted text-muted-foreground"
          : "bg-secondary text-secondary-foreground",
      )}
    >
      {children}
    </span>
  );
}

export function QuestaoView({
  questao,
  selecionada,
  revelado,
  onSelecionar,
  iaDisponivel = false,
  indice,
  total,
}: Props) {
  const acertou = revelado && selecionada === questao.gabarito;
  const selecionavel = !!onSelecionar && !revelado;

  const [explicacaoIA, setExplicacaoIA] = useState<string | null>(null);
  const [erroIA, setErroIA] = useState<string | null>(null);
  const [gerando, startGerar] = useTransition();

  function gerarExplicacao() {
    setErroIA(null);
    startGerar(async () => {
      const r = await explicarAction(questao.id);
      if (r.ok) setExplicacaoIA(r.explicacao);
      else setErroIA(r.erro);
    });
  }

  // Mostra o botão de IA só ao errar uma questão real (id do banco) sem explicação salva.
  const podeExplicarIA =
    revelado &&
    !acertou &&
    iaDisponivel &&
    questao.id > 0 &&
    !questao.explicacao &&
    !explicacaoIA;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {indice != null && total != null && (
          <span className="font-medium text-muted-foreground">
            Questão {indice} de {total}
          </span>
        )}
        <Badge>{rotuloMateria(questao.materia)}</Badge>
        <Badge tom="muted">{questao.assunto}</Badge>
        <Badge tom="muted">
          {DIFICULDADE_LABEL[questao.dificuldade as Dificuldade] ??
            questao.dificuldade}
        </Badge>
        <span className="ml-auto text-muted-foreground">
          {questao.fonte}
          {questao.numero ? ` · nº ${questao.numero}` : ""}
        </span>
      </div>

      {questao.textoApoio && (
        <blockquote className="border-l-2 border-border bg-muted/40 px-4 py-3 text-sm whitespace-pre-line text-muted-foreground italic">
          {questao.textoApoio}
        </blockquote>
      )}

      {questao.imagens?.length > 0 && (
        <div className="flex flex-col gap-3">
          {questao.imagens.map((img) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={img.src}
              src={srcFigura(img.src)}
              alt={img.alt}
              className="max-h-[420px] w-auto max-w-full self-center rounded-lg border bg-white object-contain"
            />
          ))}
        </div>
      )}

      <p className="text-base leading-relaxed font-medium whitespace-pre-line">
        {questao.enunciado}
      </p>

      <ul className="grid gap-2">
        {questao.alternativas.map((alt) => {
          const correta = alt.id === questao.gabarito;
          const marcadaErrada =
            revelado && selecionada === alt.id && !correta;
          const marcadaPreReveal = !revelado && selecionada === alt.id;

          return (
            <li key={alt.id}>
              <button
                type="button"
                disabled={!selecionavel}
                onClick={() => onSelecionar?.(alt.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
                  selecionavel &&
                    "cursor-pointer hover:border-foreground/30 hover:bg-muted",
                  !revelado &&
                    !marcadaPreReveal &&
                    "border-border bg-card",
                  marcadaPreReveal &&
                    "border-primary bg-primary/5 ring-1 ring-primary",
                  revelado &&
                    correta &&
                    "border-green-600 bg-green-50 text-green-900 dark:border-green-500 dark:bg-green-950/40 dark:text-green-100",
                  marcadaErrada &&
                    "border-red-600 bg-red-50 text-red-900 dark:border-red-500 dark:bg-red-950/40 dark:text-red-100",
                  revelado && !correta && !marcadaErrada && "opacity-55",
                  revelado && correta && acertou && "animate-acerto",
                  marcadaErrada && "animate-erro",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                    !revelado && "border-border",
                    revelado && correta && "border-green-600 bg-green-600 text-white",
                    marcadaErrada && "border-red-600 bg-red-600 text-white",
                    revelado && !correta && !marcadaErrada && "border-border",
                  )}
                >
                  {revelado && correta ? (
                    <Icon name="check" className="text-[18px]" />
                  ) : marcadaErrada ? (
                    <Icon name="close" className="text-[18px]" />
                  ) : (
                    alt.id
                  )}
                </span>
                <span className="flex-1 whitespace-pre-line">{alt.texto}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {revelado && (
        <div
          className={cn(
            "rounded-lg border px-4 py-3 text-sm",
            acertou
              ? "border-green-600/40 bg-green-50 text-green-900 dark:bg-green-950/30 dark:text-green-100"
              : "border-red-600/40 bg-red-50 text-red-900 dark:bg-red-950/30 dark:text-red-100",
          )}
        >
          <p className="font-semibold">
            {acertou
              ? "✓ Você acertou!"
              : `✗ Resposta correta: ${questao.gabarito}`}
          </p>
          {questao.explicacao && (
            <p className="mt-1 whitespace-pre-line text-foreground/80">
              {questao.explicacao}
            </p>
          )}

          {/* Explicação por IA, sob demanda, ao errar */}
          {explicacaoIA && (
            <div className="mt-2 flex flex-col gap-1 rounded-lg border border-border bg-background/60 px-3 py-2 text-foreground/90">
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <GeminiLogo /> Explicação do assistente
              </span>
              <p className="whitespace-pre-line">{explicacaoIA}</p>
            </div>
          )}

          {podeExplicarIA && (
            <button
              type="button"
              onClick={gerarExplicacao}
              disabled={gerando}
              className="mt-2 inline-flex items-center gap-1.5 self-start rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-60"
            >
              {gerando ? (
                <>
                  <Icon name="progress_activity" className="animate-spin text-[18px]" />
                  Gerando explicação...
                </>
              ) : (
                <>
                  Dúvidas? Gerar explicação <GeminiLogo />
                </>
              )}
            </button>
          )}

          {erroIA && (
            <p className="mt-2 text-xs text-muted-foreground">{erroIA}</p>
          )}
        </div>
      )}
    </div>
  );
}
