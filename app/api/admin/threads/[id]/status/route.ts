import { NextResponse } from "next/server";
import { setThreadStatus } from "@/lib/db/queries";
import { THREAD_STATUSES, type ThreadStatus } from "@/lib/db/schema";

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

  const { status } = body as { status?: string };
  if (!status || !THREAD_STATUSES.includes(status as ThreadStatus)) {
    return NextResponse.json(
      { error: `status must be one of ${THREAD_STATUSES.join(", ")}` },
      { status: 400 },
    );
  }

  await setThreadStatus({ id: threadId, status: status as ThreadStatus });
  return NextResponse.json({ ok: true });
}
