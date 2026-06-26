import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// drizzle-kit (CLI) não carrega .env.local automaticamente como o Next faz.
config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
