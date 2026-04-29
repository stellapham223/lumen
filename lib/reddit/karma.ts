// Fetch karma + reply count for a single Reddit comment URL.
// Reddit returns a JSON listing if you append `.json` to a comment permalink:
//   https://www.reddit.com/r/<sub>/comments/<post>/<slug>/<comment_id>/.json
// Top-level comments appear under data.children[1].data.children.

function userAgent(): string {
  return process.env.REDDIT_USER_AGENT ?? "Lumen Dashboard/1.0";
}

function toJsonUrl(commentUrl: string): string {
  const trimmed = commentUrl.replace(/\/?$/, "");
  return `${trimmed}.json?limit=1&depth=1&context=1`;
}

export type CommentStats = {
  score: number;
  replies: number;
};

export async function fetchCommentStats(
  commentUrl: string,
): Promise<CommentStats | null> {
  const res = await fetch(toJsonUrl(commentUrl), {
    headers: { "User-Agent": userAgent() },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = (await res.json()) as Array<{
    data?: { children?: Array<{ data?: unknown }> };
  }>;
  const commentListing = json[1]?.data?.children?.[0]?.data as
    | { score?: number; replies?: { data?: { children?: unknown[] } } | string }
    | undefined;
  if (!commentListing) return null;
  const score = typeof commentListing.score === "number" ? commentListing.score : 0;
  const replies =
    typeof commentListing.replies === "object" &&
    commentListing.replies?.data?.children
      ? commentListing.replies.data.children.length
      : 0;
  return { score, replies };
}

export async function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
