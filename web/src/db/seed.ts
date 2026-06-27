/**
 * Seed do banco de questões a partir dos JSON em src/data/questoes/.
 * Esses JSON contêm as provas reais (Strix/EBMSP) e NÃO são versionados (ver .gitignore).
 * Idempotente: para cada `fonte` encontrada, apaga as questões daquela fonte e reinsere.
 *
 * Uso: npm run db:seed
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { questoes, type NovaQuestao } from "./schema";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data", "questoes");

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL ausente — configure web/.env.local");
}
const db = drizzle(neon(process.env.DATABASE_URL));

async function main() {
  if (!existsSync(DATA_DIR)) {
    console.log(`Sem dados em ${DATA_DIR} — nada a semear.`);
    return;
  }
  const files = readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
  if (files.length === 0) {
    console.log("Nenhum .json de questões encontrado.");
    return;
  }

  let totalInserted = 0;
  for (const file of files) {
    const raw = readFileSync(join(DATA_DIR, file), "utf-8");
    const rows = JSON.parse(raw) as NovaQuestao[];
    if (rows.length === 0) continue;

    // todas as questões de um arquivo compartilham a mesma fonte
    const fontes = [...new Set(rows.map((r) => r.fonte ?? "PROSEF"))];
    for (const fonte of fontes) {
      await db.delete(questoes).where(eq(questoes.fonte, fonte));
    }

    // insere em lotes (limite de parâmetros do driver)
    const batchSize = 50;
    for (let i = 0; i < rows.length; i += batchSize) {
      await db.insert(questoes).values(rows.slice(i, i + batchSize));
    }
    totalInserted += rows.length;
    console.log(`✓ ${file}: ${rows.length} questões (fontes: ${fontes.join(", ")})`);
  }
  console.log(`\nTotal semeado: ${totalInserted} questões.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Falha no seed:", err);
    process.exit(1);
  });
