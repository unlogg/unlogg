"use client";

import ComboboxAdd from "@unlogg/ui/components/unlogg-ui/combobox-add/combobox-add";
import { useState } from "react";

type Priority = {
  value: string;
  label: string;
  color?: string;
};

type Task = {
  id: number;
  title: string;
  priority: Priority | null;
};

export default function Combobox_Add_Ex_02() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Fix login bug", priority: null },
    { id: 2, title: "Update documentation", priority: null },
    { id: 3, title: "Review pull request", priority: null },
  ]);

  const [priorityItems, setPriorityItems] = useState<Priority[]>([
    { value: "low", label: "Low", color: "#22c55e" },
    { value: "medium", label: "Medium", color: "#f59e0b" },
    { value: "high", label: "High", color: "#ef4444" },
    { value: "urgent", label: "Urgent", color: "#dc2626" },
  ]);

  const handleAddNewPriority = (newPriority: Priority) => {
    setPriorityItems((prev) => [...prev, newPriority]);
  };

  const updateTaskPriority = (taskId: number, priority: Priority | null) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, priority } : task))
    );
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div className="text-center">
        <h3 className="mb-2 font-semibold">Task Priority Manager</h3>
        <p className="text-muted-foreground mb-6 text-sm">
          Assign priorities to tasks with customizable priority levels
        </p>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-card flex items-center justify-between rounded-lg border p-4"
          >
            <div className="flex-1">
              <h4 className="font-medium">{task.title}</h4>
              {task.priority && (
                <div className="mt-1 flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: task.priority.color }}
                  />
                  <span className="text-muted-foreground text-sm">
                    Priority: {task.priority.label}
                  </span>
                </div>
              )}
            </div>

            <div className="ml-4">
              <ComboboxAdd
                items={priorityItems}
                value={task.priority}
                onValueChange={(priority) =>
                  updateTaskPriority(task.id, priority)
                }
                onAddItem={handleAddNewPriority}
                placeholder="Set priority"
                searchPlaceholder="Search or add priority..."
                className="w-[180px]"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-muted/50 mt-6 rounded-lg p-4">
        <h4 className="mb-2 font-medium">Available Priorities</h4>
        <div className="flex flex-wrap gap-2">
          {priorityItems.map((priority) => (
            <div
              key={priority.value}
              className="bg-background flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
            >
              {priority.color && (
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: priority.color }}
                />
              )}
              {priority.label}
            </div>
          ))}
        </div>
      </div>

      <div className="text-muted-foreground space-y-1 text-center text-xs">
        <p>• Use the combobox to set task priorities</p>
        <p>• Type to search existing priorities or create new ones</p>
        <p>• Choose colors for better visual organization</p>
        <p>• Use keyboard navigation to select colors</p>
      </div>
    </div>
  );
}
