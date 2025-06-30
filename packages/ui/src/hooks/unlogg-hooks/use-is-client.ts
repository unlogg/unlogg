"use client";

import * as React from "react";

/**
 * A custom React hook that determines if the code is running on the client side (in the browser).
 *
 * This hook is useful for:
 * - Preventing hydration mismatches in SSR applications
 * - Conditionally rendering client-only components
 * - Safely accessing browser APIs after hydration
 * - Avoiding server-side rendering issues
 *
 * @returns A boolean indicating whether the code is running on the client side.
 *
 * @example
 * function ClientOnlyComponent() {
 *   const isClient = useIsClient();
 *
 *   if (!isClient) {
 *     return <div>Loading...</div>; // Or null for no server-side render
 *   }
 *
 *   return <div>This only renders on the client!</div>;
 * }
 *
 * @example
 * function ConditionalFeature() {
 *   const isClient = useIsClient();
 *
 *   return (
 *     <div>
 *       <h1>My App</h1>
 *       {isClient && <BrowserOnlyFeature />}
 *     </div>
 *   );
 * }
 */
function useIsClient(): boolean {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    // This effect only runs on the client side
    setIsClient(true);
  }, []);

  return isClient;
}

export { useIsClient };
