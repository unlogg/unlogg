"use client";

import AssigneeSelector from "@unlogg/ui/components/unlogg-ui/user-selector/user-selector";
import { useState } from "react";

type User = {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
};

export default function AssigneeSelector_Ex_01() {
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "Alice Example",
      email: "alice@example.com",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: "2",
      name: "Bob Example",
      email: "bob@example.com",
    },
    {
      id: "3",
      email: "charlie@example.com",
    },
  ]);

  const [assignee, setAssignee] = useState<User | null>(null);

  const handleInviteNewUser = () => {
    alert("Invite new user clicked!");
  };

  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <h2 className="mb-2 text-lg font-semibold">Simple Assignee Selector</h2>
      <AssigneeSelector
        users={users}
        value={assignee}
        onValueChange={setAssignee}
        onInviteNewUser={handleInviteNewUser}
        placeholder="No assignee"
        searchPlaceholder="Search users..."
        className="w-[240px]"
      />
      <div className="mt-4 text-sm">
        <span className="font-medium">Selected:</span>{" "}
        {assignee ? assignee.name || assignee.email : "No assignee"}
      </div>
    </div>
  );
}
