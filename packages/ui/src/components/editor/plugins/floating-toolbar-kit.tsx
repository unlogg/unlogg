"use client";

import { createPlatePlugin } from "platejs/react";

import { FloatingToolbar } from "@unlogg/ui/components/floating-toolbar";
import { FloatingToolbarButtons } from "@unlogg/ui/components/floating-toolbar-buttons";

export const FloatingToolbarKit = [
  createPlatePlugin({
    key: "floating-toolbar",
    render: {
      afterEditable: () => (
        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
      ),
    },
  }),
];
