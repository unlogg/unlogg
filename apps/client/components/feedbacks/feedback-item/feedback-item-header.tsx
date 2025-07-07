"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@unlogg/ui/components/avatar";
import { Badge } from "@unlogg/ui/components/badge";
import { Button } from "@unlogg/ui/components/button";
import { ArrowLeft, Maximize, Maximize2, MessageCircle, X } from "lucide-react";
import { Upvote } from "../feedback-card.client";

export type FeedbackTitleProps = {
  id: string;
  title: string;
  handleClose?: () => void;
};

export const FeedbackItemHeader = ({
  id,
  title,
  handleClose,
}: FeedbackTitleProps) => {
  return (
    <div className="flex items-center justify-between top-[50px] z-10 bg-background border-b py-4 sticky">
      <div className="absolute -left-24 top-0 translate-y-1/2">
        <Button size="sm" variant="outline">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <h1 className="text-2xl font-semibold text-black dark:text-white">
        {title}
      </h1>
    </div>
  );
};

export const FeedbackItemHeaderInModal = ({
  id,
  title,
  handleClose,
}: FeedbackTitleProps) => {
  return (
    <div className="flex items-center justify-between sticky top-0 z-10 bg-background border-b p-4">
      <h1 className="text-2xl font-semibold">{title}</h1>

      <div>
        <Button
          variant="outlineSecondary"
          size="icon"
          onClick={() => {
            // Force a hard navigation to bypass the intercepted route
            window.location.href = `/feedbacks/${id}`;
          }}
        >
          <Maximize2 />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            // Force a hard navigation to bypass the intercepted route
            handleClose?.();
          }}
        >
          <X />
        </Button>
      </div>
    </div>
  );
};
