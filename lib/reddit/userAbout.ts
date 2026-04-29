// Fetch public Reddit user about JSON.
// Endpoint: https://www.reddit.com/user/<username>/about.json
// Returns total_karma, link_karma, comment_karma, created_utc, etc.

function userAgent(): string {
  return process.env.REDDIT_USER_AGENT ?? "Lumen Dashboard/1.0";
}

export type RedditUserAbout = {
  totalKarma: number;
  linkKarma: number;
  commentKarma: number;
  createdAt: Date;
};

export async function fetchUserAbout(
  username: string,
): Promise<RedditUserAbout | null> {
  const url = `https://www.reddit.com/user/${encodeURIComponent(username)}/about.json`;
  const res = await fetch(url, {
    headers: { "User-Agent": userAgent() },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = (await res.json()) as {
    data?: {
      total_karma?: number;
      link_karma?: number;
      comment_karma?: number;
      created_utc?: number;
    };
  };
  const d = json.data;
  if (!d) return null;
  return {
    totalKarma: d.total_karma ?? 0,
    linkKarma: d.link_karma ?? 0,
    commentKarma: d.comment_karma ?? 0,
    createdAt: new Date((d.created_utc ?? 0) * 1000),
  };
}

// Pull username from REDDIT_USER_AGENT format "Lumen Dashboard/1.0 by u/<username>".
export function usernameFromUserAgent(): string | null {
  const ua = process.env.REDDIT_USER_AGENT ?? "";
  const m = ua.match(/by\s+u\/([A-Za-z0-9_-]+)/i);
  return m?.[1] ?? null;
}
