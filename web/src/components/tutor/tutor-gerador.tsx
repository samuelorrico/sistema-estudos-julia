"use client";

import { useState, useTransition } from "react";
import { Icon } from "@/components/ui/icon";
import { gerarAction, salvarAction } from "@/app/tutor/actions";
import { QuestaoView } from "@/components/questao/questao-view";
import { Button } from "@/components/ui/button";
import {
  DIFICULDADES,
  DIFICULDADE_LABEL,
  MATERIAS,
  rotuloMateria,
} from "@/lib/materias";
import type { QuestaoGerada } from "@/lib/agente";
import type { Questao } from "@/db/schema";

const selectCls =
  "h-9 min-w-40 flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50";

function comoQuestao(g: QuestaoGerada, i: number): Questao {
  return {
    ...g,
    id: -(i + 1),
    fonte: "IA (prévia)",
    numero: null,
    ano: null,
    imagens: [],
    criadoEm: new Date(),
  } as Questao;
}

export function TutorGerador() {
  const [materia, setMateria] = useState("");
  const [assunto, setAssunto] = useState("");
  const [dificuldade, setDificuldade] = useState("");
  const [quantidade, setQuantidade] = useState(3);

  const [geradas, setGeradas] = useState<QuestaoGerada[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [salvas, setSalvas] = useState<number | null>(null);
  const [pendente, startTransition] = useTransition();
  const [salvando, startSalvar] = useTransition();

  function gerar() {
    setErro(null);
    setSalvas(null);
    startTransition(async () => {
      const r = await gerarAction({
        materia: materia || undefined,
        assunto: assunto || undefined,
        dificuldade: dificuldade || undefined,
        quantidade,
      });
      if (r.ok) setGeradas(r.questoes);
      else {
        setErro(r.erro);
        setGeradas(null);
      }
    });
  }

  function salvar() {
    if (!geradas) return;
    startSalvar(async () => {
      const r = await salvarAction(geradas);
      if (r.ok) {
        setSalvas(r.salvas);
        setGeradas(null);
      } else {
        setErro(r.erro ?? "Falha ao salvar.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-5 ring-1 ring-foreground/10">
        <div className="flex flex-wrap items-center gap-2">
          <select
            aria-label="Matéria"
            className={selectCls}
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
          >
            <option value="">Geral (proporção da prova)</option>
            {MATERIAS.map((m) => (
              <option key={m} value={m}>
                {rotuloMateria(m)}
              </option>
            ))}
          </select>

          <select
            aria-label="Dificuldade"
            className={selectCls}
            value={dificuldade}
            onChange={(e) => setDificuldade(e.target.value)}
          >
            <option value="">Dificuldade variada</option>
            {DIFICULDADES.map((d) => (
              <option key={d} value={d}>
                {DIFICULDADE_LABEL[d]}
              </option>
            ))}
          </select>

          <select
            aria-label="Quantidade"
            className={selectCls}
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "questão" : "questões"}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder={
            materia
              ? "Assunto específico (opcional) — ex.: genética, equilíbrio químico"
              : "Escolha uma matéria para focar um assunto"
          }
          className="h-9 rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
          value={assunto}
          disabled={!materia}
          onChange={(e) => setAssunto(e.target.value)}
        />

        <Button onClick={gerar} disabled={pendente} size="lg" className="self-start">
          {pendente ? (
            <Icon name="progress_activity" className="animate-spin" />
          ) : (
            <Icon name="auto_awesome" />
          )}
          {pendente ? "Gerando..." : "Gerar questões"}
        </Button>
        <p className="text-xs text-muted-foreground">
          As questões são geradas no padrão da banca e revisadas por você antes
          de entrarem no banco (fonte: IA).
        </p>
      </div>

      {erro && (
        <div className="rounded-lg border border-red-600/40 bg-red-50 px-4 py-3 text-sm text-red-800 dark:bg-red-950/30 dark:text-red-200">
          {erro}
        </div>
      )}

      {salvas != null && (
        <div className="flex items-center gap-2 rounded-lg border border-green-600/40 bg-green-50 px-4 py-3 text-sm text-green-800 dark:bg-green-950/30 dark:text-green-200">
          <Icon name="check" className="text-[18px]" /> {salvas}{" "}
          {salvas === 1 ? "questão salva" : "questões salvas"} no banco — já
          aparecem no Treino e no Simulado.
        </div>
      )}

      {geradas && geradas.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Prévia ({geradas.length})
            </h2>
            <Button onClick={salvar} disabled={salvando}>
              {salvando ? (
                <Icon name="progress_activity" className="animate-spin" />
              ) : (
                <Icon name="save" />
              )}
              Salvar no banco
            </Button>
          </div>
          <ol className="flex flex-col gap-4">
            {geradas.map((g, i) => (
              <li
                key={i}
                className="rounded-xl border bg-card p-5 ring-1 ring-foreground/10"
              >
                <QuestaoView
                  questao={comoQuestao(g, i)}
                  selecionada={g.gabarito}
                  revelado
                />
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
