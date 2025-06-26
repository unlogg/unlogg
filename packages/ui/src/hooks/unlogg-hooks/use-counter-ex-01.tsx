"use client";

import * as React from "react";
import { Button } from "@unlogg/ui/components/button";
import { Input } from "@unlogg/ui/components/input";
import { useCounter } from "@unlogg/ui/hooks/unlogg-hooks/use-counter";

export default function UseCounter_Ex_01() {
  const { count, setCount, increment, decrement, reset } = useCounter(0, {
    min: -10,
    max: 10,
    step: 1,
  });

  const [inputValue, setInputValue] = React.useState("");

  const handleSetCount = () => {
    const num = parseInt(inputValue);
    if (!isNaN(num)) {
      setCount(num);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="text-center">
        <div className="text-4xl font-mono font-bold mb-2">{count}</div>
        <div className="text-sm text-muted-foreground">
          Range: -10 to 10 (step: 1)
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={decrement}
          disabled={count <= -10}
          variant="outline"
          size="sm"
        >
          -1
        </Button>
        <Button
          onClick={increment}
          disabled={count >= 10}
          variant="default"
          size="sm"
        >
          +1
        </Button>
        <Button onClick={reset} variant="outline" size="sm">
          Reset
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder="Set value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-24"
        />
        <Button onClick={handleSetCount} size="sm" variant="outline">
          Set
        </Button>
      </div>

      <div className="text-xs text-muted-foreground text-center">
        Try incrementing/decrementing or setting a custom value.
        <br />
        Values are constrained between -10 and 10.
      </div>
    </div>
  );
}
