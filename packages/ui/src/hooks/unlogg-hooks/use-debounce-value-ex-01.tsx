"use client";

import * as React from "react";
import { Input } from "@unlogg/ui/components/input";
import { useDebounceValue } from "@unlogg/ui/hooks/unlogg-hooks/use-debounce-value";

export function DebounceValueExample() {
  const [input, setInput] = React.useState("");
  const [debounced, { setValue }] = useDebounceValue(input, 500);

  // Sync input changes to the debounce hook
  React.useEffect(() => {
    setValue(input);
  }, [input, setValue]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-background rounded-lg shadow space-y-6">
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
          <span className="ml-2 text-muted-foreground">{input}</span>
        </div>
        <div>
          <span className="font-medium">Debounced value:</span>
          <span className="ml-2 text-primary">{debounced}</span>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        👉 The debounced value updates 500ms after you stop typing.
      </p>
    </div>
  );
}

export default DebounceValueExample;
