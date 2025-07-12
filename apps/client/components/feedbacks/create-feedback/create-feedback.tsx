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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@unlogg/ui/components/form";
import { Input } from "@unlogg/ui/components/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues, maxCharacters } from "../create-feedback-modal";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@unlogg/ui/components/popover";
import { cn } from "@unlogg/ui/lib/utils";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { DescriptionEditor } from "./description-editor";

const feedbackType = [
  { value: "feature", label: "Feature", color: "#4caf50" },
  { value: "other", label: "Other", color: "#ff9800" },
  { value: "bug", label: "Bug", color: "#f44336" },
] as const;

const boards = [
  { value: "product-a", label: "Product A", color: "#934caf" },
  { value: "product-b", label: "Product B", color: "#1500ff" },
  { value: "product-c", label: "Product C", color: "#36f4de" },
] as const;

export const CreateFeedback = ({
  onOpenChange = () => {},
  form,
  onSubmit,
}: {
  onOpenChange?: (open: boolean) => void;
  form: UseFormReturn<FormValues>;
  onSubmit: (values: FormValues) => void;
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-4 gap-0 relative">
          <div className="col-span-3 p-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Title of your feedback"
                      className="border-none bg-background  dark:bg-background focus-visible:border-none focus-visible:ring-0 focus-visible:outline-none text-lg md:text-xl file:text-xl font-semibold p-2"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
            {/* <Input
              placeholder="Title of your feedback"
              className="border-none bg-background  dark:bg-background focus-visible:border-none focus-visible:ring-0 focus-visible:outline-none text-lg md:text-xl file:text-xl font-semibold p-2"
            /> */}

            <FormField
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="sr-only">Description</FormLabel>
                  <FormControl>
                    <DescriptionEditor
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                      maxCharacters={maxCharacters}
                    />
                  </FormControl>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-1 p-1 py-3 border-l space-y-5">
            <div>
              <FormField
                control={form.control}
                name="feedbackType"
                render={({ field }) => (
                  <FormItem className="flex flex-col ">
                    <FormLabel className="text-muted-foreground pl-3 text-xs tracking-wide">
                      Feedback Type
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="ghost"
                            role="combobox"
                            className={cn(
                              "w-full flex items-center justify-between gap-2",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {/* Status color indicator in trigger */}
                            {field.value && (
                              <div
                                className="w-3 h-3 rounded-full mr-0"
                                style={{
                                  backgroundColor: feedbackType.find(
                                    (type) => type.value === field.value
                                  )?.color,
                                }}
                              />
                            )}
                            <span>
                              {field.value
                                ? feedbackType.find(
                                    (type) => type.value === field.value
                                  )?.label
                                : "Select feedback type"}
                            </span>
                            <ChevronsUpDown className="opacity-50 ml-auto" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search feedback type..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No feedback type found.</CommandEmpty>
                            <CommandGroup>
                              {feedbackType.map((type) => (
                                <CommandItem
                                  value={type.label}
                                  key={type.value}
                                  onSelect={() => {
                                    form.setValue("feedbackType", type.value, {
                                      shouldDirty: true,
                                    });
                                  }}
                                >
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: type.color }}
                                  />
                                  {type.label}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto",
                                      type.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription className="sr-only">
                      Feedback Type
                    </FormDescription>
                    <FormMessage className="ml-2" />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="board"
                render={({ field }) => (
                  <FormItem className="flex flex-col ">
                    <FormLabel className="text-muted-foreground pl-3 text-xs tracking-wide">
                      Board
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="ghost"
                            role="combobox"
                            className={cn(
                              "w-full flex items-center justify-between gap-2",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {/* Status color indicator in trigger */}
                            {field.value && (
                              <div
                                className="w-3 h-3 rounded-full mr-0"
                                style={{
                                  backgroundColor: boards.find(
                                    (board) => board.value === field.value
                                  )?.color,
                                }}
                              />
                            )}
                            <span>
                              {field.value
                                ? boards.find(
                                    (board) => board.value === field.value
                                  )?.label
                                : "Select board"}
                            </span>
                            <ChevronsUpDown className="opacity-50 ml-auto" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search boards..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No boards found.</CommandEmpty>
                            <CommandGroup>
                              {boards.map((board) => (
                                <CommandItem
                                  value={board.label}
                                  key={board.value}
                                  onSelect={() => {
                                    form.setValue("board", board.value, {
                                      shouldDirty: true,
                                    });
                                  }}
                                >
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: board.color }}
                                  />
                                  {board.label}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto",
                                      board.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription className="sr-only">Board</FormDescription>
                    <FormMessage className="ml-3" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="border-t sticky bottom-0 w-full p-2 flex items-center justify-end gap-4">
          <div></div>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              form.reset();
              form.clearErrors();
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit">Create feedback</Button>
        </div>
      </form>
    </Form>
  );
};
