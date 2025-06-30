import { docs } from "@/.source";
import { SidebarItem } from "@/components/docs/sidebar-item";
import { create } from "@/components/icons";
import { loader } from "fumadocs-core/source";
import { icons } from "lucide-react";

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  pageTree: {
    attachFile(node, file) {
      // // you can access its file information
      // console.log(file?.data);
      const isNew = file?.data.isNew ?? false;
      const isAlpha = file?.data.isAlpha ?? false;

      node.name = (
        <SidebarItem
          name={node.name as string}
          isNew={isNew}
          isAlpha={isAlpha}
        />
      );

      return node;
    },
  },
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (icon && icon in icons)
      return create({ icon: icons[icon as keyof typeof icons] });
  },
});
