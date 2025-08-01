"use client";

import {
  BlockquotePlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  HorizontalRulePlugin,
} from "@platejs/basic-nodes/react";
import { ParagraphPlugin } from "platejs/react";

import { BlockquoteElement } from "@unlogg/ui/components/blockquote-node";
import {
  H1Element,
  H2Element,
  H3Element,
} from "@unlogg/ui/components/heading-node";
import { HrElement } from "@unlogg/ui/components/hr-node";
import { ParagraphElement } from "@unlogg/ui/components/paragraph-node";

export const BasicBlocksKit = [
  ParagraphPlugin.withComponent(ParagraphElement),
  H1Plugin.configure({
    node: {
      component: H1Element,
    },

    rules: {
      break: { empty: "reset" },
    },
    shortcuts: { toggle: { keys: "mod+alt+1" } },
  }),
  H2Plugin.configure({
    node: {
      component: H2Element,
    },
    rules: {
      break: { empty: "reset" },
    },
    shortcuts: { toggle: { keys: "mod+alt+2" } },
  }),
  H3Plugin.configure({
    node: {
      component: H3Element,
    },
    rules: {
      break: { empty: "reset" },
    },
    shortcuts: { toggle: { keys: "mod+alt+3" } },
  }),
  BlockquotePlugin.configure({
    node: { component: BlockquoteElement },
    shortcuts: { toggle: { keys: "mod+shift+period" } },
  }),
  HorizontalRulePlugin.withComponent(HrElement),
];
