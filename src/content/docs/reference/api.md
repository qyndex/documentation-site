---
title: API Reference
description: Client-side API patterns for feedback submission, full-text search, and Supabase integration.
---

This documentation site uses Supabase as its backend for interactive features. All API calls are made directly from the browser using the `@supabase/supabase-js` client library. There are no custom server-side API routes.

## Supabase client

The Supabase client is initialized in `src/lib/supabase.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
```

The client is `null` when environment variables are not set, allowing all components to check for availability before making requests.

## Feedback API

### Submit feedback

Insert a row into the `public.feedback` table:

```typescript
import { supabase } from "../lib/supabase";

if (supabase) {
  const { error } = await supabase.from("feedback").insert({
    page_slug: "getting-started",
    helpful: true,
    comment: "Very clear instructions!",
  });

  if (error) {
    console.error("Failed to submit feedback:", error.message);
  }
}
```

### Feedback schema

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| `id` | `uuid` | No | Auto-generated primary key |
| `page_slug` | `text` | No | URL slug of the rated page |
| `helpful` | `boolean` | No | `true` for helpful, `false` for not helpful |
| `comment` | `text` | Yes | Optional free-text comment |
| `created_at` | `timestamptz` | No | Auto-set to current timestamp |

### Read feedback (authenticated only)

```typescript
const { data, error } = await supabase
  .from("feedback")
  .select("*")
  .eq("page_slug", "getting-started")
  .order("created_at", { ascending: false });
```

Reading feedback requires an authenticated session due to RLS policies.

## Search API

### Full-text search

Query the `search_index` table using PostgreSQL's `textSearch` filter:

```typescript
import { supabase } from "../lib/supabase";

if (supabase) {
  const { data, error } = await supabase
    .from("search_index")
    .select("page_slug, title, section, content")
    .textSearch("fts", "deployment docker", {
      type: "websearch",
      config: "english",
    })
    .limit(10);
}
```

### Search result shape

Each result contains:

| Field | Type | Description |
|-------|------|-------------|
| `page_slug` | `string` | URL slug to link to (e.g., `"guides/deployment"`) |
| `title` | `string` | Page title |
| `section` | `string \| null` | Section heading within the page |
| `content` | `string` | Text content of the section |

### Search ranking

Results are ranked by the generated `fts` tsvector column with these weights:

1. **Title matches** (Weight A) — Highest priority
2. **Section heading matches** (Weight B) — Medium priority
3. **Content body matches** (Weight C) — Lowest priority

The `websearch` type supports natural language queries including quoted phrases and boolean operators (`OR`, `-` for exclusion).

### Search examples

```typescript
// Simple keyword search
.textSearch("fts", "configuration")

// Multi-word search (AND by default)
.textSearch("fts", "docker deployment")

// Phrase search
.textSearch("fts", '"environment variables"')

// Boolean OR
.textSearch("fts", "vercel OR netlify")

// Exclude terms
.textSearch("fts", "deployment -docker")
```

## Error handling

All Supabase calls return `{ data, error }`. Always check for errors:

```typescript
const { data, error } = await supabase.from("feedback").insert({ ... });

if (error) {
  // error.message contains a human-readable description
  // error.code contains the PostgreSQL error code (e.g., "23505" for unique violation)
  console.error("Supabase error:", error.message);
}
```

## Rate limiting

Supabase applies default rate limits based on your project plan:

| Plan | Requests/second |
|------|-----------------|
| Free | 100 |
| Pro | 1,000 |
| Enterprise | Custom |

The feedback widget debounces submissions client-side to prevent accidental double-clicks. For high-traffic documentation sites, consider adding server-side rate limiting via a Supabase Edge Function.

## Type safety

For full TypeScript type safety, generate types from your Supabase schema:

```bash
npx supabase gen types typescript --local > src/lib/database.types.ts
```

Then use the generated types with the client:

```typescript
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

export const supabase = createClient<Database>(url, key);
```
