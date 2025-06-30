"use client";

import * as React from "react";

type UseMobileOptions = {
  /**
   * The default value to return if the hook is being run on the server.
   * @default false
   */
  defaultValue?: boolean;
  /**
   * If true (default), the hook will initialize reading the media query.
   * In SSR, you should set it to false, returning options.defaultValue or false initially.
   * @default true
   */
  initializeWithValue?: boolean;
};

/**
 * A custom React hook that detects if the current screen width is below a mobile breakpoint.
 *
 * @param breakpoint - The pixel value to use as the mobile breakpoint (default: 768)
 * @param options - The options for customizing the behavior of the hook (optional).
 * @returns A boolean indicating whether the screen width is below the mobile breakpoint.
 *
 * @example
 * const isMobile = useMobile(); // Uses default 768px breakpoint
 * const isSmallMobile = useMobile(640); // Custom 640px breakpoint
 * 
 * // With SSR options
 * const isMobile = useMobile(768, {
 *   defaultValue: false,
 *   initializeWithValue: false
 * });
 */
function useMobile(
  breakpoint: number = 768,
  options: UseMobileOptions = {}
): boolean {
  const { defaultValue = false, initializeWithValue = true } = options;

  const getMatches = React.useCallback(
    (breakpoint: number): boolean => {
      if (typeof window === "undefined") {
        return defaultValue;
      }
      return window.innerWidth < breakpoint;
    },
    [defaultValue]
  );

  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(breakpoint);
    }
    return defaultValue;
  });

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Set the initial value if we didn't initialize with it
    if (!initializeWithValue) {
      setIsMobile(window.innerWidth < breakpoint);
    }

    // Listen for resize events
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint, initializeWithValue]);

  return isMobile;
}

export { useMobile };
export type { UseMobileOptions };
