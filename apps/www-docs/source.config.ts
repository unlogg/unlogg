import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema.extend({
      isNew: z.boolean().optional(),
      isAlpha: z.boolean().optional(),
    }),
  },
  meta: {
    schema: metaSchema.extend({
      isNew: z.boolean().optional(),
      isAlpha: z.boolean().optional(),
    }),
  },
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
