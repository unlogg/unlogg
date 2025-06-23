import React from "react";
import { useToggle } from "@unlogg/ui/hooks/unlogg-hooks/use-toggle";
import { Button } from "@unlogg/ui/components/button";

const ExampleToggleComponent: React.FC = () => {
  const [color, toggleColor] = useToggle<"blue" | "violet" | "orange" | "teal">(
    ["blue", "violet", "orange", "teal"]
  );

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <div
        className="flex items-center justify-center rounded-md h-20 w-20 mx-auto"
        style={{
          backgroundColor: color,
        }}
      >
        <span className="text-white font-bold">{color}</span>
      </div>
      <Button
        className="mt-3"
        variant="secondary"
        onClick={() => toggleColor()}
      >
        Toggle Color
      </Button>
    </div>
  );
};

export default ExampleToggleComponent;
