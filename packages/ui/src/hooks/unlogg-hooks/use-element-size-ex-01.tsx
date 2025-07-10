"use client";

import { Badge } from "@unlogg/ui/components/badge";
import { Button } from "@unlogg/ui/components/button";
import { Card } from "@unlogg/ui/components/card";
import { useElementSize } from "@unlogg/ui/hooks/unlogg-hooks/use-element-size";
import * as React from "react";

export default function UseElementSize_Ex_01() {
  const [ref, { width, height }] = useElementSize<HTMLDivElement>();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [containerWidth, setContainerWidth] = React.useState("300px");

  const getStatus = () => {
    if (width === 0 && height === 0) return "Not observed";
    return "Observing";
  };

  const getStatusColor = () => {
    if (width === 0 && height === 0) return "secondary";
    return "default";
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <Card className="w-full max-w-2xl p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="mb-2 text-lg font-semibold">
              Element Size Observer
            </h3>
            <Badge variant={getStatusColor()}>{getStatus()}</Badge>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="outline"
              size="sm"
            >
              {isExpanded ? "Collapse" : "Expand"} Element
            </Button>
            <Button
              onClick={() => setContainerWidth("200px")}
              variant={containerWidth === "200px" ? "default" : "outline"}
              size="sm"
            >
              Narrow
            </Button>
            <Button
              onClick={() => setContainerWidth("400px")}
              variant={containerWidth === "400px" ? "default" : "outline"}
              size="sm"
            >
              Wide
            </Button>
            <Button
              onClick={() => setContainerWidth("100%")}
              variant={containerWidth === "100%" ? "default" : "outline"}
              size="sm"
            >
              Full Width
            </Button>
          </div>

          {/* Size Display */}
          <div className="mx-auto grid max-w-sm grid-cols-2 gap-4">
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

          {/* Observed Element */}
          <div className="flex justify-center">
            <div
              ref={ref}
              style={{
                width: containerWidth,
                transition: "all 0.3s ease-in-out",
              }}
              className={`bg-card rounded-lg border-2 border-dashed border-blue-500 p-4 text-center ${isExpanded ? "min-h-[200px]" : "min-h-[100px]"} `}
            >
              <div className="mb-2 text-sm font-medium">Observed Element</div>
              <div className="text-xs">
                This element is being observed for size changes
              </div>
              {isExpanded && (
                <div className="text-muted-foreground mt-4 text-xs">
                  <p>Additional content when expanded</p>
                  <p>The height automatically adjusts</p>
                  <p>ResizeObserver tracks all changes</p>
                </div>
              )}
            </div>
          </div>

          <div className="text-muted-foreground text-center text-xs">
            Try resizing the element using the controls above or by resizing
            your browser window
          </div>
        </div>
      </Card>
    </div>
  );
}
