# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Documentation Site — Versioned documentation site with search, sidebar navigation, and Starlight integration.

Built with Astro, TypeScript, and Tailwind CSS.

## Commands

```bash
npm install              # Install dependencies
npm run dev              # Start dev server (http://localhost:4321)
npm run build            # Production build
npm run preview          # Preview production build
npx tsc --noEmit         # Type check
```

## Architecture

- `src/pages/` — File-based routing (`.astro` files)
- `src/components/` — Reusable Astro/React components
- `src/layouts/` — Page layouts
- `src/content/` — Content collections (Markdown/MDX)
- `public/` — Static assets (copied as-is)

## Rules

- Use `.astro` components for static content, React/Svelte for interactive islands
- Tailwind utility classes for styling
- Content collections for structured data (blog posts, docs)
- Minimize client-side JavaScript — Astro is server-first
