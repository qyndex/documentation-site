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
npm run check            # Astro type-check (astro check — catches .astro errors)
npm run typecheck        # TypeScript type check (tsc --noEmit)
npm test                 # Run unit tests (vitest run)
npm run test:watch       # Unit tests in watch mode
npm run test:coverage    # Unit tests with v8 coverage report
npm run test:e2e         # Playwright E2E tests (starts astro dev automatically)
npm run test:e2e:ui      # Playwright test runner UI
npm run test:e2e:headed  # E2E tests with browser visible (debugging)
```

### First-time E2E setup

```bash
npx playwright install chromium   # Download Chromium for Playwright
```

## Architecture

- `src/pages/` — File-based routing (`.astro` files)
- `src/components/` — Reusable Astro/React components
- `src/layouts/` — Page layouts
- `src/content/` — Content collections (Markdown/MDX)
- `public/` — Static assets (copied as-is)

## Testing

- **Unit tests** (`tests/`) — Vitest, Node environment. Tests cover content-collection frontmatter validation, layout structure assertions, and pure utility functions. Astro components cannot be unit-imported into Node without the Astro Container API; test behaviour via E2E instead.
- **E2E tests** (`e2e/`) — Playwright. `playwright.config.ts` starts `astro dev` automatically via `webServer`; no manual server launch needed. Base URL is `http://localhost:4321`.
- Config files: `vitest.config.ts`, `playwright.config.ts`

### Adding tests

- New unit test: `tests/<name>.test.ts`
- New E2E spec: `e2e/<name>.spec.ts`
- Run `npx playwright install chromium` once before first E2E run.

## Rules

- Use `.astro` components for static content, React/Svelte for interactive islands
- Tailwind utility classes for styling
- Content collections for structured data (blog posts, docs)
- Minimize client-side JavaScript — Astro is server-first
