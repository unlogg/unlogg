"use client";

import { Card } from "@unlogg/ui/components/card";
import { useIsOnline } from "@unlogg/ui/hooks/unlogg-hooks/use-is-online";

export default function UseIsOnline_Ex_02() {
  const { networkInfo } = useIsOnline();

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Network Information */}
      <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Network Information</h4>
        <NetworkInfoDemo networkInfo={networkInfo} />
      </Card>
    </div>
  );
}

function NetworkInfoDemo({ networkInfo }: { networkInfo: any }) {
  if (!networkInfo) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-700">
          ⚠️ Network Information API is not supported in this browser. Only
          basic online/offline detection is available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {networkInfo.effectiveType && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-medium text-blue-800">Effective Type</p>
            <p className="text-lg font-mono text-blue-600">
              {networkInfo.effectiveType.toUpperCase()}
            </p>
          </div>
        )}

        {networkInfo.downlink !== undefined && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-green-800">Downlink Speed</p>
            <p className="text-lg font-mono text-green-600">
              {networkInfo.downlink} Mbps
            </p>
          </div>
        )}

        {networkInfo.rtt !== undefined && (
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-sm font-medium text-purple-800">
              Round Trip Time
            </p>
            <p className="text-lg font-mono text-purple-600">
              {networkInfo.rtt} ms
            </p>
          </div>
        )}

        {networkInfo.saveData !== undefined && (
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm font-medium text-orange-800">Data Saver</p>
            <p className="text-lg font-mono text-orange-600">
              {networkInfo.saveData ? "Enabled" : "Disabled"}
            </p>
          </div>
        )}

        {networkInfo.type && (
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm font-medium text-gray-800">Connection Type</p>
            <p className="text-lg font-mono text-gray-600">
              {networkInfo.type}
            </p>
          </div>
        )}

        {networkInfo.downlinkMax !== undefined && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-medium text-red-800">Max Downlink</p>
            <p className="text-lg font-mono text-red-600">
              {networkInfo.downlinkMax} Mbps
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
