"use client";

import * as React from "react";
import { Card } from "@unlogg/ui/components/card";
import { Button } from "@unlogg/ui/components/button";
import { Badge } from "@unlogg/ui/components/badge";
import { Input } from "@unlogg/ui/components/input";
import { useLeavePage } from "@unlogg/ui/hooks/unlogg-hooks/use-leave-page";

export default function UseLeavePage_Ex_01() {
  const isLeavingPage = useLeavePage();
  const [leaveCount, setLeaveCount] = React.useState(0);
  const [lastLeaveTime, setLastLeaveTime] = React.useState<Date | null>(null);

  // Track leave events
  React.useEffect(() => {
    if (isLeavingPage) {
      setLeaveCount((prev) => prev + 1);
      setLastLeaveTime(new Date());
    }
  }, [isLeavingPage]);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">
          Leave Page Detection Hook
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Detects when the user's cursor leaves the browser window
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Badge
            variant={isLeavingPage ? "destructive" : "default"}
            className="text-sm"
          >
            {isLeavingPage ? "🚪 Leaving Page" : "👁️ On Page"}
          </Badge>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Leave Count:</span>
            <Badge variant="outline" className="font-mono">
              {leaveCount}
            </Badge>
          </div>
          {lastLeaveTime && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Last Leave:</span>
              <Badge variant="outline" className="font-mono text-xs">
                {lastLeaveTime.toLocaleTimeString()}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Basic Demo */}
      <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Basic Leave Detection</h4>
        <BasicLeaveDemo />
      </Card>

      {/* Exit Intent Popup Demo */}
      <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Exit Intent Popup</h4>
        <ExitIntentDemo />
      </Card>

      {/* Auto-Save Demo */}
      <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Auto-Save on Leave</h4>
        <AutoSaveDemo />
      </Card>

      {/* Retention Message Demo */}
      <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Retention Message</h4>
        <RetentionDemo />
      </Card>

      {/* Instructions */}
      <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">How to Test</h4>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <strong className="text-blue-800">
              Try these actions to trigger leave detection:
            </strong>
            <ul className="list-disc list-inside text-blue-700 mt-1 space-y-1">
              <li>Move your mouse cursor outside the browser window</li>
              <li>Move cursor to the browser's address bar</li>
              <li>Move cursor to browser tabs or bookmarks bar</li>
              <li>Move cursor to the browser's title bar</li>
              <li>Alt+Tab to switch to another application</li>
            </ul>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <strong className="text-amber-800">Note:</strong>
            <p className="text-amber-700 mt-1">
              The hook detects when the mouse cursor leaves the document area.
              Moving the cursor back into the page will reset the leave state.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function BasicLeaveDemo() {
  const isLeavingPage = useLeavePage();

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div
          className={`text-6xl mb-2 ${isLeavingPage ? "animate-bounce" : ""}`}
        >
          {isLeavingPage ? "👋" : "🖱️"}
        </div>
        <Badge
          variant={isLeavingPage ? "destructive" : "default"}
          className="text-sm"
        >
          {isLeavingPage ? "Mouse Left Page" : "Mouse On Page"}
        </Badge>
      </div>

      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Status:</strong>{" "}
          {isLeavingPage
            ? "Cursor is outside the browser window"
            : "Cursor is within the page area"}
        </p>
      </div>
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
        <div className="absolute inset-0 bg-black/20 rounded-lg z-10" />
        <div className="relative z-20 p-6 bg-white border-2 border-red-300 rounded-lg shadow-lg">
          <div className="text-center space-y-4">
            <div className="text-4xl">🚨</div>
            <h3 className="text-lg font-semibold text-red-800">
              Wait! Don't leave yet!
            </h3>
            <p className="text-sm text-red-700">
              You were about to leave this amazing demo. Are you sure you want
              to go?
            </p>
            <div className="flex gap-2 justify-center">
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
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            Background content (popup overlay active)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-700">
          ✅ No exit intent detected. Move your cursor outside the browser
          window to see the exit intent popup.
        </p>
      </div>
      {dismissedCount > 0 && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Popups dismissed:</strong> {dismissedCount}
          </p>
        </div>
      )}
    </div>
  );
}

function AutoSaveDemo() {
  const isLeavingPage = useLeavePage();
  const [content, setContent] = React.useState("");
  const [savedContent, setSavedContent] = React.useState("");
  const [saveCount, setSaveCount] = React.useState(0);
  const [lastSaved, setLastSaved] = React.useState<Date | null>(null);

  React.useEffect(() => {
    if (isLeavingPage && content !== savedContent && content.trim() !== "") {
      // Auto-save when leaving page
      setSavedContent(content);
      setSaveCount((prev) => prev + 1);
      setLastSaved(new Date());
    }
  }, [isLeavingPage, content, savedContent]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Type something (auto-saves when you leave the page):
        </label>
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start typing..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Leave Status:</strong>{" "}
            {isLeavingPage ? "Auto-saving..." : "Editing..."}
          </p>
        </div>
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">
            <strong>Auto-saves:</strong> {saveCount}
          </p>
        </div>
      </div>

      {lastSaved && (
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Last saved:</strong> {lastSaved.toLocaleTimeString()}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Saved content:</strong> "{savedContent}"
          </p>
        </div>
      )}
    </div>
  );
}

function RetentionDemo() {
  const isLeavingPage = useLeavePage();
  const [showRetention, setShowRetention] = React.useState(false);
  const [interactionCount, setInteractionCount] = React.useState(0);

  React.useEffect(() => {
    if (isLeavingPage) {
      setShowRetention(true);
    } else {
      setShowRetention(false);
    }
  }, [isLeavingPage]);

  const handleInteraction = () => {
    setInteractionCount((prev) => prev + 1);
  };

  return (
    <div className="space-y-4">
      {showRetention ? (
        <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg border-l-4">
          <div className="flex items-start">
            <div className="text-yellow-600 text-xl mr-3">💡</div>
            <div className="flex-1">
              <h5 className="font-semibold text-yellow-800 mb-1">
                Before you go...
              </h5>
              <p className="text-sm text-yellow-700 mb-3">
                Did you know you can bookmark this page to come back later? We
                have lots more cool demos to explore!
              </p>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleInteraction}>
                  Bookmark Page
                </Button>
                <Button size="sm" variant="outline" onClick={handleInteraction}>
                  View More Demos
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">
            ✅ Welcome! Move your cursor outside the browser to see a retention
            message.
          </p>
        </div>
      )}

      {interactionCount > 0 && (
        <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-sm text-purple-700">
            <strong>User interactions:</strong> {interactionCount}
          </p>
        </div>
      )}
    </div>
  );
}
