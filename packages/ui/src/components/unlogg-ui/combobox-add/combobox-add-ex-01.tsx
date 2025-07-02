"use client";

import ComboboxAdd from "@unlogg/ui/components/unlogg-ui/combobox-add/combobox-add";
import { useState } from "react";
import * as chrono from "chrono-node";

type Status = {
  value: string;
  label: string;
  color?: string;
};

export default function Combobox_Add_Ex_01() {
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
  const [statusItems, setStatusItems] = useState<Status[]>([
    { value: "backlog", label: "Backlog", color: "#ffcc00" },
    { value: "todo", label: "Todo", color: "#007bff" },
    { value: "in progress", label: "In Progress", color: "#ffc107" },
    { value: "done", label: "Done", color: "#28a745" },
    { value: "canceled", label: "Canceled", color: "#dc3545" },
  ]);

  const handleAddNewStatus = (newStatus: Status) => {
    setStatusItems((prev) => [...prev, newStatus]);
  };

  console.log("chrono", chrono.parseDate("In 10 minutes")); // Example usage of chrono-node to parse date

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <h3 className="mb-2 font-semibold">Combobox with Add Functionality</h3>
        <p className="text-muted-foreground mb-4 text-sm">
          Type to search or add new entries with optional colors
        </p>
      </div>

      <ComboboxAdd
        items={statusItems}
        value={selectedStatus}
        onValueChange={setSelectedStatus}
        onAddItem={handleAddNewStatus}
        className="w-fit"
      />

      {selectedStatus && (
        <div className="bg-muted mt-4 rounded-md p-3">
          <p className="text-sm">
            Selected:{" "}
            <span className="flex items-center gap-2 font-medium">
              {selectedStatus.color && (
                <div
                  className="h-3 w-3 rounded-full border border-gray-200"
                  style={{ backgroundColor: selectedStatus.color }}
                />
              )}
              {selectedStatus.label}
            </span>
          </p>
        </div>
      )}

      <div className="text-muted-foreground mt-4 max-w-md text-center text-xs">
        Current items:{" "}
        {statusItems
          .map((item) => `${item.label}${item.color ? ` (${item.color})` : ""}`)
          .join(", ")}
      </div>
    </div>
  );
}
