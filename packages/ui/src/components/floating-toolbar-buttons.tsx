"use client";

import {
  BoldIcon,
  Code2Icon,
  ItalicIcon,
  Quote,
  QuoteIcon,
  StrikethroughIcon,
  UnderlineIcon,
  WandSparklesIcon,
} from "lucide-react";
import { KEYS } from "platejs";
import { useEditorReadOnly } from "platejs/react";

import { AIToolbarButton } from "@unlogg/ui/components/ai-toolbar-button";
import { CommentToolbarButton } from "@unlogg/ui/components/comment-toolbar-button";
import { LinkToolbarButton } from "@unlogg/ui/components/link-toolbar-button";
import { MarkToolbarButton } from "@unlogg/ui/components/mark-toolbar-button";
import { MoreToolbarButton } from "@unlogg/ui/components/more-toolbar-button";
import { SuggestionToolbarButton } from "@unlogg/ui/components/suggestion-toolbar-button";
import { ToolbarGroup } from "@unlogg/ui/components/toolbar";
import { TurnIntoToolbarButton } from "@unlogg/ui/components/turn-into-toolbar-button";

export function FloatingToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <>
      {!readOnly && (
        <>
          {/* <ToolbarGroup>
            <AIToolbarButton tooltip="AI commands">
              <WandSparklesIcon />
              Ask AI
            </AIToolbarButton>
          </ToolbarGroup> */}

          <ToolbarGroup>
            <TurnIntoToolbarButton />

            <MarkToolbarButton nodeType={KEYS.bold} tooltip="Bold (⌘+B)">
              <BoldIcon />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={KEYS.italic} tooltip="Italic (⌘+I)">
              <ItalicIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={KEYS.underline}
              tooltip="Underline (⌘+U)"
            >
              <UnderlineIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={KEYS.strikethrough}
              tooltip="Strikethrough (⌘+⇧+M)"
            >
              <StrikethroughIcon />
            </MarkToolbarButton>
          </ToolbarGroup>
          <ToolbarGroup>
            <MarkToolbarButton nodeType={KEYS.code} tooltip="Code (⌘+E)">
              <Code2Icon />
            </MarkToolbarButton>
            <LinkToolbarButton />
          </ToolbarGroup>
        </>
      )}

      <ToolbarGroup>
        <CommentToolbarButton />
        <SuggestionToolbarButton />

        {!readOnly && <MoreToolbarButton />}
      </ToolbarGroup>
    </>
  );
}
