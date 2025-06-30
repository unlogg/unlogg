"use client";

import * as React from "react";
import { Card } from "@unlogg/ui/components/card";
import { Button } from "@unlogg/ui/components/button";
import { Badge } from "@unlogg/ui/components/badge";
import { Input } from "@unlogg/ui/components/input";
import { useClipboardCopy } from "@unlogg/ui/hooks/unlogg-hooks/use-clipboard-copy";

export default function UseClipboardCopy_Ex_01() {
  const [customText, setCustomText] = React.useState("Hello, World!");
  const [logs, setLogs] = React.useState<string[]>([]);

  const addLog = React.useCallback((message: string) => {
    setLogs((prev) => [
      `${new Date().toLocaleTimeString()}: ${message}`,
      ...prev.slice(0, 4),
    ]);
  }, []);

  const {
    copied: basicCopied,
    copy: basicCopy,
    error: basicError,
  } = useClipboardCopy({
    timeout: 2000,
    onSuccess: (text) => addLog(`Successfully copied: "${text}"`),
    onError: (err) => addLog(`Copy failed: ${err.message}`),
  });

  const {
    copied: customCopied,
    copy: customCopy,
    error: customError,
    reset: customReset,
  } = useClipboardCopy({
    timeout: 3000,
  });

  const { copied: longTimeoutCopied, copy: longTimeoutCopy } = useClipboardCopy(
    {
      timeout: 5000,
    }
  );

  const codeSnippet = `import { useClipboardCopy } from "@unlogg/ui/hooks/unlogg-hooks/use-clipboard-copy";

function MyComponent() {
  const { copy, copied } = useClipboardCopy();
  
  return (
    <button onClick={() => copy("Hello!")}>
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}`;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Clipboard Copy Hook</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Copy text to clipboard with automatic state management and timeout
          reset
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Basic Status:</span>
            <Badge variant={basicCopied ? "default" : "secondary"}>
              {basicCopied ? "Copied" : "Ready"}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Custom Status:</span>
            <Badge variant={customCopied ? "default" : "secondary"}>
              {customCopied ? "Copied" : "Ready"}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Long Timeout:</span>
            <Badge variant={longTimeoutCopied ? "default" : "secondary"}>
              {longTimeoutCopied ? "Copied" : "Ready"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Basic Usage */}
      <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Basic Usage (2s timeout)</h4>
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => basicCopy("Hello, World!")}
              variant={basicCopied ? "default" : "outline"}
            >
              {basicCopied ? "✓ Copied!" : "Copy Hello World"}
            </Button>
            <Button
              onClick={() =>
                basicCopy(
                  "This is a longer text that demonstrates clipboard functionality"
                )
              }
              variant={basicCopied ? "default" : "outline"}
            >
              {basicCopied ? "✓ Copied!" : "Copy Long Text"}
            </Button>
            <Button
              onClick={() => basicCopy("🎉 Emojis work too! 🚀✨")}
              variant={basicCopied ? "default" : "outline"}
            >
              {basicCopied ? "✓ Copied!" : "Copy Emojis"}
            </Button>
          </div>

          {basicError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                <strong>Error:</strong> {basicError.message}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Custom Text Input */}
      <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">
          Custom Text (3s timeout with manual reset)
        </h4>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Enter text to copy..."
              className="flex-1"
            />
            <Button
              onClick={() => customCopy(customText)}
              variant={customCopied ? "default" : "outline"}
              disabled={!customText.trim()}
            >
              {customCopied ? "✓ Copied!" : "Copy"}
            </Button>
            <Button onClick={customReset} variant="secondary" size="sm">
              Reset
            </Button>
          </div>

          {customError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                <strong>Error:</strong> {customError.message}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Code Example */}
      <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">
          Code Example (5s timeout)
        </h4>
        <div className="space-y-4">
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
              <code>{codeSnippet}</code>
            </pre>
            <Button
              onClick={() => longTimeoutCopy(codeSnippet)}
              variant={longTimeoutCopied ? "default" : "outline"}
              size="sm"
              className="absolute top-2 right-2"
            >
              {longTimeoutCopied ? "✓ Copied!" : "Copy Code"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Different Timeout Demonstrations */}
      <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Timeout Demonstrations</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TimeoutDemo title="Quick (1s)" timeout={1000} />
          <TimeoutDemo title="Normal (2s)" timeout={2000} />
          <TimeoutDemo title="Long (4s)" timeout={4000} />
        </div>
      </Card>
    </div>
  );
}

interface TimeoutDemoProps {
  title: string;
  timeout: number;
}

function TimeoutDemo({ title, timeout }: TimeoutDemoProps) {
  const { copy, copied } = useClipboardCopy({ timeout });

  return (
    <div className="p-4 bg-card border rounded-lg">
      <h5 className="font-semibold text-primary mb-2">{title}</h5>
      <Button
        onClick={() => copy(`Text copied with ${timeout}ms timeout`)}
        variant={copied ? "default" : "outline"}
        size="sm"
        className="w-full"
      >
        {copied ? "✓ Copied!" : "Copy Text"}
      </Button>
      <p className="text-xs text-muted-foreground mt-2">
        Resets after {timeout / 1000}s
      </p>
    </div>
  );
}
