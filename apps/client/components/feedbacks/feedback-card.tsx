import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@unlogg/ui/components/avatar";
import { Badge } from "@unlogg/ui/components/badge";
import { Button } from "@unlogg/ui/components/button";
import { MessageCircle } from "lucide-react";
import { Upvote, UpvoteFull } from "./feedback-card.client";
import Link from "next/link";
import { Separator } from "@unlogg/ui/components/separator";

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
    <div>
      {/* // Mobile view */}
      <Link href={`/feedbacks/${id}`} className="no-underline md:hidden block">
        <div className="border p-0 rounded-lg shadow-md bg-card grid grid-cols-4 gap-2 hover:bg-accent/20 cursor-pointer w-full">
          <div className="flex gap-6 flex-col items-start col-span-4 md:col-span-3 p-4 flex-wrap">
            <div>
              {" "}
              <p>
                <h3 className="font-semibold text-lg">{title}</h3>
              </p>
              <p className="font-normal text-muted-foreground line-clamp-3">
                {description}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
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
          </div>

          <div className="px-3 py-1 flex flex-row flex-nowrap gap-2 border-t col-span-4 w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <Upvote upvotes={upvotes} />

              <Button variant="ghost" size="sm">
                {comments} <MessageCircle />
              </Button>
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
        </div>
      </Link>

      {/* // Desktop view */}
      <Link href={`/feedbacks/${id}`} className="no-underline hidden md:block">
        <div className="border p-0 rounded-lg shadow-md bg-card grid grid-cols-4 gap-2 hover:bg-accent/20 cursor-pointer w-full">
          <div className="flex gap-6 flex-col items-start col-span-4 md:col-span-3 p-4 flex-wrap">
            <div>
              {" "}
              <p>
                <h3 className="font-semibold text-lg">{title}</h3>
              </p>
              <p className="font-normal text-muted-foreground line-clamp-3">
                {description}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
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
          <div className=" md:col-span-1 flex-col items-center justify-center border-l gap-2 hidden md:flex">
            <div>
              <Upvote upvotes={upvotes} />
            </div>
            <Button variant="ghost" size="sm">
              {comments} <MessageCircle />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export { FeedbackCard };
export type { FeedbackCardProps };
