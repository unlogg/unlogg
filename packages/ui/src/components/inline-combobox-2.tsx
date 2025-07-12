"use client";

import * as React from "react";

import type { Point, TElement } from "platejs";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@unlogg/ui/components/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandEmpty,
} from "@unlogg/ui/components/command";
import { filterWords } from "@platejs/combobox";
import {
  type UseComboboxInputResult,
  useComboboxInput,
  useHTMLInputCursorState,
} from "@platejs/combobox/react";
import { cva } from "class-variance-authority";
import { useComposedRef, useEditorRef } from "platejs/react";

import { cn } from "@unlogg/ui/lib/utils";
import { createPortal } from "react-dom";

type FilterFn = (
  item: { value: string; group?: string; keywords?: string[]; label?: string },
  search: string
) => boolean;

interface InlineComboboxContextValue {
  filter: FilterFn | false;
  inputProps: UseComboboxInputResult["props"];
  inputRef: React.RefObject<HTMLInputElement | null>;
  removeInput: UseComboboxInputResult["removeInput"];
  showTrigger: boolean;
  trigger: string;
  setHasEmpty: (hasEmpty: boolean) => void;
  value: string;
  setValue: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const InlineComboboxContext = React.createContext<InlineComboboxContextValue>(
  null as unknown as InlineComboboxContextValue
);

const defaultFilter: FilterFn = (
  { group, keywords = [], label, value },
  search
) => {
  const uniqueTerms = new Set(
    [value, ...keywords, group, label].filter(Boolean)
  );

  return Array.from(uniqueTerms).some((keyword) =>
    filterWords(keyword!, search)
  );
};

interface InlineComboboxProps {
  children: React.ReactNode;
  element: TElement;
  trigger: string;
  filter?: FilterFn | false;
  hideWhenNoValue?: boolean;
  showTrigger?: boolean;
  value?: string;
  setValue?: (value: string) => void;
}

const InlineCombobox = ({
  children,
  element,
  filter = defaultFilter,
  hideWhenNoValue = false,
  setValue: setValueProp,
  showTrigger = true,
  trigger,
  value: valueProp,
}: InlineComboboxProps) => {
  const editor = useEditorRef();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const cursorState = useHTMLInputCursorState(inputRef);

  const [valueState, setValueState] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [hasEmpty, setHasEmpty] = React.useState(false);
  const hasValueProp = valueProp !== undefined;
  const value = hasValueProp ? valueProp : valueState;

  const setValue = React.useCallback(
    (newValue: string) => {
      setValueProp?.(newValue);
      if (!hasValueProp) setValueState(newValue);
    },
    [setValueProp, hasValueProp]
  );

  /**
   * Track the point just before the input element so we know where to
   * insertText if the combobox closes due to a selection change.
   */
  const insertPoint = React.useRef<Point | null>(null);

  React.useEffect(() => {
    const path = editor.api.findPath(element);

    if (!path) return;

    const point = editor.api.before(path);

    if (!point) return;

    const pointRef = editor.api.pointRef(point);
    insertPoint.current = pointRef.current;

    return () => {
      pointRef.unref();
    };
  }, [editor, element]);

  const { props: inputProps, removeInput } = useComboboxInput({
    cancelInputOnBlur: true,
    cursorState,
    ref: inputRef,
    onCancelInput: (cause) => {
      if (cause !== "backspace") {
        editor.tf.insertText(trigger + value, {
          at: insertPoint?.current ?? undefined,
        });
      }
      if (cause === "arrowLeft" || cause === "arrowRight") {
        editor.tf.move({
          distance: 1,
          reverse: cause === "arrowLeft",
        });
      }
    },
  });

  const contextValue: InlineComboboxContextValue = React.useMemo(
    () => ({
      filter,
      inputProps,
      inputRef,
      removeInput,
      setHasEmpty,
      showTrigger,
      trigger,
      value,
      setValue,
      open,
      setOpen,
    }),
    [
      trigger,
      showTrigger,
      filter,
      inputRef,
      inputProps,
      removeInput,
      setHasEmpty,
      value,
      setValue,
      open,
      setOpen,
    ]
  );

  // Open combobox if there are items or hasEmpty, and value is not empty if hideWhenNoValue
  React.useEffect(() => {
    setOpen(
      (!hideWhenNoValue || value.length > 0) &&
        (hasEmpty || React.Children.count(children) > 0)
    );
  }, [hasEmpty, hideWhenNoValue, value, children]);

  return (
    <span contentEditable={false}>
      <InlineComboboxContext.Provider value={contextValue}>
        <Command shouldFilter={false}>
          <Popover open={open} onOpenChange={setOpen}>
            <InlineComboboxInput />
            <InlineComboboxContent>{children}</InlineComboboxContent>
          </Popover>
        </Command>
      </InlineComboboxContext.Provider>
    </span>
  );
};

const InlineComboboxInput = React.forwardRef<
  HTMLInputElement,
  React.HTMLAttributes<HTMLInputElement>
>(({ className, ...props }, propRef) => {
  const {
    inputProps,
    inputRef: contextRef,
    showTrigger,
    trigger,
    value,
    setValue,
    setOpen,
  } = React.useContext(InlineComboboxContext);

  const ref = useComposedRef(propRef, contextRef);

  return (
    <>
      {showTrigger && trigger}
      <span className="relative min-h-[1lh]">
        <span
          className="invisible overflow-hidden text-nowrap"
          aria-hidden="true"
        >
          {value || "\u200B"}
        </span>
        <PopoverTrigger asChild>
          <div className="absolute top-0 left-0 size-full">
            <CommandInput
              ref={ref}
              className={cn(
                "size-full scroll-auto border-0 bg-transparent outline-none",
                className
              )}
              value={value}
              onValueChange={setValue}
              onFocus={() => setOpen(true)}
              {...inputProps}
              {...props}
            />
          </div>
        </PopoverTrigger>
      </span>
    </>
  );
});
InlineComboboxInput.displayName = "InlineComboboxInput";

const InlineComboboxContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof PopoverContent>) => {
  // Portal prevents CSS from leaking into popover
  return createPortal(
    <PopoverContent
      onWheel={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className={cn(
        "bg-popover z-500 max-h-[288px] min-w-[300px] overflow-y-auto rounded-md shadow-md",
        className
      )}
      {...props}
    >
      <CommandList>{children}</CommandList>
    </PopoverContent>,
    document.body
  );
};

const comboboxItemVariants = cva(
  "relative mx-1 flex h-[28px] items-center rounded-sm px-2 text-sm text-foreground outline-none select-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    defaultVariants: {
      interactive: true,
    },
    variants: {
      interactive: {
        false: "",
        true: "cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground",
      },
    },
  }
);

const InlineComboboxItem = ({
  className,
  focusEditor = true,
  group,
  keywords,
  label,
  onSelect,
  value,
  children,
  ...props
}: {
  focusEditor?: boolean;
  group?: string;
  keywords?: string[];
  label?: string;
  value: string;
  onSelect?: (value: string) => void;
} & Omit<React.ComponentProps<typeof CommandItem>, "value" | "onSelect">) => {
  const {
    filter,
    removeInput,
    value: searchValue,
    setValue,
    setOpen,
  } = React.useContext(InlineComboboxContext);

  const visible = React.useMemo(
    () => !filter || filter({ group, keywords, label, value }, searchValue),
    [filter, group, keywords, label, value, searchValue]
  );

  if (!visible) return null;

  return (
    <CommandItem
      className={cn(comboboxItemVariants(), className)}
      value={value}
      onSelect={() => {
        setValue(value);
        setOpen(false);
        removeInput(focusEditor);
        onSelect?.(value);
      }}
      {...props}
    >
      {children}
    </CommandItem>
  );
};

const InlineComboboxEmpty = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { setHasEmpty } = React.useContext(InlineComboboxContext);

  React.useEffect(() => {
    setHasEmpty(true);
    return () => setHasEmpty(false);
  }, [setHasEmpty]);

  return (
    <CommandEmpty>
      <div
        className={cn(comboboxItemVariants({ interactive: false }), className)}
      >
        {children}
      </div>
    </CommandEmpty>
  );
};

const InlineComboboxRow = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props}>{children}</div>;
};

function InlineComboboxGroup({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandGroup>) {
  return (
    <CommandGroup
      {...props}
      className={cn(
        "hidden py-1.5 not-last:border-b [&:has([role=option])]:block",
        className
      )}
    >
      {children}
    </CommandGroup>
  );
}

function InlineComboboxGroupLabel({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "text-muted-foreground mt-1.5 mb-2 px-3 text-xs font-medium",
        className
      )}
    >
      {children}
    </div>
  );
}

export {
  InlineCombobox,
  InlineComboboxContent,
  InlineComboboxEmpty,
  InlineComboboxGroup,
  InlineComboboxGroupLabel,
  InlineComboboxInput,
  InlineComboboxItem,
  InlineComboboxRow,
};
