import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { ActiveThemeProvider } from "@/components/active-theme";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <DocsLayout tree={source.pageTree} {...baseOptions}>
        <div id="docs-page">{children}</div>
      </DocsLayout>
    </>
  );
}
