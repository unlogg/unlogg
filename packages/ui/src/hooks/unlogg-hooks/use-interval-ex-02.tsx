"use client";

import { useState } from "react";
import { useInterval } from "@unlogg/ui/hooks/unlogg-hooks/use-interval";

/**
 * Example component: DashboardCounter
 * Demonstrates useInterval by incrementing a counter every second.
 */
function UseInterval_Ex_02() {
  const [count, setCount] = useState(0);

  useInterval({
    callback: () => setCount((prev) => prev + 1),
    delay: 1000, // 1 second
  });

  return (
    <div
      className="bg-background border text-center"
      style={{
        padding: 24,

        borderRadius: 8,
        width: 240,
      }}
    >
      <h2>Live Updates</h2>
      <div className="text-4xl font-bold text-primary font-mono">{count}</div>
      <p>Updates every second</p>
    </div>
  );
}

export default UseInterval_Ex_02;
