---
title: Component Reference
description: Built-in interactive components for feedback collection, search, and enhanced documentation features.
---

This site includes custom components for interactive features that go beyond static documentation. These components use Supabase for data persistence and gracefully degrade when Supabase is not configured.

## FeedbackWidget

A "Was this page helpful?" widget that collects reader feedback and stores it in Supabase.

### Usage

The FeedbackWidget is automatically included on every documentation page through the Starlight layout. No manual setup required.

To embed it explicitly in an MDX page:

```astro
<FeedbackWidget pageSlug="my-page" />
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `pageSlug` | `string` | Yes | URL slug identifying the page (e.g., `"getting-started"`) |

### Behavior

1. Displays "Was this page helpful?" with Yes/No buttons
2. On click, submits feedback to the `public.feedback` table via Supabase
3. Optionally reveals a text field for additional comments
4. Shows a thank-you message after submission
5. If Supabase is not configured, the widget is hidden

### Database table

The feedback is stored in `public.feedback`:

```sql
CREATE TABLE public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug TEXT NOT NULL,
  helpful BOOLEAN NOT NULL,
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### RLS policies

- **Insert**: Open to `anon` and `authenticated` roles (anyone can submit feedback)
- **Select**: Restricted to `authenticated` role (admin dashboard access)

## SearchDialog

A full-text search dialog that queries the Supabase `search_index` table using PostgreSQL's `tsvector` ranking.

### How it works

1. User types a query in the search input (available in the Starlight header)
2. The component queries Supabase using full-text search
3. Results are ranked by relevance (title matches weighted highest, then section, then content)
4. Clicking a result navigates to the corresponding documentation page

### Search index

The search index is populated from documentation content:

```sql
CREATE TABLE public.search_index (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  section TEXT,
  fts tsvector GENERATED ALWAYS AS (...) STORED
);
```

The `fts` column is a generated tsvector with weighted components:
- **Weight A**: Title (highest priority)
- **Weight B**: Section heading
- **Weight C**: Content body

### Populating the index

The search index is populated via the seed data in `supabase/seed.sql`. For production, you can automate index updates by running a script after each build that extracts content from the Markdown files and upserts it into the `search_index` table.

### Fallback

When Supabase is not configured, the site uses Starlight's built-in client-side search (Pagefind), which works entirely at build time with no external dependencies.

## Starlight built-in components

Starlight provides several built-in components you can use in MDX files:

### Tabs

```mdx
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
  <TabItem label="npm">npm install my-package</TabItem>
  <TabItem label="yarn">yarn add my-package</TabItem>
  <TabItem label="pnpm">pnpm add my-package</TabItem>
</Tabs>
```

### Card grid

```mdx
import { Card, CardGrid } from '@astrojs/starlight/components';

<CardGrid>
  <Card title="Quick Start" icon="rocket">
    Get up and running in under 5 minutes.
  </Card>
  <Card title="Reference" icon="open-book">
    Complete API and configuration reference.
  </Card>
</CardGrid>
```

### Asides

Use Markdown callout syntax for notes, tips, cautions, and dangers:

```markdown
:::note
This is an informational note.
:::

:::tip
Here is a helpful tip.
:::

:::caution
Be careful with this action.
:::

:::danger
This action is irreversible.
:::
```
