---
title: Deployment
description: Deploy your documentation site to Vercel, Netlify, Docker, or any static hosting provider.
---

This documentation site generates static HTML at build time. The output in `dist/` can be deployed to any hosting provider that serves static files.

## Build the site

```bash
npm run build
```

This runs `astro build`, which generates optimized HTML, CSS, and JavaScript in the `dist/` directory. Preview the build locally:

```bash
npm run preview
```

## Vercel

Vercel auto-detects Astro projects and configures the build automatically.

1. Push your repository to GitHub, GitLab, or Bitbucket
2. Import the project in the [Vercel dashboard](https://vercel.com/new)
3. Vercel detects the Astro framework and sets the build command to `npm run build`
4. Add environment variables (`PUBLIC_SUPABASE_URL`, etc.) in the Vercel project settings
5. Deploy

For subsequent pushes, Vercel builds and deploys automatically on each commit.

### Custom domain

In the Vercel dashboard, go to **Settings > Domains** and add your custom domain. Update `SITE_URL` in your environment variables to match.

## Netlify

1. Push your repository to a Git provider
2. Create a new site in the [Netlify dashboard](https://app.netlify.com/)
3. Set the build command to `npm run build` and publish directory to `dist`
4. Add environment variables in **Site settings > Build & deploy > Environment**
5. Deploy

Netlify also supports branch previews — every pull request gets a unique preview URL.

## Docker

The included `Dockerfile` creates a lightweight nginx container serving the static build:

```bash
# Build and run with Docker Compose
docker compose up --build

# Or build manually
docker build -t docs-site .
docker run -p 8080:80 docs-site
```

The Docker setup is ideal for self-hosted environments or air-gapped networks.

### Docker Compose configuration

The `docker-compose.yml` exposes port 80 by default:

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

Adjust the port mapping if 80 conflicts with other services.

## GitHub Pages

1. Add the GitHub Pages adapter:

```bash
npm install @astrojs/node  # if needed for SSR features
```

2. Set the `site` and `base` in `astro.config.mjs`:

```javascript
export default defineConfig({
  site: "https://your-org.github.io",
  base: "/your-repo",
  // ...
});
```

3. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/
      - uses: actions/deploy-pages@v4
```

4. Enable Pages in your repository settings under **Settings > Pages > Source > GitHub Actions**.

## Cloudflare Pages

1. Connect your Git repository in the Cloudflare dashboard
2. Set framework preset to **Astro**
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Add environment variables in the Cloudflare Pages settings

## Environment variables in production

When deploying with Supabase features (feedback, search), set these variables in your hosting provider:

| Variable | Description |
|----------|-------------|
| `PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `PUBLIC_SUPABASE_ANON_KEY` | Public anonymous API key |
| `SITE_URL` | Canonical site URL for SEO |

Variables prefixed with `PUBLIC_` are embedded at build time and safe to expose in the client bundle.

## Performance considerations

The built site is fully static HTML with minimal JavaScript. Typical performance characteristics:

- **First Contentful Paint**: Under 1 second on broadband
- **Total page weight**: Under 100KB for most documentation pages
- **Lighthouse score**: 95+ across all categories

To maintain fast performance:
- Optimize images before adding to `public/`
- Avoid large client-side JavaScript bundles
- Use Astro's built-in image optimization for responsive images
