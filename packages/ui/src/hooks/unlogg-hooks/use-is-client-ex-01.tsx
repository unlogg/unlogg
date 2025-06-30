"use client";

import * as React from "react";
import { Card } from "@unlogg/ui/components/card";
import { Button } from "@unlogg/ui/components/button";
import { Badge } from "@unlogg/ui/components/badge";
import { useIsClient } from "@unlogg/ui/hooks/unlogg-hooks/use-is-client";

export default function UseIsClient_Ex_01() {
  const isClient = useIsClient();
  const [mounted, setMounted] = React.useState(false);
  const renderCountRef = React.useRef(0);

  // Track render count using ref to avoid infinite loop
  renderCountRef.current += 1;

  // Track when component is mounted
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Client Detection Hook</h3>
        <p className="text-sm text-muted-foreground mb-4">
          This hook helps prevent hydration mismatches and enables safe
          client-side rendering
        </p>

        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Client Status:</span>
            <Badge variant={isClient ? "default" : "secondary"}>
              {isClient ? "Client Side" : "Server Side"}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Mounted:</span>
            <Badge variant={mounted ? "outline" : "secondary"}>
              {mounted ? "Yes" : "No"}
            </Badge>
          </div>
        </div>
      </div>
      {/* Status Overview */}
      <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Hydration Status</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatusCard
            title="useIsClient()"
            value={isClient}
            description="Indicates if running on client"
            trueLabel="Client"
            falseLabel="Server"
          />
          <StatusCard
            title="Component Mounted"
            value={mounted}
            description="Component mount status"
            trueLabel="Mounted"
            falseLabel="Not Mounted"
          />
          <div className="p-4  border rounded-lg">
            <h5 className="font-semibold text-primary mb-2">Render Count</h5>
            <div className="text-2xl font-mono font-bold text-primary mb-2">
              {renderCountRef.current}
            </div>
            <p className="text-sm text-muted-foreground">
              Total component renders
            </p>
          </div>
        </div>
      </Card>
      Client-only content
      <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Client-Only Content</h4>
        <ClientOnlyDemo />
      </Card>
      {/* Browser API access */}
      {/* <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Safe Browser API Access</h4>
        <BrowserAPIDemo />
      </Card> */}
      {/* Conditional rendering examples */}
      {/* <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">
          Conditional Rendering Patterns
        </h4>
        <ConditionalRenderingDemo />
      </Card> */}
    </div>
  );
}

interface StatusCardProps {
  title: string;
  value: boolean;
  description: string;
  trueLabel: string;
  falseLabel: string;
}

function StatusCard({
  title,
  value,
  description,
  trueLabel,
  falseLabel,
}: StatusCardProps) {
  return (
    <div
      className={`
      p-4 rounded-lg border-2 transition-all duration-200
      ${value ? "border-green-300" : "border-gray-200 bg-gray-50"}
    `}
    >
      <div className="text-center">
        <h5 className="font-semibold text-sm mb-2">{title}</h5>
        <div
          className={`
          w-4 h-4 rounded-full mx-auto mb-2
          ${value ? "bg-green-500" : "bg-gray-400"}
        `}
        />
        <Badge variant={value ? "default" : "secondary"} className="mb-2">
          {value ? trueLabel : falseLabel}
        </Badge>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function ClientOnlyDemo() {
  const isClient = useIsClient();

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        The content below only appears after client-side hydration:
      </p>

      {!isClient ? (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            🔄 Server-side rendering... Client content will appear after
            hydration.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h5 className="font-semibold text-green-800 mb-2">
              ✅ Client-Side Content
            </h5>
            <p className="text-sm text-green-700">
              This content is now safely rendered on the client side!
            </p>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h5 className="font-semibold text-blue-800 mb-2">
              🌐 Browser Information
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
              <div>User Agent: {navigator.userAgent.slice(0, 50)}...</div>
              <div>Language: {navigator.language}</div>
              <div>Online: {navigator.onLine ? "Yes" : "No"}</div>
              <div>
                Cookie Enabled: {navigator.cookieEnabled ? "Yes" : "No"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BrowserAPIDemo() {
  const isClient = useIsClient();
  const [locationInfo, setLocationInfo] = React.useState<any>(null);
  const [storageInfo, setStorageInfo] = React.useState<any>(null);

  React.useEffect(() => {
    if (isClient) {
      // Safe to access browser APIs now
      setLocationInfo({
        href: window.location.href,
        hostname: window.location.hostname,
        pathname: window.location.pathname,
      });

      setStorageInfo({
        localStorage: typeof window.localStorage !== "undefined",
        sessionStorage: typeof window.sessionStorage !== "undefined",
        indexedDB: typeof window.indexedDB !== "undefined",
      });
    }
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-sm text-gray-600">
          Browser APIs will be accessed safely after client-side hydration...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h5 className="font-semibold text-purple-800 mb-2">
            📍 Location API
          </h5>
          {locationInfo && (
            <div className="space-y-1 text-sm text-purple-700">
              <div>Host: {locationInfo.hostname}</div>
              <div>Path: {locationInfo.pathname}</div>
            </div>
          )}
        </div>

        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h5 className="font-semibold text-indigo-800 mb-2">
            💾 Storage APIs
          </h5>
          {storageInfo && (
            <div className="space-y-1 text-sm text-indigo-700">
              <div>localStorage: {storageInfo.localStorage ? "✅" : "❌"}</div>
              <div>
                sessionStorage: {storageInfo.sessionStorage ? "✅" : "❌"}
              </div>
              <div>indexedDB: {storageInfo.indexedDB ? "✅" : "❌"}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ConditionalRenderingDemo() {
  const isClient = useIsClient();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pattern 1: Loading state */}
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h5 className="font-semibold text-orange-800 mb-2">
            Pattern 1: Loading
          </h5>
          <div className="text-sm text-orange-700">
            {!isClient ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
                Loading...
              </div>
            ) : (
              <div>✅ Content loaded!</div>
            )}
          </div>
        </div>

        {/* Pattern 2: Null fallback */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h5 className="font-semibold text-green-800 mb-2">
            Pattern 2: Null Fallback
          </h5>
          <div className="text-sm text-green-700">
            <div>Always visible content</div>
            {isClient && <div>+ Client-only feature</div>}
          </div>
        </div>

        {/* Pattern 3: Placeholder */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h5 className="font-semibold text-blue-800 mb-2">
            Pattern 3: Placeholder
          </h5>
          <div className="text-sm text-blue-700">
            {!isClient ? (
              <div className="bg-blue-200 h-8 rounded animate-pulse" />
            ) : (
              <div>Dynamic client content</div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h5 className="font-semibold text-gray-800 mb-2">Code Examples</h5>
        <div className="space-y-2 text-sm font-mono">
          <div className="p-2 bg-white rounded border">
            {`{!isClient ? <Loading /> : <ClientContent />}`}
          </div>
          <div className="p-2 bg-white rounded border">
            {`{isClient && <BrowserOnlyFeature />}`}
          </div>
          <div className="p-2 bg-white rounded border">
            {`{!isClient ? <Placeholder /> : <DynamicContent />}`}
          </div>
        </div>
      </div>
    </div>
  );
}
