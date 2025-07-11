"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NavigationGuardProvider } from "next-navigation-guard";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <NavigationGuardProvider>{children}</NavigationGuardProvider>
    </NextThemesProvider>
  );
}
