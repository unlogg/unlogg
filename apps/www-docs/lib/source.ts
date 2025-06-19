import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import { icons } from "lucide-react";
import { create } from "@/components/icons";

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (icon && icon in icons)
      return create({ icon: icons[icon as keyof typeof icons] });
  },
});
