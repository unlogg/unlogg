"use client";

import { Button } from "@unlogg/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@unlogg/ui/components/dialog";
import { useDisclosure } from "@unlogg/ui/hooks/unlogg-hooks/use-disclosure";

function UseDisclosure_Ex01() {
  const [opened, handlers] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => console.log("Closed"),
  });

  return (
    <div>
      <Button onClick={handlers.open}>Open Modal</Button>
      <Dialog
        open={opened}
        onOpenChange={opened ? handlers.close : handlers.open}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modal Title</DialogTitle>
          </DialogHeader>
          <div>
            This is a modal using <code>useDisclosure</code>.
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={handlers.close}>
              Close
            </Button>
            <Button onClick={handlers.toggle}>Toggle</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UseDisclosure_Ex01;
