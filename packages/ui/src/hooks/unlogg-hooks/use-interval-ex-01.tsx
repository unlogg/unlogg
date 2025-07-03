"use client";

import { useInterval } from "@unlogg/ui/hooks/unlogg-hooks/use-interval";
import { useState } from "react";

const tabs = [
  {
    title: "Overview",
    description:
      "This tab provides a general overview of your dashboard metrics and recent activity.",
  },
  {
    title: "Analytics",
    description:
      "Detailed analytics and charts are displayed here for deeper insights.",
  },
  {
    title: "Settings",
    description:
      "Manage your preferences and dashboard configuration in this tab.",
  },
];

/**
 * Example component: DashboardCounter
 * Demonstrates useInterval by incrementing a counter every second.
 */
function UseInterval_Ex_01() {
  const [activeTab, setActiveTab] = useState(0);

  useInterval({
    callback: () => setActiveTab((prev) => (prev + 1) % tabs.length),
    delay: 3000, // Switch tab every 3 seconds
  });

  return (
    <div>
      <p className="text-muted-foreground mb-4 text-center text-sm">
        Tabs auto-switch every 3 seconds
      </p>

      <div className="bg-background mx-auto w-[480px] rounded-lg border p-6 text-center">
        <div className="mb-4 flex justify-center">
          {tabs.map((tab, idx) => (
            <div
              key={tab.title}
              className={`flex-1 cursor-pointer border-b-2 py-2 transition-all duration-200 ${
                activeTab === idx
                  ? "border-primary text-primary border-b-2 font-bold"
                  : "text-muted-foreground border-b-2 bg-transparent font-normal"
              }`}
            >
              {tab.title}
            </div>
          ))}
        </div>
        <div className="min-h-[60px]">
          <h3 className="mt-2 mb-1 text-lg font-semibold">
            {tabs[activeTab].title}
          </h3>
          <p className="text-muted-foreground m-0">
            {tabs[activeTab].description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UseInterval_Ex_01;
