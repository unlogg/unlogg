// import { generateOGImage } from "fumadocs-ui/og";
import { source } from "@/lib/source";
import { notFound } from "next/navigation";
import { Icons } from "@/components/icons";
import { generateOGImage } from "./og";
import { readFileSync } from "node:fs";

const font = readFileSync("./app/docs-og/[...slug]/DMSans-regular.ttf");
const fontBold = readFileSync("./app/docs-og/[...slug]/Sora-Bold.ttf");
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return generateOGImage({
    title: page.data.title,
    description: page.data.description,
    fonts: [
      {
        name: "Sora",
        data: fontBold,
        weight: 600,
        style: "normal",
      },
      {
        name: "DM Sans",
        data: font,
        weight: 400,
        style: "normal",
      },
    ],

    // site: "unlogg",
    // primaryColor: "#353532",
    // primaryTextColor: "#b9ee0b",
  });
}

export function generateStaticParams() {
  return source.generateParams().map((page) => ({
    ...page,
    slug: [...page.slug, "image.png"],
  }));
}
