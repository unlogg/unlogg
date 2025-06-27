"use client";

import * as React from "react";
import { Card } from "@unlogg/ui/components/card";
import { Button } from "@unlogg/ui/components/button";
import { Badge } from "@unlogg/ui/components/badge";
import { useScrollIntoView } from "@unlogg/ui/hooks/unlogg-hooks/use-scroll-into-view";

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
        <h3 className="text-lg font-semibold mb-2">Scroll Into View Hook</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Click the buttons to scroll to different targets with various
          alignments
        </p>

        {/* Control buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
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

        <div className="text-xs text-muted-foreground">
          💡 Respects your <code>prefers-reduced-motion</code> setting
        </div>
      </div>

      {/* Scrollable container */}
      <Card className="w-full max-w-2xl mx-auto">
        <div
          ref={scrollableRef}
          className="h-96 overflow-y-auto border rounded-lg"
        >
          <div className="p-4 space-y-8">
            {/* Initial content */}
            <div className="space-y-4">
              <h4 className="font-semibold">Start of Content</h4>
              <p className="text-sm text-muted-foreground">
                This is the beginning of our scrollable content. Scroll down to
                see the targets.
              </p>
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded">
                  <p className="text-sm">Filler content block {i + 1}</p>
                </div>
              ))}
            </div>

            {/* Target 1 - Top alignment */}
            <div
              ref={target1Ref}
              className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
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
              <div key={`mid-${i}`} className="p-3 bg-gray-50 rounded">
                <p className="text-sm">More content block {i + 1}</p>
              </div>
            ))}

            {/* Target 2 - Center alignment */}
            <div
              ref={target2Ref}
              className="p-4 bg-green-50 border-2 border-green-200 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
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
              <div key={`end-${i}`} className="p-3 bg-gray-50 rounded">
                <p className="text-sm">Additional content block {i + 1}</p>
              </div>
            ))}

            {/* Target 3 - Bottom alignment */}
            <div
              ref={target3Ref}
              className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
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
              <div key={`final-${i}`} className="p-3 bg-gray-50 rounded">
                <p className="text-sm">Final content block {i + 1}</p>
              </div>
            ))}

            {/* Auto scroll target */}
            <div
              ref={autoTargetRef}
              className="p-4 bg-orange-50 border-2 border-orange-200 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
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
              <p className="text-sm text-muted-foreground">
                You've reached the end of our scrollable content.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Advanced example */}
      <Card className="w-full max-w-2xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4 text-center">
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
      <div className="flex flex-wrap gap-2 justify-center p-4 bg-gray-50 rounded-lg">
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
      <div className="h-64 overflow-y-auto border rounded-lg">
        <div className="p-4 space-y-8">
          <div
            ref={introRef}
            className="p-4 bg-blue-50 border border-blue-200 rounded"
          >
            <h5 className="font-semibold text-blue-800 mb-2">Introduction</h5>
            <p className="text-sm text-blue-700">
              Welcome to our advanced navigation demo. This section demonstrates
              how to create smooth scrolling navigation with multiple targets.
            </p>
            {Array.from({ length: 3 }, (_, i) => (
              <p key={i} className="text-xs text-blue-600 mt-2">
                Introduction content line {i + 1}
              </p>
            ))}
          </div>

          <div
            ref={featuresRef}
            className="p-4 bg-green-50 border border-green-200 rounded"
          >
            <h5 className="font-semibold text-green-800 mb-2">Features</h5>
            <p className="text-sm text-green-700">
              Our scroll hook provides smooth animations, respects user
              preferences, and works with any scrollable container.
            </p>
            {Array.from({ length: 4 }, (_, i) => (
              <p key={i} className="text-xs text-green-600 mt-2">
                Feature description {i + 1}
              </p>
            ))}
          </div>

          <div
            ref={usageRef}
            className="p-4 bg-purple-50 border border-purple-200 rounded"
          >
            <h5 className="font-semibold text-purple-800 mb-2">Usage</h5>
            <p className="text-sm text-purple-700">
              Simply create refs for your target elements and use the scroll
              functions to navigate between them smoothly.
            </p>
            {Array.from({ length: 5 }, (_, i) => (
              <p key={i} className="text-xs text-purple-600 mt-2">
                Usage example {i + 1}
              </p>
            ))}
          </div>

          <div
            ref={conclusionRef}
            className="p-4 bg-orange-50 border border-orange-200 rounded"
          >
            <h5 className="font-semibold text-orange-800 mb-2">Conclusion</h5>
            <p className="text-sm text-orange-700">
              The useScrollIntoView hook makes it easy to create engaging,
              accessible navigation experiences in your React applications.
            </p>
            {Array.from({ length: 3 }, (_, i) => (
              <p key={i} className="text-xs text-orange-600 mt-2">
                Conclusion point {i + 1}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
