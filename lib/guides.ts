import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type Guide = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: string;
  html: string;
};

export type GuideSummary = Omit<Guide, "html">;

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

function readGuideFile(fileName: string): Guide {
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(GUIDES_DIR, fileName), "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    publishedAt: data.publishedAt as string,
    category: data.category as string,
    html: marked.parse(content, { async: false }),
  };
}

// Reads every guide from disk on each call — fine for a build-time-rendered,
// low-volume content set (a handful to a few dozen articles), matching this
// repo's existing pattern of flat data files with no caching layer.
export function getAllGuides(): GuideSummary[] {
  const fileNames = fs.readdirSync(GUIDES_DIR).filter((f) => f.endsWith(".md"));
  return fileNames
    .map((fileName) => {
      const guide = readGuideFile(fileName);
      const { slug, title, description, publishedAt, category } = guide;
      return { slug, title, description, publishedAt, category };
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getGuideBySlug(slug: string): Guide | null {
  const filePath = path.join(GUIDES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return readGuideFile(`${slug}.md`);
}
