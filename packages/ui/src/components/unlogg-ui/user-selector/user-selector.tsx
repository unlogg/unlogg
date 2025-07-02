"use client";

import * as React from "react";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";

import { Button } from "@unlogg/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@unlogg/ui/components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@unlogg/ui/components/popover";
import { cn } from "@unlogg/ui/lib/utils";

type User = {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
};

interface AssigneeSelectorProps {
  users?: User[];
  value?: User | null;
  onValueChange?: (value: User | null) => void;
  onInviteNewUser?: () => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
}

function AssigneeSelector({
  users = [],
  value,
  onValueChange,
  onInviteNewUser,
  placeholder = "No assignee",
  searchPlaceholder = "Search users...",
  className = "w-[200px]",
}: AssigneeSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(
    value || null
  );
  const [inputValue, setInputValue] = React.useState("");

  console.log("seelectedUser", selectedUser);
  // Use controlled value if provided, otherwise use internal state
  const currentValue = value !== undefined ? value : selectedUser;

  const handleSelect = (selectedValue: string) => {
    if (selectedValue === "no-assignee") {
      const newUser = null;
      if (value === undefined) {
        setSelectedUser(newUser);
      }
      onValueChange?.(newUser);
    } else {
      const newUser = users.find((user) => user.id === selectedValue) || null;
      if (value === undefined) {
        setSelectedUser(newUser);
      }
      onValueChange?.(newUser);
    }
    setOpen(false);
    setInputValue("");
  };

  const handleInviteNewUser = () => {
    console.log("Inviting new user...");
    onInviteNewUser?.();
    setOpen(false);
    setInputValue("");
  };

  const filteredUsers = users.filter((user) => {
    const searchTerm = inputValue.toLowerCase();
    const name = user.name?.toLowerCase() || "";
    const email = user.email.toLowerCase();
    return name.includes(searchTerm) || email.includes(searchTerm);
  });

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

  console.log("currentValue", currentValue);

  const avatar = React.useMemo(() => {
    return createAvatar(thumbs, {
      size: 64,
      seed:
        currentValue?.email ||
        currentValue?.name ||
        selectedUser?.email ||
        "default",
      // ... other options
    }).toDataUri();
  }, [currentValue?.email, currentValue?.name, selectedUser?.email]);

  // function to create avatar image , optimize with useCallback if needed
  // This function can be used to create an avatar image for any user
  // It uses the user's email or name as the seed for the avatar generation

  const createAvatarImage = (user: User) => {
    return createAvatar(thumbs, {
      size: 64,
      seed: user.email || user.name || "default",
      // ... other options
    }).toDataUri();
  };

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outlineSecondary"
            className={cn(`justify-start ${className}`)}
          >
            {currentValue ? (
              <div className="flex items-center gap-2">
                <img
                  src={selectedUser?.avatar ? selectedUser.avatar : avatar}
                  alt="Avatar"
                  className="h-full w-6 rounded-full"
                />
                <span className="truncate">
                  {getUserDisplayName(currentValue)}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="bg-muted flex h-6 w-6 items-center justify-center rounded-full text-xs">
                  ?
                </div>
                <span>{placeholder}</span>
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={searchPlaceholder}
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  key="no-assignee"
                  value="no-assignee"
                  onSelect={handleSelect}
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-muted flex h-6 w-6 items-center justify-center rounded-full text-xs">
                      ?
                    </div>
                    <span>No assignee</span>
                  </div>
                </CommandItem>
              </CommandGroup>

              {filteredUsers.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    {filteredUsers.map((user) => (
                      <CommandItem
                        key={user.id}
                        value={user.id}
                        onSelect={handleSelect}
                      >
                        <div className="flex items-center gap-2">
                          {/* <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium">
                            {getUserInitials(user)}
                          </div> */}
                          <img
                            src={createAvatarImage(user)}
                            alt="Avatar"
                            className="h-full w-8 rounded-full"
                          />
                          <div className="flex flex-col">
                            <span className="truncate">
                              {getUserDisplayName(user)}
                            </span>
                            {user.name && (
                              <span className="text-muted-foreground truncate text-xs">
                                {user.email}
                              </span>
                            )}
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}

              {filteredUsers.length === 0 && inputValue.trim() && (
                <CommandEmpty>No users found.</CommandEmpty>
              )}
            </CommandList>

            <CommandSeparator />
            <div className="p-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleInviteNewUser}
                className="w-full justify-start"
              >
                + Invite new user
              </Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default AssigneeSelector;
