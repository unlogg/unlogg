"use client";

import { Badge } from "@unlogg/ui/components/badge";
import { Card } from "@unlogg/ui/components/card";
import { useIsClient } from "@unlogg/ui/hooks/unlogg-hooks/use-is-client";
import * as React from "react";

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
        <h3 className="mb-2 text-lg font-semibold">Client Detection Hook</h3>
        <p className="text-muted-foreground mb-4 text-sm">
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
      <Card className="mx-auto w-full max-w-4xl p-6">
        <h4 className="text-md mb-4 font-semibold">Hydration Status</h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
          <div className="rounded-lg border p-4">
            <h5 className="text-primary mb-2 font-semibold">Render Count</h5>
            <div className="text-primary mb-2 font-mono text-2xl font-bold">
              {renderCountRef.current}
            </div>
            <p className="text-muted-foreground text-sm">
              Total component renders
            </p>
          </div>
        </div>
      </Card>
      Client-only content
      <Card className="mx-auto w-full max-w-4xl p-6">
        <h4 className="text-md mb-4 font-semibold">Client-Only Content</h4>
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
      className={`rounded-lg border-2 p-4 transition-all duration-200 ${value ? "border-green-300" : "border-gray-200 bg-gray-50"} `}
    >
      <div className="text-center">
        <h5 className="mb-2 text-sm font-semibold">{title}</h5>
        <div
          className={`mx-auto mb-2 h-4 w-4 rounded-full ${value ? "bg-green-500" : "bg-gray-400"} `}
        />
        <Badge variant={value ? "default" : "secondary"} className="mb-2">
          {value ? trueLabel : falseLabel}
        </Badge>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
    </div>
  );
}

function ClientOnlyDemo() {
  const isClient = useIsClient();

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground mb-4 text-sm">
        The content below only appears after client-side hydration:
      </p>

      {!isClient ? (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm text-yellow-800">
            🔄 Server-side rendering... Client content will appear after
            hydration.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <h5 className="mb-2 font-semibold text-green-800">
              ✅ Client-Side Content
            </h5>
            <p className="text-sm text-green-700">
              This content is now safely rendered on the client side!
            </p>
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h5 className="mb-2 font-semibold text-blue-800">
              🌐 Browser Information
            </h5>
            <div className="grid grid-cols-1 gap-2 text-sm text-blue-700 md:grid-cols-2">
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
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p className="text-sm text-gray-600">
          Browser APIs will be accessed safely after client-side hydration...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
          <h5 className="mb-2 font-semibold text-purple-800">
            📍 Location API
          </h5>
          {locationInfo && (
            <div className="space-y-1 text-sm text-purple-700">
              <div>Host: {locationInfo.hostname}</div>
              <div>Path: {locationInfo.pathname}</div>
            </div>
          )}
        </div>

        <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
          <h5 className="mb-2 font-semibold text-indigo-800">
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Pattern 1: Loading state */}
        <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
          <h5 className="mb-2 font-semibold text-orange-800">
            Pattern 1: Loading
          </h5>
          <div className="text-sm text-orange-700">
            {!isClient ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-orange-400 border-t-transparent" />
                Loading...
              </div>
            ) : (
              <div>✅ Content loaded!</div>
            )}
          </div>
        </div>

        {/* Pattern 2: Null fallback */}
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <h5 className="mb-2 font-semibold text-green-800">
            Pattern 2: Null Fallback
          </h5>
          <div className="text-sm text-green-700">
            <div>Always visible content</div>
            {isClient && <div>+ Client-only feature</div>}
          </div>
        </div>

        {/* Pattern 3: Placeholder */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h5 className="mb-2 font-semibold text-blue-800">
            Pattern 3: Placeholder
          </h5>
          <div className="text-sm text-blue-700">
            {!isClient ? (
              <div className="h-8 animate-pulse rounded bg-blue-200" />
            ) : (
              <div>Dynamic client content</div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h5 className="mb-2 font-semibold text-gray-800">Code Examples</h5>
        <div className="space-y-2 font-mono text-sm">
          <div className="rounded border bg-white p-2">
            {`{!isClient ? <Loading /> : <ClientContent />}`}
          </div>
          <div className="rounded border bg-white p-2">
            {`{isClient && <BrowserOnlyFeature />}`}
          </div>
          <div className="rounded border bg-white p-2">
            {`{!isClient ? <Placeholder /> : <DynamicContent />}`}
          </div>
        </div>
      </div>
    </div>
  );
}
