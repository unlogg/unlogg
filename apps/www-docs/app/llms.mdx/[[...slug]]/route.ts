import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  try {
    const { slug } = params;

    // Construct the file path
    let filePath: string;

    if (!slug || slug.length === 0) {
      filePath = join(process.cwd(), "public", "llms.mdx", "index.mdx");
    } else {
      filePath = join(
        process.cwd(),
        "public",
        "llms.mdx",
        `${slug.join("/")}.mdx`
      );
    }

    // Read the file
    const content = readFileSync(filePath, "utf-8");

    // Return as plain text
    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Error serving MDX file:", error);
    return new NextResponse("File not found", { status: 404 });
  }
}
