"use client";

import {
  BlockquotePlugin,
  BoldPlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  ItalicPlugin,
  UnderlinePlugin,
} from "@platejs/basic-nodes/react";
import { BlockquoteElement } from "@unlogg/ui/components/blockquote-node";
import { Editor, EditorContainer } from "@unlogg/ui/components/editor";
import { AutoformatKit } from "@unlogg/ui/components/editor/plugins/autoformat-kit";
import { BasicBlocksKit } from "@unlogg/ui/components/editor/plugins/basic-blocks-kit";
import { ListKit } from "@unlogg/ui/components/editor/plugins/list-kit";
import { MarkdownKit } from "@unlogg/ui/components/editor/plugins/markdown-kit";
import {
  H1Element,
  H2Element,
  H3Element,
} from "@unlogg/ui/components/heading-node";
import { Plate, usePlateEditor } from "platejs/react";

import { BasicMarksKit } from "@unlogg/ui/components/editor/plugins/basic-marks-kit";
import { BlockPlaceholderKit } from "@unlogg/ui/components/editor/plugins/block-placeholder-kit";
import { CodeBlockKit } from "@unlogg/ui/components/editor/plugins/code-block-kit";
import { FloatingToolbarKit } from "@unlogg/ui/components/editor/plugins/floating-toolbar-kit";
import { LinkKit } from "@unlogg/ui/components/editor/plugins/link-kit";
import { SlashKit } from "@unlogg/ui/components/editor/plugins/slash-kit";
import { SlateEditor, Value } from "platejs";

export type MarkdownEditorProps = {
  onChangeContent?: (value: Value) => void;
  variant: "comment" | "default";
  maxCharacters?: number;
  onCharactersCountChange?: (count: number) => void;
  onEditorFocus?: () => void;
  onEditorBlur?: () => void;
  initialValue?: string;
};

function MarkdownEditor({
  onChangeContent,
  variant = "comment",
  maxCharacters = 1000,
  onCharactersCountChange = () => {},
  onEditorFocus = () => {},
  onEditorBlur = () => {},
  initialValue,
}: MarkdownEditorProps) {
  const editor = usePlateEditor({
    plugins: [
      ...MarkdownKit,
      ...BasicBlocksKit,
      ...AutoformatKit,
      ...ListKit,
      ...CodeBlockKit,
      ...BasicMarksKit,
      ...FloatingToolbarKit,
      ...SlashKit,
      ...BlockPlaceholderKit,
      ...LinkKit,
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      H1Plugin.withComponent(H1Element),
      H2Plugin.withComponent(H2Element),
      H3Plugin.withComponent(H3Element),
      BlockquotePlugin.withComponent(BlockquoteElement),
    ], // Add the mark plugins
    value: () => {
      // const savedValue = localStorage.getItem("installation-next-demo");
      // return savedValue
      //   ? JSON.parse(savedValue)
      //   : JSON.parse(initialValue ?? "[]");
      return initialValue ? JSON.parse(initialValue) : [];
    },
    maxLength: maxCharacters, // Set the maximum character limit
  }); // Initializes the editor instance

  return (
    <Plate
      editor={editor}
      onChange={({ value }) => {
        console.log("Editor value changed:", value);
        localStorage.setItem("installation-next-demo", JSON.stringify(value));
        if (onChangeContent) {
          onChangeContent(value);
        }
        if (onCharactersCountChange) {
          onCharactersCountChange(getEditorCharacterCount(editor));
        }
      }}
    >
      <EditorContainer className="active:border-primary relative focus:border">
        {/* Styles the editor area */}
        <Editor
          placeholder="Your feedback description..."
          variant={variant}
          onFocus={onEditorFocus}
          onBlur={onEditorBlur}
          className="selection:bg-primary selection:text-primary-foreground text-md text-foreground min-h-30 p-2"
        />
      </EditorContainer>
    </Plate>
  );
}

export { MarkdownEditor, getEditorWordCount };

function getEditorWordCount(editor: SlateEditor) {
  const text = editor.api.string([]);

  return text ? text.trim().split(/\s+/).filter(Boolean).length : 0;
}

export function getEditorCharacterCount(editor: SlateEditor) {
  const text = editor.api.string([]);
  return text ? text.length : 0;
}
