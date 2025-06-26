"use client";

import * as React from "react";
import { Button } from "@unlogg/ui/components/button";
import { useCountdown } from "@unlogg/ui/hooks/unlogg-hooks/use-countdown";

export default function UseCountdown_Ex_01() {
  const [intervalValue, setIntervalValue] = React.useState(1000);

  const [count, { startCountdown, stopCountdown, resetCountdown, isActive }] =
    useCountdown({
      countStart: 60,
      intervalMs: intervalValue,
      onComplete: () => {
        console.log("Countdown completed!");
      },
    });

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="text-center">
        <div className="text-4xl font-mono font-bold mb-2">{count}</div>
        <div className="text-sm text-muted-foreground">
          Status: {isActive ? "Running" : "Stopped"}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={startCountdown}
          disabled={isActive || count === 0}
          variant="default"
        >
          Start
        </Button>
        <Button onClick={stopCountdown} disabled={!isActive} variant="outline">
          Stop
        </Button>
        <Button onClick={resetCountdown} variant="outline">
          Reset
        </Button>
      </div>

      <div className="flex flex-col items-center gap-2">
        <label className="text-sm font-medium">Interval (ms):</label>
        <div className="flex gap-2">
          {[500, 1000, 2000].map((ms) => (
            <Button
              key={ms}
              onClick={() => setIntervalValue(ms)}
              variant={intervalValue === ms ? "default" : "outline"}
              size="sm"
              disabled={isActive}
            >
              {ms}ms
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
