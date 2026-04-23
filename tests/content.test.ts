import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const DOCS_DIR = join(process.cwd(), "src/content/docs");

function listMarkdownFiles(dir: string): string[] {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => join(dir, f));
}

function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const result: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim();
    result[key] = value;
  }
  return result;
}

describe("docs content collection", () => {
  const files = listMarkdownFiles(DOCS_DIR);

  it("has at least one doc file", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it("every doc file has a non-empty title in frontmatter", () => {
    for (const file of files) {
      const content = readFileSync(file, "utf-8");
      const fm = parseFrontmatter(content);
      expect(fm.title, `${file} is missing a title`).toBeTruthy();
    }
  });

  it("getting-started.md exists and has correct title", () => {
    const path = join(DOCS_DIR, "getting-started.md");
    const content = readFileSync(path, "utf-8");
    const fm = parseFrontmatter(content);
    expect(fm.title).toBe("Getting Started");
  });

  it("doc content is not empty after frontmatter", () => {
    for (const file of files) {
      const content = readFileSync(file, "utf-8");
      // Strip frontmatter and check remaining content
      const body = content.replace(/^---\n[\s\S]*?\n---\n?/, "").trim();
      expect(body.length, `${file} has no body content`).toBeGreaterThan(0);
    }
  });
});

describe("astro.config.mjs", () => {
  it("config file exists", () => {
    const config = readFileSync(join(process.cwd(), "astro.config.mjs"), "utf-8");
    expect(config).toContain("starlight");
  });

  it("sidebar includes getting-started link", () => {
    const config = readFileSync(join(process.cwd(), "astro.config.mjs"), "utf-8");
    expect(config).toContain("getting-started");
  });
});

describe("layout file", () => {
  it("Base.astro includes viewport meta tag", () => {
    const layout = readFileSync(join(process.cwd(), "src/layouts/Base.astro"), "utf-8");
    expect(layout).toContain("viewport");
  });

  it("Base.astro includes charset meta tag", () => {
    const layout = readFileSync(join(process.cwd(), "src/layouts/Base.astro"), "utf-8");
    expect(layout).toContain("charset");
  });

  it("Base.astro renders the title prop", () => {
    const layout = readFileSync(join(process.cwd(), "src/layouts/Base.astro"), "utf-8");
    expect(layout).toContain("{title}");
  });

  it("Base.astro includes a slot for page content", () => {
    const layout = readFileSync(join(process.cwd(), "src/layouts/Base.astro"), "utf-8");
    expect(layout).toContain("<slot");
  });
});

describe("home page", () => {
  it("index.astro uses the Base layout", () => {
    const page = readFileSync(join(process.cwd(), "src/pages/index.astro"), "utf-8");
    expect(page).toContain("Base.astro");
  });

  it("index.astro links to getting-started docs", () => {
    const page = readFileSync(join(process.cwd(), "src/pages/index.astro"), "utf-8");
    expect(page).toContain("/docs/getting-started");
  });

  it("index.astro has an h1 heading", () => {
    const page = readFileSync(join(process.cwd(), "src/pages/index.astro"), "utf-8");
    expect(page).toMatch(/<h1[^>]*>/);
  });
});
