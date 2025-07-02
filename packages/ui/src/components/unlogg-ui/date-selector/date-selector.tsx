"use client";

import * as React from "react";
import * as chrono from "chrono-node";
import { ChevronDownIcon, CalendarIcon, ClockIcon } from "lucide-react";

import { Button } from "@unlogg/ui/components/button";
import { Calendar } from "@unlogg/ui/components/calendar";
import { Input } from "@unlogg/ui/components/input";
import { Label } from "@unlogg/ui/components/label";
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
import { cn } from "@unlogg/ui/lib/utils";

type DatePreset = {
  value: string;
  label: string;
  description?: string;
  getDate: () => Date;
};

const defaultPresets: DatePreset[] = [
  {
    value: "1-hour",
    label: "In 1 hour",
    description: "1 hour from now",
    getDate: () => new Date(Date.now() + 60 * 60 * 1000),
  },
  {
    value: "1-day",
    label: "In 1 day",
    description: "24 hours from now",
    getDate: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    value: "7-days",
    label: "In 7 days",
    description: "1 week from now",
    getDate: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
  {
    value: "30-days",
    label: "In 30 days",
    description: "1 month from now",
    getDate: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
];

type DateSelectorProps = {
  presets?: DatePreset[];
  value?: Date | null;
  onValueChange?: (value: Date | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  disabled?: boolean;
  showRelativeTime?: boolean;
};

function DateSelector({
  presets = defaultPresets,
  value,
  onValueChange,
  placeholder = "Select date",
  searchPlaceholder = "Type a date or time...",
  className = "w-[200px]",
  disabled = false,
  showRelativeTime = false,
}: DateSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    value || null
  );
  const [inputValue, setInputValue] = React.useState("");
  const [parsedDate, setParsedDate] = React.useState<Date | null>(null);
  const [showCustomDatePicker, setShowCustomDatePicker] = React.useState(false);
  const [customDate, setCustomDate] = React.useState<Date | undefined>(
    undefined
  );
  const [customTime, setCustomTime] = React.useState<string>("12:00");

  // Use controlled value if provided, otherwise use internal state
  const currentValue = value !== undefined ? value : selectedDate;

  // Parse natural language input
  React.useEffect(() => {
    if (inputValue.trim()) {
      try {
        const parsed = chrono.parseDate(inputValue, new Date(), {
          forwardDate: true,
        });
        if (parsed && parsed > new Date()) {
          setParsedDate(parsed);
        } else {
          setParsedDate(null);
        }
      } catch {
        setParsedDate(null);
      }
    } else {
      setParsedDate(null);
    }
  }, [inputValue]);

  const handleSelect = (selectedValue: string) => {
    let newDate: Date | null = null;

    if (selectedValue === "parsed-date" && parsedDate) {
      newDate = parsedDate;
    } else if (selectedValue === "custom-date") {
      setShowCustomDatePicker(true);
      return; // Don't close the popover yet
    } else {
      const preset = presets.find((preset) => preset.value === selectedValue);
      if (preset) {
        newDate = preset.getDate();
      }
    }

    if (value === undefined) {
      setSelectedDate(newDate);
    }

    onValueChange?.(newDate);
    setOpen(false);
    setInputValue("");
    setParsedDate(null);
  };

  const handleCustomDateSelect = () => {
    if (customDate) {
      // Combine the selected date with the time
      const [hours, minutes] = customTime.split(":").map(Number);
      const combinedDate = new Date(customDate);
      combinedDate.setHours(hours, minutes, 0, 0);

      // Ensure the date is in the future
      if (combinedDate > new Date()) {
        if (value === undefined) {
          setSelectedDate(combinedDate);
        }
        onValueChange?.(combinedDate);
      }
    }

    // Reset custom date picker state
    setShowCustomDatePicker(false);
    setCustomDate(undefined);
    setCustomTime("12:00");
    setOpen(false);
    setInputValue("");
    setParsedDate(null);
  };

  const handleCancelCustomDate = () => {
    setShowCustomDatePicker(false);
    setCustomDate(undefined);
    setCustomTime("12:00");
  };

  const handleClear = () => {
    if (value === undefined) {
      setSelectedDate(null);
    }
    onValueChange?.(null);
    setOpen(false);
    setInputValue("");
    setParsedDate(null);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffMinutes = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
      return `in ${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""}`;
    } else if (diffHours < 24) {
      return `in ${diffHours} hour${diffHours !== 1 ? "s" : ""}`;
    } else if (diffDays < 7) {
      return `in ${diffDays} day${diffDays !== 1 ? "s" : ""}`;
    } else {
      return `in ${Math.round(diffDays / 7)} week${Math.round(diffDays / 7) !== 1 ? "s" : ""}`;
    }
  };

  const filteredPresets = presets.filter(
    (preset) =>
      preset.label.toLowerCase().includes(inputValue.toLowerCase()) ||
      preset.description?.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outlineSecondary"
            className={cn(
              `justify-start ${className}`,
              !currentValue && "text-muted-foreground",
              disabled && "cursor-not-allowed opacity-50"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {currentValue ? (
              <div className="flex flex-col items-start">
                {showRelativeTime ? (
                  <span className="text-muted-foreground text-xs">
                    {formatRelativeTime(currentValue)}
                  </span>
                ) : (
                  <span className="text-sm font-medium">
                    {formatDate(currentValue)}
                  </span>
                )}
              </div>
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command shouldFilter={false}>
            {!showCustomDatePicker ? (
              <>
                <CommandInput
                  placeholder={searchPlaceholder}
                  value={inputValue}
                  onValueChange={setInputValue}
                />
                <CommandList>
                  {filteredPresets.length === 0 && !parsedDate && (
                    <CommandEmpty>
                      Try typing something like "in 2 hours" or "tomorrow at
                      3pm"
                    </CommandEmpty>
                  )}

                  {parsedDate && (
                    <CommandGroup heading="Parsed Date">
                      <CommandItem
                        key="parsed-date"
                        value="parsed-date"
                        onSelect={handleSelect}
                        className="flex items-start gap-2"
                      >
                        <ClockIcon className="text-primary mt-1 h-4 w-4 flex-shrink-0" />
                        <div className="flex flex-col">
                          <span className="font-bold">
                            {formatDate(parsedDate)}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {formatRelativeTime(parsedDate)}
                          </span>
                        </div>
                      </CommandItem>
                    </CommandGroup>
                  )}

                  <CommandGroup heading="Quick Options">
                    {filteredPresets.map((preset) => {
                      const date = preset.getDate();
                      return (
                        <CommandItem
                          key={preset.value}
                          value={preset.value}
                          onSelect={handleSelect}
                          className="flex items-start gap-2"
                        >
                          <CalendarIcon className="mt-1 h-4 w-4 flex-shrink-0" />
                          <div className="flex flex-col">
                            <span>{preset.label}</span>
                            <span className="text-muted-foreground text-xs">
                              {formatDate(date)}
                            </span>
                          </div>
                        </CommandItem>
                      );
                    })}

                    <CommandItem
                      key="custom-date"
                      value="custom-date"
                      onSelect={handleSelect}
                      className="flex items-start gap-2"
                    >
                      <CalendarIcon className="mt-1 h-4 w-4 flex-shrink-0" />
                      <div className="flex flex-col">
                        <span>Custom date & time</span>
                        <span className="text-muted-foreground text-xs">
                          Pick a specific date and time
                        </span>
                      </div>
                    </CommandItem>
                  </CommandGroup>

                  {currentValue && (
                    <CommandGroup>
                      <CommandItem
                        key="clear"
                        onSelect={handleClear}
                        className="text-muted-foreground"
                      >
                        Clear selection
                      </CommandItem>
                    </CommandGroup>
                  )}
                </CommandList>
              </>
            ) : (
              <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Custom Date & Time</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancelCustomDate}
                  >
                    Cancel
                  </Button>
                </div>

                <div className="space-y-3">
                  <div>
                    <Calendar
                      mode="single"
                      selected={customDate}
                      onSelect={setCustomDate}
                      disabled={(date) => date < new Date()}
                      className="mx-auto flex items-start p-0"
                      captionLayout="dropdown-years"
                    />
                  </div>

                  <div>
                    <Label htmlFor="custom-time-picker" className="text-sm">
                      Time
                    </Label>
                    <Input
                      type="time"
                      id="custom-time-picker"
                      value={customTime}
                      onChange={(e) => setCustomTime(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleCustomDateSelect}
                    disabled={!customDate}
                    className="flex-1"
                  >
                    Set Date
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

export default DateSelector;
export type { DateSelectorProps };
