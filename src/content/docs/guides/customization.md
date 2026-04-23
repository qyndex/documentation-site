---
title: Customization
description: Customize your documentation site appearance, sidebar structure, theming, and branding.
---

The documentation site is built on [Astro Starlight](https://starlight.astro.build/), which provides extensive customization options through configuration and CSS.

## Site title and branding

Set the site title in `astro.config.mjs`:

```javascript
starlight({
  title: "My Project Docs",
})
```

### Adding a logo

Provide light and dark variants of your logo:

```javascript
starlight({
  title: "My Project",
  logo: {
    light: "./src/assets/logo-light.svg",
    dark: "./src/assets/logo-dark.svg",
  },
})
```

### Favicon

Place your favicon in the `public/` directory as `favicon.svg` or `favicon.ico`. Starlight picks it up automatically.

## Sidebar configuration

The sidebar is defined in the `sidebar` array of the Starlight config. Each entry can be a direct link or a collapsible group:

```javascript
starlight({
  sidebar: [
    {
      label: "Getting Started",
      items: [
        { label: "Introduction", link: "/docs/getting-started" },
      ],
    },
    {
      label: "Guides",
      items: [
        { label: "Writing Content", link: "/docs/guides/writing-content" },
        { label: "Customization", link: "/docs/guides/customization" },
        { label: "Deployment", link: "/docs/guides/deployment" },
      ],
    },
    {
      label: "Reference",
      items: [
        { label: "Configuration", link: "/docs/reference/configuration" },
        { label: "Components", link: "/docs/reference/components" },
        { label: "API", link: "/docs/reference/api" },
      ],
    },
  ],
})
```

### Auto-generated sidebars

For large documentation sets, use Starlight's `autogenerate` feature to build the sidebar from the file structure:

```javascript
{
  label: "Reference",
  autogenerate: { directory: "reference" },
}
```

## Theming

Starlight supports light and dark modes by default, toggled via a button in the header.

### Custom colors

Override Starlight's CSS custom properties in a global stylesheet:

```css
/* src/styles/custom.css */
:root {
  --sl-color-accent-low: #1a1a2e;
  --sl-color-accent: #4361ee;
  --sl-color-accent-high: #c5d0ff;
  --sl-color-white: #ffffff;
  --sl-color-gray-1: #f0f0f0;
  --sl-color-gray-5: #1a1a1a;
}
```

Register the stylesheet in your Astro config:

```javascript
starlight({
  customCss: ["./src/styles/custom.css"],
})
```

### Disabling dark mode

If your brand only uses light mode:

```javascript
starlight({
  // Force light mode only
  components: {
    ThemeSelect: "./src/components/EmptyThemeSelect.astro",
  },
})
```

## Social links

Add links to your GitHub repository, Discord, or other social platforms:

```javascript
starlight({
  social: {
    github: "https://github.com/your-org/your-repo",
    discord: "https://discord.gg/your-invite",
  },
})
```

## Head customization

Inject custom `<head>` elements like analytics scripts or web fonts:

```javascript
starlight({
  head: [
    {
      tag: "link",
      attrs: {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
    },
    {
      tag: "script",
      attrs: {
        src: "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX",
        async: true,
      },
    },
  ],
})
```

## Internationalization

Starlight has built-in i18n support. Define your locales in the config:

```javascript
starlight({
  defaultLocale: "en",
  locales: {
    en: { label: "English" },
    es: { label: "Espanol", lang: "es" },
    ja: { label: "Japanese", lang: "ja" },
  },
})
```

Then create translated content files at `src/content/docs/{locale}/page-name.md`.
