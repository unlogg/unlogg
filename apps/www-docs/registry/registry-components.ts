import type { Registry } from "@/registry/schema";
import * as React from "react";

export const components: Registry = [
  {
    name: "test-component",
    type: "registry:component",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/components/unlogg-ui/test.tsx",
        type: "registry:component",
      },
    ],
    component: React.lazy(
      () => import("../../../packages/ui/src/components/unlogg-ui/test")
    ),
  },
];
