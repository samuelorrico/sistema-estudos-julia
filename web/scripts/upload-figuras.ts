/**
 * Sobe as figuras das questões (public/questoes/**) para o Vercel Blob e mostra
 * a base de URL pública para configurar em NEXT_PUBLIC_BLOB_BASE.
 *
 * Pré-requisitos:
 *   1) Crie um Blob Store na Vercel (Storage → Create → Blob).
 *   2) Copie o token para web/.env.local:  BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
 *
 * Uso:  npm run blob:upload
 *
 * Idempotente: usa pathnames estáveis (addRandomSuffix: false), então re-rodar
 * sobrescreve a mesma URL.
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { put } from "@vercel/blob";

const PUBLIC = join(process.cwd(), "public");
const RAIZ = join(PUBLIC, "questoes");

function tipo(arquivo: string): string {
  if (arquivo.endsWith(".png")) return "image/png";
  if (arquivo.endsWith(".jpeg") || arquivo.endsWith(".jpg")) return "image/jpeg";
  if (arquivo.endsWith(".webp")) return "image/webp";
  return "application/octet-stream";
}

function listar(dir: string): string[] {
  const out: string[] = [];
  for (const nome of readdirSync(dir)) {
    const p = join(dir, nome);
    if (statSync(p).isDirectory()) out.push(...listar(p));
    else out.push(p);
  }
  return out;
}

async function main() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error(
      "Falta BLOB_READ_WRITE_TOKEN em web/.env.local (pegue no Blob Store da Vercel).",
    );
    process.exit(1);
  }

  const arquivos = listar(RAIZ);
  console.log(`Enviando ${arquivos.length} figuras para o Vercel Blob...\n`);

  let base = "";
  let n = 0;
  for (const arquivo of arquivos) {
    const pathname = relative(PUBLIC, arquivo).split(sep).join("/"); // "questoes/<slug>/<file>"
    const body = readFileSync(arquivo);
    const { url } = await put(pathname, body, {
      access: "public",
      token,
      addRandomSuffix: false,
      contentType: tipo(arquivo),
      allowOverwrite: true,
    });
    if (!base) base = new URL(url).origin;
    n++;
    if (n % 15 === 0) console.log(`  ${n}/${arquivos.length}...`);
  }

  console.log(`\n✅ ${n} figuras enviadas.`);
  console.log(
    "\nAdicione esta variável na Vercel (e no web/.env.local) e faça o redeploy:\n",
  );
  console.log(`NEXT_PUBLIC_BLOB_BASE=${base}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Falha no upload:", err);
    process.exit(1);
  });
