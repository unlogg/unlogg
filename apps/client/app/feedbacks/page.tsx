import { Boards } from "@/components/feedbacks/boards";
import {
  FeedbackCard,
  FeedbackCardProps,
} from "@/components/feedbacks/feedback-card";
import { FeedbacksHeader } from "@/components/feedbacks/feedbacks-header";
import { Latests } from "@/components/feedbacks/latest";
import { sampleFeedbacks } from "@/data/sample-feedbacks";
import { Button } from "@unlogg/ui/components/button";
import ActiveButton from "@unlogg/ui/components/unlogg-ui/active-button/active-button";
import { MarkdownEditor } from "@unlogg/ui/components/unlogg-ui/markdown-editor/markdown-editor";
import { Suspense } from "react";

export default function FeedbacksPage() {
  return (
    <div className="mt-0 ">
      <div className="grid grid-cols-3 gap-4 relative">
        <Suspense fallback={<div>Loading...</div>}>
          <Boards />
        </Suspense>
        <div className="col-span-3 md:col-span-2 ">
          <FeedbacksHeader />
          <div className="px-1 mt-4 flex flex-col gap-4">
            {sampleFeedbacks.map((feedback) => (
              <FeedbackCard key={feedback.id} {...feedback} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
