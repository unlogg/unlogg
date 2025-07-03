"use client";

import { Badge } from "@unlogg/ui/components/badge";
import { Card } from "@unlogg/ui/components/card";
import { useMediaQuery } from "@unlogg/ui/hooks/unlogg-hooks/use-media-query";

export default function UseMediaQuery_Ex_01() {
  // Common breakpoint queries
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const isLarge = useMediaQuery("(min-width: 1280px)");

  // System preference queries
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );
  const isHighContrast = useMediaQuery("(prefers-contrast: high)");

  // Orientation and display queries
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const isLandscape = useMediaQuery("(orientation: landscape)");
  const canHover = useMediaQuery("(hover: hover)");
  const isRetina = useMediaQuery("(min-resolution: 2dppx)");

  // Custom queries for demonstration
  const isNarrow = useMediaQuery("(max-width: 400px)");
  const isVeryWide = useMediaQuery("(min-width: 1600px)");

  const getCurrentBreakpoint = () => {
    if (isMobile) return "Mobile";
    if (isTablet) return "Tablet";
    if (isLarge) return "Large Desktop";
    if (isDesktop) return "Desktop";
    return "Unknown";
  };

  const getBreakpointColor = () => {
    if (isMobile) return "destructive";
    if (isTablet) return "secondary";
    if (isLarge) return "default";
    if (isDesktop) return "outline";
    return "secondary";
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="text-center">
        <h3 className="mb-2 text-lg font-semibold">Media Query Hook</h3>
        <p className="text-muted-foreground mb-4 text-sm">
          Resize your window or change system settings to see the queries in
          action
        </p>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-medium">Current Breakpoint:</span>
          <Badge variant={getBreakpointColor()}>{getCurrentBreakpoint()}</Badge>
        </div>
      </div>

      {/* Breakpoint queries */}
      <Card className="mx-auto w-full max-w-4xl p-6">
        <h4 className="text-md mb-4 font-semibold">Breakpoint Queries</h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <QueryCard
            title="Mobile"
            query="(max-width: 640px)"
            matches={isMobile}
            description="≤ 640px"
          />
          <QueryCard
            title="Tablet"
            query="(641px - 1024px)"
            matches={isTablet}
            description="641px - 1024px"
          />
          <QueryCard
            title="Desktop"
            query="(min-width: 1025px)"
            matches={isDesktop}
            description="≥ 1025px"
          />
          <QueryCard
            title="Large"
            query="(min-width: 1280px)"
            matches={isLarge}
            description="≥ 1280px"
          />
        </div>
      </Card>

      {/* System preferences */}
      <Card className="mx-auto w-full max-w-4xl p-6">
        <h4 className="text-md mb-4 font-semibold">System Preferences</h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <QueryCard
            title="Dark Mode"
            query="(prefers-color-scheme: dark)"
            matches={isDarkMode}
            description="User prefers dark theme"
          />
          <QueryCard
            title="Reduced Motion"
            query="(prefers-reduced-motion: reduce)"
            matches={prefersReducedMotion}
            description="User prefers less motion"
          />
          <QueryCard
            title="High Contrast"
            query="(prefers-contrast: high)"
            matches={isHighContrast}
            description="User prefers high contrast"
          />
        </div>
      </Card>

      {/* Device capabilities */}
      <Card className="mx-auto w-full max-w-4xl p-6">
        <h4 className="text-md mb-4 font-semibold">Device Capabilities</h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <QueryCard
            title="Portrait"
            query="(orientation: portrait)"
            matches={isPortrait}
            description="Portrait orientation"
          />
          <QueryCard
            title="Landscape"
            query="(orientation: landscape)"
            matches={isLandscape}
            description="Landscape orientation"
          />
          <QueryCard
            title="Hover Support"
            query="(hover: hover)"
            matches={canHover}
            description="Device supports hover"
          />
          <QueryCard
            title="Retina Display"
            query="(min-resolution: 2dppx)"
            matches={isRetina}
            description="High DPI display"
          />
        </div>
      </Card>

      {/* Custom queries */}
      <Card className="mx-auto w-full max-w-4xl p-6">
        <h4 className="text-md mb-4 font-semibold">Custom Queries</h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <QueryCard
            title="Very Narrow"
            query="(max-width: 400px)"
            matches={isNarrow}
            description="≤ 400px width"
          />
          <QueryCard
            title="Ultra Wide"
            query="(min-width: 1600px)"
            matches={isVeryWide}
            description="≥ 1600px width"
          />
        </div>
      </Card>

      {/* Responsive content demo */}
      <Card className="mx-auto w-full max-w-4xl p-6">
        <h4 className="text-md mb-4 font-semibold">Responsive Content Demo</h4>
        <ResponsiveContentDemo
          isMobile={isMobile}
          isTablet={isTablet}
          isDesktop={isDesktop}
          isDarkMode={isDarkMode}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Card>
    </div>
  );
}

interface QueryCardProps {
  title: string;
  query: string;
  matches: boolean;
  description: string;
}

function QueryCard({ title, query, matches, description }: QueryCardProps) {
  return (
    <div
      className={`rounded-lg border-2 p-4 transition-all duration-200 ${
        matches
          ? "border-green-300 bg-green-50 text-green-800"
          : "border-gray-200 bg-gray-50 text-gray-600"
      } `}
    >
      <div className="mb-2 flex items-center gap-2">
        <div
          className={`h-3 w-3 rounded-full ${matches ? "bg-green-500" : "bg-gray-400"} `}
        />
        <h5 className="text-sm font-semibold">{title}</h5>
      </div>
      <code className="mb-2 block rounded bg-white/50 px-2 py-1 text-xs">
        {query}
      </code>
      <p className="text-xs">{description}</p>
      <div className="mt-2">
        <Badge variant={matches ? "default" : "secondary"} className="text-xs">
          {matches ? "Matches" : "No Match"}
        </Badge>
      </div>
    </div>
  );
}

interface ResponsiveContentDemoProps {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isDarkMode: boolean;
  prefersReducedMotion: boolean;
}

function ResponsiveContentDemo({
  isMobile,
  isTablet,
  isDesktop,
  isDarkMode,
  prefersReducedMotion,
}: ResponsiveContentDemoProps) {
  return (
    <div className="space-y-4">
      {/* Layout adaptation */}
      <div
        className={`grid gap-4 ${isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-3"} `}
      >
        <div className="rounded border border-blue-200 bg-blue-50 p-4">
          <h6 className="mb-2 font-medium text-blue-800">Layout</h6>
          <p className="text-sm text-blue-700">
            {isMobile && "Single column for mobile"}
            {isTablet && "Two columns for tablet"}
            {isDesktop && "Three columns for desktop"}
          </p>
        </div>

        <div className="rounded border border-purple-200 bg-purple-50 p-4">
          <h6 className="mb-2 font-medium text-purple-800">Theme</h6>
          <p className="text-sm text-purple-700">
            {isDarkMode ? "Dark mode detected" : "Light mode active"}
          </p>
        </div>

        <div
          className={`rounded border p-4 ${isDesktop ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"} `}
        >
          <h6
            className={`mb-2 font-medium ${isDesktop ? "text-green-800" : "text-gray-700"}`}
          >
            Features
          </h6>
          <p
            className={`text-sm ${isDesktop ? "text-green-700" : "text-gray-600"}`}
          >
            {isDesktop ? "Desktop features enabled" : "Mobile-optimized view"}
          </p>
        </div>
      </div>

      {/* Motion adaptation */}
      <div className="rounded border border-orange-200 bg-orange-50 p-4">
        <h6 className="mb-2 font-medium text-orange-800">Animation</h6>
        <div
          className={`mb-2 h-8 w-8 rounded-full bg-orange-400 ${prefersReducedMotion ? "" : "animate-bounce"} `}
        />
        <p className="text-sm text-orange-700">
          {prefersReducedMotion
            ? "Animations disabled (respecting reduced motion preference)"
            : "Animations enabled"}
        </p>
      </div>

      {/* Conditional content */}
      {isMobile && (
        <div className="rounded border border-red-200 bg-red-50 p-4">
          <h6 className="mb-2 font-medium text-red-800">Mobile Only</h6>
          <p className="text-sm text-red-700">
            This content only appears on mobile devices.
          </p>
        </div>
      )}

      {isDesktop && (
        <div className="rounded border border-indigo-200 bg-indigo-50 p-4">
          <h6 className="mb-2 font-medium text-indigo-800">Desktop Only</h6>
          <p className="text-sm text-indigo-700">
            This advanced content is only shown on desktop devices.
          </p>
        </div>
      )}
    </div>
  );
}
