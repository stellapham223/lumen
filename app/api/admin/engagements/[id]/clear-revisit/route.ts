import { NextResponse } from "next/server";
import { clearRevisitFlag } from "@/lib/db/queries";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const engagementId = Number(id);
  if (!Number.isFinite(engagementId)) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }
  await clearRevisitFlag(engagementId);
  return NextResponse.json({ ok: true });
}
