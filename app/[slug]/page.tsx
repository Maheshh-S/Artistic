import { getHtmlBody, pages, pageSlugs, type PageSlug } from "@/lib/html-pages";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return pageSlugs.map((slug) => ({ slug }));
}

export default async function SitePage({ params }: PageProps) {
  const { slug } = await params;

  if (!pageSlugs.includes(slug as PageSlug)) {
    notFound();
  }

  const body = await getHtmlBody(pages[slug as PageSlug]);

  return <main dangerouslySetInnerHTML={{ __html: body }} />;
}
