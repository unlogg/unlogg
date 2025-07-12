"use client";

import ActiveButton from "@unlogg/ui/components/unlogg-ui/active-button/active-button";
import { useBoolean } from "@unlogg/ui/hooks/unlogg-hooks/use-boolean";
export default function ActiveButton_Ex_01() {
  const { value: value1, toggle: toggle1 } = useBoolean(false);
  const { value: value2, toggle: toggle2 } = useBoolean(false);
  const { value: value3, toggle: toggle3 } = useBoolean(false);
  return (
    <div className="flex items-center justify-center gap-2">
      <ActiveButton isActive={value1} onClick={toggle1}>
        ✨ Show Features
      </ActiveButton>
      <ActiveButton isActive={value2} onClick={toggle2}>
        🪲 Show Bugs
      </ActiveButton>
      <ActiveButton isActive={value3} onClick={toggle3}>
        💬 Show Comments
      </ActiveButton>
    </div>
  );
}
