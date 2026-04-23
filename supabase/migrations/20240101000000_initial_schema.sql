-- Initial schema for documentation site interactive features
-- Feedback: readers rate helpfulness of documentation pages
-- Search index: server-side full-text search across all doc pages

-- ============================================================
-- feedback table — readers can rate docs and leave comments
-- ============================================================
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug TEXT NOT NULL,
  helpful BOOLEAN NOT NULL,
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_feedback_page_slug ON public.feedback (page_slug);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON public.feedback (created_at DESC);

-- ============================================================
-- search_index table — server-side documentation search
-- ============================================================
CREATE TABLE IF NOT EXISTS public.search_index (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  section TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_search_index_page_slug ON public.search_index (page_slug);

-- Full-text search index using GIN
ALTER TABLE public.search_index
  ADD COLUMN IF NOT EXISTS fts tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(section, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'C')
  ) STORED;

CREATE INDEX IF NOT EXISTS idx_search_index_fts ON public.search_index USING GIN (fts);

-- ============================================================
-- Row Level Security
-- ============================================================

-- Feedback: anyone can insert (anonymous readers), only authenticated can read
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit feedback"
  ON public.feedback
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read feedback"
  ON public.feedback
  FOR SELECT
  TO authenticated
  USING (true);

-- Search index: anyone can read (public search), only authenticated can modify
ALTER TABLE public.search_index ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can search documentation"
  ON public.search_index
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage search index"
  ON public.search_index
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
