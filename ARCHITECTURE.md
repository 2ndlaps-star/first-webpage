# Architecture

This document explains how this project is put together and **why** each
choice was made. It's written to be readable even if you're new to web
development.

## Goal

Build a simple personal web page that:

- Anyone can open in a browser (including on a phone),
- Is easy to read and change,
- Is published automatically whenever the code changes.

## High-level overview

This is a **static website**. That means there is no backend server, no
database, and no build step — just plain files that a browser knows how to
display. When someone visits the site, GitHub sends them these files directly.

```
Browser  ──requests──▶  GitHub Pages  ──serves──▶  index.html + styles.css + script.js
```

## File-by-file

| File | Role | Why it exists |
|------|------|---------------|
| `index.html` | **Structure & content** — the words, headings, sections, and the button. | HTML is the skeleton of every web page. The browser reads it top to bottom. |
| `styles.css` | **Appearance** — colors, spacing, fonts, layout, responsiveness. | Keeping styling separate from content means you can restyle the whole site without touching the text. |
| `script.js` | **Behavior** — the interactive button that changes its message on click. | JavaScript adds interactivity. It's separate so the page still loads and reads fine even if scripts are disabled. |
| `README.md` | **Project intro** — what this is and how to run it. | The first thing a visitor to the GitHub repo reads. |
| `ARCHITECTURE.md` | **This file** — the design decisions. | Explains the "why" so future-you (or a collaborator) can understand the choices. |

## Key decisions and the reasoning

### 1. Plain HTML/CSS/JS — no framework

There are popular tools like React, Vue, or static-site generators. I
deliberately did **not** use them here.

- **Why:** For a first web page, a framework adds tooling, dependencies, and a
  build step that get in the way of learning the fundamentals. Plain files mean
  you can open `index.html` and immediately understand the whole site.
- **Trade-off:** If the site grows into many pages with shared components, a
  framework or templating would start to pay off. Easy to migrate to later.

### 2. Separation of concerns (three files, not one)

The HTML, CSS, and JavaScript live in **separate files** rather than all being
crammed into `index.html`.

- **Why:** Each file has one job — content, style, behavior. This is the
  standard professional structure and makes each piece easier to find and
  change.
- **Trade-off:** Three files means three network requests instead of one. At
  this size that's negligible, and the clarity is worth it.

### 3. Mobile-first, responsive design

The page is built to look good on a phone as well as a desktop.

- **How:** The `<meta name="viewport">` tag in the HTML tells phones to render
  at their real width. The CSS uses a centered container with a `max-width`,
  flexible units, and `clamp()` so the heading scales with screen size.
- **Why:** You specifically want to view this on your phone, and most web
  traffic today is mobile.

### 4. A dark theme with CSS variables

Colors are defined once at the top of `styles.css` as variables (e.g.
`--accent`, `--bg`).

- **Why:** Change one variable and the color updates everywhere. This avoids
  hunting through the file for every place a color is used.

### 5. Progressive enhancement for the interactive button

The page's content is fully readable without JavaScript; the button's
click-message is an *enhancement* layered on top.

- **Why:** The site never depends on JS to deliver its core content, so it
  stays robust.

### 6. Hosting on GitHub Pages ("deploy from a branch")

The site is published with **GitHub Pages** using the built-in
**"Deploy from a branch"** option.

- **How it works:** GitHub Pages is pointed at this repository's branch and the
  root folder. Whenever you push, GitHub's own built-in publisher rebuilds and
  serves the static files — no custom build step or workflow to maintain.
- **Why GitHub Pages:** It's free, requires no separate hosting account, and
  lives right next to the code. Perfect for a static site.
- **Why "deploy from a branch" (instead of a custom GitHub Actions workflow):**
  It's the simplest, most reliable option for a plain static site. There's no
  workflow file, no access-token permissions to configure, and nothing that can
  fail silently — GitHub just serves the files directly. (A custom Actions
  workflow is worth adding later if the site ever needs a build step.)

## How a change flows to the live site

```
You edit a file  ──▶  git commit  ──▶  git push
                                          │
                                          ▼
                          GitHub Pages rebuilds from the branch
                                          │
                                          ▼
                            Site goes live at the Pages URL
```

## Possible next steps

- Add more pages (e.g. `about.html`) and a navigation menu.
- Add a custom domain in the GitHub Pages settings.
- Introduce a linter or formatter (like Prettier) to keep code tidy.
- If it grows, adopt a static-site generator for shared layouts.
