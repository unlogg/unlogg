"use client";

import { Badge } from "@unlogg/ui/components/badge";
import { Card } from "@unlogg/ui/components/card";
import { useIsOnline } from "@unlogg/ui/hooks/unlogg-hooks/use-is-online";

export default function UseIsOnline_Ex_01() {
  const { isOnline, networkInfo } = useIsOnline();

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">
          Online Status Detection Hook
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Monitors network connectivity and provides connection information
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
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

      <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Connection Status</h4>
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
        <div className={`text-6xl mb-2 ${!isOnline ? "animate-pulse" : ""}`}>
          {isOnline ? "🌐" : "📡"}
        </div>
        <Badge
          variant={isOnline ? "default" : "destructive"}
          className="text-sm"
        >
          {isOnline ? "Connected to Internet" : "No Internet Connection"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Status:</strong> {isOnline ? "Online" : "Offline"}
          </p>
        </div>
        {networkInfo?.type && (
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Connection Type:</strong> {networkInfo.type}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
