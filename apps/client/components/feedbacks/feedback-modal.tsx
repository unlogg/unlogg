"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@unlogg/ui/components/dialog-positions";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@unlogg/ui/components/avatar";
import { Badge } from "@unlogg/ui/components/badge";
import { Button } from "@unlogg/ui/components/button";
import { MessageCircle, X } from "lucide-react";
import { Upvote } from "./feedback-card.client";
import Link from "next/link";
import { FeedbackItemContent } from "./feedback-item/feedback-item-content";
import { FeedbackItemHeaderInModal } from "./feedback-item/feedback-item-header";
import { FeedbackItem } from "./feedback-item/feedback-item";

export function FeedbackModal({
  id,
  title,
  description,
  username,
  userAvatar,
  upvotes,
  comments,
  productTags,
  createdAt,
  status = "open",
}: any) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    router.back();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className=" max-h-[90vh] overflow-y-auto p-0 overflow-hidden"
        position="tc"
        size="4xl"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>

        <FeedbackItem
          id={id}
          title={title}
          description={description}
          username={username}
          userAvatar={userAvatar}
          upvotes={upvotes}
          comments={comments}
          productTags={productTags}
          createdAt={createdAt}
          status={status}
          handleClose={handleClose}
          isModal={true}
        />
      </DialogContent>
    </Dialog>
  );
}
