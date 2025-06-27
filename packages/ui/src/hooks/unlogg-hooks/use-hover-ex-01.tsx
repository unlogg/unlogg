"use client";

import * as React from "react";
import { Card } from "@unlogg/ui/components/card";
import { Badge } from "@unlogg/ui/components/badge";
import { Button } from "@unlogg/ui/components/button";
import { useHover } from "@unlogg/ui/hooks/unlogg-hooks/use-hover";

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
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold mb-2">Hover Detection</h3>
        <p className="text-sm text-muted-foreground">
          Hover over the elements below to see the hook in action
        </p>
      </div>

      {/* Main hover card */}
      <Card
        ref={cardRef}
        className={`
          w-full max-w-md p-6 transition-all duration-300 cursor-pointer
          ${
            isCardHovered
              ? "shadow-lg scale-105 border-blue-300 "
              : "shadow-sm hover:shadow-md"
          }
        `}
      >
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg font-semibold">Main Card</span>
            <Badge variant={isCardHovered ? "default" : "secondary"}>
              {isCardHovered ? "Hovered" : "Not Hovered"}
            </Badge>
          </div>

          <div className="text-sm text-muted-foreground">
            Hover count: {hoverCount}
          </div>

          {isCardHovered && (
            <div className="text-xs text-primary animate-in fade-in duration-200">
              ✨ You're hovering over this card!
            </div>
          )}
        </div>
      </Card>

      {/* Multiple elements grid */}
      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Button element */}
        <div className="text-center space-y-2">
          <Button
            ref={buttonRef}
            variant={isButtonHovered ? "default" : "outline"}
            className={`w-full transition-all duration-200 ${
              isButtonHovered ? "scale-105" : ""
            }`}
          >
            Hover Button
          </Button>
          <div className="text-xs text-muted-foreground">
            Status: {isButtonHovered ? "Hovered" : "Idle"}
          </div>
        </div>

        {/* Image/Visual element */}
        <div className="text-center space-y-2">
          <div
            ref={imageRef}
            className={`
              w-full h-20 rounded-lg border-2 border-dashed cursor-pointer
              transition-all duration-300 flex items-center justify-center
              ${
                isImageHovered
                  ? "border-green-400  scale-105"
                  : "border-gray-300 "
              }
            `}
          >
            <div className="text-sm font-medium text-center">
              {isImageHovered ? "🎯 Hovering!" : "📷 Hover me"}
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Visual: {isImageHovered ? "Active" : "Inactive"}
          </div>
        </div>

        {/* Text element */}
        <div className="text-center space-y-2">
          <p
            ref={textRef}
            className={`
              p-3 rounded border cursor-pointer transition-all duration-200
              ${
                isTextHovered
                  ? " border-purple-300 text-purple-700"
                  : " border-gray-200"
              }
            `}
          >
            Hover this text
          </p>
          <div className="text-xs text-muted-foreground">
            Text: {isTextHovered ? "Highlighted" : "Normal"}
          </div>
        </div>
      </div>

      {/* Interactive demo */}
      <Card className="w-full max-w-md p-6">
        <h4 className="text-md font-semibold mb-4 text-center">
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
        className={`
          min-h-[100px] p-4 rounded-lg border-2 border-dashed cursor-pointer
          transition-all duration-300 flex flex-col items-center justify-center
          ${isContainerHovered ? "border-blue-400 " : "border-gray-300 "}
        `}
      >
        <div className="text-center">
          <div className="text-sm font-medium mb-2">
            {isContainerHovered ? "Keep hovering..." : "Hover and wait"}
          </div>

          {isContainerHovered && (
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: showContent ? "100%" : "0%" }}
              />
            </div>
          )}

          {showContent && (
            <div className="text-xs text-primary animate-in fade-in duration-300">
              🎉 Content revealed after 500ms of hovering!
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Hover State: {isContainerHovered ? "Active" : "Inactive"}</span>
        <span>Content Shown: {showContent ? "Yes" : "No"}</span>
      </div>
    </div>
  );
}
