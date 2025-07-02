"use client";

import * as React from "react";

import { Button } from "@unlogg/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@unlogg/ui/components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@unlogg/ui/components/popover";
import { availableColors, ColorOption } from "@unlogg/ui/lib/available-colors";
import { cn } from "@unlogg/ui/lib/utils";

type Status = {
  value: string;
  label: string;
  color?: string; // color in hex format, e.g., "#ff0000"
  description?: string; // optional description text
};

const defaultStatuses: Status[] = [
  {
    value: "backlog",
    label: "Backlog",
    color: "#ffcc00",
    description: "Items waiting to be prioritized and planned",
  },
  {
    value: "todo",
    label: "Todo",
    color: "#007bff",
    description: "Ready to start and assigned to team members",
  },
  {
    value: "in progress",
    label: "In Progress",
    color: "#ffc107",
    description: "Currently being worked on",
  },
  {
    value: "done",
    label: "Done",
    color: "#28a745",
    description: "Completed and ready for review",
  },
  {
    value: "canceled",
    label: "Canceled",
    color: "#dc3545",
    description: "No longer needed or deprioritized",
  },
];

interface ComboboxAddProps {
  items?: Status[];
  value?: Status | null;
  onValueChange?: (value: Status | null) => void;
  onAddItem?: (newItem: Status) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  color?: string;
}

function ComboboxAdd({
  items = defaultStatuses,
  value,
  onValueChange,
  onAddItem,
  placeholder = "+ Set status",
  searchPlaceholder = "Change or add labels...",
  className = "w-[150px]",
}: ComboboxAddProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    value || null
  );
  const [inputValue, setInputValue] = React.useState("");
  const [showColorSelection, setShowColorSelection] = React.useState(false);
  const [pendingNewItem, setPendingNewItem] = React.useState<string>("");

  // Ref for the color selection command component
  const colorCommandRef = React.useRef<HTMLDivElement>(null);

  // Use controlled value if provided, otherwise use internal state
  const currentValue = value !== undefined ? value : selectedStatus;

  const handleSelect = (selectedValue: string) => {
    const newStatus =
      items.find((item) => item.value === selectedValue) || null;

    if (value === undefined) {
      setSelectedStatus(newStatus);
    }

    onValueChange?.(newStatus);
    setOpen(false);
    setInputValue("");
  };

  const handleAddNew = () => {
    if (
      inputValue.trim() &&
      !items.find(
        (item) =>
          item.label.toLowerCase() === inputValue.toLowerCase() ||
          item.value.toLowerCase() === inputValue.toLowerCase()
      )
    ) {
      setPendingNewItem(inputValue.trim());
      setShowColorSelection(true);
      setInputValue(""); // Clear input to prevent interference with color selection

      // Focus the color selection command after state update
      setTimeout(() => {
        if (colorCommandRef.current) {
          const firstItem =
            colorCommandRef.current.querySelector("[cmdk-item]");
          if (firstItem instanceof HTMLElement) {
            firstItem.focus();
          }
        }
      }, 0);
    }
  };

  const handleColorSelect = (colorOption?: ColorOption) => {
    if (pendingNewItem) {
      const newItem: Status = {
        value: pendingNewItem.toLowerCase().replace(/\s+/g, "-"),
        label: pendingNewItem,
        ...(colorOption && { color: colorOption.hex }),
      };

      onAddItem?.(newItem);

      if (value === undefined) {
        setSelectedStatus(newItem);
      }

      onValueChange?.(newItem);
    }

    // Reset states
    setShowColorSelection(false);
    setPendingNewItem("");
    setOpen(false);
    setInputValue("");
  };

  const handleCancelColorSelection = () => {
    setShowColorSelection(false);
    setPendingNewItem("");
    setOpen(false); // Close the popover when canceling
  };

  // Handle keyboard navigation for color selection
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (showColorSelection && event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      handleCancelColorSelection();
    }
  };

  // Handle popover open/close state
  const handlePopoverOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    // If closing while in color selection mode, reset the color selection state
    if (!newOpen && showColorSelection) {
      setShowColorSelection(false);
      setPendingNewItem("");
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.label.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.value.toLowerCase().includes(inputValue.toLowerCase())
  );

  const showAddButton =
    inputValue.trim() &&
    filteredItems.length === 0 &&
    !items.find(
      (item) =>
        item.label.toLowerCase() === inputValue.toLowerCase() ||
        item.value.toLowerCase() === inputValue.toLowerCase()
    );

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={handlePopoverOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outlineSecondary"
            className={cn(`justify-start ${className} `)}
          >
            {currentValue ? (
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full border"
                  style={{ backgroundColor: currentValue.color }}
                />
                <div className="flex flex-col">
                  <span>{currentValue.label}</span>
                </div>
              </div>
            ) : (
              <>{placeholder}</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          side="right"
          align="start"
          onKeyDown={handleKeyDown}
          onInteractOutside={(event) => {
            // Allow closing when clicking outside, even during color selection
            if (showColorSelection) {
              setShowColorSelection(false);
              setPendingNewItem("");
            }
          }}
        >
          <Command shouldFilter={false}>
            {!showColorSelection ? (
              <>
                <CommandInput
                  placeholder={searchPlaceholder}
                  value={inputValue}
                  onValueChange={setInputValue}
                />
                <CommandList>
                  {filteredItems.length === 0 && !showAddButton && (
                    <CommandEmpty>No results found.</CommandEmpty>
                  )}
                  {filteredItems.length > 0 && (
                    <CommandGroup>
                      {filteredItems.map((status) => (
                        <CommandItem
                          key={status.value}
                          value={status.value}
                          onSelect={handleSelect}
                        >
                          <div className="flex items-start gap-2">
                            <div
                              className="mt-1 h-3 w-3 flex-shrink-0 rounded-full border"
                              style={{ backgroundColor: status.color }}
                            />
                            <div className="flex flex-col">
                              <span>{status.label}</span>
                              {status.description && (
                                <span className="text-muted-foreground text-xs">
                                  {status.description}
                                </span>
                              )}
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                  {showAddButton && (
                    <CommandGroup>
                      <CommandItem
                        key="add-new"
                        onSelect={handleAddNew}
                        className="text-primary"
                      >
                        + Add "{inputValue}"
                      </CommandItem>
                    </CommandGroup>
                  )}
                </CommandList>
              </>
            ) : (
              <div
                role="dialog"
                aria-label={`Select color for ${pendingNewItem}`}
                className="focus-within:outline-none"
              >
                <div className="border-b p-3">
                  <p className="text-sm font-medium">
                    Select a color for "{pendingNewItem}"
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Optional - you can skip this step
                  </p>
                </div>
                <Command
                  ref={colorCommandRef}
                  shouldFilter={false}
                  className="focus-within:outline-none"
                  defaultValue="skip-color"
                >
                  <CommandList className="max-h-48 overflow-y-auto">
                    <CommandGroup>
                      <CommandItem
                        value="skip-color"
                        onSelect={() => handleColorSelect()}
                        className="text-muted-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                      >
                        Skip - No color
                      </CommandItem>
                      {availableColors.map((colorOption, index) => (
                        <CommandItem
                          key={`${colorOption.hex}-${index}`}
                          value={`color-${index}`}
                          onSelect={() => handleColorSelect(colorOption)}
                          className="data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground flex items-center gap-2"
                        >
                          <div
                            className="h-4 w-4 rounded-full border border-gray-200"
                            style={{ backgroundColor: colorOption.hex }}
                          />
                          <div className="flex flex-col">
                            <span className="capitalize">
                              {colorOption.name}
                            </span>
                            <span className="text-muted-foreground text-xs">
                              {colorOption.hex}
                            </span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
                <div className="border-t p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancelColorSelection}
                    className="w-full"
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        e.preventDefault();
                        e.stopPropagation();
                        handleCancelColorSelection();
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ComboboxAdd;
