"use client";

import * as React from "react";

type UseCountdownOptions = {
  countStart: number;
  intervalMs?: number;
  onComplete?: () => void;
};

type UseCountdownReturn = {
  startCountdown: () => void;
  stopCountdown: () => void;
  resetCountdown: () => void;
  isActive: boolean;
};

/**
 * A custom React hook that provides countdown timer functionality.
 *
 * @param options - Configuration options for the countdown.
 * @param options.countStart - The initial value to start counting down from.
 * @param options.intervalMs - The interval in milliseconds between countdown ticks (default: 1000).
 * @param options.onComplete - Optional callback invoked when the countdown reaches zero.
 *
 * @returns A tuple containing:
 *   - The current count value.
 *   - An object with control functions and state:
 *     - `startCountdown`: Starts the countdown if the count is greater than zero.
 *     - `stopCountdown`: Stops the countdown and clears the interval.
 *     - `resetCountdown`: Resets the countdown to the initial value and stops it.
 *     - `isActive`: Boolean indicating if the countdown is currently active.
 *
 * @example
 * const [count, { startCountdown, stopCountdown, resetCountdown, isActive }] = useCountdown({
 *   countStart: 10,
 *   intervalMs: 1000,
 *   onComplete: () => alert('Countdown finished!'),
 * });
 */
function useCountdown({
  countStart,
  intervalMs = 1000,
  onComplete,
}: UseCountdownOptions): [number, UseCountdownReturn] {
  const [count, setCount] = React.useState(countStart);
  const [isActive, setIsActive] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const startCountdown = React.useCallback(() => {
    if (count > 0) {
      setIsActive(true);
    }
  }, [count]);

  const stopCountdown = React.useCallback(() => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetCountdown = React.useCallback(() => {
    setIsActive(false);
    setCount(countStart);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [countStart]);

  React.useEffect(() => {
    if (isActive && count > 0) {
      intervalRef.current = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount <= 1) {
            setIsActive(false);
            onComplete?.();
            return 0;
          }
          return prevCount - 1;
        });
      }, intervalMs);
    } else if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, count, intervalMs, onComplete]);

  return [count, { startCountdown, stopCountdown, resetCountdown, isActive }];
}

export { useCountdown };
export type { UseCountdownOptions, UseCountdownReturn };
