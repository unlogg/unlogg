import type { Registry } from "@/registry/schema";
import * as React from "react";

export const examples: Registry = [
  {
    name: "active-button-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/components/unlogg-ui/active-button/active-button-ex-01.tsx",
        type: "registry:component",
      },
    ],
    component: React.lazy(
      () =>
        import(
          "../../../packages/ui/src/components/unlogg-ui/active-button/active-button-ex-01"
        )
    ),
  },

  {
    name: "upvote-button-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/components/unlogg-ui/upvote-button/upvote-button-ex-01.tsx",
        type: "registry:component",
      },
    ],
    component: React.lazy(
      () =>
        import(
          "../../../packages/ui/src/components/unlogg-ui/upvote-button/upvote-button-ex-01"
        )
    ),
  },
  {
    name: "user-selector-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/user-selector.json"],
    files: [
      {
        path: "../../packages/ui/src/components/unlogg-ui/user-selector/user-selector-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () =>
        import(
          "../../../packages/ui/src/components/unlogg-ui/user-selector/user-selector-ex-01"
        )
    ),
  },

  {
    name: "user-selector-ex-02",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/user-selector.json"],
    files: [
      {
        path: "../../packages/ui/src/components/unlogg-ui/user-selector/user-selector-ex-02.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () =>
        import(
          "../../../packages/ui/src/components/unlogg-ui/user-selector/user-selector-ex-02"
        )
    ),
  },
  {
    name: "combobox-add-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/combobox-add.json"],
    files: [
      {
        path: "../../packages/ui/src/components/unlogg-ui/combobox-add/combobox-add-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () =>
        import(
          "../../../packages/ui/src/components/unlogg-ui/combobox-add/combobox-add-ex-01"
        )
    ),
  },
  {
    name: "combobox-add-ex-02",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/combobox-add.json"],
    files: [
      {
        path: "../../packages/ui/src/components/unlogg-ui/combobox-add/combobox-add-ex-02.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () =>
        import(
          "../../../packages/ui/src/components/unlogg-ui/combobox-add/combobox-add-ex-02"
        )
    ),
  },
  {
    name: "combobox-add-ex-03",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/combobox-add.json"],
    files: [
      {
        path: "../../packages/ui/src/components/unlogg-ui/combobox-add/combobox-add-ex-03.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () =>
        import(
          "../../../packages/ui/src/components/unlogg-ui/combobox-add/combobox-add-ex-03"
        )
    ),
  },
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
    registryDependencies: ["https://unlogg.com/r/use-boolean.json", "button"],
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
    registryDependencies: [
      "https://unlogg.com/r/use-click-outside.json",
      "button",
    ],
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
    registryDependencies: [
      "https://unlogg.com/r/use-clipboard-copy.json",
      "badge",
      "button",
      "card",
      "input",
    ],
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
    name: "use-countdown-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-countdown.json", "button"],
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
    name: "use-counter-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "https://unlogg.com/r/use-counter.json",
      "button",
      "input",
    ],
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
    name: "use-debounced-callback-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "https://unlogg.com/r/use-debounced-callback.json",
      "input",
    ],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-debounced-callback-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-debounced-callback-ex-01")
    ),
  },

  {
    name: "use-debounced-value-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "https://unlogg.com/r/use-debounced-value.json",
      "input",
    ],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-debounced-value-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-debounced-value-ex-01")
    ),
  },
  {
    name: "use-disclosure-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "https://unlogg.com/r/use-disclosure.json",
      "button",
      "dialog",
    ],
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
    name: "use-document-title-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "https://unlogg.com/r/use-document-title.json",
      "badge",
      "button",
      "card",
      "input",
    ],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-document-title-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-document-title-ex-01")
    ),
  },
  {
    name: "use-element-size-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "https://unlogg.com/r/use-element-size.json",
      "badge",
      "button",
      "card",
    ],
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
    registryDependencies: [
      "https://unlogg.com/r/use-hover.json",
      "badge",
      "button",
      "card",
    ],
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
    name: "use-idle-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "https://unlogg.com/r/use-idle.json",
      "badge",
      "button",
      "card",
      "input",
    ],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-idle-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-idle-ex-01")
    ),
  },

  {
    name: "use-in-viewport-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-in-viewport.json"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-in-viewport-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-in-viewport-ex-01")
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
    name: "use-is-client-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "https://unlogg.com/r/use-is-client.json",
      "badge",
      "card",
    ],
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
    name: "use-is-online-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "https://unlogg.com/r/use-is-online.json",
      "badge",
      "card",
    ],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-is-online-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-is-online-ex-01")
    ),
  },

  {
    name: "use-is-online-ex-02",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-is-online.json", "card"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-is-online-ex-02.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-is-online-ex-02")
    ),
  },

  {
    name: "use-leave-page-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "https://unlogg.com/r/use-leave-page.json",
      "badge",
      "card",
    ],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-leave-page-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-leave-page-ex-01")
    ),
  },

  {
    name: "use-leave-page-ex-02",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "https://unlogg.com/r/use-leave-page.json",
      "button",
      "card",
    ],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-leave-page-ex-02.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-leave-page-ex-02")
    ),
  },

  {
    name: "use-leave-page-ex-03",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "https://unlogg.com/r/use-leave-page.json",
      "card",
      "input",
    ],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-leave-page-ex-03.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-leave-page-ex-03")
    ),
  },

  {
    name: "use-local-storage-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "https://unlogg.com/r/use-local-storage.json",
      "badge",
      "button",
      "card",
    ],
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
    name: "use-local-storage-ex-02",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "https://unlogg.com/r/use-local-storage.json",
      "badge",
      "button",
      "card",
      "input",
    ],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-local-storage-ex-02.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-local-storage-ex-02")
    ),
  },
  {
    name: "use-media-query-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "https://unlogg.com/r/use-media-query.json",
      "badge",
      "card",
    ],
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
    registryDependencies: [
      "https://unlogg.com/r/use-mobile.json",
      "badge",
      "button",
      "card",
    ],
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
    name: "use-mobile-ex-02",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "https://unlogg.com/r/use-mobile.json",
      "badge",
      "button",
      "card",
    ],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-mobile-ex-02.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-mobile-ex-02")
    ),
  },

  {
    name: "use-mobile-ex-03",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "https://unlogg.com/r/use-mobile.json",
      "badge",
      "button",
      "card",
    ],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-mobile-ex-03.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-mobile-ex-03")
    ),
  },
  {
    name: "use-scroll-into-view-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "https://unlogg.com/r/use-scroll-into-view.json",
      "badge",
      "button",
      "card",
    ],
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
    name: "use-scroll-into-view-ex-02",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "https://unlogg.com/r/use-scroll-into-view.json",
      "badge",
      "button",
      "card",
    ],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-scroll-into-view-ex-02.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () => import("@unlogg/ui/hooks/unlogg-hooks/use-scroll-into-view-ex-02")
    ),
  },

  {
    name: "use-state-history-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "https://unlogg.com/r/use-state-history.json",
      "button",
      "input",
    ],
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
    name: "use-timeout-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: ["https://unlogg.com/r/use-timeout.json", "button"],
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
    registryDependencies: ["https://unlogg.com/r/use-toggle.json", "button"],
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
    name: "use-window-size-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "https://unlogg.com/r/use-window-size.json",
      "badge",
      "card",
    ],
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
  {
    name: "date-selector-ex-01",
    type: "registry:example",
    dependencies: ["lucide-react", "chrono-node"],
    registryDependencies: ["https://unlogg.com/r/date-selector.json"],
    files: [
      {
        path: "../../packages/ui/src/components/unlogg-ui/date-selector/date-selector-ex-01.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () =>
        import(
          "../../../packages/ui/src/components/unlogg-ui/date-selector/date-selector-ex-01"
        )
    ),
  },
  {
    name: "date-selector-ex-02",
    type: "registry:example",
    dependencies: ["lucide-react", "chrono-node"],
    registryDependencies: ["https://unlogg.com/r/date-selector.json"],
    files: [
      {
        path: "../../packages/ui/src/components/unlogg-ui/date-selector/date-selector-ex-02.tsx",
        type: "registry:example",
      },
    ],
    component: React.lazy(
      () =>
        import(
          "../../../packages/ui/src/components/unlogg-ui/date-selector/date-selector-ex-02"
        )
    ),
  },
];
