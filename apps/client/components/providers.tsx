"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NavigationGuardProvider } from "next-navigation-guard";
import { ActiveThemeProvider } from "@/components/active-theme";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <ActiveThemeProvider>
        <NavigationGuardProvider>{children}</NavigationGuardProvider>
      </ActiveThemeProvider>
    </NextThemesProvider>
  );
}
