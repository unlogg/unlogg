import type { Registry } from "@/registry/schema";
import * as React from "react";

export const examples: Registry = [
  {
    name: "test-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/test-component.json"],
    files: [
      {
        path: "../../packages/ui/src/components/unlogg-ui/test/test-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () =>
        import("../../../packages/ui/src/components/unlogg-ui/test/test-ex-01")
    ),
  },

  {
    name: "use-boolean-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    // registryDependencies: ["https://unlogg.com/r/use-boolean.json"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-boolean-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-boolean-ex-01")
    ),
  },
  {
    name: "use-toggle-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    // registryDependencies: ["https://unlogg.com/r/use-boolean.json"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-toggle-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-toggle-ex-01")
    ),
  },
];
