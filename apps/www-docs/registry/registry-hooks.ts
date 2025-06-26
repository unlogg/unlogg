import type { Registry } from "@/registry/schema";
import { useBoolean } from "@unlogg/ui/hooks/unlogg-hooks/use-boolean";
import { useCountdown } from "@unlogg/ui/hooks/unlogg-hooks/use-countdown";
import { useCounter } from "@unlogg/ui/hooks/unlogg-hooks/use-counter";
import { useDebounceCallback } from "@unlogg/ui/hooks/unlogg-hooks/use-debounce-callback";
import { useDebounceValue } from "@unlogg/ui/hooks/unlogg-hooks/use-debounce-value";
import { useDisclosure } from "@unlogg/ui/hooks/unlogg-hooks/use-disclosure";
import { useInterval } from "@unlogg/ui/hooks/unlogg-hooks/use-interval";
import { useLocalStorage } from "@unlogg/ui/hooks/unlogg-hooks/use-local-storage";
import { useStateHistory } from "@unlogg/ui/hooks/unlogg-hooks/use-state-history";
import { useTimeout } from "@unlogg/ui/hooks/unlogg-hooks/use-timeout";
import { useToggle } from "@unlogg/ui/hooks/unlogg-hooks/use-toggle";
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
];
