import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";

const htmlPages = [
  "404.html",
  "about.html",
  "blog-single.html",
  "blog.html",
  "contact.html",
  "faqs.html",
  "image-gallery.html",
  "index-2.html",
  "index-image.html",
  "index-slider.html",
  "index.html",
  "pricing.html",
  "project-single.html",
  "projects.html",
  "service-single.html",
  "services.html",
  "team-single.html",
  "team.html",
  "testimonial.html",
  "video-gallery.html",
] as const;

const htmlPageSet = new Set<string>(htmlPages);

type PageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    {},
    ...htmlPages.map((page) => ({
      slug: [page],
    })),
  ];
}

function getPageName(slug?: string[]) {
  if (!slug || slug.length === 0) {
    return "index.html";
  }

  if (slug.length !== 1) {
    return null;
  }

  const [page] = slug;
  if (htmlPageSet.has(page)) {
    return page;
  }

  const htmlPage = `${page}.html`;
  return htmlPageSet.has(htmlPage) ? htmlPage : null;
}

function extractBody(html: string) {
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;

  return body
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .trim();
}

export default async function HtmlPage({ params }: PageProps) {
  const { slug } = await params;
  const pageName = getPageName(slug);

  if (!pageName) {
    notFound();
  }

  const html = await readFile(path.join(process.cwd(), pageName), "utf8");
  const body = extractBody(html);

  return <main dangerouslySetInnerHTML={{ __html: body }} />;
}
