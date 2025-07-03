"use client";

import { Badge } from "@unlogg/ui/components/badge";
import { Button } from "@unlogg/ui/components/button";
import { Card } from "@unlogg/ui/components/card";
import { useHover } from "@unlogg/ui/hooks/unlogg-hooks/use-hover";
import * as React from "react";

export default function UseHover_Ex_01() {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const imageRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLParagraphElement>(null);

  const isCardHovered = useHover(cardRef);
  const isButtonHovered = useHover(buttonRef);
  const isImageHovered = useHover(imageRef);
  const isTextHovered = useHover(textRef);

  const [hoverCount, setHoverCount] = React.useState(0);

  React.useEffect(() => {
    if (isCardHovered) {
      setHoverCount((prev) => prev + 1);
    }
  }, [isCardHovered]);

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="mb-4 text-center">
        <h3 className="mb-2 text-lg font-semibold">Hover Detection</h3>
        <p className="text-muted-foreground text-sm">
          Hover over the elements below to see the hook in action
        </p>
      </div>

      {/* Main hover card */}
      <Card
        ref={cardRef}
        className={`w-full max-w-md cursor-pointer p-6 transition-all duration-300 ${
          isCardHovered
            ? "scale-105 border-blue-300 shadow-lg"
            : "shadow-sm hover:shadow-md"
        } `}
      >
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg font-semibold">Main Card</span>
            <Badge variant={isCardHovered ? "default" : "secondary"}>
              {isCardHovered ? "Hovered" : "Not Hovered"}
            </Badge>
          </div>

          <div className="text-muted-foreground text-sm">
            Hover count: {hoverCount}
          </div>

          {isCardHovered && (
            <div className="text-primary animate-in fade-in text-xs duration-200">
              ✨ You're hovering over this card!
            </div>
          )}
        </div>
      </Card>

      {/* Multiple elements grid */}
      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 md:grid-cols-3">
        {/* Button element */}
        <div className="space-y-2 text-center">
          <Button
            ref={buttonRef}
            variant={isButtonHovered ? "default" : "outline"}
            className={`w-full transition-all duration-200 ${
              isButtonHovered ? "scale-105" : ""
            }`}
          >
            Hover Button
          </Button>
          <div className="text-muted-foreground text-xs">
            Status: {isButtonHovered ? "Hovered" : "Idle"}
          </div>
        </div>

        {/* Image/Visual element */}
        <div className="space-y-2 text-center">
          <div
            ref={imageRef}
            className={`flex h-20 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-all duration-300 ${
              isImageHovered ? "scale-105 border-green-400" : "border-gray-300"
            } `}
          >
            <div className="text-center text-sm font-medium">
              {isImageHovered ? "🎯 Hovering!" : "📷 Hover me"}
            </div>
          </div>
          <div className="text-muted-foreground text-xs">
            Visual: {isImageHovered ? "Active" : "Inactive"}
          </div>
        </div>

        {/* Text element */}
        <div className="space-y-2 text-center">
          <p
            ref={textRef}
            className={`cursor-pointer rounded border p-3 transition-all duration-200 ${
              isTextHovered
                ? "border-purple-300 text-purple-700"
                : "border-gray-200"
            } `}
          >
            Hover this text
          </p>
          <div className="text-muted-foreground text-xs">
            Text: {isTextHovered ? "Highlighted" : "Normal"}
          </div>
        </div>
      </div>

      {/* Interactive demo */}
      <Card className="w-full max-w-md p-6">
        <h4 className="text-md mb-4 text-center font-semibold">
          Interactive Demo
        </h4>
        <InteractiveHoverDemo />
      </Card>
    </div>
  );
}

function InteractiveHoverDemo() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isContainerHovered = useHover(containerRef);

  const [showContent, setShowContent] = React.useState(false);

  // Show content when hovering for more than 500ms
  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isContainerHovered) {
      timer = setTimeout(() => {
        setShowContent(true);
      }, 500);
    } else {
      setShowContent(false);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isContainerHovered]);

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className={`flex min-h-[100px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-all duration-300 ${isContainerHovered ? "border-blue-400" : "border-gray-300"} `}
      >
        <div className="text-center">
          <div className="mb-2 text-sm font-medium">
            {isContainerHovered ? "Keep hovering..." : "Hover and wait"}
          </div>

          {isContainerHovered && (
            <div className="mb-2 h-1.5 w-full rounded-full bg-gray-200">
              <div
                className="h-1.5 rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: showContent ? "100%" : "0%" }}
              />
            </div>
          )}

          {showContent && (
            <div className="text-primary animate-in fade-in text-xs duration-300">
              🎉 Content revealed after 500ms of hovering!
            </div>
          )}
        </div>
      </div>

      <div className="text-muted-foreground flex justify-between text-xs">
        <span>Hover State: {isContainerHovered ? "Active" : "Inactive"}</span>
        <span>Content Shown: {showContent ? "Yes" : "No"}</span>
      </div>
    </div>
  );
}
