"use client";

import { Button } from "@unlogg/ui/components/button";
import { useClickOutside } from "@unlogg/ui/hooks/unlogg-hooks/use-click-outside";
import { useRef, useState } from "react";

export default function ClickOutsideExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const excludedRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = () => {
    setIsOpen(false);
    setClickCount((prev) => prev + 1);
  };

  const ref = useClickOutside<HTMLDivElement>(
    handleClickOutside,
    ["mousedown", "touchstart"],
    [excludedRef.current]
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">Click Outside Example</h2>
      <p className="mb-4 text-muted-foreground">
        Outside clicks detected: {clickCount}
      </p>

      <div className="flex gap-2 mb-4">
        <Button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Close" : "Open"} Modal
        </Button>
        <Button ref={excludedRef} variant="outline">
          Excluded Button (won&apos;t trigger outside click)
        </Button>
      </div>

      {isOpen && (
        <div
          ref={ref}
          className="mt-4 p-6 border-2 border-muted rounded-lg bg-popover max-w-sm shadow-lg"
        >
          <h3 className="text-lg font-medium mb-2">Modal Content</h3>
          <p className="mb-2">Click outside this modal to close it.</p>
          <p className="mb-4 text-muted-foreground">
            Clicking the &quot;Excluded Button&quot; won&apos;t close this
            modal.
          </p>
          <Button onClick={() => setIsOpen(false)} size="sm">
            Close from inside
          </Button>
        </div>
      )}
    </div>
  );
}
