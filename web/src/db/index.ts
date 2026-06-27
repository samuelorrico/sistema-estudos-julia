import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";

import * as schema from "./schema";

type DB = NeonHttpDatabase<typeof schema>;

let instancia: DB | null = null;

function obterDb(): DB {
  if (!instancia) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        "DATABASE_URL não configurada — defina nas variáveis de ambiente.",
      );
    }
    instancia = drizzle(neon(url), { schema });
  }
  return instancia;
}

// Proxy: a conexão só é criada no primeiro uso (uma query). Assim, importar `db`
// durante o build (ex.: coleta de dados das páginas) não exige a DATABASE_URL e
// não quebra o build da Vercel — ela só é necessária em tempo de requisição.
export const db = new Proxy({} as DB, {
  get(_target, prop, receiver) {
    const real = obterDb() as unknown as Record<string | symbol, unknown>;
    const valor = Reflect.get(real, prop, receiver);
    return typeof valor === "function" ? valor.bind(real) : valor;
  },
});
