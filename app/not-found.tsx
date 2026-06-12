import { readFile } from "node:fs/promises";
import path from "node:path";

function extractBody(html: string) {
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;

  return body
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .trim();
}

export default async function NotFound() {
  const html = await readFile(path.join(process.cwd(), "404.html"), "utf8");
  const body = extractBody(html);

  return <main dangerouslySetInnerHTML={{ __html: body }} />;
}
