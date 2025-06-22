import React from "react";
import { useLocalStorage } from "@unlogg/ui/hooks/unlogg-hooks/use-local-storage";
import { Button } from "@unlogg/ui/components/button";

const ColorSchemeSelector: React.FC = () => {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "color-scheme",
    defaultValue: "dark",
  });

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
          color: colorScheme === "dark" ? "#fff" : "#000",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1 className="text-2xl font-bold mb-4">
          Color Scheme with useLocalStorage
        </h1>
        <p className="text-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <hr
          style={{
            margin: "20px 0",
            borderColor: colorScheme === "dark" ? "#555" : "#ccc",
          }}
          className="my-4"
        />
        <h1>Current Color Scheme: {colorScheme}</h1>
        <button
          onClick={toggleColorScheme}
          className="border border-gray-300 rounded px-4 py-2"
        >
          Switch to {colorScheme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </div>
      <p>This gets saved to local storage:</p>
      <pre className="text-left">
        {JSON.stringify({ colorScheme }, null, 2)}
      </pre>
    </div>
  );
};

export default ColorSchemeSelector;
