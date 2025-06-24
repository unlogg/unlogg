"use client";

import { Button } from "@unlogg/ui/components/button";
import { useTimeout } from "@unlogg/ui/hooks/unlogg-hooks/use-timeout";
import { useState } from "react";

// Example: Show a notification after 3 seconds when button is clicked
function UseTimeout_Ex_01() {
  const [showMessage, setShowMessage] = useState(false);
  const [trigger, setTrigger] = useState(0);

  useTimeout({
    callback: () => {
      setShowMessage(true);
    },
    delay: trigger > 0 ? 3000 : null, // 3 seconds delay after trigger
  });

  const handleClick = () => {
    setShowMessage(false);
    setTrigger((t) => t + 1); // retrigger timeout
  };

  return (
    <div>
      <Button onClick={handleClick}>Show Dashboard Message in 3s</Button>
      {showMessage && (
        <div style={{ marginTop: 16, color: "green" }}>
          This is your dashboard notification!
        </div>
      )}
    </div>
  );
}

export default UseTimeout_Ex_01;
