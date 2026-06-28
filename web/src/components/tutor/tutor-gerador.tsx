"use client";

import { useMemo, useState, useTransition } from "react";
import { Icon } from "@/components/ui/icon";
import {
  gerarAction,
  gerarBaseadaAction,
  salvarAction,
} from "@/app/tutor/actions";
import { QuestaoView } from "@/components/questao/questao-view";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DIFICULDADES,
  DIFICULDADE_LABEL,
  MATERIAS,
  rotuloFonte,
  rotuloMateria,
} from "@/lib/materias";
import type { QuestaoGerada } from "@/lib/agente";
import type { Questao } from "@/db/schema";

const selectCls =
  "h-9 min-w-40 flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50";

export type ItemPicker = {
  id: number;
  fonte: string;
  numero: number | null;
  materia: string;
  assunto: string;
  resumo: string;
};

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

// Cada questão gerada é RESPONDÍVEL: a aluna marca e só então vê o gabarito.
function PreviaInterativa({ g, indice }: { g: QuestaoGerada; indice: number }) {
  const [selecionada, setSelecionada] = useState<string | null>(null);
  const [revelado, setRevelado] = useState(false);
  return (
    <QuestaoView
      questao={comoQuestao(g, indice)}
      selecionada={selecionada}
      revelado={revelado}
      onSelecionar={(id) => {
        setSelecionada(id);
        setRevelado(true);
      }}
    />
  );
}

type Modo = "assunto" | "questao";

export function TutorGerador({ questoes }: { questoes: ItemPicker[] }) {
  const [modo, setModo] = useState<Modo>("assunto");

  // modo "assunto"
  const [materia, setMateria] = useState("");
  const [assunto, setAssunto] = useState("");
  const [dificuldade, setDificuldade] = useState("");
  const [quantidade, setQuantidade] = useState(3);

  // modo "questao"
  const fontes = useMemo(
    () => [...new Set(questoes.map((q) => q.fonte))],
    [questoes],
  );
  const [fonte, setFonte] = useState(fontes[0] ?? "");
  const daFonte = useMemo(
    () => questoes.filter((q) => q.fonte === fonte),
    [questoes, fonte],
  );
  const [questaoBaseId, setQuestaoBaseId] = useState<number | null>(null);

  const [geradas, setGeradas] = useState<QuestaoGerada[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [salvas, setSalvas] = useState<number | null>(null);
  const [pendente, startTransition] = useTransition();
  const [salvando, startSalvar] = useTransition();

  const idBase = questaoBaseId ?? daFonte[0]?.id ?? null;

  function gerar() {
    setErro(null);
    setSalvas(null);
    startTransition(async () => {
      const r =
        modo === "assunto"
          ? await gerarAction({
              materia: materia || undefined,
              assunto: assunto || undefined,
              dificuldade: dificuldade || undefined,
              quantidade,
            })
          : idBase != null
            ? await gerarBaseadaAction({
                questaoBaseId: idBase,
                dificuldade: dificuldade || undefined,
                quantidade,
              })
            : { ok: false as const, erro: "Escolha uma questão modelo." };
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
        {/* Alternância de modo */}
        <div className="flex w-full overflow-hidden rounded-lg border border-border text-sm">
          {(
            [
              ["assunto", "Por assunto"],
              ["questao", "A partir de uma questão"],
            ] as [Modo, string][]
          ).map(([m, label]) => (
            <button
              key={m}
              type="button"
              onClick={() => setModo(m)}
              className={cn(
                "flex-1 px-3 py-1.5 font-medium transition-colors",
                modo === m
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:bg-muted",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {modo === "assunto" ? (
          <>
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
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <select
                aria-label="Prova"
                className={selectCls}
                value={fonte}
                onChange={(e) => {
                  setFonte(e.target.value);
                  setQuestaoBaseId(null);
                }}
              >
                {fontes.map((f) => (
                  <option key={f} value={f}>
                    {rotuloFonte(f)}
                  </option>
                ))}
              </select>

              <select
                aria-label="Dificuldade"
                className={selectCls}
                value={dificuldade}
                onChange={(e) => setDificuldade(e.target.value)}
              >
                <option value="">Mesma dificuldade da modelo</option>
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

            <select
              aria-label="Questão modelo"
              className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              value={idBase ?? ""}
              onChange={(e) => setQuestaoBaseId(Number(e.target.value))}
            >
              {daFonte.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.numero ? `nº ${q.numero}` : `#${q.id}`} ·{" "}
                  {rotuloMateria(q.materia)} · {q.resumo}…
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground">
              A IA cria questões inéditas no mesmo assunto e estilo da questão
              escolhida (não copia a original).
            </p>
          </>
        )}

        <Button
          onClick={gerar}
          disabled={pendente || (modo === "questao" && idBase == null)}
          size="lg"
          className="self-start"
        >
          {pendente ? (
            <Icon name="progress_activity" className="animate-spin" />
          ) : (
            <Icon name="auto_awesome" />
          )}
          {pendente ? "Gerando..." : "Gerar questões"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Responda para conferir o gabarito. Use “Salvar no banco” se quiser que
          a questão passe a aparecer no Treino e no Simulado (fonte: IA).
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
            <h2 className="text-lg font-semibold">Geradas ({geradas.length})</h2>
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
                <PreviaInterativa g={g} indice={i} />
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
