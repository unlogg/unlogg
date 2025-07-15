"use client";

import UpvoteButton from "@unlogg/ui/components/unlogg-ui/upvote-button/upvote-button";
import { cn } from "@unlogg/ui/lib/utils";
import { ArrowBigUp } from "lucide-react";
import React from "react";

export const Upvote = ({ upvotes = 0 }: { upvotes?: number }) => {
  const [upvotesState, setUpvotes] = React.useState(upvotes);
  const [upvoted, setUpvoted] = React.useState(false);
  return (
    <UpvoteButton
      upvotes={upvotesState}
      upvoted={upvoted}
      onVoteChange={(newState) => {
        setUpvotes(newState.upvotes);

        setUpvoted(newState.upvoted);
      }}
      onUpvoteClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    />
  );
};

export const UpvoteFull = ({ upvotes = 0 }: { upvotes?: number }) => {
  const [upvotesState, setUpvotes] = React.useState(upvotes);
  const [upvoted, setUpvoted] = React.useState(false);
  return (
    <div className="p-2 flex flex-row flex-nowrap w-full hover:bg-accent/20  cursor-pointer gap-2 h-full rounded-bl-md border-r">
      <ArrowBigUp
        size={24}
        className={cn("text-white", upvoted && "fill-black text-black")}
      />

      <p className="font-mono">{upvotesState} </p>
    </div>
  );
};
