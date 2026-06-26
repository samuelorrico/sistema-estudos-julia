import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    emoji: "🗂️",
    titulo: "Banco de questões",
    descricao:
      "Treine com questões filtráveis por matéria, assunto e dificuldade — no estilo real do PROSEF.",
  },
  {
    emoji: "📊",
    titulo: "Desempenho",
    descricao:
      "Acompanhe acertos por matéria e assunto para focar nos pontos fracos.",
  },
  {
    emoji: "🤖",
    titulo: "Tutor de IA",
    descricao:
      "Explicação de erros, geração de questões e correção de redação — personalizados.",
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
          Um plano de estudos focado no que a prova realmente cobra: questões no
          estilo da banca, acompanhamento de desempenho e um tutor de IA.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/treino" className={buttonVariants({ size: "lg" })}>
            Começar a estudar
          </Link>
          <Link
            href="/desempenho"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            Ver desempenho
          </Link>
        </div>
      </section>

      <section className="mt-16 grid w-full max-w-4xl gap-6 sm:grid-cols-3">
        {features.map((f) => (
          <Card key={f.titulo}>
            <CardHeader>
              <div className="text-3xl">{f.emoji}</div>
              <CardTitle>{f.titulo}</CardTitle>
              <CardDescription>{f.descricao}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <footer className="mt-16 text-sm text-muted-foreground">
        Em desenvolvimento · M1 — Fundação
      </footer>
    </main>
  );
}
