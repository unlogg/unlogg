"use client";

import * as React from "react";
import { Input } from "@unlogg/ui/components/input";
import { useDebouncedValue } from "@unlogg/ui/hooks/unlogg-hooks/use-debounced-value";

export function DebouncedValueExample() {
  const [input, setInput] = React.useState("");
  const [debounced, { setValue }] = useDebouncedValue(input, 500);

  // Sync input changes to the debounce hook
  React.useEffect(() => {
    setValue(input);
  }, [input, setValue]);

  return (
    <div className="bg-background mx-auto mt-10 max-w-md space-y-6 rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold">Debounce Value Example</h2>
      <Input
        placeholder="Type something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full"
      />
      <div className="space-y-2">
        <div>
          <span className="font-medium">Immediate value:</span>
          <span className="text-muted-foreground ml-2">{input}</span>
        </div>
        <div>
          <span className="font-medium">Debounced value:</span>
          <span className="text-primary ml-2">{debounced}</span>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        👉 The debounced value updates 500ms after you stop typing.
      </p>
    </div>
  );
}

export default DebouncedValueExample;
