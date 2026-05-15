import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin/auth";
import {
  BASE_URL,
  BLOG_POSTS,
  GLOSSARY_TERMS,
} from "@/lib/site";
import { publishBulk } from "@/lib/indexing/google";
import { submitUrls } from "@/lib/indexing/indexnow";
import {
  insertIndexingLogs,
  recentlySubmittedUrls,
} from "@/lib/db/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 min for bulk Google submissions

type Scope = "glossary" | "blog" | "all";
type Provider = "google" | "indexnow" | "both";

// Rate-limit window: don't resubmit the same URL within this many days.
// Google docs recommend 7-day spacing; IndexNow is more lenient but 3d is fine.
const SKIP_WINDOW_DAYS_GOOGLE = 7;
const SKIP_WINDOW_DAYS_INDEXNOW = 3;

// Hard cap per-run to avoid blowing the daily quota in one click.
const MAX_GOOGLE_PER_RUN = 150;
const MAX_INDEXNOW_PER_RUN = 1000;

function buildUrlList(scope: Scope): string[] {
  const urls: string[] = [];
  if (scope === "glossary" || scope === "all") {
    for (const t of GLOSSARY_TERMS) {
      if (t.status === "Published") {
        urls.push(`${BASE_URL}/glossary/${t.slug}`);
      }
    }
  }
  if (scope === "blog" || scope === "all") {
    for (const p of BLOG_POSTS) {
      urls.push(`${BASE_URL}/blog/${p.slug}`);
    }
    if (scope === "all") {
      urls.push(`${BASE_URL}/blog`);
      urls.push(`${BASE_URL}/glossary`);
      urls.push(`${BASE_URL}/`);
    }
  }
  return urls;
}

export async function POST(request: Request) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: { scope?: Scope; provider?: Provider; force?: boolean } = {};
  try {
    body = (await request.json()) as typeof body;
  } catch {
    // Empty body is fine; defaults below.
  }

  const scope: Scope = body.scope ?? "glossary";
  const provider: Provider = body.provider ?? "both";
  const force = body.force === true;

  const allUrls = buildUrlList(scope);

  type Summary = {
    scope: Scope;
    provider: Provider;
    totalCandidates: number;
    google?: {
      submitted: number;
      skippedRecent: number;
      capped: boolean;
      ok: number;
      failed: number;
      sampleErrors: Array<{ url: string; status: number; error?: string }>;
    };
    indexnow?: {
      submitted: number;
      skippedRecent: number;
      capped: boolean;
      ok: boolean;
      status: number;
      error?: string;
    };
  };

  const summary: Summary = {
    scope,
    provider,
    totalCandidates: allUrls.length,
  };

  // --- Google ---
  if (provider === "google" || provider === "both") {
    const skip = force
      ? new Set<string>()
      : await recentlySubmittedUrls("google", SKIP_WINDOW_DAYS_GOOGLE);

    const eligible = allUrls.filter((u) => !skip.has(u));
    const capped = eligible.length > MAX_GOOGLE_PER_RUN;
    const toSubmit = eligible.slice(0, MAX_GOOGLE_PER_RUN);

    let ok = 0;
    let failed = 0;
    const sampleErrors: Array<{ url: string; status: number; error?: string }> = [];

    if (toSubmit.length > 0) {
      const results = await publishBulk(toSubmit);
      const logRows = results.map((r) => ({
        url: r.url,
        provider: "google" as const,
        status: (r.ok ? "ok" : "fail") as "ok" | "fail",
        responseStatus: r.status,
        error: r.error ?? null,
      }));
      await insertIndexingLogs(logRows);

      for (const r of results) {
        if (r.ok) ok++;
        else {
          failed++;
          if (sampleErrors.length < 5) {
            sampleErrors.push({ url: r.url, status: r.status, error: r.error });
          }
        }
      }
    }

    summary.google = {
      submitted: toSubmit.length,
      skippedRecent: allUrls.length - eligible.length,
      capped,
      ok,
      failed,
      sampleErrors,
    };
  }

  // --- IndexNow ---
  if (provider === "indexnow" || provider === "both") {
    const skip = force
      ? new Set<string>()
      : await recentlySubmittedUrls("indexnow", SKIP_WINDOW_DAYS_INDEXNOW);

    const eligible = allUrls.filter((u) => !skip.has(u));
    const capped = eligible.length > MAX_INDEXNOW_PER_RUN;
    const toSubmit = eligible.slice(0, MAX_INDEXNOW_PER_RUN);

    let result: { ok: boolean; status: number; submitted: number; error?: string } = {
      ok: true,
      status: 200,
      submitted: 0,
    };
    if (toSubmit.length > 0) {
      result = await submitUrls(toSubmit);
      const logRows = toSubmit.map((u) => ({
        url: u,
        provider: "indexnow" as const,
        status: (result.ok ? "ok" : "fail") as "ok" | "fail",
        responseStatus: result.status,
        error: result.error ?? null,
      }));
      await insertIndexingLogs(logRows);
    }

    summary.indexnow = {
      submitted: toSubmit.length,
      skippedRecent: allUrls.length - eligible.length,
      capped,
      ok: result.ok,
      status: result.status,
      error: result.error,
    };
  }

  return NextResponse.json(summary);
}
