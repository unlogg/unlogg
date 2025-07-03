"use client";

import * as React from "react";
import { Input } from "@unlogg/ui/components/input";
import { useDebouncedCallback } from "@unlogg/ui/hooks/unlogg-hooks/use-debounced-callback";

export function DebouncedCallbackExample() {
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);

  // Simulate an API call
  const fakeApiCall = (query: string) =>
    new Promise<string>((resolve) =>
      setTimeout(() => resolve(`Result for "${query}"`), 800)
    );

  const [debouncedCallback, { cancel }] = useDebouncedCallback(
    async (value: string) => {
      setLoading(true);
      setResult(null);
      const res = await fakeApiCall(value);
      setResult(res);
      setLoading(false);
    },
    700
  );

  React.useEffect(() => {
    if (input.trim() === "") {
      setResult(null);
      setLoading(false);
      cancel();
      return;
    }
    debouncedCallback(input);
    return () => cancel();
  }, [input, debouncedCallback, cancel]);

  return (
    <div className="bg-background mx-auto mt-10 max-w-md space-y-6 rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold">Debounced API Call Example</h2>
      <Input
        placeholder="Type a search query..."
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
          <span className="font-medium">API status:</span>
          <span className="ml-2">
            {loading ? (
              <span className="text-yellow-600">Loading...</span>
            ) : result ? (
              <span className="text-green-700">{result}</span>
            ) : (
              <span className="text-gray-400">No result</span>
            )}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        👉 The API call is triggered 700ms after you stop typing.
      </p>
    </div>
  );
}

export default DebouncedCallbackExample;
