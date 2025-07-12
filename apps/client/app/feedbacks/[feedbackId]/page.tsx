import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@unlogg/ui/components/avatar";
import { Badge } from "@unlogg/ui/components/badge";
import { Button } from "@unlogg/ui/components/button";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { Upvote } from "@/components/feedbacks/feedback-card.client";
import Link from "next/link";
import { FeedbackItemContent } from "@/components/feedbacks/feedback-item/feedback-item-content";
import { FeedbackItemHeader } from "@/components/feedbacks/feedback-item/feedback-item-header";
import { FeedbackItem } from "@/components/feedbacks/feedback-item/feedback-item";
import { sampleFeedbacks } from "@/data/sample-feedbacks";

interface FeedbackPageProps {
  params: Promise<{ feedbackId: string }>;
}

export default async function FeedbackPage({ params }: FeedbackPageProps) {
  const { feedbackId } = await params;
  const feedback = sampleFeedbacks.filter((f) => f.id === feedbackId)[0];

  if (!feedback) {
    return (
      <div className="flex items-center justify-center min-h-svh">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Feedback Not Found</h1>
          <p className="text-muted-foreground">
            The requested feedback could not be found.
          </p>
          <Link href="/feedbacks">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Feedbacks
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-0 px-4 relative">
      {/* Back button */}
      {/* <div className="mb-6">
        <Link href="/feedbacks">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Feedbacks
          </Button>
        </Link>
      </div> */}

      {/* <FeedbackItemHeader id={feedback.id} title={feedback.title} />
      <FeedbackItemContent
        id={feedback.id}
        title={feedback.title}
        description={feedback.description}
        username={feedback.username}
        userAvatar={feedback.userAvatar}
        upvotes={feedback.upvotes}
        comments={feedback.comments}
        productTags={feedback.productTags}
        createdAt={feedback.createdAt}
        status={feedback.status}
      /> */}

      <FeedbackItem
        id={feedback.id}
        title={feedback.title}
        description={feedback.description}
        username={feedback.username}
        userAvatar={feedback.userAvatar}
        upvotes={feedback.upvotes}
        comments={feedback.comments}
        productTags={feedback.productTags}
        createdAt={feedback.createdAt}
        status={feedback.status}
      />

      {/* Comments section placeholder */}
      {/* <div className="mt-8 bg-card border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Comments ({feedback.comments})
        </h2>
        <p className="text-muted-foreground">
          Comments will be displayed here...
        </p>
      </div> */}
    </div>
  );
}
