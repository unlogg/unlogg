"use client";

import * as React from "react";

/**
 * A custom React hook that sets the document title.
 *
 * This hook uses useLayoutEffect to synchronously update the document title,
 * ensuring the title is set before the browser paints. It's designed for client-only
 * applications and will not run during server-side rendering.
 *
 * @param title - The title to set for the document. If null or undefined, the title won't be changed.
 * @param options - Configuration options for the hook
 * @param options.restoreOnUnmount - Whether to restore the previous title when the component unmounts
 *
 * @example
 * function MyPage() {
 *   useDocumentTitle("My Page Title");
 *
 *   return <div>Page content</div>;
 * }
 *
 * @example
 * function DynamicPage() {
 *   const [count, setCount] = useState(0);
 *   useDocumentTitle(`Count: ${count}`, { restoreOnUnmount: true });
 *
 *   return (
 *     <button onClick={() => setCount(c => c + 1)}>
 *       Increment count
 *     </button>
 *   );
 * }
 *
 * @example
 * function ConditionalTitle() {
 *   const [showTitle, setShowTitle] = useState(false);
 *   useDocumentTitle(showTitle ? "Custom Title" : null);
 *
 *   return (
 *     <button onClick={() => setShowTitle(!showTitle)}>
 *       {showTitle ? "Remove" : "Set"} Custom Title
 *     </button>
 *   );
 * }
 */
function useDocumentTitle(
  title: string | null | undefined,
  options: {
    restoreOnUnmount?: boolean;
  } = {}
): void {
  const { restoreOnUnmount = false } = options;

  // Store the original title when the hook is first used
  const originalTitleRef = React.useRef<string | null>(null);

  React.useLayoutEffect(() => {
    // Only run on client side
    if (typeof document === "undefined") {
      return;
    }

    // Store the original title on first run
    if (originalTitleRef.current === null) {
      originalTitleRef.current = document.title;
    }

    // Set the new title if provided
    if (title != null) {
      document.title = title;
    }

    // Cleanup function to restore original title if requested
    return () => {
      if (restoreOnUnmount && originalTitleRef.current !== null) {
        document.title = originalTitleRef.current;
      }
    };
  }, [title, restoreOnUnmount]);

  // Cleanup on unmount if restoreOnUnmount is true
  React.useLayoutEffect(() => {
    return () => {
      if (
        restoreOnUnmount &&
        originalTitleRef.current !== null &&
        typeof document !== "undefined"
      ) {
        document.title = originalTitleRef.current;
      }
    };
  }, [restoreOnUnmount]);
}

export { useDocumentTitle };
