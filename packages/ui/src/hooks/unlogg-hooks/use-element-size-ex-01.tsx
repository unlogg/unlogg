"use client";

import * as React from "react";
import { Card } from "@unlogg/ui/components/card";
import { Button } from "@unlogg/ui/components/button";
import { Badge } from "@unlogg/ui/components/badge";
import { useElementSize } from "@unlogg/ui/hooks/unlogg-hooks/use-element-size";

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
            <h3 className="text-lg font-semibold mb-2">
              Element Size Observer
            </h3>
            <Badge variant={getStatusColor()}>{getStatus()}</Badge>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-2 justify-center">
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
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
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

          {/* Observed Element */}
          <div className="flex justify-center">
            <div
              ref={ref}
              style={{
                width: containerWidth,
                transition: "all 0.3s ease-in-out",
              }}
              className={`
                bg-card-foreground
                border-2 border-dashed border-blue-500
                rounded-lg p-4 text-center
                ${isExpanded ? "min-h-[200px]" : "min-h-[100px]"}
              `}
            >
              <div className="text-sm font-medium text-blue-700 mb-2">
                Observed Element
              </div>
              <div className="text-xs text-blue-600">
                This element is being observed for size changes
              </div>
              {isExpanded && (
                <div className="mt-4 text-xs text-muted-foreground">
                  <p>Additional content when expanded</p>
                  <p>The height automatically adjusts</p>
                  <p>ResizeObserver tracks all changes</p>
                </div>
              )}
            </div>
          </div>

          <div className="text-xs text-center text-muted-foreground">
            Try resizing the element using the controls above or by resizing
            your browser window
          </div>
        </div>
      </Card>

      {/* Multiple Elements Example */}
      <Card className="w-full max-w-2xl p-6">
        <h4 className="text-md font-semibold mb-4 text-center">
          Multiple Elements
        </h4>
        <MultipleElementsDemo />
      </Card>
    </div>
  );
}

function MultipleElementsDemo() {
  const [ref1, size1] = useElementSize<HTMLDivElement>();
  const [ref2, size2] = useElementSize<HTMLDivElement>();
  const [show, setShow] = React.useState({ first: true, second: true });

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center">
        <Button
          onClick={() => setShow((prev) => ({ ...prev, first: !prev.first }))}
          variant="outline"
          size="sm"
        >
          {show.first ? "Hide" : "Show"} First Element
        </Button>
        <Button
          onClick={() => setShow((prev) => ({ ...prev, second: !prev.second }))}
          variant="outline"
          size="sm"
        >
          {show.second ? "Hide" : "Show"} Second Element
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {show.first && (
          <div>
            <div
              ref={ref1}
              className="bg-red-50 border border-red-200 rounded p-4 text-center"
            >
              <div className="text-sm font-medium text-red-700">Element 1</div>
              <div className="text-xs text-red-600 mt-2">
                {size1.width} × {size1.height}
              </div>
            </div>
          </div>
        )}

        {show.second && (
          <div>
            <div
              ref={ref2}
              className="bg-green-50 border border-green-200 rounded p-6 text-center"
            >
              <div className="text-sm font-medium text-green-700">
                Element 2
              </div>
              <div className="text-xs text-green-600 mt-2">
                {size2.width} × {size2.height}
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                This element has more padding
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
