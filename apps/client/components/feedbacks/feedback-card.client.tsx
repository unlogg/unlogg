"use client";

import UpvoteRating_Animated from "@unlogg/ui/components/unlogg-ui/upvote/upvote";
import React from "react";

export const Upvote = ({ upvotes = 0 }: { upvotes?: number }) => {
  const [upvotesState, setUpvotes] = React.useState(upvotes);
  const [downvotes, setDownvotes] = React.useState(0);
  const [upvoted, setUpvoted] = React.useState(false);
  const [downvoted, setDownvoted] = React.useState(false);
  return (
    <UpvoteRating_Animated
      upvotes={upvotesState}
      downvotes={downvotes}
      upvoted={upvoted}
      downvoted={downvoted}
      onVoteChange={(newState) => {
        setUpvotes(newState.upvotes);
        setDownvotes(newState.downvotes);
        setUpvoted(newState.upvoted);
        setDownvoted(newState.downvoted);
      }}
      onUpvoteClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDownvoteClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    />
  );
};
