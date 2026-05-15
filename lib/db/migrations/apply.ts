// One-shot migration runner. Usage:
//   npx tsx lib/db/migrations/apply.ts lib/db/migrations/0001_add_cd_subs.sql
//
// Splits the file on `;\n` boundaries (naively, but enough for our DDL +
// seed inserts) and runs each statement against $DATABASE_URL.

import { config } from "dotenv";
import { readFileSync } from "fs";
import { neon } from "@neondatabase/serverless";

config({ path: ".env.local" });

async function main() {
  const path = process.argv[2];
  if (!path) {
    console.error("usage: tsx lib/db/migrations/apply.ts <path/to/migration.sql>");
    process.exit(1);
  }
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }

  const raw = readFileSync(path, "utf8");

  // Strip line comments first so they cannot disguise a chunk as "comment-only".
  const stripped = raw
    .split("\n")
    .map((line) => {
      const idx = line.indexOf("--");
      if (idx === -1) return line;
      return line.slice(0, idx);
    })
    .join("\n");

  const statements = stripped
    .split(/;\s*\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const client = neon(url);
  for (const stmt of statements) {
    const preview = stmt.slice(0, 80).replace(/\s+/g, " ");
    console.log(`> ${preview}${stmt.length > 80 ? "..." : ""}`);
    try {
      await client.query(stmt);
    } catch (err) {
      console.error("  FAILED:", err instanceof Error ? err.message : err);
      process.exit(1);
    }
  }
  console.log(`\nApplied ${statements.length} statements from ${path}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
