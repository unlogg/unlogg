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
    name: "use-click-outside-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-click-outside.json"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-click-outside-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-click-outside-ex-01")
    ),
  },
  {
    name: "use-clipboard-copy-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-clipboard-copy.json"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-clipboard-copy-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-clipboard-copy-ex-01")
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
    name: "use-element-size-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-element-size.json"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-element-size-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-element-size-ex-01")
    ),
  },
  {
    name: "use-hover-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-hover.json"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-hover-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-hover-ex-01")
    ),
  },
  {
    name: "use-is-client-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-is-client.json"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-is-client-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-is-client-ex-01")
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
    name: "use-media-query-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-media-query.json"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-media-query-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-media-query-ex-01")
    ),
  },
  {
    name: "use-mobile-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-mobile.json"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-mobile-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-mobile-ex-01")
    ),
  },
  {
    name: "use-scroll-into-view-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-scroll-into-view.json"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-scroll-into-view-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-scroll-into-view-ex-01")
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
  {
    name: "use-window-size-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-window-size.json"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-window-size-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-window-size-ex-01")
    ),
  },
];
