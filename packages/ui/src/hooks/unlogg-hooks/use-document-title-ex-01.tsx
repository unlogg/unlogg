"use client";

import * as React from "react";
import { Card } from "@unlogg/ui/components/card";
import { Button } from "@unlogg/ui/components/button";
import { Badge } from "@unlogg/ui/components/badge";
import { Input } from "@unlogg/ui/components/input";
import { useDocumentTitle } from "@unlogg/ui/hooks/unlogg-hooks/use-document-title";

export default function UseDocumentTitle_Ex_01() {
  const [customTitle, setCustomTitle] = React.useState("Custom Page Title");
  const [isActive, setIsActive] = React.useState(false);
  const [counter, setCounter] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState("");

  // Update time every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Basic title setting
  useDocumentTitle(isActive ? customTitle : null);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Document Title Hook</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Dynamically set and manage the document title (check your browser
          tab!)
        </p>

        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Title Active:</span>
            <Badge variant={isActive ? "default" : "secondary"}>
              {isActive ? "Yes" : "No"}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Current Time:</span>
            <Badge variant="outline" className="font-mono">
              {currentTime}
            </Badge>
          </div>
        </div>
      </div>

      {/* Basic Usage */}
      <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Basic Usage</h4>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Enter document title..."
              className="flex-1"
            />
            <Button
              onClick={() => setIsActive(!isActive)}
              variant={isActive ? "default" : "outline"}
            >
              {isActive ? "Deactivate" : "Activate"} Title
            </Button>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Current document title:</strong>{" "}
              {isActive ? customTitle : "Original title"}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Look at your browser tab to see the title change!
            </p>
          </div>
        </div>
      </Card>

      {/* Dynamic Title Examples */}
      <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Dynamic Title Examples</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CounterTitleDemo />
          <TimeTitleDemo />
        </div>
      </Card>

      {/* Multiple Components */}
      <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">
          Multiple Components (Last One Wins)
        </h4>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TitleComponent title="Component A" color="red" />
            <TitleComponent title="Component B" color="green" />
            <TitleComponent title="Component C" color="blue" />
          </div>
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-700">
              <strong>Note:</strong> When multiple components use
              useDocumentTitle, the last one to render will set the title. This
              demonstrates the importance of coordinating title management in
              your application.
            </p>
          </div>
        </div>
      </Card>

      {/* Restore on Unmount Example */}
      <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Restore on Unmount</h4>
        <RestoreOnUnmountDemo />
      </Card>

      {/* Best Practices */}
      <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Best Practices</h4>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <strong className="text-green-800">✅ Do:</strong>
            <ul className="list-disc list-inside text-green-700 mt-1 space-y-1">
              <li>Use descriptive, meaningful titles</li>
              <li>Include page context (e.g., "Dashboard - MyApp")</li>
              <li>Update titles based on content changes</li>
              <li>Consider using restoreOnUnmount for temporary components</li>
            </ul>
          </div>

          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <strong className="text-red-800">❌ Don't:</strong>
            <ul className="list-disc list-inside text-red-700 mt-1 space-y-1">
              <li>Use this hook in server-side rendered components</li>
              <li>Set titles too frequently (it can be distracting)</li>
              <li>Use very long titles (they get truncated in tabs)</li>
              <li>Forget to handle the case where title might be null</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

function CounterTitleDemo() {
  const [count, setCount] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);

  useDocumentTitle(isActive ? `Counter: ${count}` : null);

  return (
    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <h5 className="font-semibold text-purple-800 mb-2">Counter Title</h5>
      <div className="space-y-2">
        <div className="text-2xl font-mono font-bold text-purple-600">
          {count}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setCount((c) => c + 1)}
            size="sm"
            variant="outline"
          >
            +1
          </Button>
          <Button
            onClick={() => setCount((c) => Math.max(0, c - 1))}
            size="sm"
            variant="outline"
          >
            -1
          </Button>
        </div>
        <Button
          onClick={() => setIsActive(!isActive)}
          size="sm"
          variant={isActive ? "default" : "secondary"}
          className="w-full"
        >
          {isActive ? "Stop" : "Start"} Counter Title
        </Button>
      </div>
    </div>
  );
}

function TimeTitleDemo() {
  const [isActive, setIsActive] = React.useState(false);
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setTime(new Date().toLocaleTimeString());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  useDocumentTitle(isActive ? `Time: ${time}` : null);

  return (
    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
      <h5 className="font-semibold text-orange-800 mb-2">Live Time Title</h5>
      <div className="space-y-2">
        <div className="text-lg font-mono font-bold text-orange-600">
          {time || "Not active"}
        </div>
        <Button
          onClick={() => setIsActive(!isActive)}
          size="sm"
          variant={isActive ? "default" : "secondary"}
          className="w-full"
        >
          {isActive ? "Stop" : "Start"} Time Title
        </Button>
      </div>
    </div>
  );
}

interface TitleComponentProps {
  title: string;
  color: "red" | "green" | "blue";
}

function TitleComponent({ title, color }: TitleComponentProps) {
  const [isActive, setIsActive] = React.useState(false);

  useDocumentTitle(isActive ? `${title} is Active!` : null);

  const colorClasses = {
    red: "bg-red-50 border-red-200 text-red-800",
    green: "bg-green-50 border-green-200 text-green-800",
    blue: "bg-blue-50 border-blue-200 text-blue-800",
  };

  return (
    <div className={`p-4 border rounded-lg ${colorClasses[color]}`}>
      <h5 className="font-semibold mb-2">{title}</h5>
      <Button
        onClick={() => setIsActive(!isActive)}
        size="sm"
        variant={isActive ? "default" : "outline"}
        className="w-full"
      >
        {isActive ? "Deactivate" : "Activate"}
      </Button>
    </div>
  );
}

function RestoreOnUnmountDemo() {
  const [showComponent, setShowComponent] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          onClick={() => setShowComponent(!showComponent)}
          variant={showComponent ? "destructive" : "default"}
        >
          {showComponent ? "Unmount" : "Mount"} Temporary Component
        </Button>
      </div>

      {showComponent && <TemporaryTitleComponent />}

      <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
        <p className="text-sm text-indigo-700">
          <strong>Behavior:</strong> The temporary component sets a title with
          `restoreOnUnmount: true`. When you unmount it, the original title
          should be restored.
        </p>
      </div>
    </div>
  );
}

function TemporaryTitleComponent() {
  useDocumentTitle("🎯 Temporary Title - Will Restore on Unmount", {
    restoreOnUnmount: true,
  });

  return (
    <div className="p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
      <h5 className="font-semibold text-cyan-800 mb-2">Temporary Component</h5>
      <p className="text-sm text-cyan-700">
        This component sets a temporary title that will be restored when
        unmounted.
      </p>
    </div>
  );
}
