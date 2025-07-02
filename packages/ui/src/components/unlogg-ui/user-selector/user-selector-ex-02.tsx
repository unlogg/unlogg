"use client";

import AssigneeSelector from "@unlogg/ui/components/unlogg-ui/user-selector/user-selector";
import { useState } from "react";

type User = {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
};

type Task = {
  id: number;
  title: string;
  assignee: User | null;
};

export default function AssigneeSelector_Ex_02() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Implement user authentication", assignee: null },
    { id: 2, title: "Design landing page", assignee: null },
    { id: 3, title: "Fix responsive layout bugs", assignee: null },
    { id: 4, title: "Write API documentation", assignee: null },
  ]);

  const [users] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      avatar:
        "https://github.com/stackzero-labs/ui/blob/main/public/placeholders/user-05.jpg", // Example avatar URL
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
    },
    {
      id: "4",
      email: "alice.wilson@example.com", // No name provided
    },
    {
      id: "5",
      name: "David Brown",
      email: "david.brown@example.com",
    },
  ]);

  const updateTaskAssignee = (taskId: number, assignee: User | null) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, assignee } : task))
    );
  };

  const handleInviteNewUser = () => {
    console.log("Opening invite new user modal...");
    // In a real app, this would open a modal or navigate to an invite page
    alert("Invite new user functionality would be implemented here!");
  };

  const getUserDisplayName = (user: User) => {
    return user.name || user.email;
  };

  const getUserInitials = (user: User) => {
    if (user.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user.email[0].toUpperCase();
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="text-center">
        <h3 className="mb-2 font-semibold">Task Assignment Manager</h3>
        <p className="text-muted-foreground mb-6 text-sm">
          Assign tasks to team members or leave them unassigned
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
              {task.assignee && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="bg-primary text-primary-foreground flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium">
                    {getUserInitials(task.assignee)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      Assigned to {getUserDisplayName(task.assignee)}
                    </span>
                    {task.assignee.name && (
                      <span className="text-muted-foreground text-xs">
                        {task.assignee.email}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="ml-4">
              <AssigneeSelector
                users={users}
                value={task.assignee}
                onValueChange={(assignee) =>
                  updateTaskAssignee(task.id, assignee)
                }
                onInviteNewUser={handleInviteNewUser}
                placeholder="No assignee"
                searchPlaceholder="Search team members..."
                className="w-[220px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
