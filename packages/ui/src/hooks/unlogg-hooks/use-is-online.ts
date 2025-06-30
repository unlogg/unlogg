"use client";

import * as React from "react";

type NetworkInformation = {
  downlink?: number;
  downlinkMax?: number;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  rtt?: number;
  saveData?: boolean;
  type?:
    | "bluetooth"
    | "cellular"
    | "ethernet"
    | "none"
    | "wifi"
    | "wimax"
    | "other"
    | "unknown";
};

type UseIsOnlineReturn = {
  isOnline: boolean;
  networkInfo: NetworkInformation | undefined;
};

/**
 * A custom React hook that detects the user's online status and provides network information.
 *
 * This hook monitors the navigator.onLine property and optionally uses the experimental
 * navigator.connection API to provide detailed network information. It's useful for
 * implementing features like offline mode, adaptive content loading, or network-aware
 * functionality.
 *
 * @returns An object containing:
 *   - `isOnline`: A boolean indicating whether the user is currently online
 *   - `networkInfo`: An object with network connection details (undefined if not supported)
 *
 * @example
 * function NetworkStatus() {
 *   const { isOnline, networkInfo } = useIsOnline();
 *
 *   return (
 *     <div>
 *       <p>Status: {isOnline ? "Online" : "Offline"}</p>
 *       {networkInfo && (
 *         <p>Connection: {networkInfo.effectiveType}</p>
 *       )}
 *     </div>
 *   );
 * }
 *
 * @example
 * function AdaptiveContent() {
 *   const { isOnline, networkInfo } = useIsOnline();
 *
 *   if (!isOnline) {
 *     return <div>You are offline. Some features may be limited.</div>;
 *   }
 *
 *   if (networkInfo?.effectiveType === "slow-2g" || networkInfo?.effectiveType === "2g") {
 *     return <div>Loading optimized content for slow connection...</div>;
 *   }
 *
 *   return <div>Loading full content...</div>;
 * }
 *
 * @example
 * function DataSaverMode() {
 *   const { networkInfo } = useIsOnline();
 *
 *   React.useEffect(() => {
 *     if (networkInfo?.saveData) {
 *       console.log("User has data saver mode enabled");
 *       // Load compressed images, reduce auto-play videos, etc.
 *     }
 *   }, [networkInfo?.saveData]);
 *
 *   return <div>Content optimized for data saving</div>;
 * }
 */
function useIsOnline(): UseIsOnlineReturn {
  const [isOnline, setIsOnline] = React.useState<boolean>(true);
  const [networkInfo, setNetworkInfo] = React.useState<
    NetworkInformation | undefined
  >(undefined);

  console.log("networkInfo", networkInfo);

  React.useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      console.error(
        "useIsOnline: This hook can only be used in a browser environment"
      );
      setIsOnline(false);
      setNetworkInfo(undefined);
      return;
    }

    // Set initial online status
    setIsOnline(navigator.onLine);

    // Get network information if available
    const getNetworkInfo = (): NetworkInformation | undefined => {
      // Type assertion for experimental API
      const connection =
        (navigator as any).connection ||
        (navigator as any).mozConnection ||
        (navigator as any).webkitConnection;

      if (!connection) {
        return undefined;
      }

      return {
        downlink: connection.downlink,
        downlinkMax: connection.downlinkMax,
        effectiveType: connection.effectiveType,
        rtt: connection.rtt,
        saveData: connection.saveData,
        type: connection.type,
      };
    };

    // Set initial network info
    setNetworkInfo(getNetworkInfo());

    // Event handlers
    const handleOnline = () => {
      setIsOnline(true);
      setNetworkInfo(getNetworkInfo());
    };

    const handleOffline = () => {
      setIsOnline(false);
      setNetworkInfo(getNetworkInfo());
    };

    const handleConnectionChange = () => {
      setNetworkInfo(getNetworkInfo());
    };

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Add connection change listener if available
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    if (connection) {
      connection.addEventListener("change", handleConnectionChange);
    } else {
      console.warn(
        "useIsOnline: navigator.connection is not supported in this browser. Network information will be unavailable."
      );
    }

    // Cleanup function
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);

      if (connection) {
        connection.removeEventListener("change", handleConnectionChange);
      }
    };
  }, []);

  return { isOnline, networkInfo };
}

export { useIsOnline };
export type { UseIsOnlineReturn, NetworkInformation };
