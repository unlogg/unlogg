"use client";

import { Badge } from "@unlogg/ui/components/badge";
import { Card } from "@unlogg/ui/components/card";
import { useLeavePage } from "@unlogg/ui/hooks/unlogg-hooks/use-leave-page";
import * as React from "react";

export default function UseLeavePage_Ex_01() {
  const isLeavingPage = useLeavePage();
  const [leaveCount, setLeaveCount] = React.useState(0);
  const [lastLeaveTime, setLastLeaveTime] = React.useState<Date | null>(null);

  // Track leave events
  React.useEffect(() => {
    if (isLeavingPage) {
      setLeaveCount((prev) => prev + 1);
      setLastLeaveTime(new Date());
    }
  }, [isLeavingPage]);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="text-center">
        <h3 className="mb-2 text-lg font-semibold">
          Leave Page Detection Hook
        </h3>
        <p className="text-muted-foreground mb-4 text-sm">
          Detects when the user's cursor leaves the browser window
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Badge
            variant={isLeavingPage ? "destructive" : "default"}
            className="text-sm"
          >
            {isLeavingPage ? "🚪 Leaving Page" : "👁️ On Page"}
          </Badge>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Leave Count:</span>
            <Badge variant="outline" className="font-mono">
              {leaveCount}
            </Badge>
          </div>
          {lastLeaveTime && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Last Leave:</span>
              <Badge variant="outline" className="font-mono text-xs">
                {lastLeaveTime.toLocaleTimeString()}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Basic Demo */}
      <Card className="mx-auto w-full max-w-4xl p-6">
        <h4 className="text-md mb-4 font-semibold">Basic Leave Detection</h4>
        <BasicLeaveDemo />
      </Card>
    </div>
  );
}

function BasicLeaveDemo() {
  const isLeavingPage = useLeavePage();

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div
          className={`mb-2 text-6xl ${isLeavingPage ? "animate-bounce" : ""}`}
        >
          {isLeavingPage ? "👋" : "🖱️"}
        </div>
        <Badge
          variant={isLeavingPage ? "destructive" : "default"}
          className="text-sm"
        >
          {isLeavingPage ? "Mouse Left Page" : "Mouse On Page"}
        </Badge>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
        <p className="text-sm text-gray-700">
          <strong>Status:</strong>{" "}
          {isLeavingPage
            ? "Cursor is outside the browser window"
            : "Cursor is within the page area"}
        </p>
      </div>
    </div>
  );
}
