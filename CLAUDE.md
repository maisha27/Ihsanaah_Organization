# CLAUDE.md — Ihsaanah Website, Version 2 (Plain HTML/CSS/JS)

Read this before making changes. It reflects the signed draft agreement
between Maisha Nanjeeba (developer) and Tahira Farzana (Ihsaanah) —
treat the constraints below as real contractual boundaries, not
suggestions.

## Tech stack — and why it changed

**Plain HTML + CSS (Tailwind via CDN, no build step) + a little vanilla
JS.** No Node, no npm, no bundler, nothing to "install" beyond a text
editor and a browser.

We started with Astro, but Astro requires Node.js (a specific recent
version) and a build toolchain, which turned into version-conflict hell
during setup. For a static, mostly-informational, low-interactivity
site like this one, that tooling buys nothing — so we dropped it. Every
file in this project is directly usable: open `index.html` in a browser
and it works, no compile step, ever.

**No backend, no database.** Nothing in Version 2's scope needs one (no
logins, no payments, no dynamic user data). Do not introduce one.

## How this project actually works

- Every page is a **standalone `.html` file** in the project root.
  There's no templating engine — the nav and footer are duplicated
  (identically) at the top/bottom of every page.
- Styling is **Tailwind's CDN build** (`<script src="https://cdn.tailwindcss.com">`
  in every page's `<head>`, with a small inline `tailwind.config` block
  defining Ihsaanah's colors). This gives the same utility classes as a
  normal Tailwind project, with zero install.
- `css/styles.css` holds the few things Tailwind utility classes can't
  express — right now, that's just the decorative Islamic geometric
  pattern (CSS background, no image file needed).
- `js/main.js` is ~10 lines, just toggles the mobile nav menu. That's
  the only JavaScript in the whole project.

## STEP-BY-STEP: how to actually develop this

You (or Claude Code) will mostly be editing existing pages with real
content, not building new architecture. Here's the order to work in:

### Step 1 — Get Ihsaanah's real brand colors
Open `css/styles.css` and every page's `<head>` `tailwind.config` block.
Replace the placeholder hex values (`#a6822c` gold, `#1a1a1a` black)
with Ihsaanah's actual colors, pulled from their logo or Facebook page.
Do this FIRST — every page uses these values, so get it right once
rather than re-touching 13 files later.

### Step 2 — Set up the contact form
`contact.html` posts to Web3Forms (a free static-form service, no
backend). Go to https://web3forms.com, create a free access key, and
replace `REPLACE_WITH_WEB3FORMS_KEY` in `contact.html` with the real
key. Test it by submitting the form once before moving on.

### Step 3 — Replace placeholder copy, one page at a time
Every page currently has clearly-marked placeholder text ("Placeholder
description once supplied", etc.). Work through pages in this order,
replacing placeholders with real content as Ihsaanah supplies it:

1. `index.html` (Home) — intro copy, mission summary
2. `about-ihsaanah.html` — org-level About, Vision/Mission/Values
3. `preschool.html` — Little Mumin Islamic Preschool + its own V/M/V
4. `book-club.html` — Verses & Vibes, Little Mumin Book Club
5. `products.html` — services list + Sales Corner items (see Step 4 below — don't add a cart)
6. `community-programmes.html` — Kidpreneurs, Genius Anlad, Project Mihrab (see fallback note below)
7. `donate.html` — Dream Mosque + scholarship donation instructions
8. `blog.html` + sample entries — see "Adding blog posts/events" below

Don't reorganize the page structure while doing this — just swap text
and images inside the existing sections. If a page's content genuinely
doesn't fit the existing layout, stop and think about why before
changing the HTML structure (it usually means the content wasn't what
was scoped — check with Maisha).

### Step 4 — Products / Sales Corner (STILL TBD)
This page currently assumes a simple listing — no cart, no checkout.
This is explicitly unconfirmed (agreement Section 24). **Do not add
purchase functionality here** until Tahira confirms what "Sales corner"
actually means. If she confirms it needs real online purchasing, that's
a separately scoped, separately priced addition — flag it to Maisha,
don't just build it.

### Step 5 — Add real images
Put image files in the `img/` folder and reference them with relative
paths (`<img src="img/preschool-1.jpg" ...>`). Keep file sizes
reasonable (compress before adding) since there's no build-time image
optimization in this stack.

### Step 6 — Test every page and every link
Open each `.html` file directly in a browser (or use a simple local
server, see README) and click through every nav link and every card
link. With no build step, a typo in a filename or `href` won't get
caught by anything — you have to check by hand.

### Step 7 — Deploy
See README.md for the exact Netlify steps (drag-and-drop, no build
command needed).

## The core pattern: ONE card shape, MANY sections

This is what keeps the whole site inside the 10,000 BDT budget. Look at
how `preschool.html`, `products.html`, `book-club.html`, and
`community-programmes.html` all use the exact same card markup (a
bordered box: heading, description, optional link). **Don't design a
new visual layout per section.** If you need a new page for something,
copy the card markup from an existing page rather than inventing a new
shape.

## Fallback / priority order if scope gets tight

Per the agreement (Section 5): if Kidpreneurs, Genius Anlad, and Project
Mihrab (in `community-programmes.html`) turn out to need more than a
short description each once Tahira defines them, these three are the
first candidates to simplify further — they're already combined onto
one page for exactly this reason. Don't split them into three separate
pages unless the budget clearly allows it. Tahira should be told before
any further simplification is applied, per the agreement.

## Adding blog posts / events (no CMS)

Static and minimal, per the agreement (Section 8 — dynamic publishing
without developer involvement is out of scope). To add a new one:

1. Copy `blog-post-template.html` (for a post) or `event-template.html`
   (for an event).
2. Rename it (e.g. `blog-post-ramadan-drive.html`).
3. Edit the title, date, and body text inside.
4. Add a link to the new file from `blog.html`'s list.
5. Redeploy (see README).

Do not build a dashboard, form, or admin UI for this. If Ihsaanah later
wants self-service publishing, that's a separately scoped future
addition — flag it, don't just build it.

## Explicitly OUT OF SCOPE — do not build these

Per the agreement (Section 8), even if it seems easy to add:

- Any login/auth system, user accounts, or admin dashboard
- A database of any kind
- Real e-commerce (cart, checkout, payment) on `products.html`
- A payment gateway on `donate.html` — informational only
- Any auto-updating/dynamic content system beyond manual file copying
- An "Ihsaanah Academy" nav item or page — that's Version 1, built
  after this version ships. Don't pre-build it "since we're here."

If something seems to need one of these, stop and flag it rather than
finding a workaround — it means a scope conversation with Tahira needs
to happen first (see the agreement's Scope Change Process).

## File structure

```
index.html                     Home
about-ihsaanah.html
preschool.html
products.html
book-club.html
community-programmes.html      Kidpreneurs / Genius Anlad / Project Mihrab
donate.html
contact.html
blog.html                      Lists posts + events
blog-post-welcome.html         Sample post (delete once real content exists)
blog-post-template.html        Copy this to add a new post
event-sample-event.html        Sample event (delete once real content exists)
event-template.html            Copy this to add a new event
css/styles.css                 Custom CSS (pattern background)
js/main.js                     Mobile nav toggle only
img/                           Images go here
```

## Content status

Every page currently has **placeholder copy** — none of it is real
Ihsaanah content yet. Per the agreement (Section 9), Ihsaanah provides
and approves all real text/images; don't invent final copy, just replace
placeholders as real content arrives (see Step 3 above).
