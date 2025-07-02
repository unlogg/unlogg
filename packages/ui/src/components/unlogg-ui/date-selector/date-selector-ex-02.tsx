"use client";

import DateSelector from "@unlogg/ui/components/unlogg-ui/date-selector/date-selector";
import { useState } from "react";

type Task = {
  id: number;
  title: string;
  dueDate: Date | null;
  priority: "low" | "medium" | "high";
};

export default function DateSelector_Ex_01() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Review pull request", dueDate: null, priority: "high" },
    { id: 2, title: "Update documentation", dueDate: null, priority: "medium" },
    { id: 3, title: "Fix minor bug", dueDate: null, priority: "low" },
  ]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const updateTaskDueDate = (taskId: number, dueDate: Date | null) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, dueDate } : task))
    );
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffMinutes = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""}`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""}`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div className="space-y-4">
        <h4 className="font-medium">Task List</h4>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-card flex items-center justify-between rounded-lg border p-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h5 className="font-medium">{task.title}</h5>
                <span
                  className={`rounded-full border px-2 py-1 text-xs ${getPriorityColor(task.priority)}`}
                >
                  {task.priority}
                </span>
              </div>
              {task.dueDate && (
                <div className="text-muted-foreground mt-2 text-sm">
                  Due:{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(task.dueDate)}{" "}
                  ({formatRelativeTime(task.dueDate)} from now)
                </div>
              )}
            </div>

            <div className="ml-4">
              <DateSelector
                value={task.dueDate}
                onValueChange={(date) => updateTaskDueDate(task.id, date)}
                placeholder="Set due date"
                className="w-[200px]"
                showRelativeTime={true}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
