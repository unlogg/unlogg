import { cn } from "@unlogg/ui/lib/utils";
import NumberFlow from "@number-flow/react";
import { ArrowBigUp } from "lucide-react";

const UPVOTE_COLOR = "bg-primary bg-primary hover:bg-primary/80";
interface UpvoteButtonProps {
  upvotes: number;
  upvoted: boolean;
  upvoteIncrement?: number;
  onVoteChange: (
    newState: {
      upvotes: number;
      upvoted: boolean;
    },
    event?: React.MouseEvent<HTMLButtonElement>
  ) => void;
  onUpvoteClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const UpvoteButton = ({
  upvoted,
  upvoteIncrement = 1,
  upvotes,
  onVoteChange,
  onUpvoteClick,
}: UpvoteButtonProps) => {
  const handleUpvote = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onUpvoteClick) onUpvoteClick(event);
    if (upvoted) {
      onVoteChange(
        {
          upvoted: false,
          upvotes: upvotes - upvoteIncrement,
        },
        event
      );
    } else {
      onVoteChange(
        {
          upvoted: true,
          upvotes: upvotes + upvoteIncrement,
        },
        event
      );
    }
  };

  return (
    <button
      onClick={handleUpvote}
      className={cn(
        "flex w-fit cursor-pointer flex-row items-center justify-between gap-2 rounded-full border hover:bg-zinc-800/30",
        upvoted && UPVOTE_COLOR
      )}
    >
      <div className="ml-2 w-6 rounded-full py-2">
        <ArrowBigUp
          size={24}
          className={cn("text-white", upvoted && "fill-black text-black")}
        />
      </div>

      <div
        className={cn(
          "mr-3 min-w-6 text-left text-white",
          upvoted && "text-black"
        )}
      >
        <NumberFlow
          format={{ notation: "compact" }}
          value={upvotes}
          className="font-mono"
        />
      </div>
    </button>
  );
};

export default UpvoteButton;
