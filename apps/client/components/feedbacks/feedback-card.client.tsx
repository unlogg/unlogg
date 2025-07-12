"use client";

import UpvoteButton from "@unlogg/ui/components/unlogg-ui/upvote-button/upvote-button";
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
