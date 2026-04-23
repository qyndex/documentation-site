---
title: Writing Content
description: Author documentation pages with Markdown and MDX, configure frontmatter, and organize your content collection.
---

All documentation lives in `src/content/docs/` as Markdown (`.md`) or MDX (`.mdx`) files. Each file automatically becomes a page on your site, with the filename determining the URL path.

## File naming and URLs

The file path maps directly to the URL:

| File path | URL |
|-----------|-----|
| `src/content/docs/getting-started.md` | `/docs/getting-started` |
| `src/content/docs/guides/deployment.md` | `/docs/guides/deployment` |
| `src/content/docs/reference/api.md` | `/docs/reference/api` |

Use lowercase, hyphenated filenames for consistency and clean URLs.

## Frontmatter

Every page starts with YAML frontmatter between triple dashes:

```markdown
---
title: My Page Title
description: A brief summary for SEO and social sharing.
---
```

### Required fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Page title shown in the sidebar, tab, and heading |

### Optional fields

| Field | Type | Description |
|-------|------|-------------|
| `description` | `string` | Meta description for search engines |
| `sidebar` | `object` | Override sidebar label or ordering |
| `tableOfContents` | `boolean \| object` | Control the on-page table of contents |
| `draft` | `boolean` | Exclude from production builds when `true` |

## Markdown features

Standard Markdown syntax is fully supported:

### Headings

Use `##` through `####` for section headings. The `#` heading is auto-generated from the `title` frontmatter field — do not add a manual `# Heading` at the top.

### Code blocks

Fence code with triple backticks and a language identifier for syntax highlighting:

````markdown
```javascript
const greeting = "Hello, documentation!";
console.log(greeting);
```
````

Starlight supports dozens of languages out of the box including JavaScript, TypeScript, Python, Bash, JSON, YAML, SQL, and more.

### Links

Link to other documentation pages using root-relative paths:

```markdown
See the [Deployment guide](/docs/guides/deployment) for hosting options.
```

### Images

Place images in `public/` and reference them with absolute paths:

```markdown
![Architecture diagram](/images/architecture.png)
```

### Tables

Standard Markdown tables render with clean styling:

```markdown
| Feature    | Status |
|------------|--------|
| Search     | Active |
| Feedback   | Active |
```

## MDX components

MDX files (`.mdx`) can import and render Astro or framework components inline:

```mdx
---
title: Interactive Demo
---

import { FeedbackWidget } from '../../components/FeedbackWidget.astro';

Here is an embedded feedback widget:

<FeedbackWidget pageSlug="interactive-demo" />
```

## Content collections

This site uses Astro's content collections for type-safe content. The collection is defined in `src/content.config.ts`:

```typescript
import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
```

Starlight validates frontmatter against its schema automatically — invalid fields produce build-time errors with helpful messages.

## Tips for effective documentation

1. **Start with the user's goal** — Lead with what the reader wants to accomplish, not implementation details.
2. **One concept per page** — Keep pages focused. Link to related pages instead of cramming everything together.
3. **Show, then explain** — Lead with a code example or screenshot, then explain what it does.
4. **Test your instructions** — Follow your own steps from scratch to catch missing prerequisites or unclear phrasing.
