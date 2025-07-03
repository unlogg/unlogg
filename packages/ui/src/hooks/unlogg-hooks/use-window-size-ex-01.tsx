"use client";

import { Badge } from "@unlogg/ui/components/badge";
import { Card } from "@unlogg/ui/components/card";
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
        <div className="space-y-4 text-center">
          <h3 className="text-lg font-semibold">Window Size</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="font-mono text-2xl font-bold text-blue-600">
                {width}px
              </div>
              <div className="text-muted-foreground text-sm">Width</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-2xl font-bold text-green-600">
                {height}px
              </div>
              <div className="text-muted-foreground text-sm">Height</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="text-muted-foreground text-sm">Breakpoint:</span>
            <Badge variant={getBreakpointColor(breakpoint)}>{breakpoint}</Badge>
          </div>

          <div className="text-muted-foreground text-xs">
            Resize your window to see the values update
          </div>
        </div>
      </Card>

      {/* Responsive demonstration */}
      <Card className="w-full max-w-md p-4">
        <h4 className="mb-3 text-sm font-medium">Responsive Content</h4>
        <div className="space-y-2">
          {width < 640 && (
            <div className="rounded border border-red-200 bg-red-50 p-2 text-xs text-red-700">
              📱 Mobile view (xs: &lt; 640px)
            </div>
          )}
          {width >= 640 && width < 768 && (
            <div className="rounded border border-orange-200 bg-orange-50 p-2 text-xs text-orange-700">
              📱 Small tablet view (sm: 640px - 767px)
            </div>
          )}
          {width >= 768 && width < 1024 && (
            <div className="rounded border border-blue-200 bg-blue-50 p-2 text-xs text-blue-700">
              💻 Tablet view (md: 768px - 1023px)
            </div>
          )}
          {width >= 1024 && width < 1280 && (
            <div className="rounded border border-green-200 bg-green-50 p-2 text-xs text-green-700">
              🖥️ Desktop view (lg: 1024px - 1279px)
            </div>
          )}
          {width >= 1280 && (
            <div className="rounded border border-purple-200 bg-purple-50 p-2 text-xs text-purple-700">
              🖥️ Large desktop view (xl: ≥ 1280px)
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
