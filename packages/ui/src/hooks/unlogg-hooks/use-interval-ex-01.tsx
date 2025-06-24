"use client";

import { useState } from "react";
import { useInterval } from "@unlogg/ui/hooks/unlogg-hooks/use-interval";

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
      <p className="text-muted-foreground text-sm text-center mb-4">
        Tabs auto-switch every 3 seconds
      </p>

      <div className="bg-background border text-center p-6 rounded-lg w-[480px] mx-auto">
        <div className="flex justify-center mb-4">
          {tabs.map((tab, idx) => (
            <div
              key={tab.title}
              className={`flex-1 py-2 cursor-pointer border-b-2 transition-all duration-200
              ${
                activeTab === idx
                  ? "border-b-2 border-primary font-bold text-primary"
                  : "border-b-2 bg-transparent font-normal text-muted-foreground"
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
          <p className="m-0 text-muted-foreground">
            {tabs[activeTab].description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UseInterval_Ex_01;
