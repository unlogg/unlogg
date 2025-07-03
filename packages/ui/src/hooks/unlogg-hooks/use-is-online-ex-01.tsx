"use client";

import { Badge } from "@unlogg/ui/components/badge";
import { Card } from "@unlogg/ui/components/card";
import { useIsOnline } from "@unlogg/ui/hooks/unlogg-hooks/use-is-online";

export default function UseIsOnline_Ex_01() {
  const { isOnline, networkInfo } = useIsOnline();

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="text-center">
        <h3 className="mb-2 text-lg font-semibold">
          Online Status Detection Hook
        </h3>
        <p className="text-muted-foreground mb-4 text-sm">
          Monitors network connectivity and provides connection information
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Badge
            variant={isOnline ? "default" : "destructive"}
            className="text-sm"
          >
            {isOnline ? "🟢 Online" : "🔴 Offline"}
          </Badge>
          {networkInfo?.effectiveType && (
            <Badge variant="outline" className="font-mono">
              {networkInfo.effectiveType.toUpperCase()}
            </Badge>
          )}
          {networkInfo?.saveData && (
            <Badge variant="secondary" className="text-xs">
              💾 Data Saver
            </Badge>
          )}
        </div>
      </div>

      <Card className="mx-auto w-full max-w-4xl p-6">
        <h4 className="text-md mb-4 font-semibold">Connection Status</h4>
        <ConnectionStatusDemo isOnline={isOnline} networkInfo={networkInfo} />
      </Card>
    </div>
  );
}

function ConnectionStatusDemo({
  isOnline,
  networkInfo,
}: {
  isOnline: boolean;
  networkInfo: any;
}) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className={`mb-2 text-6xl ${!isOnline ? "animate-pulse" : ""}`}>
          {isOnline ? "🌐" : "📡"}
        </div>
        <Badge
          variant={isOnline ? "default" : "destructive"}
          className="text-sm"
        >
          {isOnline ? "Connected to Internet" : "No Internet Connection"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
          <p className="text-sm text-gray-700">
            <strong>Status:</strong> {isOnline ? "Online" : "Offline"}
          </p>
        </div>
        {networkInfo?.type && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
            <p className="text-sm text-gray-700">
              <strong>Connection Type:</strong> {networkInfo.type}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
