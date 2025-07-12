"use client";

import React, { useState } from "react";
import UpvoteButton from "@unlogg/ui/components/unlogg-ui/upvote-button/upvote-button";

const UpvoteButtonExample = () => {
  const [upvotes, setUpvotes] = useState(10);
  const [upvoted, setUpvoted] = useState(false);

  const [upvotes2, setUpvotes2] = useState(199);
  const [upvoted2, setUpvoted2] = useState(true);

  const [upvotes3, setUpvotes3] = useState(2566);
  const [upvoted3, setUpvoted3] = useState(false);

  const handleVoteChange = (newState: {
    upvotes: number;
    upvoted: boolean;
  }) => {
    setUpvotes(newState.upvotes);
    setUpvoted(newState.upvoted);
  };

  return (
    <div className="flex flex-row items-center justify-center gap-4 p-4">
      <UpvoteButton
        upvotes={upvotes}
        upvoted={upvoted}
        onVoteChange={(newState) => {
          setUpvotes(newState.upvotes);
          setUpvoted(newState.upvoted);
        }}
      />
      <UpvoteButton
        upvotes={upvotes2}
        upvoted={upvoted2}
        onVoteChange={(newState) => {
          setUpvotes2(newState.upvotes);
          setUpvoted2(newState.upvoted);
        }}
      />
      <UpvoteButton
        upvotes={upvotes3}
        upvoted={upvoted3}
        onVoteChange={(newState) => {
          setUpvotes3(newState.upvotes);
          setUpvoted3(newState.upvoted);
        }}
      />
    </div>
  );
};

export default UpvoteButtonExample;
