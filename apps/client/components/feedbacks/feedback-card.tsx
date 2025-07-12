import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@unlogg/ui/components/avatar";
import { Badge } from "@unlogg/ui/components/badge";
import { Button } from "@unlogg/ui/components/button";
import { MessageCircle } from "lucide-react";
import { Upvote } from "./feedback-card.client";
import Link from "next/link";

type FeedbackCardProps = {
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

function FeedbackCard({
  id = "1",
  title = "Feedback Title",
  description = "Feedback Description",
  username = "User Name",
  userAvatar = "https://github.com/mnove.png",
  upvotes = 0,
  comments = 0,
  productTags = [],
  createdAt = "1 week ago",
  status = "open",
}: FeedbackCardProps) {
  return (
    <Link href={`/feedbacks/${id}`} className="no-underline">
      <div className="border p-0 rounded-lg shadow-md bg-card grid grid-cols-4 gap-2 hover:bg-accent/20 cursor-pointer">
        <div className="flex gap-6 flex-col items-start col-span-3 p-4">
          <div>
            {" "}
            <p>
              <h3 className="font-semibold text-lg">{title}</h3>
            </p>
            <p className="font-normal text-muted-foreground line-clamp-3">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="rounded-lg w-6 h-6">
              <AvatarImage src={userAvatar} alt={username} />
              <AvatarFallback>MN</AvatarFallback>
            </Avatar>

            <p className="font-semibold text-muted-foreground">@{username}</p>
            <span>•</span>
            <p className="font-semibold text-muted-foreground">{createdAt}</p>
            <div className="flex items-center gap-2">
              {productTags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {status === "open" && (
              <Badge
                variant="outline"
                className="text-green-500 border-green-500/50"
              >
                Open
              </Badge>
            )}
          </div>
        </div>
        <div className="col-span-1 flex flex-col items-center justify-center border-l gap-2">
          <div>
            <Upvote upvotes={upvotes} />
          </div>
          <Button variant="ghost" size="sm">
            {comments} <MessageCircle />
          </Button>
        </div>
      </div>
    </Link>
  );
}

export { FeedbackCard };
export type { FeedbackCardProps };
