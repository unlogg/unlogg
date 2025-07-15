"use client";

import { Badge } from "@unlogg/ui/components/badge";
import { Button } from "@unlogg/ui/components/button";
import { Card } from "@unlogg/ui/components/card";
import * as React from "react";
import { useInViewport } from "@unlogg/ui/hooks/unlogg-hooks/use-in-viewport";

export default function UseInViewport_Ex_01() {
  const [show, setShow] = React.useState(true);
  const { ref, inView } = useInViewport<HTMLDivElement>();

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Fixed status badge */}
      <div className="bg-card border-primary fixed top-25 left-1/2 z-[9999] -translate-x-1/2 rounded border p-4 shadow-md">
        <Badge variant={inView ? "default" : "secondary"}>
          {inView ? "In viewport" : "Out of viewport"}
        </Badge>
      </div>
      <Card className="w-full max-w-2xl p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="mb-2 text-lg font-semibold">
              Element In Viewport Observer
            </h3>
          </div>
          <div className="flex justify-center gap-2">
            <Button
              onClick={() => setShow((prev) => !prev)}
              variant="outline"
              size="sm"
            >
              {show ? "Hide" : "Show"} Element
            </Button>
          </div>
          <div className="flex justify-center">
            {show && (
              <div
                ref={ref}
                className="bg-card-foreground min-h-[100px] w-[300px] rounded-lg border-2 border-dashed border-purple-500 p-4 text-center"
              >
                <div className="mb-2 text-sm font-medium text-purple-700">
                  Observed Element
                </div>
                <div className="text-xs text-purple-600">
                  Scroll this element in and out of view to see the status
                  change.
                </div>
              </div>
            )}
          </div>
          <div className="text-muted-foreground text-center text-xs">
            Try scrolling the page so the observed element enters or leaves the
            viewport. The status badge above will always remain visible.
          </div>
        </div>
      </Card>
    </div>
  );
}
