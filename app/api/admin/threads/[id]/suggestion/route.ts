import { NextResponse } from "next/server";
import { recordSuggestion } from "@/lib/db/queries";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const threadId = Number(id);
  if (!Number.isFinite(threadId)) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const { promptText } = body as { promptText?: string };
  if (typeof promptText !== "string" || promptText.length === 0) {
    return NextResponse.json({ error: "promptText required" }, { status: 400 });
  }

  await recordSuggestion({ threadId, promptText });
  return NextResponse.json({ ok: true });
}
