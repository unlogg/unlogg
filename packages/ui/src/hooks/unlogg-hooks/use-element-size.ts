"use client";

import * as React from "react";

type ElementSize = {
  width: number;
  height: number;
};

/**
 * A custom React hook that tracks an element's size using ResizeObserver.
 *
 * @returns A tuple containing:
 *   - A ref object that must be attached to the element you want to observe
 *   - An object with the current element dimensions:
 *     - `width`: The current element width in pixels
 *     - `height`: The current element height in pixels
 *
 * @example
 * const [ref, { width, height }] = useElementSize();
 *
 * return (
 *   <div ref={ref}>
 *     Element size: {width} x {height}
 *   </div>
 * );
 */
function useElementSize<T extends HTMLElement = HTMLDivElement>(): [
  React.RefObject<T | null>,
  ElementSize,
] {
  const ref = React.useRef<T | null>(null);
  const [size, setSize] = React.useState<ElementSize>({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries) || !entries.length) {
        return;
      }

      const entry = entries[0];
      const { width, height } = entry.contentRect;

      setSize({
        width: Math.round(width),
        height: Math.round(height),
      });
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return [ref, size];
}

export { useElementSize };
export type { ElementSize };
