import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  integrations: [
    starlight({
      title: "Docs",
      sidebar: [
        { label: "Getting Started", items: [{ label: "Introduction", link: "/docs/getting-started" }] },
      ],
    }),
  ],
});
