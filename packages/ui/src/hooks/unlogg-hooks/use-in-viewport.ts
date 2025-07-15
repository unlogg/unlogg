"use client";

import { useCallback, useRef, useState } from "react";

export interface UseInViewportReturnValue<T extends HTMLElement = any> {
  inView: boolean;
  ref: React.RefCallback<T | null>;
}

/**
 * Custom React hook to determine if a DOM element is currently visible within the viewport using the Intersection Observer API.
 *
 * @template T - The type of the HTMLElement to observe.
 * @returns {UseInViewportReturnValue<T>} An object containing:
 *   - `ref`: A callback ref to be attached to the target element.
 *   - `inView`: A boolean indicating whether the element is in the viewport.
 *
 * @example
 * const { ref, inView } = useInViewport<HTMLDivElement>();
 * return <div ref={ref}>{inView ? "Visible" : "Not visible"}</div>;
 *
 * @remarks
 * - Automatically disconnects the observer when the element is unmounted.
 * - Falls back gracefully if IntersectionObserver is not available.
 */
function useInViewport<
  T extends HTMLElement = any,
>(): UseInViewportReturnValue<T> {
  const observer = useRef<IntersectionObserver | null>(null);
  const [inView, setInView] = useState(false);

  const ref: React.RefCallback<T | null> = useCallback((node) => {
    if (typeof IntersectionObserver !== "undefined") {
      if (node && !observer.current) {
        observer.current = new IntersectionObserver((entries) =>
          setInView(entries.some((entry) => entry.isIntersecting))
        );
      } else {
        observer.current?.disconnect();
      }

      if (node) {
        observer.current?.observe(node);
      } else {
        setInView(false);
      }
    }
  }, []);

  return { ref, inView };
}

export { useInViewport };
