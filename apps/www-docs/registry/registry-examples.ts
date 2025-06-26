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
    registryDependencies: ["https://unlogg.com/r/use-boolean.json"],
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
    name: "use-counter-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-counter.json"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-counter-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-counter-ex-01")
    ),
  },

  {
    name: "use-countdown-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-countdown.json"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-countdown-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-countdown-ex-01")
    ),
  },

  {
    name: "use-debounce-callback-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-debounce-callback.json"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-debounce-callback-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-debounce-callback-ex-01")
    ),
  },

  {
    name: "use-debounce-value-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-debounce-value.json"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-debounce-value-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-debounce-value-ex-01")
    ),
  },
  {
    name: "use-disclosure-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-disclosure.json"],
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
    registryDependencies: ["https://unlogg.com/r/use-toggle.json"],
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

  {
    name: "use-state-history-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-state-history.json"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-state-history-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-state-history-ex-01")
    ),
  },
];
