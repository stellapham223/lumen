import { NextResponse } from "next/server";
import { recordKarmaSnapshot } from "@/lib/db/queries";

function envAccountCreatedAt(): Date | null {
  const raw = process.env.REDDIT_ACCOUNT_CREATED_AT;
  if (!raw) return null;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const { totalKarma, linkKarma, commentKarma } = body as {
    totalKarma?: number;
    linkKarma?: number;
    commentKarma?: number;
  };

  for (const v of [totalKarma, linkKarma, commentKarma]) {
    if (typeof v !== "number" || !Number.isFinite(v) || v < 0) {
      return NextResponse.json(
        { error: "totalKarma, linkKarma, commentKarma must be non-negative integers" },
        { status: 400 },
      );
    }
  }

  await recordKarmaSnapshot({
    totalKarma: totalKarma!,
    linkKarma: linkKarma!,
    commentKarma: commentKarma!,
    accountCreatedAt: envAccountCreatedAt(),
  });

  return NextResponse.json({ ok: true });
}
