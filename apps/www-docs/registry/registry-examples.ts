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
    name: "use-disclosure-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    // registryDependencies: ["https://unlogg.com/r/use-boolean.json"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-disclosure-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-disclosure-ex-01")
    ),
  },

  {
    name: "use-interval-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-interval.json"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-interval-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-interval-ex-01")
    ),
  },

  {
    name: "use-interval-ex-02",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-interval.json"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-interval-ex-02.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-interval-ex-02")
    ),
  },
  {
    name: "use-timeout-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-timeout.json"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-timeout-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-timeout-ex-01")
    ),
  },
  {
    name: "use-toggle-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-boolean.json"],
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
  {
    name: "use-local-storage-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-local-storage.json"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-local-storage-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-local-storage-ex-01")
    ),
  },
];
