"use client";

import { Button } from "@unlogg/ui/components/button";
import useBoolean from "@unlogg/ui/hooks/unlogg-hooks/use-boolean";

export default function UseBoolean_Ex_01() {
  const { value, setTrue, setFalse, toggle } = useBoolean(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <p>
          Current value:{" "}
          <span className="font-mono">{value ? "True" : "False"}</span>
        </p>

        <div className="flex gap-2">
          <Button
            onClick={setTrue}
            variant="outline"
            className="px-4 py-2  rounded"
          >
            Set True
          </Button>
          <Button
            variant="outline"
            onClick={setFalse}
            className="px-4 py-2  rounded"
          >
            Set False
          </Button>
          <Button
            onClick={toggle}
            variant="outline"
            className="px-4 py-2  rounded"
          >
            Toggle Value
          </Button>
        </div>
      </div>
    </div>
  );
}
