"use client";

import * as React from "react";
import { Button } from "@unlogg/ui/components/button";
import { Input } from "@unlogg/ui/components/input";
import { useStateHistory } from "@unlogg/ui/hooks/unlogg-hooks/use-state-history";

export default function UseStateHistory_Ex_01() {
  const [
    value,
    {
      setValue,
      back,
      forward,
      clear,
      canGoBack,
      canGoForward,
      history,
      currentIndex,
    },
  ] = useStateHistory<number>(0, { maxHistorySize: 10 });

  const [inputValue, setInputValue] = React.useState("");

  const increment = () => setValue((prev) => prev + 1);
  const decrement = () => setValue((prev) => prev - 1);

  const handleSetValue = () => {
    const num = parseInt(inputValue);
    if (!isNaN(num)) {
      setValue(num);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="text-center">
        <div className="text-4xl font-mono font-bold mb-2">{value}</div>
        <div className="text-sm text-muted-foreground">
          History: {currentIndex + 1} / {history.length}
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={decrement} variant="outline" size="sm">
          -1
        </Button>
        <Button onClick={increment} variant="default" size="sm">
          +1
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
        <Button onClick={handleSetValue} size="sm" variant="outline">
          Set
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={back}
          disabled={!canGoBack}
          variant="outline"
          size="sm"
        >
          ← Back
        </Button>
        <Button
          onClick={forward}
          disabled={!canGoForward}
          variant="outline"
          size="sm"
        >
          Forward →
        </Button>
        <Button onClick={clear} variant="outline" size="sm">
          Clear History
        </Button>
      </div>

      <div className="text-center">
        <div className="text-sm font-medium mb-2">History:</div>
        <div className="flex gap-1 flex-wrap justify-center max-w-xs">
          {history.map((historyValue, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs rounded ${
                index === currentIndex
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {historyValue}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
