// @ts-check
import { defineConfig } from "astro/config";
import yaml from "@rollup/plugin-yaml"
import { remarkReadingTime } from "./remark-reading-time.mjs";
import sectionize from "remark-sectionize";
import remarkToc from "remark-toc";

import { rehypePrettyCode } from "rehype-pretty-code";
import { 
  transformerNotationDiff, 
  transformerNotationFocus,
  transformerMetaHighlight,
} from "@shikijs/transformers";

import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://samuzora.com",
  integrations: [vue(), tailwind(), sitemap()],

  markdown: {
    syntaxHighlight: false,
    shikiConfig: {
      wrap: true
    },
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "catppuccin-mocha",
          transformers: [
            transformerNotationDiff(),
            transformerNotationFocus(),
            transformerMetaHighlight(),
          ],
        },
      ],
    ],
    remarkPlugins: [
      remarkReadingTime,
      sectionize as any,
      remarkToc,
    ],
  },

  vite: {
    plugins: [yaml()]
  },
});
