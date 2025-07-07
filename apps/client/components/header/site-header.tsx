import { Button } from "@unlogg/ui/components/button";
import { Bug, Map, Megaphone } from "lucide-react";
import Link from "next/link";

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background h-[50px]">
      <div className="border-b mx-auto max-w-6xl p-2 ">
        {" "}
        <div className="inline-flex items-center justify-between gap-4">
          <div>
            <Link href="/" className="text-lg font-bold">
              Unlogg
            </Link>
          </div>
          <Button asChild variant="outlineSecondary" size="sm">
            <Link href="/feedbacks" className="text-lg font-bold">
              Feedback <Megaphone className="inline size-4" />
            </Link>
          </Button>
          <Button asChild variant="outlineSecondary" size="sm">
            <Link href="/roadmaps" className="text-lg font-bold">
              Roadmap <Map className="inline size-4" />
            </Link>
          </Button>
          <Button asChild variant="outlineSecondary" size="sm">
            <Link href="/bugs" className="text-lg font-bold">
              Bugs <Bug className="inline size-4" />
            </Link>
          </Button>
          <div></div>
          <div></div>
        </div>
      </div>
    </header>
  );
}

export { SiteHeader };
