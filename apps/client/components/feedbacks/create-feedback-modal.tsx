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
import { useNavigationGuard } from "next-navigation-guard";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const maxCharacters = 1000;
export const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  feedbackType: z.string().min(2, {
    message: "Feedback type must be at least 2 characters.",
  }),
  board: z.string().min(2, {
    message: "Select a board",
  }),
  description: z
    .string()
    .max(maxCharacters, {
      message: `Description must be at most ${maxCharacters} characters.`,
    })
    .min(1, {
      message: "Description is required.",
    }),
});
export type FormValues = z.infer<typeof formSchema>;

export function CreateFeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const form = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      feedbackType: "feature",
      board: "",
      description: "",
    },
  });

  // Track dirty state from react-hook-form
  const isDirty = form.formState.isDirty;
  console.log("isDirty", isDirty);
  // const navGuard = useNavigationGuard({ enabled: isDirty });

  function handleDialogClose(open: boolean) {
    if (!open && isDirty) {
      setShowConfirm(true);
    } else {
      setIsOpen(open);
    }
  }

  function handleConfirmDiscard() {
    form.reset();
    form.clearErrors();
    setIsOpen(false);
    setShowConfirm(false);
    // navGuard.accept();
  }

  function handleCancelDiscard() {
    setShowConfirm(false);
    setIsOpen(true);
    // navGuard.reject();
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setIsOpen(false);
    form.reset();
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <PlusIcon /> Add Feedback
      </Button>
      <Dialog open={isOpen} onOpenChange={handleDialogClose}>
        <DialogContent
          className=" max-h-[90vh] overflow-y-auto p-0 overflow-hidden min-h-[150px]"
          position="tc"
          size="4xl"
          dialogOverlayClassName="backdrop-blur-[1px]"
        >
          <DialogTitle className="sr-only">Add a feedback</DialogTitle>
          <CreateFeedback
            onOpenChange={handleDialogClose}
            form={form}
            onSubmit={onSubmit}
          />
        </DialogContent>
      </Dialog>
      {/* Confirm discard dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogTitle>Discard changes?</DialogTitle>
          <div className="mb-4">
            You have unsaved changes. Are you sure you want to discard them?
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelDiscard}>
              Stay
            </Button>
            <Button variant="destructive" onClick={handleConfirmDiscard}>
              Discard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
