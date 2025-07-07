import {
  FeedbackCard,
  FeedbackCardProps,
} from "@/components/feedbacks/feedback-card";
import { FeedbacksHeader } from "@/components/feedbacks/feedbacks-header";
import { sampleFeedbacks } from "@/data/sample-feedbacks";
import { Button } from "@unlogg/ui/components/button";

export default function FeedbacksPage() {
  return (
    <div className="mt-0">
      <div className="grid grid-cols-3 gap-4 relative">
        <div className="hidden md:block col-span-1 sticky top-[66px] px-4 self-start">
          <h3 className="mb-3 uppercase text-sm tracking-wider">Boards</h3>
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm" className="justify-start">
              Category A
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              Category B
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              Category C
            </Button>
          </div>
        </div>
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
