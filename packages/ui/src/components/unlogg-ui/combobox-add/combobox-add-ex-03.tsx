"use client";

import ComboboxAdd from "@unlogg/ui/components/unlogg-ui/combobox-add/combobox-add";
import { useState } from "react";

type ProjectStatus = {
  value: string;
  label: string;
  color?: string;
  description?: string;
};

type Project = {
  id: number;
  name: string;
  status: ProjectStatus | null;
};

export default function Combobox_Add_Ex_03() {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: "Mobile App Redesign", status: null },
    { id: 2, name: "API Documentation Update", status: null },
    { id: 3, name: "User Authentication System", status: null },
  ]);

  const [statusItems, setStatusItems] = useState<ProjectStatus[]>([
    {
      value: "planning",
      label: "Planning",
      color: "#8b5cf6",
      description: "Requirements gathering and initial design phase",
    },
    {
      value: "development",
      label: "Development",
      color: "#3b82f6",
      description: "Active coding and implementation work",
    },
    {
      value: "testing",
      label: "Testing",
      color: "#f59e0b",
      description: "Quality assurance and bug fixing phase",
    },
    {
      value: "deployment",
      label: "Deployment",
      color: "#10b981",
      description: "Ready for production release",
    },
    {
      value: "maintenance",
      label: "Maintenance",
      color: "#6b7280",
      description: "Ongoing support and minor updates",
    },
    {
      value: "archived",
      label: "Archived",
      color: "#dc2626",
      description: "Project completed or discontinued",
    },
  ]);

  const handleAddNewStatus = (newStatus: ProjectStatus) => {
    setStatusItems((prev) => [...prev, newStatus]);
  };

  const updateProjectStatus = (
    projectId: number,
    status: ProjectStatus | null
  ) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId ? { ...project, status } : project
      )
    );
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="text-center">
        <h3 className="mb-2 font-semibold">Project Status Tracker</h3>
        <p className="text-muted-foreground mb-6 text-sm">
          Track project progress with detailed status descriptions
        </p>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-card flex items-center justify-between rounded-lg border p-4"
          >
            <div className="flex-1">
              <h4 className="font-medium">{project.name}</h4>
              {project.status && (
                <div className="mt-2 flex items-start gap-2">
                  <div
                    className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: project.status.color }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {project.status.label}
                    </span>
                    {project.status.description && (
                      <span className="text-muted-foreground text-xs">
                        {project.status.description}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="ml-4">
              <ComboboxAdd
                items={statusItems}
                value={project.status}
                onValueChange={(status) =>
                  updateProjectStatus(project.id, status)
                }
                onAddItem={handleAddNewStatus}
                placeholder="Set status"
                searchPlaceholder="Search or add status..."
                className="w-[200px]"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-muted/50 mt-6 rounded-lg p-4">
        <h4 className="mb-3 font-medium">Available Status Types</h4>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {statusItems.map((status) => (
            <div
              key={status.value}
              className="bg-background flex items-start gap-3 rounded-lg border p-3"
            >
              {status.color && (
                <div
                  className="mt-0.5 h-3 w-3 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: status.color }}
                />
              )}
              <div className="flex flex-col">
                <span className="text-sm font-medium">{status.label}</span>
                {status.description && (
                  <span className="text-muted-foreground text-xs">
                    {status.description}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-muted-foreground space-y-1 text-center text-xs">
        <p>• Status descriptions provide context for each project phase</p>
        <p>• Create custom statuses with meaningful descriptions</p>
        <p>• Visual indicators help identify project stages quickly</p>
        <p>• Descriptions appear in both the trigger and dropdown</p>
      </div>
    </div>
  );
}
