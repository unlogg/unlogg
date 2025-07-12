"use client";

import { Button } from "@unlogg/ui/components/button";
import { Clock, PlusIcon, Sparkle, TrendingUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function FeedbacksHeader() {
  return (
    <div className="flex items-center justify-between bg-background py-4  border-b sticky top-[50px] z-10">
      <div className="flex items-center gap-2">
        <Suspense fallback={<div>Loading...</div>}>
          <FeedbackView />
        </Suspense>
      </div>
      <div>
        {/* <Button>
          {" "}
          <PlusIcon /> Add Feedback
        </Button> */}
        <CreateFeedbackButton />
      </div>
    </div>
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
    <div className="flex items-center gap-2">
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
  );
}
