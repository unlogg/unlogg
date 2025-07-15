"use client";

import { Button } from "@unlogg/ui/components/button";
import ActiveButton from "@unlogg/ui/components/unlogg-ui/active-button/active-button";
import { Bug, Map, Megaphone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeCustomizer } from "../theme-customizer";
import { useMobile } from "@unlogg/ui/hooks/unlogg-hooks/use-mobile";

function SiteHeader() {
  const pathname = usePathname();
  const isMobile = useMobile();
  return (
    <header className="sticky top-0 z-50 bg-background h-[50px]">
      <div className="border-b mx-auto max-w-7xl p-2 ">
        {" "}
        <div className="inline-flex items-center justify-between gap-4 w-full">
          <div>
            <Link href="/" className="text-lg font-bold">
              Unlogg
            </Link>
          </div>
          <div className="flex items-center gap-2 md:gap-4 flex-1 overflow-x-auto flex-nowrap scrollbar-hide ">
            <ActiveButton
              asChild
              isActive={pathname === "/feedbacks"}
              size={isMobile ? "sm" : "default"}
            >
              <Link href="/feedbacks" className="text-lg font-bold">
                Feedback <Megaphone className="inline size-4" />
              </Link>
            </ActiveButton>
            <ActiveButton
              asChild
              isActive={pathname === "/roadmaps"}
              size={isMobile ? "sm" : "default"}
            >
              <Link href="/roadmaps" className="text-lg font-bold">
                Roadmap <Map className="inline size-4" />
              </Link>
            </ActiveButton>
            <ActiveButton
              asChild
              isActive={pathname === "/bugs"}
              size={isMobile ? "sm" : "default"}
            >
              <Link href="/bugs" className="text-lg font-bold">
                Bugs <Bug className="inline size-4" />
              </Link>
            </ActiveButton>
          </div>

          <div></div>
          {/* <div>
            <ThemeCustomizer />
          </div> */}
        </div>
      </div>
    </header>
  );
}

export { SiteHeader };
