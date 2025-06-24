"use client";

import { useEffect, useRef } from "react";

type UseIntervalOptions = {
  callback: () => void;
  delay: number | null;
};

/**
 * Custom React hook that repeatedly calls a callback function at a specified interval.
 *
 * The callback is always the latest version passed to the hook, even if it changes between intervals.
 * The interval is cleared automatically when the component unmounts or when the delay changes.
 *
 * @param options - An object containing:
 *   @param callback - The function to be called at each interval.
 *   @param delay - The delay in milliseconds for the interval. If `null` or not a number, the interval is not set.
 *
 * @example
 * useInterval({ callback: () => console.log('Tick'), delay: 1000 });
 */
function useInterval({ callback, delay }: UseIntervalOptions) {
  const savedCallback = useRef<() => void>(callback);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null || typeof delay !== "number") return;

    const handler = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    const id = setInterval(handler, delay);

    // Cleanup function to clear the interval
    return () => clearInterval(id);
  }, [delay]);
}

export { useInterval };
export type { UseIntervalOptions };
