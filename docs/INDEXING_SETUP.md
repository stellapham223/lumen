# Bulk indexing setup (Google Indexing API + IndexNow)

Admin route: `/admin/indexing` lets you submit all published glossary + blog URLs to Google (via the Indexing API) and to Bing/Yandex (via IndexNow) in a single click. Recently-submitted URLs are skipped automatically (7d window for Google, 3d for IndexNow).

Setup is two parts: one-time Google Cloud setup (~30 min), and one-time IndexNow token wiring (already done in repo).

---

## 1. Google Indexing API (one-time, ~30 min)

### 1.1. Create a Google Cloud project

1. Open https://console.cloud.google.com
2. Click the project selector → **New Project**
3. Name: `lumen-indexing` (or anything you want); leave org as default
4. Create

### 1.2. Enable the Indexing API

1. In the Cloud Console search bar, type `Indexing API` and select **Web Search Indexing API**
2. Click **Enable**

### 1.3. Create a service account + key

1. Go to **IAM & Admin → Service Accounts** in the Cloud Console
2. **Create service account**
   - Service account ID: `lumen-indexing-bot`
   - Description: `Submits Lumen URLs to Google Indexing API`
   - Click **Create and Continue**
3. **Grant access**: skip (no project roles needed)
4. Click **Done**
5. Open the new service account, go to **Keys** tab → **Add Key → Create new key → JSON**
6. A JSON file downloads. Keep it secret. This is the credential.

### 1.4. Grant the service account access to your Search Console property

1. Open https://search.google.com/search-console
2. Select the `lumencal.com` property
3. **Settings (gear icon) → Users and permissions**
4. **Add user**:
   - Email: the service account email from the JSON (something like `lumen-indexing-bot@lumen-indexing.iam.gserviceaccount.com`)
   - Permission: **Owner** (Indexing API requires Owner, not lower)
5. Save

### 1.5. Set the env var on Vercel

The JSON file from step 1.3 needs to be loaded as a single env var.

1. Open the JSON file in a text editor and copy the entire contents
2. On Vercel, project → **Settings → Environment Variables**
3. Add new variable:
   - Name: `GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON`
   - Value: paste the full JSON (one line is fine; Vercel preserves it)
   - Environments: Production (and Preview if you want it to work on previews)
4. Save and redeploy

For local dev, add the same to `.env.local`:

```
GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"...",...}'
```

(Wrap the JSON in single quotes to avoid shell interpretation.)

### 1.6. Test

Open `/admin/indexing`, leave default settings (scope = glossary, provider = both), and click **Submit**. The result panel should show `OK: 152 · Failed: 0` (or close to it) for Google.

Quota: 200 URLs/day by default. The route caps each run at 150 to leave headroom.

---

## 2. IndexNow (already wired, just set env var)

IndexNow is a free protocol for telling Bing and Yandex about updated URLs. Google does not support it, so this is a Bing + Yandex specific channel.

### 2.1. The key

A pre-generated key is in the repo at `public/6992927cb9430d9d7ef561cbdee02109.txt`. The contents of the file match the filename (standard IndexNow verification). Production serves it at `https://lumencal.com/6992927cb9430d9d7ef561cbdee02109.txt`.

If you ever want to rotate the key:

1. Generate a new one: `openssl rand -hex 16`
2. Rename the public file: `mv public/OLDKEY.txt public/NEWKEY.txt`
3. Update the file contents to match the new filename
4. Update the env var (next step)

### 2.2. Set the env var on Vercel

1. On Vercel → **Settings → Environment Variables**
2. Add: `INDEXNOW_KEY` = `6992927cb9430d9d7ef561cbdee02109`
3. Same for `.env.local` locally

That's it. IndexNow has no separate account or auth flow.

### 2.3. Test

In `/admin/indexing`, set provider = `indexnow`, click Submit. Expected: HTTP 200 or 202, with `Submitted: 152`. Bing tends to pick up URLs within hours; Yandex is similar.

---

## 3. Apply the DB migration

The indexing log table needs to exist before the page can load logs.

```bash
bun run lib/db/migrations/apply.ts lib/db/migrations/0002_add_indexing_log.sql
```

Run once against production (and against local dev if you use a local DB).

---

## 4. Operational notes

- **Quota**: Google = 200/day. Each run caps at 150. The skip-window (7 days) prevents accidental re-submission on repeat clicks.
- **Force re-submit**: the checkbox bypasses the skip window, useful if you redeployed a page and want it re-crawled.
- **Failure modes**:
  - `401` on Google: service account not added as Owner in GSC, or wrong env var
  - `403` on Google: Indexing API not enabled in the Cloud project
  - `403` on IndexNow: key mismatch between env var and public file
  - `422` on IndexNow: URL list malformed (shouldn't happen with our manifest)
- **Schedule**: a Vercel cron could call `/api/admin/indexing` weekly to keep Google's index fresh, but for v1 we just trigger manually after content updates.
- **Gray area for Google**: officially Indexing API is for JobPosting and BroadcastEvent only. Submitting general content is widely done without enforcement, but Google could theoretically restrict it. Worst case: the API returns 200 OK but Google does not act on the request. There is no penalty; we lose the speedup, not the page.

## 5. Routine cadence after content shipping

After shipping new content (a blog post, a glossary expansion, etc.):

1. Wait for Vercel deploy to finish
2. Open `/admin/indexing`
3. Scope = `all` (or `blog` if you only added a post)
4. Provider = `both`
5. Submit
6. Re-submit sitemap in GSC for good measure

Total time: 30 seconds.
