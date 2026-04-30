import { NextResponse } from "next/server";
import { runScrape, runMentions } from "@/lib/jobs/scrape";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST() {
  const [scrape, mentions] = await Promise.all([runScrape(), runMentions()]);
  return NextResponse.json({ ok: true, scrape, mentions });
}
