import { NextResponse } from "next/server";
import { recordEngagement } from "@/lib/db/queries";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const { threadId, commentUrl } = body as {
    threadId?: number;
    commentUrl?: string;
  };

  if (typeof threadId !== "number" || !Number.isFinite(threadId)) {
    return NextResponse.json({ error: "threadId required" }, { status: 400 });
  }
  if (typeof commentUrl !== "string" || !commentUrl.startsWith("https://")) {
    return NextResponse.json({ error: "commentUrl required (https)" }, { status: 400 });
  }

  await recordEngagement({ threadId, commentUrl });
  return NextResponse.json({ ok: true });
}
