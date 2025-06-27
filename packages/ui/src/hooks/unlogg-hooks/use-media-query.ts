"use client";

import * as React from "react";

type UseMediaQueryOptions = {
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
 * Custom hook that tracks the state of a media query using the Match Media API.
 *
 * @param query - The media query to track.
 * @param options - The options for customizing the behavior of the hook (optional).
 * @returns The current state of the media query (true if the query matches, false otherwise).
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const isDark = useMediaQuery('(prefers-color-scheme: dark)');
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
 *
 * // With options for SSR
 * const isMobile = useMediaQuery('(max-width: 768px)', {
 *   defaultValue: false,
 *   initializeWithValue: false
 * });
 */
function useMediaQuery(
  query: string,
  options: UseMediaQueryOptions = {}
): boolean {
  const { defaultValue = false, initializeWithValue = true } = options;

  const getMatches = React.useCallback(
    (query: string): boolean => {
      if (typeof window === "undefined") {
        return defaultValue;
      }
      return window.matchMedia(query).matches;
    },
    [defaultValue]
  );

  const [matches, setMatches] = React.useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue;
  });

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const matchMedia = window.matchMedia(query);

    // Update state if the value has changed
    const updateMatches = () => {
      setMatches(matchMedia.matches);
    };

    // Set the initial value if we didn't initialize with it
    if (!initializeWithValue) {
      setMatches(matchMedia.matches);
    }

    // Listen for changes
    matchMedia.addEventListener("change", updateMatches);

    return () => {
      matchMedia.removeEventListener("change", updateMatches);
    };
  }, [query, initializeWithValue]);

  return matches;
}

export { useMediaQuery };
export type { UseMediaQueryOptions };
