import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@unlogg/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 leading-none whitespace-nowrap rounded-md cursor-pointer text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "leading-none border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input/30 dark:hover:bg-input/50 text-muted-foreground hover:text-foreground bg-background dark:bg-background hover:bg-muted hover:dark:bg-card",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function ActiveButton({
  className,
  variant,
  size,
  asChild = false,
  isActive = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isActive?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  // Add Tailwind classes for active state
  const activeClass = isActive
    ? "bg-accent dark:bg-accent text-accent-foreground text-foreground dark:text-primary hover:bg-accent dark:hover:bg-accent/80 hover:text-primary dark:hover:text-primary"
    : "";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }), activeClass)}
      {...props}
    />
  );
}
export default ActiveButton;
export { buttonVariants };
// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {
//   asChild?: boolean;
// }
