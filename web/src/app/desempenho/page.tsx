import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function DesempenhoPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <h1 className="text-3xl font-bold tracking-tight">Desempenho</h1>
      <p className="max-w-md text-muted-foreground">
        Em breve: acompanhe seus acertos por matéria e assunto para focar nos
        pontos fracos. (Em construção — M2)
      </p>
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        Voltar
      </Link>
    </main>
  );
}
