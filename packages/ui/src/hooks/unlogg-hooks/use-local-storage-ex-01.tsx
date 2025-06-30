"use client";

import { Badge } from "@unlogg/ui/components/badge";
import { Button } from "@unlogg/ui/components/button";
import { Card } from "@unlogg/ui/components/card";
import { useLocalStorage } from "@unlogg/ui/hooks/unlogg-hooks/use-local-storage";

export default function UseLocalStorage_Ex_01() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "color-scheme",
    defaultValue: "dark",
  });

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Local Storage Theme Hook</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Persist theme preference across browser sessions
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Badge
            variant={colorScheme === "dark" ? "default" : "secondary"}
            className="text-sm"
          >
            {colorScheme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            localStorage: color-scheme
          </Badge>
        </div>
      </div>

      <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Theme Demo</h4>
        <ThemeDemo colorScheme={colorScheme} onToggle={toggleColorScheme} />
      </Card>
    </div>
  );
}

function ThemeDemo({
  colorScheme,
  onToggle,
}: {
  colorScheme: string;
  onToggle: () => void;
}) {
  return (
    <div className="space-y-4">
      <div
        className="p-6 rounded-lg border transition-all duration-300"
        style={{
          backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#ffffff",
          color: colorScheme === "dark" ? "#ffffff" : "#1a1a1a",
          borderColor: colorScheme === "dark" ? "#333333" : "#e5e7eb",
        }}
      >
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">
            {colorScheme === "dark" ? "🌙" : "☀️"}
          </div>
          <Badge
            variant={colorScheme === "dark" ? "default" : "secondary"}
            className="text-sm"
          >
            Current Theme: {colorScheme}
          </Badge>
        </div>

        <p className="text-sm mb-4 leading-relaxed">
          This theme preference is automatically saved to localStorage and will
          persist across browser sessions. The hook handles SSR safely and
          provides seamless state management for theme switching.
        </p>

        <div className="flex justify-center">
          <Button
            onClick={onToggle}
            variant={colorScheme === "dark" ? "outline" : "default"}
          >
            Switch to {colorScheme === "dark" ? "Light" : "Dark"} Mode
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Storage Key:</strong> color-scheme
          </p>
        </div>
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Current Value:</strong> {colorScheme}
          </p>
        </div>
      </div>
    </div>
  );
}
