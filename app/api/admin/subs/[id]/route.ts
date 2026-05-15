import { NextResponse } from "next/server";
import { updateSub, deleteSub } from "@/lib/db/queries";
import { SUB_STRICTNESS } from "@/lib/db/schema";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const input = body as {
    name?: string;
    members?: string;
    strictness?: string;
    promptTemplate?: string;
    notes?: string;
    sortOrder?: number;
    isActive?: boolean;
  };

  const patch: Parameters<typeof updateSub>[1] = {};
  if (typeof input.name === "string") {
    const trimmed = input.name.trim().replace(/^r\//, "");
    if (!/^[A-Za-z0-9_]{2,30}$/.test(trimmed)) {
      return NextResponse.json({ error: "invalid name" }, { status: 400 });
    }
    patch.name = trimmed;
  }
  if (typeof input.members === "string") patch.members = input.members;
  if (typeof input.strictness === "string") {
    patch.strictness = (SUB_STRICTNESS as readonly string[]).includes(input.strictness)
      ? (input.strictness as (typeof SUB_STRICTNESS)[number])
      : "medium";
  }
  if (typeof input.promptTemplate === "string") patch.promptTemplate = input.promptTemplate;
  if (typeof input.notes === "string") patch.notes = input.notes;
  if (typeof input.sortOrder === "number") patch.sortOrder = input.sortOrder;
  if (typeof input.isActive === "boolean") patch.isActive = input.isActive;

  const row = await updateSub(id, patch);
  if (!row) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json({ sub: row });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }
  await deleteSub(id);
  return NextResponse.json({ ok: true });
}
