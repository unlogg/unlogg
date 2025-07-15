import { useCallback, useRef, useState } from "react";

export interface UseInViewportReturnValue<T extends HTMLElement = any> {
  inView: boolean;
  ref: React.RefCallback<T | null>;
}

export function useInViewport<
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
