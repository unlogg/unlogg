import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import { icons } from "lucide-react";
import { create } from "@/components/icons";
import Hello from "@unlogg/ui/components/unlogg-ui/test/test";
import { CustomNode } from "./custom-node";

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  // pageTree: {
  //   attachFile(node, file) {
  //     // you can access its file information
  //     console.log(file?.data);
  //     // JSX nodes are allowed
  //     node.name = <div>Hello</div>;

  //     return node;
  //   },
  // },
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (icon && icon in icons)
      return create({ icon: icons[icon as keyof typeof icons] });
  },
});
