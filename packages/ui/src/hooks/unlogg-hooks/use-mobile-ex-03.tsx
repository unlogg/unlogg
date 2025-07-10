"use client";

import { Badge } from "@unlogg/ui/components/badge";
import { Button } from "@unlogg/ui/components/button";
import { useMobile } from "@unlogg/ui/hooks/unlogg-hooks/use-mobile";
import * as React from "react";

export default function UseMobile_Ex_03() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <BreakpointTester />
      </div>
    </div>
  );
}

function BreakpointTester() {
  const [customBreakpoint, setCustomBreakpoint] = React.useState(768);
  const isCustomMobile = useMobile(customBreakpoint);

  const presetBreakpoints = [320, 480, 640, 768, 1024, 1280, 1440];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-2">
        <span className="self-center text-sm font-medium">Quick Presets:</span>
        {presetBreakpoints.map((bp) => (
          <Button
            key={bp}
            onClick={() => setCustomBreakpoint(bp)}
            variant={customBreakpoint === bp ? "default" : "outline"}
            size="sm"
          >
            {bp}px
          </Button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <label className="text-sm font-medium">Custom Breakpoint:</label>
        <input
          type="number"
          value={customBreakpoint}
          onChange={(e) => setCustomBreakpoint(Number(e.target.value))}
          className="w-20 rounded border px-3 py-1 text-sm"
          min="200"
          max="2000"
          step="10"
        />
        <span className="text-muted-foreground text-xs">pixels</span>
      </div>

      <div className="bg-card rounded-lg p-4 text-center">
        <div className="mb-2 text-lg font-semibold">
          useMobile({customBreakpoint})
        </div>
        <Badge
          variant={isCustomMobile ? "default" : "secondary"}
          className="text-sm"
        >
          {isCustomMobile ? "Mobile" : "Desktop"}
        </Badge>
        <p className="text-muted-foreground mt-2 text-xs">
          Current screen is {isCustomMobile ? "below" : "at or above"}{" "}
          {customBreakpoint}px
        </p>
      </div>
    </div>
  );
}
