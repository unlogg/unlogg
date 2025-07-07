import { cn } from "@unlogg/ui/lib/utils";
import NumberFlow from "@number-flow/react";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

const UPVOTE_COLOR = "bg-lime-500 dark:bg-lime-600";
const DOWNVOTE_COLOR = "bg-[#9494ff]";
interface UpvoteRatingAnimatedProps {
  upvotes: number;
  downvotes: number;
  upvoted: boolean;
  downvoted: boolean;
  upvoteIncrement?: number;
  downvoteIncrement?: number;
  onVoteChange: (
    newState: {
      upvotes: number;
      downvotes: number;
      upvoted: boolean;
      downvoted: boolean;
    },
    event?: React.MouseEvent<HTMLButtonElement>
  ) => void;
  onUpvoteClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDownvoteClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const UpvoteRating_Animated = ({
  downvoted,
  downvoteIncrement = 1,
  downvotes,
  onVoteChange,
  upvoted,
  upvoteIncrement = 1,
  upvotes,
  onUpvoteClick,
  onDownvoteClick,
}: UpvoteRatingAnimatedProps) => {
  const handleUpvote = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onUpvoteClick) onUpvoteClick(event);
    if (upvoted) {
      onVoteChange(
        {
          downvoted: false,
          downvotes,
          upvoted: false,
          upvotes: upvotes - upvoteIncrement,
        },
        event
      );
    } else {
      onVoteChange(
        {
          downvoted: false,
          downvotes: downvoted ? downvotes - downvoteIncrement : downvotes,
          upvoted: true,
          upvotes: upvotes + upvoteIncrement,
        },
        event
      );
    }
  };

  const handleDownvote = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onDownvoteClick) onDownvoteClick(event);
    if (downvoted) {
      onVoteChange(
        {
          downvoted: false,
          downvotes: downvotes - downvoteIncrement,
          upvoted: false,
          upvotes,
        },
        event
      );
    } else {
      onVoteChange(
        {
          downvoted: true,
          downvotes: downvotes + downvoteIncrement,
          upvoted: false,
          upvotes: upvoted ? upvotes - upvoteIncrement : upvotes,
        },
        event
      );
    }
  };

  const totalVotes = upvotes - downvotes;

  return (
    <div
      className={cn(
        "flex w-fit flex-row items-center gap-0 rounded-full border",
        upvoted && UPVOTE_COLOR,
        downvoted && DOWNVOTE_COLOR
      )}
    >
      <button
        onClick={handleUpvote}
        className="cursor-pointer rounded-full p-1 hover:bg-zinc-800/30"
      >
        <ArrowBigUp
          size={24}
          className={cn("text-white", upvoted && "fill-white")}
        />
      </button>

      <span className="min-w-8 p-1 text-center text-white">
        <NumberFlow
          format={{ notation: "compact" }}
          value={totalVotes}
          className="font-mono"
        />
      </span>

      <button
        onClick={handleDownvote}
        className="cursor-pointer rounded-full p-1 hover:bg-zinc-800/30"
      >
        <ArrowBigDown
          size={24}
          className={cn("text-white", downvoted && "fill-white")}
        />
      </button>
    </div>
  );
};

export default UpvoteRating_Animated;
