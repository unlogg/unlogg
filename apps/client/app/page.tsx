import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@unlogg/ui/components/button";

export default function Page() {
  return (
    <div className="flex min-h-svh">
      <div className="flex flex-col  gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm">Button</Button>

        <ModeToggle />
      </div>
    </div>
  );
}
