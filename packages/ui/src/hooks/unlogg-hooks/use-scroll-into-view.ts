"use client";

import * as React from "react";

type ScrollIntoViewOptions = {
  behavior?: "auto" | "smooth";
  block?: "start" | "center" | "end" | "nearest";
  inline?: "start" | "center" | "end" | "nearest";
};

type UseScrollIntoViewReturn = {
  scrollIntoView: (options?: ScrollIntoViewOptions) => void;
  cancel: () => void;
};

/**
 * A custom React hook that handles scroll behavior for any scrollable element.
 * Adjusts scrolling animation with respect to the reduced-motion user preference.
 *
 * @param options - Optional scroll configuration options
 * @param options.behavior - Scroll behavior ('auto' or 'smooth')
 * @param options.block - Vertical alignment ('start', 'center', 'end', 'nearest')
 * @param options.inline - Horizontal alignment ('start', 'center', 'end', 'nearest')
 *
 * @returns A tuple containing:
 *   - A ref object that must be attached to the element you want to scroll to
 *   - An object with control functions:
 *     - `scrollIntoView`: Function to trigger scrolling with optional override options
 *     - `cancel`: Function to cancel ongoing smooth scrolling
 *
 * @example
 * const [targetRef, { scrollIntoView }] = useScrollIntoView();
 *
 * return (
 *   <div>
 *     <button onClick={() => scrollIntoView()}>Scroll to target</button>
 *     <div ref={targetRef}>Target element</div>
 *   </div>
 * );
 */
function useScrollIntoView<T extends HTMLElement = HTMLElement>(
  options: ScrollIntoViewOptions = {}
): [React.RefObject<T | null>, UseScrollIntoViewReturn] {
  const ref = React.useRef<T | null>(null);
  const animationFrameRef = React.useRef<number | null>(null);

  const defaultOptions: ScrollIntoViewOptions = {
    behavior: "smooth",
    block: "start",
    inline: "nearest",
    ...options,
  };

  const cancel = React.useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const scrollIntoView = React.useCallback(
    (overrideOptions?: ScrollIntoViewOptions) => {
      const element = ref.current;
      if (!element) return;

      cancel(); // Cancel any ongoing scroll

      const finalOptions = { ...defaultOptions, ...overrideOptions };

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Override behavior if user prefers reduced motion
      if (prefersReducedMotion && finalOptions.behavior === "smooth") {
        finalOptions.behavior = "auto";
      }

      // Use requestAnimationFrame to ensure smooth execution
      animationFrameRef.current = requestAnimationFrame(() => {
        element.scrollIntoView({
          behavior: finalOptions.behavior,
          block: finalOptions.block,
          inline: finalOptions.inline,
        });
      });
    },
    [defaultOptions, cancel]
  );

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return [ref, { scrollIntoView, cancel }];
}

export { useScrollIntoView };
export type { ScrollIntoViewOptions, UseScrollIntoViewReturn };
