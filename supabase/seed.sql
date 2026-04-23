-- Seed data for documentation site
-- Populates search_index with entries matching the actual doc pages
-- Adds sample feedback entries

-- ============================================================
-- Search index entries (one per doc section)
-- ============================================================
INSERT INTO public.search_index (page_slug, title, content, section) VALUES

-- Getting Started
('getting-started', 'Getting Started', 'Welcome to the documentation site. This guide walks you through installing dependencies, running the development server, and deploying your first build.', 'Introduction'),
('getting-started', 'Getting Started', 'Run npm install to install all project dependencies. Then run npm run dev to start the local development server on port 4321.', 'Installation'),
('getting-started', 'Getting Started', 'Create a .env file from .env.example and configure your Supabase URL and anon key for interactive features like feedback and search.', 'Configuration'),

-- Guides: Writing Content
('guides/writing-content', 'Writing Content', 'Documentation pages are written in Markdown or MDX and placed in the src/content/docs directory. Each file becomes a page with its filename as the URL slug.', 'Overview'),
('guides/writing-content', 'Writing Content', 'Every documentation file must include YAML frontmatter with at least a title field. Optional fields include description for SEO and sidebar configuration.', 'Frontmatter'),
('guides/writing-content', 'Writing Content', 'Use standard Markdown syntax for headings, lists, links, images, and code blocks. MDX files additionally support importing and using Astro or React components inline.', 'Markdown Syntax'),

-- Guides: Customization
('guides/customization', 'Customization', 'The site appearance is controlled through the Astro Starlight configuration in astro.config.mjs. Customize the site title, logo, colors, and sidebar structure.', 'Overview'),
('guides/customization', 'Customization', 'Starlight supports light and dark themes out of the box. Override CSS custom properties in a global stylesheet to match your brand colors.', 'Theming'),
('guides/customization', 'Customization', 'The sidebar is defined in astro.config.mjs under the starlight integration. Use the sidebar array to organize pages into groups and control display order.', 'Sidebar Configuration'),

-- Guides: Deployment
('guides/deployment', 'Deployment', 'Build the static site with npm run build. The output goes to the dist/ directory and can be deployed to any static hosting provider.', 'Building'),
('guides/deployment', 'Deployment', 'Deploy to Vercel by connecting your Git repository. Vercel auto-detects Astro and configures the build command. Set environment variables in the Vercel dashboard.', 'Vercel'),
('guides/deployment', 'Deployment', 'Deploy with Docker using the included Dockerfile and docker-compose.yml. Run docker compose up --build to create an nginx container serving the static files.', 'Docker'),
('guides/deployment', 'Deployment', 'For Netlify deployment, push to a connected Git repository. Set the build command to npm run build and the publish directory to dist.', 'Netlify'),

-- Reference: Configuration
('reference/configuration', 'Configuration Reference', 'Complete reference for all configuration options available in astro.config.mjs, environment variables, and the Starlight integration settings.', 'Overview'),
('reference/configuration', 'Configuration Reference', 'SITE_URL sets the canonical URL for the site. PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY configure the Supabase client for interactive features.', 'Environment Variables'),

-- Reference: Components
('reference/components', 'Component Reference', 'Built-in components for enhancing documentation pages. Import and use these components in your MDX files for interactive and visual content.', 'Overview'),
('reference/components', 'Component Reference', 'The FeedbackWidget component adds a helpful/not-helpful rating to any page. It posts feedback to Supabase and shows a thank-you message after submission.', 'FeedbackWidget'),
('reference/components', 'Component Reference', 'The SearchDialog component provides full-text search across all documentation pages using the Supabase search index with PostgreSQL tsvector ranking.', 'SearchDialog'),

-- Reference: API
('reference/api', 'API Reference', 'This documentation site exposes no server-side API routes in default configuration. All interactivity uses the Supabase client library directly from the browser.', 'Overview'),
('reference/api', 'API Reference', 'Feedback is submitted via supabase.from(feedback).insert(). The table accepts page_slug (text), helpful (boolean), and an optional comment (text).', 'Feedback API'),
('reference/api', 'API Reference', 'Search queries use supabase.rpc(search_docs, query) which invokes a PostgreSQL function that performs full-text search with tsvector ranking across the search_index table.', 'Search API');

-- ============================================================
-- Sample feedback entries
-- ============================================================
INSERT INTO public.feedback (page_slug, helpful, comment) VALUES
('getting-started', true, 'Clear and easy to follow!'),
('getting-started', true, 'The installation steps worked perfectly.'),
('getting-started', false, 'Would be nice to have more details on configuration options.'),
('guides/writing-content', true, 'Great explanation of frontmatter fields.'),
('guides/deployment', true, 'Docker deployment instructions were exactly what I needed.'),
('reference/configuration', true, NULL),
('reference/components', true, 'The FeedbackWidget section is very helpful.');
