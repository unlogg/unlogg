import { siteConfig } from "@/config/site";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { AtomIcon, BookIcon } from "lucide-react";
import Image from "next/image";
import { Logo } from "./logo";
import { ThemeCustomizer } from "@/components/theme-customizer";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className="relative flex w-full items-center justify-around space-x-2">
        <Image
          src="/unlogg-logo-icon.svg"
          alt="logo"
          width={30}
          height={30}
          className="block"
        />
        <div className="w-[75px]">
          <Logo />
        </div>
        {/* <span className="grow-0 bg-secondary text-foreground ml-0.5 hidden rounded-full px-1.5 py-px text-[10px] font-medium select-none md:block">
          beta
        </span> */}
      </div>
    ),
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [
    // {
    //   children: (
    //     <Link
    //       className="flex items-center gap-2"
    //       href="https://unlogg.com"
    //       aria-label="Unlogg"
    //       target="_blank"
    //     >
    //       <div className="group relative inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-1 text-sm transition-colors dark:bg-zinc-100">
    //         <div className="absolute inset-0 rounded-lg bg-linear-to-r from-lime-500 via-lime-400 to-green-500 opacity-60 blur-sm transition-opacity duration-500 group-hover:opacity-80" />
    //         <div className="relative">
    //           <span className="text-nowrap text-white dark:text-zinc-900">
    //             Unlogg
    //           </span>
    //         </div>
    //         <ArrowUpRight className="relative h-3.5 w-3.5 text-white/90 dark:text-zinc-900/90" />
    //       </div>
    //     </Link>
    //   ),
    //   secondary: false,
    //   type: "custom",
    // },
    {
      icon: <BookIcon />,
      text: "Docs",
      url: "/docs/unlogg-docs",
      // secondary items will be displayed differently on navbar
      secondary: false,
    },
    {
      icon: <BookIcon />,
      text: "UI",
      url: "/docs/unlogg-ui",
      // secondary items will be displayed differently on navbar
      secondary: false,
    },

    {
      icon: <AtomIcon />,
      text: "Hooks",
      url: "/docs/unlogg-hooks",
      // secondary items will be displayed differently on navbar
      secondary: false,
    },
    // {
    //   type: "custom",
    //   children: <ThemeCustomizer />,
    // },
  ],
};
