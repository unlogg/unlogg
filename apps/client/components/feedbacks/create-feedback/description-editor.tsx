"use client";

import { ScrollArea } from "@unlogg/ui/components/scroll-area";
import { MarkdownEditor } from "@unlogg/ui/components/unlogg-ui/markdown-editor/markdown-editor";
import { cn } from "@unlogg/ui/lib/utils";
import { useState } from "react";
import { SiMarkdown } from "react-icons/si";

export const DescriptionEditor = ({
  value,
  onChange,
  error,
  maxCharacters = 1000,
}: {
  value: string;
  onChange: (val: string) => void;
  error?: string;
  maxCharacters?: number;
}) => {
  const [characterCount, setCharacterCount] = useState(value?.length ?? 0);
  const [focused, setFocused] = useState(false);

  return (
    <ScrollArea className="h-[300px] w-full rounded-md relative">
      <MarkdownEditor
        variant="comment"
        // value={value}
        initialValue={value}
        // onChange={(val: string) => {
        //   console.log("MarkdownEditor value changed:", val);
        //   setCharacterCount(val.length);
        //   onChange(val);
        // }}
        onChangeContent={(val) => {
          setCharacterCount(val.length);
          onChange(JSON.stringify(val));
        }}
        onCharactersCountChange={setCharacterCount}
        onEditorFocus={() => setFocused(true)}
        onEditorBlur={() => setFocused(false)}
        maxCharacters={maxCharacters}
      />
      <div className="absolute bottom-2 right-2 bg-background w-fit rounded-md text-muted-foreground flex items-center gap-1 px-2 py-1">
        <div className="flex flex-row gap-2 items-center">
          {(focused || characterCount > 0) && (
            <p
              className={cn(
                "text-muted-foreground text-xs",
                characterCount > maxCharacters || error
                  ? "text-destructive"
                  : "text-muted-foreground"
              )}
            >
              <span className="font-mono">{characterCount}</span>/
              {maxCharacters} characters
            </p>
          )}

          <div className="flex items-center gap-1 border w-fit rounded-md px-2 py-1">
            <p className="text-xs uppercase tracking-wide">Supports</p>
            <SiMarkdown className="w-5 h-5 inline-block ml-1" />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};
