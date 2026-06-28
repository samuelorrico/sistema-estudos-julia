import Link from "next/link";
import type { Route } from "next";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  contarFlashcards,
  contarQuestoes,
  fontesComContagem,
} from "@/db/queries";

export const dynamic = "force-dynamic";

const modos: {
  href: Route;
  emoji: string;
  titulo: string;
  descricao: string;
}[] = [
  {
    href: "/treino",
    emoji: "🎯",
    titulo: "Treino",
    descricao:
      "Questões filtradas por matéria, assunto e dificuldade — com correção e explicação na hora.",
  },
  {
    href: "/simulado",
    emoji: "📝",
    titulo: "Simulado",
    descricao:
      "Escolha uma prova real inteira (ou sorteada) na distribuição oficial. Gabarito e revisão só no final.",
  },
  {
    href: "/flashcards",
    emoji: "⚡",
    titulo: "Flashcards",
    descricao:
      "Revisão rápida de conceitos: veja a pergunta, vire o card e marque o que já sabe.",
  },
];

export default async function Home() {
  const [totalQuestoes, fontes, totalFlashcards] = await Promise.all([
    contarQuestoes(),
    fontesComContagem(),
    contarFlashcards(),
  ]);
  const totalProvas = fontes.filter((f) => f.fonte !== "IA").length;

  const stats = [
    { valor: totalQuestoes, rotulo: "questões reais" },
    { valor: totalProvas, rotulo: totalProvas === 1 ? "prova" : "provas" },
    { valor: totalFlashcards, rotulo: "flashcards" },
  ];

  return (
    <main className="flex flex-1 flex-col items-center px-6 py-16">
      <section className="flex w-full max-w-3xl flex-col items-center gap-6 text-center">
        <span className="rounded-full border px-3 py-1 text-sm text-muted-foreground">
          Vestibular de Psicologia · EBMSP / PROSEF
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Mapa de Estudos da Juju
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Estudo focado no que a prova cobra: questões reais da banca em três
          modos de treino, no estilo certo.
        </p>
        <Link href="/treino" className={buttonVariants({ size: "lg" })}>
          Começar a estudar
        </Link>

        <dl className="mt-2 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {stats.map((s) => (
            <div key={s.rotulo} className="flex flex-col items-center">
              <dt className="sr-only">{s.rotulo}</dt>
              <dd className="text-2xl font-bold tracking-tight tabular-nums">
                {s.valor}
              </dd>
              <span className="text-xs text-muted-foreground">{s.rotulo}</span>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12 grid w-full max-w-4xl gap-6 sm:grid-cols-3">
        {modos.map((m) => (
          <Link key={m.href} href={m.href} className="group block">
            <Card className="h-full transition-colors group-hover:ring-foreground/25">
              <CardHeader>
                <div className="text-3xl">{m.emoji}</div>
                <CardTitle className="flex items-center gap-1">
                  {m.titulo}
                  <span className="text-muted-foreground transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </CardTitle>
                <CardDescription>{m.descricao}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>

      <section className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/tutor" className={buttonVariants({ variant: "outline" })}>
          🤖 Tutor de IA
        </Link>
        <Link
          href="/desempenho"
          className={buttonVariants({ variant: "outline" })}
        >
          📊 Ver desempenho
        </Link>
      </section>

      <footer className="mt-16 text-sm text-muted-foreground">
        feito por Samuel, com muito amor para a próxima estudante de psicologia
        na Bahiana 💗
      </footer>
    </main>
  );
}
