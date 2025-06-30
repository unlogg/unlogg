"use client";

import * as React from "react";

/**
 * A custom React hook that detects when the user is leaving the page.
 *
 * This hook monitors the "mouseleave" event on the document to determine when
 * the user's cursor leaves the browser window/document area. It's useful for
 * implementing features like exit-intent popups, saving drafts, or showing
 * retention messages when users are about to leave.
 *
 * @returns A boolean indicating whether the user is currently leaving the page
 *
 * @example
 * function ExitIntentPopup() {
 *   const isLeavingPage = useLeavePage();
 *
 *   if (isLeavingPage) {
 *     return (
 *       <div className="popup">
 *         <h2>Wait! Don't leave yet!</h2>
 *         <p>You have unsaved changes.</p>
 *       </div>
 *     );
 *   }
 *
 *   return <div>Page content</div>;
 * }
 *
 * @example
 * function AutoSaveOnLeave() {
 *   const isLeavingPage = useLeavePage();
 *   const [content, setContent] = useState("");
 *
 *   React.useEffect(() => {
 *     if (isLeavingPage && content) {
 *       // Auto-save when user is leaving
 *       console.log("Auto-saving content...");
 *     }
 *   }, [isLeavingPage, content]);
 *
 *   return (
 *     <textarea
 *       value={content}
 *       onChange={(e) => setContent(e.target.value)}
 *       placeholder="Type something..."
 *     />
 *   );
 * }
 */
function useLeavePage(): boolean {
  const [isLeavingPage, setIsLeavingPage] = React.useState(false);

  React.useEffect(() => {
    // Only run on client side
    if (typeof document === "undefined") {
      return;
    }

    const handleMouseLeave = (event: MouseEvent) => {
      // Check if the mouse is leaving the document (not just an element within it)
      if (
        event.clientY <= 0 ||
        event.clientX <= 0 ||
        event.clientX >= window.innerWidth ||
        event.clientY >= window.innerHeight
      ) {
        setIsLeavingPage(true);
      }
    };

    const handleMouseEnter = () => {
      setIsLeavingPage(false);
    };

    // Add event listeners
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Cleanup function
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return isLeavingPage;
}

export { useLeavePage };
