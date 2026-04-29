import { NextResponse } from "next/server";
import { fetchUserAbout, usernameFromUserAgent } from "@/lib/reddit/userAbout";
import { recordKarmaSnapshot } from "@/lib/db/queries";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

function isAuthorized(request: Request): boolean {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;
  return request.headers.get("authorization") === `Bearer ${expected}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const username = usernameFromUserAgent();
  if (!username) {
    return NextResponse.json(
      { error: "could not derive Reddit username from REDDIT_USER_AGENT" },
      { status: 500 },
    );
  }

  const about = await fetchUserAbout(username);
  if (!about) {
    return NextResponse.json(
      { error: `failed to fetch /user/${username}/about.json` },
      { status: 502 },
    );
  }

  await recordKarmaSnapshot({
    totalKarma: about.totalKarma,
    linkKarma: about.linkKarma,
    commentKarma: about.commentKarma,
    accountCreatedAt: about.createdAt,
  });

  return NextResponse.json({
    ok: true,
    username,
    totalKarma: about.totalKarma,
    accountCreatedAt: about.createdAt.toISOString(),
  });
}
