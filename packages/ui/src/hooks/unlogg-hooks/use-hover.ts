"use client";

import * as React from "react";

/**
 * A custom React hook that detects if a given element is being hovered.
 *
 * @param elementRef - A ref object pointing to the element to observe for hover state.
 * @returns A boolean indicating whether the element is currently being hovered.
 *
 * @example
 * const hoverRef = useRef(null);
 * const isHover = useHover(hoverRef);
 *
 * return (
 *   <div ref={hoverRef}>
 *     {isHover ? "Hovering!" : "Not hovering"}
 *   </div>
 * );
 */
function useHover<T extends HTMLElement = HTMLElement>(
  elementRef: React.RefObject<T | null>
): boolean {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [elementRef]);

  return isHovered;
}

export { useHover };
