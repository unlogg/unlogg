"use client";

import { Badge } from "@unlogg/ui/components/badge";
import { useMobile } from "@unlogg/ui/hooks/unlogg-hooks/use-mobile";
import * as React from "react";

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
        <h3 className="mb-2 text-lg font-semibold">Mobile Detection Hook</h3>
        <p className="text-muted-foreground mb-4 text-sm">
          Resize your window to see different mobile breakpoints in action
        </p>

        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="text-sm font-medium">Current Width:</span>
          <Badge variant="outline" className="font-mono">
            {windowWidth}px
          </Badge>
        </div>
      </div>

      {/* Breakpoint cards */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
      className={`rounded-lg border-2 p-4 transition-all duration-300 ${
        isMobile ? "border-green-300" : "border"
      } ${isClose ? "scale-105 ring-2 ring-blue-200" : ""} `}
    >
      <div className="space-y-2 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <div
            className={`h-3 w-3 rounded-full transition-colors ${isMobile ? "bg-green-500" : "bg-border-400"} `}
          />
          <h5 className="text-sm font-semibold">{name}</h5>
        </div>

        <code className="bg-card block rounded px-2 py-1 text-xs">
          &lt; {value}px
        </code>

        <p className="text-muted-foreground text-xs">{description}</p>

        <div className="space-y-1">
          <Badge variant={color} className="text-xs">
            {isMobile ? "Mobile" : "Desktop"}
          </Badge>

          {isClose && (
            <div className="text-xs font-medium text-blue-600">
              {difference > 0 ? `+${difference}` : difference}px from breakpoint
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
