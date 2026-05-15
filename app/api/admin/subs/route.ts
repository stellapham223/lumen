import { NextResponse } from "next/server";
import { insertSub, listSubs } from "@/lib/db/queries";
import { SUB_STRICTNESS } from "@/lib/db/schema";

export async function GET() {
  const rows = await listSubs();
  return NextResponse.json({ subs: rows });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const {
    name,
    members,
    strictness,
    promptTemplate,
    notes,
    sortOrder,
    isActive,
  } = body as {
    name?: string;
    members?: string;
    strictness?: string;
    promptTemplate?: string;
    notes?: string;
    sortOrder?: number;
    isActive?: boolean;
  };

  const trimmedName = (name ?? "").trim().replace(/^r\//, "");
  if (!trimmedName) {
    return NextResponse.json({ error: "name required" }, { status: 400 });
  }
  if (!/^[A-Za-z0-9_]{2,30}$/.test(trimmedName)) {
    return NextResponse.json(
      { error: "name must be 2-30 chars, letters/digits/underscore" },
      { status: 400 },
    );
  }

  const safeStrictness = (SUB_STRICTNESS as readonly string[]).includes(strictness ?? "")
    ? (strictness as (typeof SUB_STRICTNESS)[number])
    : "medium";

  try {
    const row = await insertSub({
      name: trimmedName,
      members: members ?? "",
      strictness: safeStrictness,
      promptTemplate: promptTemplate ?? "",
      notes: notes ?? "",
      sortOrder: typeof sortOrder === "number" ? sortOrder : 999,
      isActive: isActive !== false,
    });
    return NextResponse.json({ sub: row });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "insert failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
