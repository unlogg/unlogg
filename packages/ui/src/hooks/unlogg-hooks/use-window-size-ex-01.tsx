"use client";

import * as React from "react";
import { Card } from "@unlogg/ui/components/card";
import { Badge } from "@unlogg/ui/components/badge";
import { useWindowSize } from "@unlogg/ui/hooks/unlogg-hooks/use-window-size";

export default function UseWindowSize_Ex_01() {
  const { width, height } = useWindowSize();

  const getBreakpoint = (width: number) => {
    if (width >= 1280) return "xl";
    if (width >= 1024) return "lg";
    if (width >= 768) return "md";
    if (width >= 640) return "sm";
    return "xs";
  };

  const getBreakpointColor = (breakpoint: string) => {
    switch (breakpoint) {
      case "xl":
        return "default";
      case "lg":
        return "secondary";
      case "md":
        return "outline";
      case "sm":
        return "destructive";
      default:
        return "destructive";
    }
  };

  const breakpoint = getBreakpoint(width);

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <Card className="w-full max-w-md p-6">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold">Window Size</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-blue-600">
                {width}px
              </div>
              <div className="text-sm text-muted-foreground">Width</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-green-600">
                {height}px
              </div>
              <div className="text-sm text-muted-foreground">Height</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">Breakpoint:</span>
            <Badge variant={getBreakpointColor(breakpoint)}>{breakpoint}</Badge>
          </div>

          <div className="text-xs text-muted-foreground">
            Resize your window to see the values update
          </div>
        </div>
      </Card>

      {/* Responsive demonstration */}
      <Card className="w-full max-w-md p-4">
        <h4 className="text-sm font-medium mb-3">Responsive Content</h4>
        <div className="space-y-2">
          {width < 640 && (
            <div className="p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
              📱 Mobile view (xs: &lt; 640px)
            </div>
          )}
          {width >= 640 && width < 768 && (
            <div className="p-2 bg-orange-50 border border-orange-200 rounded text-xs text-orange-700">
              📱 Small tablet view (sm: 640px - 767px)
            </div>
          )}
          {width >= 768 && width < 1024 && (
            <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
              💻 Tablet view (md: 768px - 1023px)
            </div>
          )}
          {width >= 1024 && width < 1280 && (
            <div className="p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700">
              🖥️ Desktop view (lg: 1024px - 1279px)
            </div>
          )}
          {width >= 1280 && (
            <div className="p-2 bg-purple-50 border border-purple-200 rounded text-xs text-purple-700">
              🖥️ Large desktop view (xl: ≥ 1280px)
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
