"use client";

import * as React from "react";

import { useMarkToolbarButton, useMarkToolbarButtonState } from "platejs/react";

import { Toolbar, ToolbarButton } from "@unlogg/ui/components/toolbar";

export function MarkToolbarButton({
  clear,
  nodeType,
  ...props
}: React.ComponentProps<typeof ToolbarButton> & {
  nodeType: string;
  clear?: string[] | string;
}) {
  const state = useMarkToolbarButtonState({ clear, nodeType });
  const { props: buttonProps } = useMarkToolbarButton(state);

  return <ToolbarButton {...props} {...buttonProps} />;
}
