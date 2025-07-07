import { Button } from "@unlogg/ui/components/button";
import { Clock, PlusIcon, Sparkle, TrendingUp } from "lucide-react";

function FeedbacksHeader() {
  return (
    <div className="flex items-center justify-between py-4 bg-background border-b sticky top-[50px] z-10">
      <div className="flex items-center gap-2">
        <FeedbackView />
      </div>
      <div>
        <Button>
          {" "}
          <PlusIcon /> Add Feedback
        </Button>
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

export default function FeedbackView() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outlineSecondary">
        <Sparkle /> Top
      </Button>
      <Button variant="outlineSecondary">
        <Clock /> New
      </Button>
      <Button variant="outlineSecondary">
        <TrendingUp /> Trending
      </Button>
    </div>
  );
}
