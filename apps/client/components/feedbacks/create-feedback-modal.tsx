"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@unlogg/ui/components/dialog-positions";
import { CreateFeedback } from "./create-feedback/create-feedback";
import { Button } from "@unlogg/ui/components/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

type CreateFeedbackModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateFeedbackModal({
  isOpen = true,
  onOpenChange = () => {},
}: CreateFeedbackModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className=" max-h-[90vh] overflow-y-auto p-0 overflow-hidden min-h-[150px]"
        position="tc"
        size="4xl"
        dialogOverlayClassName="backdrop-blur-[1px]"
      >
        <DialogTitle className="sr-only">Add a feedback</DialogTitle>

        <CreateFeedback onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}

export function CreateFeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        {" "}
        <PlusIcon /> Add Feedback
      </Button>
      <CreateFeedbackModal
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(!isOpen)}
      />
    </>
  );
}
