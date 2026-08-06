# Ihsaanah Website — Version 2 (Plain HTML/CSS/JS)

No Node, no npm, no build step. See `CLAUDE.md` for the full project
brief and step-by-step build guide before making changes.

## 1. Preview it right now

You genuinely don't need to install anything. Two options:

**Option A — just open it:**
Double-click `index.html` — it opens in your browser and works. Some
things (like fetch-based features, if you add any later) don't work
from a plain `file://` link, but everything in this project as-built
does not need that, so this is fine.

**Option B — a local server (nicer, live-reloads):**
If you use VS Code, install the free **"Live Server"** extension
(search it in the Extensions panel — not an npm package, just a VS Code
extension, no Node involved). Right-click `index.html` → "Open with
Live Server". Auto-refreshes when you save a file.

## 2. Editing

Every page is a plain `.html` file you can open and edit directly.
Tailwind's utility classes (`bg-ihsaanah-gold`, `text-sm`, etc.) work
immediately because the page loads Tailwind from a CDN — no build, no
watch process, just save and refresh.

## 3. Set up the contact form

1. Go to https://web3forms.com, create a free access key.
2. In `contact.html`, replace `REPLACE_WITH_WEB3FORMS_KEY` with the real
   key.

## 4. Deploy to Netlify (free, no domain yet)

This is even simpler without a build step:

**Option A — drag and drop (fastest):**
1. Go to https://app.netlify.com
2. Drag the whole project folder onto the "Sites" page.
3. Done — Netlify hosts it immediately, no build command needed since
   there's nothing to build.

**Option B — connect GitHub (better for ongoing updates):**
1. Push this project to a GitHub repo.
2. Netlify → "Add new site" → "Import an existing project" → connect
   the repo.
3. Build command: leave blank. Publish directory: `/` (the repo root).
4. Every push auto-deploys.

Either way, once deployed:
- Netlify gives you a random subdomain like `random-name-123.netlify.app`.
- Go to Site settings → "Change site name" → pick something that
  doesn't look thrown-together, e.g. `ihsaanah.netlify.app` (whichever
  is available).

When Ihsaanah buys a domain later (after Version 2, per the agreement),
point it at this same Netlify site — no rebuild required.

## 5. Adding blog posts / events later

See `CLAUDE.md` — copy `blog-post-template.html` or
`event-template.html`, rename, edit, link from `blog.html`. No CMS
needed.
