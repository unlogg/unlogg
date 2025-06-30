"use client";

import * as React from "react";

type WindowSize = {
  width: number;
  height: number;
};

/**
 * A custom React hook that tracks the current window size and updates on resize.
 *
 * @returns An object containing the current window width and height.
 *   - `width`: The current window width in pixels.
 *   - `height`: The current window height in pixels.
 *
 * @example
 * const { width, height } = useWindowSize();
 *
 * // Use the window size to conditionally render content
 * if (width < 768) {
 *   return <MobileComponent />;
 * }
 * return <DesktopComponent />;
 */
function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = React.useState<WindowSize>({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export { useWindowSize };
export type { WindowSize };
