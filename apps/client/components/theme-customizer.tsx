"use client";

import * as React from "react";
import {
  CheckIcon,
  MoonIcon,
  PaletteIcon,
  RepeatIcon,
  SunIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

import { baseColors } from "@/config/base-colors";

import { DialogTitle } from "@unlogg/ui/components/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@unlogg/ui/components/drawer";

import { Label } from "@unlogg/ui/components/label";
import { useThemeConfig } from "./active-theme";
import { Button } from "@unlogg/ui/components/button";
import { Skeleton } from "@unlogg/ui/components/skeleton";
import {
  PopoverAnchor,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@unlogg/ui/components/popover";
import { cn } from "@unlogg/ui/lib/utils";
import { Separator } from "@unlogg/ui/components/separator";

export function ThemeCustomizer() {
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="ghost" className="md:hidden" size="icon">
            <PaletteIcon />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DialogTitle className="sr-only">Customize the theme</DialogTitle>
          <Customizer />
        </DrawerContent>
      </Drawer>
      <div className="hidden items-center md:flex">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <PaletteIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="z-999 w-[340px] rounded-[12px] p-6"
            sideOffset={10}
          >
            <Customizer />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export function Customizer() {
  const { activeTheme, setActiveTheme } = useThemeConfig();
  const [mounted, setMounted] = React.useState(false);
  const { setTheme, resolvedTheme: theme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full p-2 md:p-0">
      <div className="flex items-start pt-4 md:pt-0">
        <div className="space-y-1 pr-2">
          <div className="font-semibold leading-none tracking-tight">
            Customize
          </div>
          <div className="text-xs text-muted-foreground">
            Customize the theme colors and mode
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto rounded-[0.5rem]"
          onClick={() => {
            setTheme("dark");
            setActiveTheme("default");
          }}
        >
          <RepeatIcon />
          <span className="sr-only">Reset</span>
        </Button>
      </div>
      <Separator className="my-2" />
      <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
        <div className="space-y-1.5">
          <Label className="text-xs">Color</Label>
          <div className="flex flex-col gap-2">
            {baseColors.map((color) => {
              const isActive = activeTheme === color.name;

              return mounted ? (
                <Button
                  variant={"outline"}
                  size="sm"
                  key={color.name}
                  onClick={() => {
                    setActiveTheme(color.name);
                  }}
                  className={cn(
                    "justify-start",
                    isActive && "border-2 border-primary dark:border-primary"
                  )}
                  style={
                    {
                      "--theme-primary": `${
                        color?.activeColor[theme === "dark" ? "dark" : "light"]
                      }`,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className={cn(
                      "mr-1 flex size-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[var(--theme-primary)]"
                    )}
                  >
                    {isActive && <CheckIcon className="size-4 text-white" />}
                  </span>
                  {color.label}
                </Button>
              ) : (
                <Skeleton className="h-8 w-full" key={color.name} />
              );
            })}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Mode</Label>
          <div className="grid grid-cols-3 gap-2">
            {mounted ? (
              <>
                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={cn(theme !== "dark" && "border-2 border-primary")}
                >
                  <SunIcon className="mr-1 -translate-x-1" />
                  Light
                </Button>
                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className={cn(
                    theme === "dark" &&
                      "border-2 border-primary dark:border-primary"
                  )}
                >
                  <MoonIcon className="mr-1 -translate-x-1" />
                  Dark
                </Button>
              </>
            ) : (
              <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
