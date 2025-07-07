"use client";

import { useState, useRef, useLayoutEffect } from "react";

import { Button } from "@unlogg/ui/components/button";
import { ChevronDown, ChevronsUpDown } from "lucide-react";

export const FeedbackItemDescriptionCollapsible = ({
  description,
}: {
  description: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(true);
  const [measured, setMeasured] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setIsCollapsible(height > 100);
      setMeasured(true);
    }
  }, [description]);

  return (
    <div className="relative">
      <div
        ref={contentRef}
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isCollapsible ? (isOpen ? "max-h-[2000px]" : "max-h-[100px]") : ""
        }`}
        style={isCollapsible ? {} : { maxHeight: "none", overflow: "visible" }}
      >
        <p className="whitespace-pre-line">{description}</p>
      </div>
      {measured && isCollapsible && (
        <div className="flex justify-center mt-2 absolute -bottom-8 left-50 translate-x-[50%]">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsOpen((v) => !v)}
            className="flex items-center gap-1"
          >
            {isOpen ? "Show less" : "Show more"}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>
      )}
    </div>
  );
};
