"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { IS_DEVELOPMENT } from "@/lib/constants";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  React.useEffect(() => {
    // Added console logging for debugging theme provider
    if (IS_DEVELOPMENT) console.log("ThemeProvider mounted");
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
