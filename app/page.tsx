import { getHtmlBody } from "@/lib/html-pages";

export default async function HomePage() {
  const body = await getHtmlBody("index.html");

  return <main dangerouslySetInnerHTML={{ __html: body }} />;
}
