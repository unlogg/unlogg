"use client";

import * as React from "react";

type UseStateHistoryOptions = {
  maxHistorySize?: number;
};

type UseStateHistoryReturn<T> = {
  setValue: (value: T | ((prev: T) => T)) => void;
  back: () => void;
  forward: () => void;
  go: (index: number) => void;
  clear: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  history: T[];
  currentIndex: number;
};

/**
 * A custom React hook that provides state management with history functionality.
 *
 * @template T The type of the state value.
 * @param initialValue - The initial value for the state.
 * @param options - Optional configuration for the state history behavior.
 * @param options.maxHistorySize - The maximum number of history entries to keep (default: 50).
 *
 * @returns A tuple containing:
 *   - The current state value.
 *   - An object with control functions and state:
 *     - `setValue`: Function to set a new state value.
 *     - `back`: Function to go back one step in history.
 *     - `forward`: Function to go forward one step in history.
 *     - `go`: Function to go to a specific index in history.
 *     - `clear`: Function to clear the history and reset to initial value.
 *     - `canGoBack`: Boolean indicating if going back is possible.
 *     - `canGoForward`: Boolean indicating if going forward is possible.
 *     - `history`: Array of all history values.
 *     - `currentIndex`: Current position in the history.
 *
 * @example
 * const [value, { setValue, back, forward, canGoBack, canGoForward }] = useStateHistory(0);
 */
function useStateHistory<T>(
  initialValue: T,
  options: UseStateHistoryOptions = {}
): [T, UseStateHistoryReturn<T>] {
  const { maxHistorySize = 50 } = options;

  const [history, setHistory] = React.useState<T[]>([initialValue]);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const currentValue = history[currentIndex];

  const setValue = React.useCallback(
    (value: T | ((prev: T) => T)) => {
      const newValue =
        typeof value === "function"
          ? (value as (prev: T) => T)(currentValue)
          : value;

      setHistory((prevHistory) => {
        // Remove any forward history when setting a new value
        const newHistory = prevHistory.slice(0, currentIndex + 1);
        newHistory.push(newValue);

        // Limit history size
        if (newHistory.length > maxHistorySize) {
          return newHistory.slice(-maxHistorySize);
        }

        return newHistory;
      });

      setCurrentIndex((prevIndex) => {
        const newHistoryLength = Math.min(currentIndex + 2, maxHistorySize);
        return newHistoryLength - 1;
      });
    },
    [currentValue, currentIndex, maxHistorySize]
  );

  const back = React.useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const forward = React.useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, history.length]);

  const go = React.useCallback(
    (index: number) => {
      if (index >= 0 && index < history.length) {
        setCurrentIndex(index);
      }
    },
    [history.length]
  );

  const clear = React.useCallback(() => {
    setHistory([initialValue]);
    setCurrentIndex(0);
  }, [initialValue]);

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < history.length - 1;

  return [
    currentValue,
    {
      setValue,
      back,
      forward,
      go,
      clear,
      canGoBack,
      canGoForward,
      history,
      currentIndex,
    },
  ];
}

export { useStateHistory };
export type { UseStateHistoryOptions, UseStateHistoryReturn };
