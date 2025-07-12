import { FeedbackModal } from "@/components/feedbacks/feedback-modal";
import { sampleFeedbacks } from "@/data/sample-feedbacks";

// Sample data - in a real app, you'd fetch this based on the ID

interface ModalPageProps {
  params: Promise<{ feedbackId: string }>;
}

export default async function ModalPage({ params }: ModalPageProps) {
  const { feedbackId } = await params;

  const feedback = sampleFeedbacks.find((f) => f.id === feedbackId);

  if (!feedback) {
    // If feedback not found, return null and let the full page handle it
    return null;
  }

  return <FeedbackModal {...feedback} />;
}
