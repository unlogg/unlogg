"use client";

import { useEffect, useRef } from "react";

type UseTimeoutOptions = {
  callback: () => void;
  delay: number | null;
};

/**
 * Custom React hook that executes a callback function after a specified delay.
 * The callback is always the latest version passed to the hook.
 *
 * @param options - An object containing:
 *   - callback: The function to execute after the delay.
 *   - delay: The delay in milliseconds before executing the callback. If `null` or not a number, the timeout is not set.
 *
 * @remarks
 * The timeout is cleared and reset whenever the `delay` changes.
 * The callback reference is updated on every render to ensure the latest function is called.
 *
 * @example
 * useTimeout({ callback: () => console.log('Timeout!'), delay: 1000 });
 */
function useTimeout({ callback, delay }: UseTimeoutOptions) {
  const savedCallback = useRef<() => void>(undefined);

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

    const id = setTimeout(handler, delay);

    return () => clearTimeout(id);
  }, [delay]);
}

export { useTimeout };
export type { UseTimeoutOptions };
