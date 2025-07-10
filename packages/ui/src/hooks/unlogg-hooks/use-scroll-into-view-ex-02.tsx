"use client";

import { Button } from "@unlogg/ui/components/button";
import { Card } from "@unlogg/ui/components/card";
import { useScrollIntoView } from "@unlogg/ui/hooks/unlogg-hooks/use-scroll-into-view";
import * as React from "react";

export default function UseScrollIntoView_Ex_01() {
  return (
    <div>
      {/* Advanced example */}
      <Card className="bg-background mx-auto w-full max-w-2xl p-6">
        <h4 className="text-md mb-4 text-center font-semibold">
          Advanced Navigation
        </h4>
        <NavigationDemo />
      </Card>
    </div>
  );
}

function NavigationDemo() {
  const sections = [
    { id: "intro", title: "Introduction", color: "blue" },
    { id: "features", title: "Features", color: "green" },
    { id: "usage", title: "Usage", color: "purple" },
    { id: "conclusion", title: "Conclusion", color: "orange" },
  ];

  const refs = React.useRef<Record<string, React.RefObject<HTMLDivElement>>>(
    {}
  );
  const scrollers = React.useRef<Record<string, any>>({});

  // Use individual hooks for each section
  const [introRef, { scrollIntoView: scrollToIntro }] =
    useScrollIntoView<HTMLDivElement>();
  const [featuresRef, { scrollIntoView: scrollToFeatures }] =
    useScrollIntoView<HTMLDivElement>();
  const [usageRef, { scrollIntoView: scrollToUsage }] =
    useScrollIntoView<HTMLDivElement>();
  const [conclusionRef, { scrollIntoView: scrollToConclusion }] =
    useScrollIntoView<HTMLDivElement>();

  const sectionRefs = {
    intro: introRef,
    features: featuresRef,
    usage: usageRef,
    conclusion: conclusionRef,
  };

  const sectionScrollers = {
    intro: scrollToIntro,
    features: scrollToFeatures,
    usage: scrollToUsage,
    conclusion: scrollToConclusion,
  };

  return (
    <div className="bg-background space-y-4">
      {/* Navigation */}
      <div className="bg-card flex flex-wrap justify-center gap-2 rounded-lg p-4">
        {sections.map((section) => (
          <Button
            key={section.id}
            onClick={() =>
              sectionScrollers[section.id as keyof typeof sectionScrollers]()
            }
            variant="outline"
            size="sm"
          >
            {section.title}
          </Button>
        ))}
      </div>

      {/* Content sections */}
      <div className="h-64 overflow-y-auto rounded-lg border">
        <div className="space-y-8 p-4">
          <div
            ref={introRef}
            className="rounded border border-blue-200 bg-blue-50 p-4"
          >
            <h5 className="mb-2 font-semibold text-blue-800">Introduction</h5>
            <p className="text-sm text-blue-700">
              Welcome to our advanced navigation demo. This section demonstrates
              how to create smooth scrolling navigation with multiple targets.
            </p>
            {Array.from({ length: 3 }, (_, i) => (
              <p key={i} className="mt-2 text-xs text-blue-600">
                Introduction content line {i + 1}
              </p>
            ))}
          </div>

          <div
            ref={featuresRef}
            className="rounded border border-green-200 bg-green-50 p-4"
          >
            <h5 className="mb-2 font-semibold text-green-800">Features</h5>
            <p className="text-sm text-green-700">
              Our scroll hook provides smooth animations, respects user
              preferences, and works with any scrollable container.
            </p>
            {Array.from({ length: 4 }, (_, i) => (
              <p key={i} className="mt-2 text-xs text-green-600">
                Feature description {i + 1}
              </p>
            ))}
          </div>

          <div
            ref={usageRef}
            className="rounded border border-purple-200 bg-purple-50 p-4"
          >
            <h5 className="mb-2 font-semibold text-purple-800">Usage</h5>
            <p className="text-sm text-purple-700">
              Simply create refs for your target elements and use the scroll
              functions to navigate between them smoothly.
            </p>
            {Array.from({ length: 5 }, (_, i) => (
              <p key={i} className="mt-2 text-xs text-purple-600">
                Usage example {i + 1}
              </p>
            ))}
          </div>

          <div
            ref={conclusionRef}
            className="rounded border border-orange-200 bg-orange-50 p-4"
          >
            <h5 className="mb-2 font-semibold text-orange-800">Conclusion</h5>
            <p className="text-sm text-orange-700">
              The useScrollIntoView hook makes it easy to create engaging,
              accessible navigation experiences in your React applications.
            </p>
            {Array.from({ length: 3 }, (_, i) => (
              <p key={i} className="mt-2 text-xs text-orange-600">
                Conclusion point {i + 1}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
