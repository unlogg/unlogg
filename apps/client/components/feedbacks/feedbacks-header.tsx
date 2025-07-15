"use client";

import { Button } from "@unlogg/ui/components/button";
import { Clock, PlusIcon, Sparkle, TrendingUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useInViewport } from "@unlogg/ui/hooks/unlogg-hooks/use-in-viewport";

function FeedbacksHeader() {
  const { ref, inView } = useInViewport();

  console.log("FeedbacksHeader inView:", inView);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50 ">
        {!inView ? <CreateFeedbackButton /> : <></>}
      </div>
      <div
        ref={ref}
        className="flex w-full items-center justify-between bg-background py-4 px-1 border-b md:sticky md:top-[50px] md:z-10"
      >
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <FeedbackView />
          </Suspense>
        </div>
        <div>
          <CreateFeedbackButton />
        </div>
      </div>
    </>
  );
}

export { FeedbacksHeader };

import { BoxIcon, HouseIcon, PanelsTopLeftIcon } from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@unlogg/ui/components/tabs";
import { CreateFeedbackButton } from "./create-feedback-modal";
import ActiveButton from "@unlogg/ui/components/unlogg-ui/active-button/active-button";
import { Suspense } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@unlogg/ui/components/select";

export default function FeedbackView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") || "top";

  const setView = (view: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("view", view);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      {/* Mobile view */}
      <div className="w-full flex justify-start md:hidden ">
        <Select>
          <SelectTrigger className="w-[200px] border-border bg-background dark:bg-background">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="sr-only">Sort by</SelectLabel>
              <SelectItem value="top">
                {" "}
                <Sparkle /> Top
              </SelectItem>
              <SelectItem value="new">
                {" "}
                <Clock />
                New
              </SelectItem>
              <SelectItem value="Trending">
                <TrendingUp /> Trending
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* Desktop view */}
      <div className="items-center gap-2 hidden md:flex">
        <ActiveButton
          size="sm"
          isActive={currentView === "top"}
          onClick={() => setView("top")}
        >
          <Sparkle /> Top
        </ActiveButton>
        <ActiveButton
          size="sm"
          isActive={currentView === "new"}
          onClick={() => setView("new")}
        >
          <Clock /> New
        </ActiveButton>
        <ActiveButton
          size="sm"
          isActive={currentView === "trending"}
          onClick={() => setView("trending")}
        >
          <TrendingUp /> Trending
        </ActiveButton>
      </div>
    </>
  );
}
