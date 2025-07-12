"use client";

import { Separator } from "@unlogg/ui/components/separator";
import { TextLoop } from "@unlogg/ui/components/text-loop";
import ActiveButton from "@unlogg/ui/components/unlogg-ui/active-button/active-button";
import UpvoteButton from "@unlogg/ui/components/unlogg-ui/upvote-button/upvote-button";
import { useRouter, useSearchParams } from "next/navigation";
import { BsEmojiAngry } from "react-icons/bs";
import { Logo } from "../logo";
import Image from "next/image";

export const Latests = () => {
  return (
    <div className="hidden md:block col-span-1 sticky top-[66px] px-4 self-start">
      <h3 className="mb-3 uppercase text-sm tracking-wider">Latests</h3>
      <div className="flex flex-col gap-1 ">
        <TextLoop className="font-mono text-sm" interval={5}>
          <div className="justify-between font-mono text-sm border p-2 rounded-md bg-card flex flex-row gap-2 items-center">
            {" "}
            Hello there .
            <UpvoteButton
              upvotes={50}
              onVoteChange={() => {}}
              upvoted={false}
            />
          </div>

          <div className="justify-between font-mono text-sm border p-2 rounded-md bg-card flex flex-row gap-2 items-center">
            {" "}
            Hello there .
            <UpvoteButton
              upvotes={50}
              onVoteChange={() => {}}
              upvoted={false}
            />
          </div>
        </TextLoop>
      </div>

      <Separator className="my-4" />

      <div className="relative flex items-center justify-start space-x-2">
        <div className="mr-2">Powered by:</div>
        <Image
          src="/unlogg-logo-icon.svg"
          alt="logo"
          width={30}
          height={30}
          className="block"
        />
        <div className="w-[75px]">
          <Logo />
        </div>
        {/* <span className="grow-0 bg-secondary text-foreground ml-0.5 hidden rounded-full px-1.5 py-px text-[10px] font-medium select-none md:block">
          beta
        </span> */}
      </div>
    </div>
  );
};
