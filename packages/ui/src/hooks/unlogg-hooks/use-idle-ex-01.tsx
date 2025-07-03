"use client";

import { Badge } from "@unlogg/ui/components/badge";
import { Button } from "@unlogg/ui/components/button";
import { Card } from "@unlogg/ui/components/card";
import { Input } from "@unlogg/ui/components/input";
import { useIdle } from "@unlogg/ui/hooks/unlogg-hooks/use-idle";
import * as React from "react";

export default function UseIdle_Ex_01() {
  const [customTimeout, setCustomTimeout] = React.useState(3000);
  const [lastActivity, setLastActivity] = React.useState<Date | null>(null);

  // Track activity time
  React.useEffect(() => {
    const handleActivity = () => {
      setLastActivity(new Date());
    };

    const events = [
      "keypress",
      "mousemove",
      "touchmove",
      "wheel",
      "click",
      "scroll",
    ];
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, true);
    });

    // Set initial activity time
    setLastActivity(new Date());

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="text-center">
        <h3 className="mb-2 text-lg font-semibold">User Idle Detection Hook</h3>
        <p className="text-muted-foreground mb-4 text-sm">
          Monitors user activity and detects when the user becomes idle
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Last Activity:</span>
            <Badge variant="outline" className="font-mono text-xs">
              {lastActivity?.toLocaleTimeString() || "Never"}
            </Badge>
          </div>
        </div>
      </div>
      {/* Default Idle Detection */}
      <Card className="mx-auto w-full max-w-4xl p-6">
        <h4 className="text-md mb-4 font-semibold">
          Default Idle Detection (2s timeout)
        </h4>
        <DefaultIdleDemo />
      </Card>
      Custom Timeout
      {/* <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Custom Timeout</h4>
        <div className="space-y-4">
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              value={customTimeout}
              onChange={(e) => setCustomTimeout(Number(e.target.value))}
              placeholder="Timeout in ms"
              className="w-32"
            />
            <span className="text-sm text-muted-foreground">milliseconds</span>
          </div>
          <CustomTimeoutDemo timeout={customTimeout} />
        </div>
      </Card> */}
      {/* Custom Events */}
      {/* <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Custom Events</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MouseOnlyDemo />
          <KeyboardOnlyDemo />
        </div>
      </Card> */}
      {/* Multiple Timers */}
      {/* <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Multiple Timers</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <IdleTimer label="Quick (1s)" timeout={1000} color="red" />
          <IdleTimer label="Medium (3s)" timeout={3000} color="yellow" />
          <IdleTimer label="Long (5s)" timeout={5000} color="green" />
        </div>
      </Card> */}
      {/* Auto-Save Example */}
      {/* <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Auto-Save Example</h4>
        <AutoSaveDemo />
      </Card> */}
      {/* Session Warning */}
      {/* <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Session Warning</h4>
        <SessionWarningDemo />
      </Card> */}
      {/* Activity Instructions */}
      {/* <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Activity Instructions</h4>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <strong className="text-blue-800">
              Try these activities to reset idle status:
            </strong>
            <ul className="list-disc list-inside text-blue-700 mt-1 space-y-1">
              <li>Move your mouse cursor</li>
              <li>Click anywhere on the page</li>
              <li>Press any key</li>
              <li>Scroll up or down</li>
              <li>Touch/swipe (on mobile devices)</li>
              <li>Use the mouse wheel</li>
            </ul>
          </div>
        </div>
      </Card> */}
    </div>
  );
}

function DefaultIdleDemo() {
  const isIdle = useIdle(2000);

  console.log("Idle status:", isIdle);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className={`mb-2 text-6xl ${isIdle ? "animate-pulse" : ""}`}>
          {isIdle ? "😴" : "👀"}
        </div>
        <Badge variant={isIdle ? "destructive" : "default"} className="text-sm">
          {isIdle ? "User is Idle" : "User is Active"}
        </Badge>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
        <p className="text-sm text-gray-700">
          <strong>Status:</strong>{" "}
          {isIdle
            ? "No activity detected for 2 seconds"
            : "User activity detected"}
        </p>
      </div>
    </div>
  );
}

function CustomTimeoutDemo({ timeout }: { timeout: number }) {
  const isIdle = useIdle(timeout);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className={`mb-2 text-4xl ${isIdle ? "animate-bounce" : ""}`}>
          {isIdle ? "⏰" : "⚡"}
        </div>
        <Badge variant={isIdle ? "secondary" : "default"}>
          {isIdle ? `Idle (${timeout}ms)` : `Active (${timeout}ms)`}
        </Badge>
      </div>

      <div className="rounded-lg border border-purple-200 bg-purple-50 p-3">
        <p className="text-sm text-purple-700">
          <strong>Timeout:</strong> {timeout / 1000} seconds
        </p>
      </div>
    </div>
  );
}

function MouseOnlyDemo() {
  const isIdle = useIdle(3000, {
    events: ["mousemove", "click"],
  });

  return (
    <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
      <h5 className="mb-2 font-semibold text-orange-800">Mouse Only</h5>
      <div className="space-y-2">
        <div className="text-center">
          <div className="mb-1 text-2xl">🖱️</div>
          <Badge variant={isIdle ? "secondary" : "default"}>
            {isIdle ? "No Mouse Activity" : "Mouse Active"}
          </Badge>
        </div>
        <p className="text-xs text-orange-700">
          Only detects mouse movement and clicks
        </p>
      </div>
    </div>
  );
}

function KeyboardOnlyDemo() {
  const isIdle = useIdle(3000, {
    events: ["keypress", "keydown"],
  });

  return (
    <div className="rounded-lg border border-green-200 bg-green-50 p-4">
      <h5 className="mb-2 font-semibold text-green-800">Keyboard Only</h5>
      <div className="space-y-2">
        <div className="text-center">
          <div className="mb-1 text-2xl">⌨️</div>
          <Badge variant={isIdle ? "secondary" : "default"}>
            {isIdle ? "No Keyboard Activity" : "Keyboard Active"}
          </Badge>
        </div>
        <p className="text-xs text-green-700">Only detects keyboard presses</p>
      </div>
    </div>
  );
}

interface IdleTimerProps {
  label: string;
  timeout: number;
  color: "red" | "yellow" | "green";
}

function IdleTimer({ label, timeout, color }: IdleTimerProps) {
  const isIdle = useIdle(timeout);

  const colorClasses = {
    red: "bg-red-50 border-red-200 text-red-800",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-800",
    green: "bg-green-50 border-green-200 text-green-800",
  };

  return (
    <div className={`rounded-lg border p-4 ${colorClasses[color]}`}>
      <h5 className="mb-2 font-semibold">{label}</h5>
      <div className="text-center">
        <div className="mb-1 text-xl">{isIdle ? "⏱️" : "🔥"}</div>
        <Badge variant={isIdle ? "secondary" : "default"}>
          {isIdle ? "Idle" : "Active"}
        </Badge>
      </div>
    </div>
  );
}

function AutoSaveDemo() {
  const [text, setText] = React.useState("");
  const [savedText, setSavedText] = React.useState("");
  const [lastSaved, setLastSaved] = React.useState<Date | null>(null);
  const isIdle = useIdle(2000);

  // Auto-save when user becomes idle
  React.useEffect(() => {
    if (isIdle && text !== savedText && text.trim() !== "") {
      setSavedText(text);
      setLastSaved(new Date());
    }
  }, [isIdle, text, savedText]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Type something (auto-saves when idle for 2s):
        </label>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing..."
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
          <p className="text-sm text-blue-700">
            <strong>Status:</strong> {isIdle ? "Auto-saving..." : "Typing..."}
          </p>
        </div>
        <div className="rounded-lg border border-green-200 bg-green-50 p-3">
          <p className="text-sm text-green-700">
            <strong>Last Saved:</strong>{" "}
            {lastSaved?.toLocaleTimeString() || "Never"}
          </p>
        </div>
      </div>

      {savedText && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
          <p className="text-sm text-gray-700">
            <strong>Saved Content:</strong> "{savedText}"
          </p>
        </div>
      )}
    </div>
  );
}

function SessionWarningDemo() {
  const isIdle = useIdle(8000); // 8 seconds for demo
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    if (!isIdle) {
      setDismissed(false);
    }
  }, [isIdle]);

  if (!isIdle || dismissed) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-3">
        <p className="text-sm text-green-700">
          ✅ Session active - you will be warned after 8 seconds of inactivity
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-l-4 border-yellow-300 bg-yellow-50 p-4">
        <div className="flex items-start">
          <div className="mr-3 text-xl text-yellow-600">⚠️</div>
          <div className="flex-1">
            <h5 className="mb-1 font-semibold text-yellow-800">
              Session Warning
            </h5>
            <p className="mb-3 text-sm text-yellow-700">
              You've been inactive for a while. Your session will expire soon.
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => setDismissed(true)}>
                Stay Active
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => alert("Session extended!")}
              >
                Extend Session
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
