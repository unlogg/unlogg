// import { generateOGImage } from "fumadocs-ui/og";
import { source } from "@/lib/source";
import { notFound } from "next/navigation";
import { Icons } from "@/components/icons";
import { generateOGImage } from "./og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// // Use absolute paths based on process.cwd() to ensure they work in all environments
// const dmRegularFont = readFileSync(
//   join(process.cwd(), "public/fonts/DMSans-regular.ttf")
// );
// const soraBoldFont = readFileSync(
//   join(process.cwd(), "public/fonts/Sora-Bold.ttf")
// );

async function loadGoogleFont(font: string, weight: number) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("❌ Failed to load font data!");
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  try {
    // Fetch fonts from Google Fonts or CDN

    return generateOGImage({
      title: page.data.title,
      description: page.data.description,
      fonts: [
        {
          name: "Sora",
          // data: fontBold,
          data: await loadGoogleFont("Sora", 600),
          weight: 600,
          style: "normal",
        },
        {
          name: "DM Sans",
          data: await loadGoogleFont("DM Sans", 400),
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
