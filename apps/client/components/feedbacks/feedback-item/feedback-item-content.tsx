import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@unlogg/ui/components/avatar";
import { Badge } from "@unlogg/ui/components/badge";
import { Button } from "@unlogg/ui/components/button";
import { Maximize, Maximize2, MessageCircle, X } from "lucide-react";
import { Upvote } from "../feedback-card.client";
import { ScrollArea } from "@unlogg/ui/components/scroll-area";
import { Separator } from "@unlogg/ui/components/separator";
import { Collapsible } from "@unlogg/ui/components/collapsible-animated";
import { FeedbackItemDescriptionCollapsible } from "./feedback-item-content.client";
import { Label } from "@unlogg/ui/components/label";

export type FeedbackItemProps = {
  id: string;
  title: string;
  description: string;
  username: string;
  userAvatar: string;
  upvotes: number;
  comments: number;
  productTags: string[];
  createdAt: string;
  status?: "open" | "closed" | "in-progress";
};

export const FeedbackItemContent = ({
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
}: FeedbackItemProps) => {
  return (
    <div className="grid grid-cols-4 gap-0 relative">
      <ScrollArea className="h-[80vh] w-full col-span-3">
        <div className="space-y-6 p-4">
          {/* Description */}
          <div className="prose prose-sm max-w-none">
            <FeedbackItemDescriptionCollapsible description={description} />
          </div>
          {/* Actions */}
          {/* <div className="flex items-center justify-between pt-0  ">
            <div className="flex items-center gap-4">
              <Upvote upvotes={upvotes} />
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                {comments} Comments
              </Button>
            </div>
          </div> */}

          <Separator className="my-4" />
          <div>Comments</div>
        </div>
      </ScrollArea>

      <div className="col-span-1">
        <FeedbackItemSidebar
          username={username}
          userAvatar={userAvatar}
          createdAt={createdAt}
          status={status}
          productTags={productTags}
          upvotes={upvotes}
          comments={comments}
        />
      </div>
    </div>
  );
};

// Pick types from the FeedbackItemProps
export type FeedbackItemSidebarProps = Pick<
  FeedbackItemProps,
  | "username"
  | "userAvatar"
  | "createdAt"
  | "status"
  | "productTags"
  | "upvotes"
  | "comments"
>;
const FeedbackItemSidebar = ({
  username,
  userAvatar,
  createdAt,
  status = "open",
  productTags = [],
  upvotes = 0,
  comments = 0,
}: FeedbackItemSidebarProps) => {
  return (
    <div>
      <div className="flex  flex-col items-start justify-between gap-4 mt-4 px-2">
        <div className="flex items-center gap-4">
          <Upvote upvotes={upvotes} />
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            {comments}
          </Button>
        </div>
        <Separator className="w-full" />

        <div className="flex items-center gap-2">
          {status === "open" && (
            <>
              <Label className="text-muted-foreground">Status:</Label>
              <Badge
                variant="outline"
                className="text-green-500 border-green-500/50"
              >
                Open
              </Badge>
            </>
          )}
        </div>

        {productTags.length > 0 && (
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Product Tags:</Label>

            <div className="flex items-center gap-2 flex-wrap">
              {productTags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
        <Separator className="w-full" />
        <div className="flex items-center gap-3">
          <Avatar className="rounded-lg w-8 h-8">
            <AvatarImage src={userAvatar} alt={username} />
            <AvatarFallback>
              {username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium">@{username}</span>
            <span>•</span>
            <span>{createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
