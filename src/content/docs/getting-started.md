---
title: Getting Started
description: Install dependencies, start the dev server, and configure your documentation site in under five minutes.
---

Welcome to the documentation site template. This guide walks you through the initial setup so you can start writing and publishing documentation right away.

## Prerequisites

- **Node.js 18+** (LTS recommended)
- **npm 9+** (ships with Node.js)
- A code editor (VS Code with the Astro extension recommended)

## Installation

Clone or fork this repository, then install dependencies:

```bash
git clone https://github.com/your-org/documentation-site.git
cd documentation-site
npm install
```

## Start the development server

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser. The dev server supports hot module replacement — changes to content and components appear instantly.

## Project structure

```
src/
  content/docs/     # Markdown/MDX documentation pages
  components/       # Reusable Astro and interactive components
  layouts/          # Page layout templates
  lib/              # Utility modules (Supabase client, helpers)
  pages/            # File-based routes (home page)
public/             # Static assets (images, fonts, favicon)
supabase/           # Database migrations and seed data
astro.config.mjs    # Astro + Starlight configuration
```

## Configuration

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|----------|----------|-------------|
| `SITE_URL` | No | Canonical URL for SEO and sitemaps |
| `PUBLIC_SUPABASE_URL` | No | Supabase project URL (enables feedback + search) |
| `PUBLIC_SUPABASE_ANON_KEY` | No | Supabase anonymous key for client-side access |

The site works without Supabase — feedback and search features gracefully degrade when credentials are absent.

## Build for production

```bash
npm run build
```

The static output lands in `dist/`. Preview it locally:

```bash
npm run preview
```

## Next steps

- [Writing Content](/docs/guides/writing-content) — Learn Markdown/MDX authoring conventions
- [Customization](/docs/guides/customization) — Theme, sidebar, and branding
- [Deployment](/docs/guides/deployment) — Ship to Vercel, Netlify, or Docker
- [Configuration Reference](/docs/reference/configuration) — All settings explained
