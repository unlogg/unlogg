"use client";

import { Card } from "@unlogg/ui/components/card";
import { Input } from "@unlogg/ui/components/input";
import { useLeavePage } from "@unlogg/ui/hooks/unlogg-hooks/use-leave-page";
import * as React from "react";

export default function UseLeavePage_Ex_03() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Auto-Save Demo */}
      <Card className="mx-auto w-full max-w-4xl p-6">
        <h4 className="text-md mb-4 font-semibold">Auto-Save on Leave</h4>
        <AutoSaveDemo />
      </Card>
    </div>
  );
}

function AutoSaveDemo() {
  const isLeavingPage = useLeavePage();
  const [content, setContent] = React.useState("");
  const [savedContent, setSavedContent] = React.useState("");
  const [saveCount, setSaveCount] = React.useState(0);
  const [lastSaved, setLastSaved] = React.useState<Date | null>(null);

  React.useEffect(() => {
    if (isLeavingPage && content !== savedContent && content.trim() !== "") {
      // Auto-save when leaving page
      setSavedContent(content);
      setSaveCount((prev) => prev + 1);
      setLastSaved(new Date());
    }
  }, [isLeavingPage, content, savedContent]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Type something (auto-saves when you leave the page):
        </label>
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start typing..."
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="bg-card rounded-lg border p-3">
          <p className="text-muted-foreground text-sm">
            <strong>Leave Status:</strong>{" "}
            {isLeavingPage ? "Auto-saving..." : "Editing..."}
          </p>
        </div>
        <div className="bg-card rounded-lg border border-green-500 p-3">
          <p className="text-sm text-green-700">
            <strong>Auto-saves:</strong> {saveCount}
          </p>
        </div>
      </div>

      {lastSaved && (
        <div className="bg-card rounded-lg border border-gray-500 p-3">
          <p className="text text-sm">
            <strong>Last saved:</strong> {lastSaved.toLocaleTimeString()}
          </p>
          <p className="text-sm">
            <strong>Saved content:</strong> "{savedContent}"
          </p>
        </div>
      )}
    </div>
  );
}
