"use client";

import { Badge } from "@unlogg/ui/components/badge";
import { Button } from "@unlogg/ui/components/button";
import { Card } from "@unlogg/ui/components/card";
import { useScrollIntoView } from "@unlogg/ui/hooks/unlogg-hooks/use-scroll-into-view";
import * as React from "react";

export default function UseScrollIntoView_Ex_01() {
  const [target1Ref, { scrollIntoView: scrollToTarget1 }] =
    useScrollIntoView<HTMLDivElement>({
      behavior: "smooth",
      block: "start",
    });

  const [target2Ref, { scrollIntoView: scrollToTarget2 }] =
    useScrollIntoView<HTMLDivElement>({
      behavior: "smooth",
      block: "center",
    });

  const [target3Ref, { scrollIntoView: scrollToTarget3 }] =
    useScrollIntoView<HTMLDivElement>({
      behavior: "smooth",
      block: "end",
    });

  const [autoTargetRef, { scrollIntoView: scrollToAutoTarget }] =
    useScrollIntoView<HTMLDivElement>({
      behavior: "auto",
    });

  const scrollableRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="text-center">
        <h3 className="mb-2 text-lg font-semibold">Scroll Into View Hook</h3>
        <p className="text-muted-foreground mb-4 text-sm">
          Click the buttons to scroll to different targets with various
          alignments
        </p>

        {/* Control buttons */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          <Button onClick={() => scrollToTarget1()} variant="outline" size="sm">
            Scroll to Top Target
          </Button>
          <Button onClick={() => scrollToTarget2()} variant="outline" size="sm">
            Scroll to Center Target
          </Button>
          <Button onClick={() => scrollToTarget3()} variant="outline" size="sm">
            Scroll to Bottom Target
          </Button>
          <Button
            onClick={() => scrollToAutoTarget()}
            variant="secondary"
            size="sm"
          >
            Auto Scroll (No Animation)
          </Button>
        </div>

        <div className="text-muted-foreground text-xs">
          💡 Respects your <code>prefers-reduced-motion</code> setting
        </div>
      </div>

      {/* Scrollable container */}
      <Card className="mx-auto w-full max-w-2xl">
        <div
          ref={scrollableRef}
          className="h-96 overflow-y-auto rounded-lg border"
        >
          <div className="space-y-8 p-4">
            {/* Initial content */}
            <div className="space-y-4">
              <h4 className="font-semibold">Start of Content</h4>
              <p className="text-muted-foreground text-sm">
                This is the beginning of our scrollable content. Scroll down to
                see the targets.
              </p>
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="rounded bg-gray-50 p-3">
                  <p className="text-sm">Filler content block {i + 1}</p>
                </div>
              ))}
            </div>

            {/* Target 1 - Top alignment */}
            <div
              ref={target1Ref}
              className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="default">Target 1</Badge>
                <span className="text-sm font-medium">Top Aligned</span>
              </div>
              <p className="text-sm text-blue-700">
                This target scrolls to the <strong>top</strong> of the viewport
                when clicked. It uses <code>block: "start"</code> alignment.
              </p>
            </div>

            {/* More content */}
            {Array.from({ length: 8 }, (_, i) => (
              <div key={`mid-${i}`} className="rounded bg-gray-50 p-3">
                <p className="text-sm">More content block {i + 1}</p>
              </div>
            ))}

            {/* Target 2 - Center alignment */}
            <div
              ref={target2Ref}
              className="rounded-lg border-2 border-green-200 bg-green-50 p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="secondary">Target 2</Badge>
                <span className="text-sm font-medium">Center Aligned</span>
              </div>
              <p className="text-sm text-green-700">
                This target scrolls to the <strong>center</strong> of the
                viewport. It uses <code>block: "center"</code> alignment.
              </p>
            </div>

            {/* More content */}
            {Array.from({ length: 8 }, (_, i) => (
              <div key={`end-${i}`} className="rounded bg-gray-50 p-3">
                <p className="text-sm">Additional content block {i + 1}</p>
              </div>
            ))}

            {/* Target 3 - Bottom alignment */}
            <div
              ref={target3Ref}
              className="rounded-lg border-2 border-purple-200 bg-purple-50 p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="outline">Target 3</Badge>
                <span className="text-sm font-medium">Bottom Aligned</span>
              </div>
              <p className="text-sm text-purple-700">
                This target scrolls to the <strong>bottom</strong> of the
                viewport. It uses <code>block: "end"</code> alignment.
              </p>
            </div>

            {/* More content */}
            {Array.from({ length: 6 }, (_, i) => (
              <div key={`final-${i}`} className="rounded bg-gray-50 p-3">
                <p className="text-sm">Final content block {i + 1}</p>
              </div>
            ))}

            {/* Auto scroll target */}
            <div
              ref={autoTargetRef}
              className="rounded-lg border-2 border-orange-200 bg-orange-50 p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="destructive">Auto Target</Badge>
                <span className="text-sm font-medium">No Animation</span>
              </div>
              <p className="text-sm text-orange-700">
                This target uses <code>behavior: "auto"</code> for instant
                scrolling without animation. Also used when reduced motion is
                preferred.
              </p>
            </div>

            {/* End content */}
            <div className="space-y-4">
              <h4 className="font-semibold">End of Content</h4>
              <p className="text-muted-foreground text-sm">
                You've reached the end of our scrollable content.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Advanced example */}
      <Card className="mx-auto w-full max-w-2xl p-6">
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
    <div className="space-y-4">
      {/* Navigation */}
      <div className="flex flex-wrap justify-center gap-2 rounded-lg bg-gray-50 p-4">
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
