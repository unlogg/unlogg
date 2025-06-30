"use client";
import { useEffect, useRef, useState } from "react";

type UseIdleOptions = {
  events?: (keyof DocumentEventMap)[];
  initialState?: boolean;
};

const IDLE_OPTIONS: Required<UseIdleOptions> = {
  events: ["keydown", "click", "scroll", "wheel", "mousemove", "touchmove"],
  initialState: true,
};

/**
 * Custom React hook that tracks user inactivity (idle state) based on specified DOM events and a timeout.
 *
 * @param timeout - The duration in milliseconds after which the user is considered idle if no events are detected.
 * @param options - Optional configuration object to override default idle detection options.
 * @param options.events - Array of DOM event names (e.g., 'mousemove', 'keydown') that reset the idle timer.
 * @param options.initialState - Initial idle state (default is `true`).
 *
 * @returns A boolean indicating whether the user is currently idle (`true`) or active (`false`).
 *
 * @example
 * ```tsx
 * const isIdle = useIdle(60000); // User is idle after 60 seconds of inactivity
 * ```
 */
function useIdle(timeout: number, options?: UseIdleOptions) {
  const { events, initialState } = { ...IDLE_OPTIONS, ...options };
  const [isIdle, setIsIdle] = useState(initialState);
  const idleTimer = useRef(-1);

  useEffect(() => {
    const handleEvents = () => {
      setIsIdle(false);

      if (idleTimer.current) {
        window.clearTimeout(idleTimer.current);
      }

      idleTimer.current = window.setTimeout(() => {
        setIsIdle(true);
      }, timeout);
    };

    events.forEach((event) => document.addEventListener(event, handleEvents));

    // Do not wait for the first event to happen, start the timer immediately
    // This ensures that the idle state is set after the specified timeout
    idleTimer.current = window.setTimeout(() => {
      setIsIdle(true);
    }, timeout);

    return () => {
      events.forEach((event) =>
        document.removeEventListener(event, handleEvents)
      );
      window.clearTimeout(idleTimer.current);
      idleTimer.current = -1;
    };
  }, [timeout]);

  return isIdle;
}

export { useIdle };
export type { UseIdleOptions };
