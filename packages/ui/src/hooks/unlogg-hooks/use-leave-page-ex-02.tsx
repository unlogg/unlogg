"use client";

import { Button } from "@unlogg/ui/components/button";
import { Card } from "@unlogg/ui/components/card";
import { useLeavePage } from "@unlogg/ui/hooks/unlogg-hooks/use-leave-page";
import * as React from "react";

export default function UseLeavePage_Ex_02() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Exit Intent Popup Demo */}
      <Card className="mx-auto w-full max-w-4xl p-6">
        <h4 className="text-md mb-4 font-semibold">Exit Intent Popup</h4>
        <ExitIntentDemo />
      </Card>
    </div>
  );
}

function ExitIntentDemo() {
  const isLeavingPage = useLeavePage();
  const [showPopup, setShowPopup] = React.useState(false);
  const [dismissedCount, setDismissedCount] = React.useState(0);

  React.useEffect(() => {
    if (isLeavingPage && !showPopup) {
      setShowPopup(true);
    }
  }, [isLeavingPage, showPopup]);

  const handleDismiss = () => {
    setShowPopup(false);
    setDismissedCount((prev) => prev + 1);
  };

  if (showPopup) {
    return (
      <div className="relative">
        <div className="bg-card absolute inset-0 z-10 rounded-lg" />
        <div className="bg-card border-border relative z-20 rounded-lg border-2 p-6 shadow-lg">
          <div className="space-y-4 text-center">
            <div className="text-4xl">🚨</div>
            <h3 className="text-lg font-semibold text-red-500">
              Wait! Don't leave yet!
            </h3>
            <p className="text-sm text-red-500">
              You were about to leave this amazing demo. Are you sure you want
              to go?
            </p>
            <div className="flex justify-center gap-2">
              <Button onClick={handleDismiss} variant="outline" size="sm">
                Stay Here
              </Button>
              <Button
                onClick={() => alert("Thanks for staying!")}
                variant="default"
                size="sm"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-lg border border-green-500 p-4">
        <p className="text-sm">
          ✅ No exit intent detected. Move your cursor outside the browser
          window to see the exit intent popup.
        </p>
      </div>
      {dismissedCount > 0 && (
        <div className="bg-card rounded-lg border p-3">
          <p className="text-muted-foreground text-sm">
            <strong>Popups dismissed:</strong> {dismissedCount}
          </p>
        </div>
      )}
    </div>
  );
}
