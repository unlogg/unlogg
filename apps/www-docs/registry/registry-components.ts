import type { Registry } from "@/registry/schema";
import * as React from "react";

export const components: Registry = [
  {
    name: "active-button",
    type: "registry:component",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/components/unlogg-ui/active-button/active-button.tsx",
        type: "registry:component",
      },
    ],
    component: React.lazy(
      () =>
        import("@unlogg/ui/components/unlogg-ui/active-button/active-button")
    ),
  },
  {
    name: "user-selector",
    type: "registry:component",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/components/unlogg-ui/user-selector/user-selector.tsx",
        type: "registry:component",
      },
    ],
    component: React.lazy(
      () =>
        import(
          "../../../packages/ui/src/components/unlogg-ui/user-selector/user-selector"
        )
    ),
  },

  {
    name: "test-component",
    type: "registry:component",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/components/unlogg-ui/test/test.tsx",
        type: "registry:component",
      },
    ],
    component: React.lazy(
      () => import("../../../packages/ui/src/components/unlogg-ui/test/test")
    ),
  },

  {
    name: "combobox-add",
    type: "registry:component",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "../../packages/ui/src/components/unlogg-ui/combobox-add/combobox-add.tsx",
        type: "registry:component",
      },
    ],
    component: React.lazy(
      () =>
        import(
          "../../../packages/ui/src/components/unlogg-ui/combobox-add/combobox-add"
        )
    ),
  },

  {
    name: "date-selector",
    type: "registry:component",
    dependencies: ["lucide-react", "chrono-node"],
    files: [
      {
        path: "../../packages/ui/src/components/unlogg-ui/date-selector/date-selector.tsx",
        type: "registry:component",
      },
    ],
    component: React.lazy(
      () =>
        import(
          "../../../packages/ui/src/components/unlogg-ui/date-selector/date-selector"
        )
    ),
  },

  {
    name: "upvote-button",
    type: "registry:component",
    dependencies: ["lucide-react", "chrono-node"],
    files: [
      {
        path: "../../packages/ui/src/components/unlogg-ui/upvote-button/upvote-button.tsx",
        type: "registry:component",
      },
    ],
    component: React.lazy(
      () =>
        import(
          "../../../packages/ui/src/components/unlogg-ui/upvote-button/upvote-button"
        )
    ),
  },
];
