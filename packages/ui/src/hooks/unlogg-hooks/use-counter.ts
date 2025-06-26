"use client";

import * as React from "react";

type UseCounterOptions = {
  min?: number;
  max?: number;
  step?: number;
};

type UseCounterReturn = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

/**
 * A custom React hook that provides counter functionality with optional constraints.
 *
 * @param initialValue - The initial value for the counter (default: 0).
 * @param options - Optional configuration for the counter behavior.
 * @param options.min - The minimum value the counter can reach.
 * @param options.max - The maximum value the counter can reach.
 * @param options.step - The step size for increment/decrement operations (default: 1).
 *
 * @returns An object containing:
 *   - `count`: The current counter value.
 *   - `setCount`: Function to manually set the counter value.
 *   - `increment`: Function to increment the counter by the step value.
 *   - `decrement`: Function to decrement the counter by the step value.
 *   - `reset`: Function to reset the counter to the initial value.
 *
 * @example
 * const { count, setCount, increment, decrement, reset } = useCounter(0, {
 *   min: 0,
 *   max: 100,
 *   step: 5,
 * });
 */
function useCounter(
  initialValue = 0,
  options: UseCounterOptions = {}
): UseCounterReturn {
  const { min, max, step = 1 } = options;

  // Helper function to clamp values within bounds
  const clampValue = React.useCallback(
    (value: number) => {
      let clampedValue = value;
      if (min !== undefined) clampedValue = Math.max(clampedValue, min);
      if (max !== undefined) clampedValue = Math.min(clampedValue, max);
      return clampedValue;
    },
    [min, max]
  );

  const [count, _setCount] = React.useState(() => clampValue(initialValue));

  // Override setCount to always clamp the value
  const setCount: React.Dispatch<React.SetStateAction<number>> =
    React.useCallback(
      (value) => {
        if (typeof value === "function") {
          _setCount((prevCount) => clampValue(value(prevCount)));
        } else {
          _setCount(clampValue(value));
        }
      },
      [clampValue]
    );

  const increment = React.useCallback(() => {
    setCount((prevCount) => prevCount + step);
  }, [setCount, step]);

  const decrement = React.useCallback(() => {
    setCount((prevCount) => prevCount - step);
  }, [setCount, step]);

  const reset = React.useCallback(() => {
    setCount(initialValue);
  }, [setCount, initialValue]);

  return { count, setCount, increment, decrement, reset };
}

export { useCounter };
export type { UseCounterOptions, UseCounterReturn };
