import { readFile } from "node:fs/promises";
import path from "node:path";

export const pages = {
  "404": "404.html",
  about: "about.html",
  "blog-single": "blog-single.html",
  blog: "blog.html",
  contact: "contact.html",
  faqs: "faqs.html",
  "image-gallery": "image-gallery.html",
  "index-2": "index-2.html",
  "index-image": "index-image.html",
  "index-slider": "index-slider.html",
  pricing: "pricing.html",
  "project-single": "project-single.html",
  projects: "projects.html",
  "service-single": "service-single.html",
  services: "services.html",
  "team-single": "team-single.html",
  team: "team.html",
  testimonial: "testimonial.html",
  "video-gallery": "video-gallery.html",
} as const;

export type PageSlug = keyof typeof pages;

const pageByHtmlFile = new Map(
  Object.entries({
    "index.html": "/",
    ...Object.fromEntries(Object.keys(pages).map((slug) => [`${slug}.html`, `/${slug}`])),
  }),
);

const localAssetFolders = ["css/", "images/", "js/", "webfonts/"];

export const pageSlugs = Object.keys(pages) as PageSlug[];

export function htmlRedirects() {
  return [
    {
      source: "/index.html",
      destination: "/",
      permanent: true,
    },
    ...pageSlugs.map((slug) => ({
      source: `/${pages[slug]}`,
      destination: `/${slug}`,
      permanent: true,
    })),
  ];
}

function normalizeLocalUrl(value: string) {
  if (/^(https?:|mailto:|tel:|#|data:|javascript:|\/)/i.test(value)) {
    return value;
  }

  const cleanRoute = pageByHtmlFile.get(value);
  if (cleanRoute) {
    return cleanRoute;
  }

  if (localAssetFolders.some((folder) => value.startsWith(folder))) {
    return `/${value}`;
  }

  return value;
}

function extractBody(html: string) {
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;

  return body
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/\b(href|src)=["']([^"']+)["']/gi, (_match, attr: string, value: string) => {
      return `${attr}="${normalizeLocalUrl(value)}"`;
    })
    .trim();
}

export async function getHtmlBody(fileName: string) {
  const html = await readFile(path.join(process.cwd(), fileName), "utf8");

  return extractBody(html);
}
