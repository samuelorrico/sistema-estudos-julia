import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function TreinoPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <h1 className="text-3xl font-bold tracking-tight">Treino de questões</h1>
      <p className="max-w-md text-muted-foreground">
        Em breve: filtre questões por matéria, assunto e dificuldade e treine no
        estilo do PROSEF. (Em construção — M1)
      </p>
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        Voltar
      </Link>
    </main>
  );
}
