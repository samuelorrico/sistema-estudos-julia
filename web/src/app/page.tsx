import Link from "next/link";
import type { Route } from "next";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
      "A prova inteira: 30 questões na distribuição oficial. Gabarito e revisão só no final.",
  },
  {
    href: "/flashcards",
    emoji: "⚡",
    titulo: "Flashcards",
    descricao:
      "Revisão rápida de conceitos: veja a pergunta, vire o card e marque o que já sabe.",
  },
];

export default function Home() {
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
      </section>

      <section className="mt-14 grid w-full max-w-4xl gap-6 sm:grid-cols-3">
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
        <Link
          href="/tutor"
          className={buttonVariants({ variant: "outline" })}
        >
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
        Em desenvolvimento · banco com questões reais do PROSEF
      </footer>
    </main>
  );
}
