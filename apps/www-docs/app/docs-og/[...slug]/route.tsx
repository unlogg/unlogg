// import { generateOGImage } from "fumadocs-ui/og";
import { source } from "@/lib/source";
import { notFound } from "next/navigation";
import { Icons } from "@/components/icons";
import { generateOGImage } from "./og";
import { readFileSync } from "node:fs";

// const font = readFileSync("./app/docs-og/[...slug]/DMSans-regular.ttf");
// const fontBold = readFileSync("./app/docs-og/[...slug]/Sora-Bold.ttf");

const dmRegularFont = readFileSync("./public/fonts/DMSans-regular.ttf");
const soraBoldFont = readFileSync("./public/fonts/Sora-Bold.ttf");

// Make sure the font exists in the specified path:
// const dmRegularFontP = fetch(
//   new URL("../../../public/fonts/DMSans-Regular.ttf", import.meta.url)
// ).then((res) => res.arrayBuffer());

// const soraBoldFontP = fetch(
//   new URL("../../../public/fonts/Sora-Bold.ttf", import.meta.url)
// ).then((res) => res.arrayBuffer());

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  try {
    // const [dmRegularFont, soraBoldFont] = await Promise.all([
    //   dmRegularFontP,
    //   soraBoldFontP,
    // ]);

    return generateOGImage({
      title: page.data.title,
      description: page.data.description,
      fonts: [
        {
          name: "Sora",
          // data: fontBold,
          data: soraBoldFont,
          weight: 600,
          style: "normal",
        },
        {
          name: "DM Sans",
          data: dmRegularFont,
          weight: 400,
          style: "normal",
        },
      ],

      // site: "unlogg",
      // primaryColor: "#353532",
      // primaryTextColor: "#b9ee0b",
    });
  } catch (error) {
    console.error(`${error}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

export function generateStaticParams() {
  return source.generateParams().map((page) => ({
    ...page,
    slug: [...page.slug, "image.png"],
  }));
}
