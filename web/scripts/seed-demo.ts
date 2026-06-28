/**
 * Seed de DEMONSTRAÇÃO — popula o banco com questões de exemplo (originais,
 * fonte "DEMO") + os flashcards de curadoria. Serve para rodar o app a partir
 * de um clone limpo, SEM as provas reais (que ficam fora do versionamento).
 *
 * Idempotente: apaga só as questões fonte="DEMO" e reinsere. NÃO toca nas
 * provas reais nem nas tentativas/estatísticas.
 *
 * Uso: npm run db:seed:demo
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { flashcards, questoes } from "../src/db/schema";
import { demoQuestoes } from "../src/data/demo-questoes";
import { flashcardsBase } from "../src/data/flashcards";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL ausente — configure web/.env.local");
}
const db = drizzle(neon(process.env.DATABASE_URL));

async function main() {
  await db.delete(questoes).where(eq(questoes.fonte, "DEMO"));
  if (demoQuestoes.length > 0) {
    await db.insert(questoes).values(demoQuestoes);
  }
  console.log(`✓ ${demoQuestoes.length} questões de demonstração (fonte: DEMO)`);

  await db.delete(flashcards).where(eq(flashcards.fonte, "base"));
  if (flashcardsBase.length > 0) {
    await db.insert(flashcards).values(flashcardsBase);
  }
  console.log(`✓ ${flashcardsBase.length} flashcards (curadoria base)`);

  console.log("\nDemo pronta. Rode `npm run dev` e acesse http://localhost:3000");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Falha no seed de demo:", err);
    process.exit(1);
  });
