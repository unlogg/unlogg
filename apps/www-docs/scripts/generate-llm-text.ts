import {
  writeFileSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
} from "fs";
import { join, extname } from "path";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";

const processor = remark().use(remarkMdx).use(remarkGfm);

function getAllMdxFiles(
  dir: string,
  baseDir: string = dir
): Array<{ path: string; relativePath: string }> {
  const files: Array<{ path: string; relativePath: string }> = [];

  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath, baseDir));
    } else if (extname(item) === ".mdx") {
      const relativePath = fullPath.replace(baseDir, "").replace(/^\//, "");
      files.push({ path: fullPath, relativePath });
    }
  }

  return files;
}

async function processMdxFile(filePath: string, relativePath: string) {
  const content = readFileSync(filePath, "utf-8");

  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) {
    return null;
  }

  const [, frontmatter, body] = frontmatterMatch;

  // Parse frontmatter (simple YAML parsing)
  const title =
    frontmatter.match(/title:\s*(.+)/)?.[1]?.replace(/['"]/g, "") || "Untitled";
  const description =
    frontmatter.match(/description:\s*(.+)/)?.[1]?.replace(/['"]/g, "") || "";

  // Process MDX content
  const processed = await processor.process({ value: body });

  // Generate URL from file path
  const url =
    "/" + relativePath.replace(/\/index\.mdx$/, "").replace(/\.mdx$/, "");

  return {
    title,
    description,
    url,
    content: processed.value,
    slug: relativePath
      .replace(/\/index\.mdx$/, "")
      .replace(/\.mdx$/, "")
      .split("/"),
  };
}

async function generateLLMContent() {
  console.log("Generating LLM content...");

  // Ensure output directory exists in public folder
  const outputDir = join(process.cwd(), "public", "llm");
  const outputDirFull = join(process.cwd(), "public");
  //   mkdirSync(outputDir, { recursive: true });

  // Create llms.mdx subdirectory for individual page files
  const llmsMdxDir = join(process.cwd(), "public", "llms.mdx");
  mkdirSync(llmsMdxDir, { recursive: true });

  // Get all MDX files
  const contentDir = join(process.cwd(), "content/docs");
  const mdxFiles = getAllMdxFiles(contentDir);

  const pageContents = new Map<string, string>();

  for (const { path, relativePath } of mdxFiles) {
    try {
      const pageData = await processMdxFile(path, relativePath);
      if (!pageData) continue;

      const llmText = `# ${pageData.title}
URL: ${pageData.url}

${pageData.description}

${pageData.content}`;

      const key = pageData.slug.join("/") || "index";
      pageContents.set(key, llmText);

      // Create individual MDX file for each page
      const slugPath = pageData.slug.join("/") || "index";
      let mdxFilePath: string;

      // For nested paths, create directory structure
      if (pageData.slug.length > 1) {
        const nestedDir = join(llmsMdxDir, ...pageData.slug.slice(0, -1));
        mkdirSync(nestedDir, { recursive: true });
        mdxFilePath = join(
          nestedDir,
          `${pageData.slug[pageData.slug.length - 1]}.txt`
        );
        writeFileSync(mdxFilePath, llmText);
      } else {
        mdxFilePath = join(llmsMdxDir, `${slugPath}.txt`);
        writeFileSync(mdxFilePath, llmText);
      }

      console.log(`Generated content for: ${key} -> ${mdxFilePath}`);
    } catch (error) {
      console.error(`Failed to generate content for ${relativePath}:`, error);
    }
  }

  // Generate all pages content
  const allContent = Array.from(pageContents.values()).join("\n\n");
  //   writeFileSync(join(outputDir, "llms-all.txt"), allContent);
  // Also write to the full output directory (as in the https://llmstxt.org/ specs)
  writeFileSync(join(outputDirFull, "llms-full.txt"), allContent);

  // Generate filtered content (excluding unlogg-ui)
  const filteredPages = Array.from(pageContents.entries())
    .filter(([key]) => !key.startsWith("unlogg-ui/"))
    .map(([, content]) => content);
  const filteredContent = filteredPages.join("\n\n");
  //   writeFileSync(join(outputDir, "llms-filtered.txt"), filteredContent);

  writeFileSync(join(outputDirFull, "llms-full-filtered.txt"), filteredContent);

  //   // Generate individual page mapping
  //   const pageMapping = Object.fromEntries(pageContents);
  //   writeFileSync(
  //     join(outputDir, "llm-pages.json"),
  //     JSON.stringify(pageMapping, null, 2)
  //   );

  console.log(`Generated content for ${pageContents.size} pages`);
}

generateLLMContent().catch(console.error);
