"use client";

import * as React from "react";
import { Card } from "@unlogg/ui/components/card";
import { Button } from "@unlogg/ui/components/button";
import { Badge } from "@unlogg/ui/components/badge";
import { useMobile } from "@unlogg/ui/hooks/unlogg-hooks/use-mobile";

export default function UseMobile_Ex_01() {
  // Different mobile breakpoints
  const isMobileDefault = useMobile(); // 768px default
  const isMobileSmall = useMobile(640); // Small mobile
  const isMobileLarge = useMobile(1024); // Large mobile/tablet
  const isMobileCustom = useMobile(480); // Custom breakpoint

  // Current window width for reference
  const [windowWidth, setWindowWidth] = React.useState(0);

  React.useEffect(() => {
    const updateWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const breakpoints = [
    {
      name: "Custom (480px)",
      value: 480,
      isMobile: isMobileCustom,
      description: "Extra small screens",
      color: "destructive" as const,
    },
    {
      name: "Small (640px)",
      value: 640,
      isMobile: isMobileSmall,
      description: "Small mobile devices",
      color: "secondary" as const,
    },
    {
      name: "Default (768px)",
      value: 768,
      isMobile: isMobileDefault,
      description: "Standard mobile breakpoint",
      color: "default" as const,
    },
    {
      name: "Large (1024px)",
      value: 1024,
      isMobile: isMobileLarge,
      description: "Includes tablets",
      color: "outline" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Mobile Detection Hook</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Resize your window to see different mobile breakpoints in action
        </p>

        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-sm font-medium">Current Width:</span>
          <Badge variant="outline" className="font-mono">
            {windowWidth}px
          </Badge>
        </div>
      </div>

      {/* Breakpoint cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {breakpoints.map((bp) => (
          <BreakpointCard
            key={bp.name}
            name={bp.name}
            value={bp.value}
            isMobile={bp.isMobile}
            description={bp.description}
            color={bp.color}
            currentWidth={windowWidth}
          />
        ))}
      </div>

      {/* Responsive content demo */}
      <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Responsive Content Demo</h4>
        <ResponsiveDemo
          isMobileDefault={isMobileDefault}
          isMobileSmall={isMobileSmall}
          isMobileLarge={isMobileLarge}
        />
      </Card>

      {/* Interactive breakpoint tester */}
      <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">
          Interactive Breakpoint Tester
        </h4>
        <BreakpointTester />
      </Card>
    </div>
  );
}

interface BreakpointCardProps {
  name: string;
  value: number;
  isMobile: boolean;
  description: string;
  color: "default" | "secondary" | "destructive" | "outline";
  currentWidth: number;
}

function BreakpointCard({
  name,
  value,
  isMobile,
  description,
  color,
  currentWidth,
}: BreakpointCardProps) {
  const difference = currentWidth - value;
  const isClose = Math.abs(difference) <= 50;

  return (
    <div
      className={`
      p-4 rounded-lg border-2 transition-all duration-300
      ${
        isMobile ? "border-green-300 bg-green-50" : "border-gray-200 bg-gray-50"
      }
      ${isClose ? "ring-2 ring-blue-200 scale-105" : ""}
    `}
    >
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div
            className={`
            w-3 h-3 rounded-full transition-colors
            ${isMobile ? "bg-green-500" : "bg-gray-400"}
          `}
          />
          <h5 className="font-semibold text-sm">{name}</h5>
        </div>

        <code className="text-xs bg-white/70 px-2 py-1 rounded block">
          &lt; {value}px
        </code>

        <p className="text-xs text-muted-foreground">{description}</p>

        <div className="space-y-1">
          <Badge variant={color} className="text-xs">
            {isMobile ? "Mobile" : "Desktop"}
          </Badge>

          {isClose && (
            <div className="text-xs text-blue-600 font-medium">
              {difference > 0 ? `+${difference}` : difference}px from breakpoint
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ResponsiveDemoProps {
  isMobileDefault: boolean;
  isMobileSmall: boolean;
  isMobileLarge: boolean;
}

function ResponsiveDemo({
  isMobileDefault,
  isMobileSmall,
  isMobileLarge,
}: ResponsiveDemoProps) {
  return (
    <div className="space-y-4">
      {/* Layout adaptation based on default mobile */}
      <div
        className={`
        grid gap-4 transition-all duration-300
        ${isMobileDefault ? "grid-cols-1" : "grid-cols-3"}
      `}
      >
        <div className="p-4 bg-blue-50 border border-blue-200 rounded">
          <h6 className="font-medium text-blue-800 mb-2">Layout</h6>
          <p className="text-sm text-blue-700">
            {isMobileDefault
              ? "Single column (mobile)"
              : "Three columns (desktop)"}
          </p>
        </div>

        <div className="p-4 bg-purple-50 border border-purple-200 rounded">
          <h6 className="font-medium text-purple-800 mb-2">Navigation</h6>
          <p className="text-sm text-purple-700">
            {isMobileDefault ? "Hamburger menu" : "Full navigation"}
          </p>
        </div>

        <div className="p-4 bg-green-50 border border-green-200 rounded">
          <h6 className="font-medium text-green-800 mb-2">Content</h6>
          <p className="text-sm text-green-700">
            {isMobileDefault ? "Stacked content" : "Side-by-side layout"}
          </p>
        </div>
      </div>

      {/* Conditional content based on different breakpoints */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {isMobileSmall && (
          <div className="p-4 bg-red-50 border border-red-200 rounded">
            <h6 className="font-medium text-red-800 mb-2">Small Mobile Only</h6>
            <p className="text-sm text-red-700">
              This content only appears on very small screens (&lt; 640px).
            </p>
          </div>
        )}

        {isMobileDefault && !isMobileSmall && (
          <div className="p-4 bg-orange-50 border border-orange-200 rounded">
            <h6 className="font-medium text-orange-800 mb-2">Medium Mobile</h6>
            <p className="text-sm text-orange-700">
              This appears between 640px and 768px width.
            </p>
          </div>
        )}

        {isMobileLarge && !isMobileDefault && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
            <h6 className="font-medium text-yellow-800 mb-2">Tablet Range</h6>
            <p className="text-sm text-yellow-700">
              This appears between 768px and 1024px width.
            </p>
          </div>
        )}

        {!isMobileLarge && (
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded">
            <h6 className="font-medium text-indigo-800 mb-2">Desktop Only</h6>
            <p className="text-sm text-indigo-700">
              This content only appears on desktop screens (≥ 1024px).
            </p>
          </div>
        )}
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
      <div className="flex flex-wrap gap-2 justify-center">
        <span className="text-sm font-medium self-center">Quick Presets:</span>
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

      <div className="flex items-center gap-4 justify-center">
        <label className="text-sm font-medium">Custom Breakpoint:</label>
        <input
          type="number"
          value={customBreakpoint}
          onChange={(e) => setCustomBreakpoint(Number(e.target.value))}
          className="px-3 py-1 border rounded text-sm w-20"
          min="200"
          max="2000"
          step="10"
        />
        <span className="text-xs text-muted-foreground">pixels</span>
      </div>

      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <div className="text-lg font-semibold mb-2">
          useMobile({customBreakpoint})
        </div>
        <Badge
          variant={isCustomMobile ? "default" : "secondary"}
          className="text-sm"
        >
          {isCustomMobile ? "Mobile" : "Desktop"}
        </Badge>
        <p className="text-xs text-muted-foreground mt-2">
          Current screen is {isCustomMobile ? "below" : "at or above"}{" "}
          {customBreakpoint}px
        </p>
      </div>
    </div>
  );
}
