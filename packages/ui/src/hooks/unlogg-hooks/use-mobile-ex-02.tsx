"use client";

import { Badge } from "@unlogg/ui/components/badge";
import { Button } from "@unlogg/ui/components/button";
import { Card } from "@unlogg/ui/components/card";
import { useMobile } from "@unlogg/ui/hooks/unlogg-hooks/use-mobile";
import * as React from "react";

export default function UseMobile_Ex_02() {
  // Different mobile breakpoints
  const isMobileDefault = useMobile(); // 768px default
  const isMobileSmall = useMobile(640); // Small mobile
  const isMobileLarge = useMobile(1024); // Large mobile/tablet

  return (
    <div>
      {/* Responsive content demo */}
      <Card className="mx-auto w-full max-w-4xl p-6">
        <h4 className="text-md mb-4 font-semibold">Responsive Content Demo</h4>
        <ResponsiveDemo
          isMobileDefault={isMobileDefault}
          isMobileSmall={isMobileSmall}
          isMobileLarge={isMobileLarge}
        />
      </Card>
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
        className={`grid gap-4 transition-all duration-300 ${isMobileDefault ? "grid-cols-1" : "grid-cols-3"} `}
      >
        <div className="rounded border border-blue-200 bg-blue-50 p-4">
          <h6 className="mb-2 font-medium text-blue-800">Layout</h6>
          <p className="text-sm text-blue-700">
            {isMobileDefault
              ? "Single column (mobile)"
              : "Three columns (desktop)"}
          </p>
        </div>

        <div className="rounded border border-purple-200 bg-purple-50 p-4">
          <h6 className="mb-2 font-medium text-purple-800">Navigation</h6>
          <p className="text-sm text-purple-700">
            {isMobileDefault ? "Hamburger menu" : "Full navigation"}
          </p>
        </div>

        <div className="rounded border border-green-200 bg-green-50 p-4">
          <h6 className="mb-2 font-medium text-green-800">Content</h6>
          <p className="text-sm text-green-700">
            {isMobileDefault ? "Stacked content" : "Side-by-side layout"}
          </p>
        </div>
      </div>

      {/* Conditional content based on different breakpoints */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {isMobileSmall && (
          <div className="rounded border border-red-200 bg-red-50 p-4">
            <h6 className="mb-2 font-medium text-red-800">Small Mobile Only</h6>
            <p className="text-sm text-red-700">
              This content only appears on very small screens (&lt; 640px).
            </p>
          </div>
        )}

        {isMobileDefault && !isMobileSmall && (
          <div className="rounded border border-orange-200 bg-orange-50 p-4">
            <h6 className="mb-2 font-medium text-orange-800">Medium Mobile</h6>
            <p className="text-sm text-orange-700">
              This appears between 640px and 768px width.
            </p>
          </div>
        )}

        {isMobileLarge && !isMobileDefault && (
          <div className="rounded border border-yellow-200 bg-yellow-50 p-4">
            <h6 className="mb-2 font-medium text-yellow-800">Tablet Range</h6>
            <p className="text-sm text-yellow-700">
              This appears between 768px and 1024px width.
            </p>
          </div>
        )}

        {!isMobileLarge && (
          <div className="rounded border border-indigo-200 bg-indigo-50 p-4">
            <h6 className="mb-2 font-medium text-indigo-800">Desktop Only</h6>
            <p className="text-sm text-indigo-700">
              This content only appears on desktop screens (≥ 1024px).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
