import type { Registry } from "@/registry/schema";
import { useBoolean } from "@unlogg/ui/hooks/unlogg-hooks/use-boolean";
import { useClickOutside } from "@unlogg/ui/hooks/unlogg-hooks/use-click-outside";
import { useClipboardCopy } from "@unlogg/ui/hooks/unlogg-hooks/use-clipboard-copy";
import { useCountdown } from "@unlogg/ui/hooks/unlogg-hooks/use-countdown";
import { useCounter } from "@unlogg/ui/hooks/unlogg-hooks/use-counter";
import { useDebounceCallback } from "@unlogg/ui/hooks/unlogg-hooks/use-debounce-callback";
import { useDebounceValue } from "@unlogg/ui/hooks/unlogg-hooks/use-debounce-value";
import { useDisclosure } from "@unlogg/ui/hooks/unlogg-hooks/use-disclosure";
import { useElementSize } from "@unlogg/ui/hooks/unlogg-hooks/use-element-size";
import { useInterval } from "@unlogg/ui/hooks/unlogg-hooks/use-interval";
import { useHover } from "@unlogg/ui/hooks/unlogg-hooks/use-hover";
import { useIsClient } from "@unlogg/ui/hooks/unlogg-hooks/use-is-client";
import { useLocalStorage } from "@unlogg/ui/hooks/unlogg-hooks/use-local-storage";
import { useMediaQuery } from "@unlogg/ui/hooks/unlogg-hooks/use-media-query";
import { useMobile } from "@unlogg/ui/hooks/unlogg-hooks/use-mobile";
import { useScrollIntoView } from "@unlogg/ui/hooks/unlogg-hooks/use-scroll-into-view";
import { useStateHistory } from "@unlogg/ui/hooks/unlogg-hooks/use-state-history";
import { useTimeout } from "@unlogg/ui/hooks/unlogg-hooks/use-timeout";
import { useToggle } from "@unlogg/ui/hooks/unlogg-hooks/use-toggle";
import { useWindowSize } from "@unlogg/ui/hooks/unlogg-hooks/use-window-size";

export const hooks: Registry = [
  {
    name: "use-boolean",
    type: "registry:hook",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-boolean.ts",
        type: "registry:hook",
        target: "/hooks/use-boolean.ts",
      },
    ],
    component: useBoolean,
  },
  {
    name: "use-click-outside",
    type: "registry:hook",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-click-outside.ts",
        type: "registry:hook",
        target: "/hooks/use-click-outside.ts",
      },
    ],
    component: useClickOutside,
  },
  {
    name: "use-clipboard-copy",
    type: "registry:hook",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-clipboard-copy.ts",
        type: "registry:hook",
        target: "/hooks/use-clipboard-copy.ts",
      },
    ],
    component: useClipboardCopy,
  },
  {
    name: "use-countdown",
    type: "registry:hook",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-countdown.ts",
        type: "registry:hook",
        target: "/hooks/use-countdown.ts",
      },
    ],
    component: useCountdown,
  },
  {
    name: "use-counter",
    type: "registry:hook",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-counter.ts",
        type: "registry:hook",
        target: "/hooks/use-counter.ts",
      },
    ],
    component: useCounter,
  },
  {
    name: "use-debounced-callback",
    type: "registry:hook",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-debounce-callback.ts",
        type: "registry:hook",
        target: "/hooks/use-debounce-callback.ts",
      },
    ],
    component: useDebounceCallback,
  },
  {
    name: "use-debounced-value",
    type: "registry:hook",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-debounce-value.ts",
        type: "registry:hook",
        target: "/hooks/use-debounce-value.ts",
      },
    ],
    component: useDebounceValue,
  },

  {
    name: "use-disclosure",
    type: "registry:hook",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-disclosure.ts",
        type: "registry:hook",
        target: "/hooks/use-disclosure.ts",
      },
    ],
    component: useDisclosure,
  },
  {
    name: "use-element-size",
    type: "registry:hook",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-element-size.ts",
        type: "registry:hook",
        target: "/hooks/use-element-size.ts",
      },
    ],
    component: useElementSize,
  },
  {
    name: "use-hover",
    type: "registry:hook",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-hover.ts",
        type: "registry:hook",
        target: "/hooks/use-hover.ts",
      },
    ],
    component: useHover,
  },
  {
    name: "use-is-client",
    type: "registry:hook",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-is-client.ts",
        type: "registry:hook",
        target: "/hooks/use-is-client.ts",
      },
    ],
    component: useIsClient,
  },

  {
    name: "use-interval",
    type: "registry:hook",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-interval.ts",
        type: "registry:hook",
        target: "/hooks/use-interval.ts",
      },
    ],
    component: useInterval,
  },
  {
    name: "use-timeout",
    type: "registry:hook",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-timeout.ts",
        type: "registry:hook",
        target: "/hooks/use-timeout.ts",
      },
    ],
    component: useTimeout,
  },

  {
    name: "use-toggle",
    type: "registry:hook",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-toggle.ts",
        type: "registry:hook",
        target: "/hooks/use-toggle.ts",
      },
    ],
    component: useToggle,
  },
  {
    name: "use-local-storage",
    type: "registry:hook",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-local-storage.ts",
        type: "registry:hook",
        target: "/hooks/use-local-storage.ts",
      },
    ],
    component: useLocalStorage,
  },
  {
    name: "use-media-query",
    type: "registry:hook",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-media-query.ts",
        type: "registry:hook",
        target: "/hooks/use-media-query.ts",
      },
    ],
    component: useMediaQuery,
  },
  {
    name: "use-mobile",
    type: "registry:hook",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-mobile.ts",
        type: "registry:hook",
        target: "/hooks/use-mobile.ts",
      },
    ],
    component: useMobile,
  },
  {
    name: "use-scroll-into-view",
    type: "registry:hook",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-scroll-into-view.ts",
        type: "registry:hook",
        target: "/hooks/use-scroll-into-view.ts",
      },
    ],
    component: useScrollIntoView,
  },
  {
    name: "use-state-history",
    type: "registry:hook",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-state-history.ts",
        type: "registry:hook",
        target: "/hooks/use-state-history.ts",
      },
    ],
    component: useStateHistory,
  },
  {
    name: "use-window-size",
    type: "registry:hook",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/hooks/unlogg-hooks/use-window-size.ts",
        type: "registry:hook",
        target: "/hooks/use-window-size.ts",
      },
    ],
    component: useWindowSize,
  },
];
