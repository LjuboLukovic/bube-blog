"use client";

import type React from "react";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { useTheme } from "next-themes";
import data from "@/data.json"; // Import data.json

// Define the theme settings type
export interface ThemeSettings {
  colorTheme: string;
  gradient: string;
  pattern: string;
  font: string;
  borderRadius: string;
  effects: {
    shadow: boolean;
    glassmorphism: boolean;
    cardOpacity: number;
    animationSpeed: number;
  };
  type?: "light" | "dark" | "system"; // Add type for next-themes default
}

// Theme color mappings - this helps ensure consistent color application
export const themeColorMappings = {
  default: {
    primary: "0 0% 9%",
    secondary: "0 0% 96.1%",
    accent: "0 0% 96.1%",
  },
  rose: {
    primary: "347 77% 50%",
    secondary: "355 100% 97%",
    accent: "347 77% 92%",
  },
  green: {
    primary: "160 84% 39%",
    secondary: "150 100% 96%",
    accent: "160 84% 92%",
  },
  purple: {
    primary: "259 94% 51%",
    secondary: "270 100% 98%",
    accent: "259 94% 93%",
  },
  orange: {
    primary: "24 94% 53%",
    secondary: "30 100% 97%",
    accent: "24 94% 93%",
  },
  blue: {
    primary: "217 80% 50%",
    secondary: "213 100% 85%",
    accent: "217 91% 80%",
  },
  teal: {
    primary: "173 80% 40%",
    secondary: "180 100% 97%",
    accent: "173 80% 93%",
  },
  pink: {
    primary: "330 81% 60%",
    secondary: "327 100% 97%",
    accent: "330 81% 93%",
  },
};

// Default theme settings derived from data.json
// Ensure the type property is correctly typed for ThemeSettings
const defaultThemeSettings: ThemeSettings = {
  ...data.themeSettings,
  type:
    data.themeSettings.type === "light" ||
    data.themeSettings.type === "dark" ||
    data.themeSettings.type === "system"
      ? data.themeSettings.type
      : undefined,
};

// Create context
const ThemeSettingsContext = createContext<{
  themeSettings: ThemeSettings;
  updateColorTheme: (value: string) => void;
  updateGradient: (value: string) => void;
  updatePattern: (value: string) => void;
  updateFont: (value: string) => void;
  updateBorderRadius: (value: string) => void;
  updateCardOpacity: (value: number) => void;
  updateAnimationSpeed: (value: number) => void;
  toggleShadow: (value: boolean) => void;
  toggleGlassmorphism: (value: boolean) => void;
  resetToDefaults: () => void;
  getThemeColors: (theme: string) => {
    primary: string;
    secondary: string;
    accent: string;
  };
}>({
  themeSettings: defaultThemeSettings,
  updateColorTheme: () => {},
  updateGradient: () => {},
  updatePattern: () => {},
  updateFont: () => {},
  updateBorderRadius: () => {},
  updateCardOpacity: () => {},
  updateAnimationSpeed: () => {},
  toggleShadow: () => {},
  toggleGlassmorphism: () => {},
  resetToDefaults: () => {},
  getThemeColors: () => ({ primary: "", secondary: "", accent: "" }),
});

export function ThemeSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const [themeSettings, setThemeSettings] =
    useState<ThemeSettings>(defaultThemeSettings);
  const [isInitialized, setIsInitialized] = useState(false);

  // Memoized function to get theme colors - improves performance by avoiding recalculations
  const getThemeColors = useCallback((themeName: string) => {
    return (
      themeColorMappings[themeName as keyof typeof themeColorMappings] ||
      themeColorMappings.default
    );
  }, []);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem("themeSettings");
      let initialSettings = defaultThemeSettings; // Start with defaults from data.json

      if (savedSettings) {
        const parsedSavedSettings = JSON.parse(savedSettings);
        // Merge saved settings, but prioritize colorTheme and type from data.json
        // This ensures that if the developer changes the default colorTheme or type in data.json,
        // it takes effect even if localStorage has an older value.
        initialSettings = {
          ...parsedSavedSettings,
          colorTheme: defaultThemeSettings.colorTheme, // Always use the colorTheme from data.json as the initial default
          type: defaultThemeSettings.type, // Also ensure the initial type from data.json is respected
          // For other properties, localStorage takes precedence if they exist, otherwise use data.json defaults
          effects: {
            ...defaultThemeSettings.effects, // Start with effects from data.json
            ...parsedSavedSettings.effects, // Overlay with saved effects
          },
        };
      }
      setThemeSettings(initialSettings);
    } catch (error) {
      console.error("Failed to parse theme settings:", error);
      setThemeSettings(defaultThemeSettings); // Fallback to default if parsing fails
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Apply theme settings immediately when they change
  useEffect(() => {
    if (isInitialized) {
      // Save to localStorage
      localStorage.setItem("themeSettings", JSON.stringify(themeSettings));

      // Apply CSS variables based on theme settings
      applyThemeSettings(themeSettings, theme === "dark");
    }
  }, [themeSettings, theme, isInitialized]);

  // Update the applyThemeSettings function to correctly set HSL values
  const applyThemeSettings = (settings: ThemeSettings, isDark: boolean) => {
    const root = document.documentElement;

    // Apply theme colors
    const colors = getThemeColors(settings.colorTheme);

    // Apply colors to CSS variables for consistent use across components
    if (isDark) {
      // Adjust colors for dark mode - properly format HSL values
      root.style.setProperty("--primary", colors.primary);
      root.style.setProperty("--primary-foreground", "0 0% 98%");
      root.style.setProperty("--icon-text-color", "255, 255, 255"); // White text for icons
      root.style.setProperty("--secondary", colors.secondary);
      root.style.setProperty("--secondary-foreground", "0 0% 98%");
      root.style.setProperty("--accent", colors.accent);
      root.style.setProperty("--accent-foreground", "0 0% 98%");
    } else {
      // Light mode colors
      root.style.setProperty("--primary", colors.primary);
      root.style.setProperty("--primary-foreground", "0 0% 98%");
      root.style.setProperty("--icon-text-color", "255, 255, 255"); // White text for icons
      root.style.setProperty("--secondary", colors.secondary);
      root.style.setProperty("--secondary-foreground", "0 0% 9%");
      root.style.setProperty("--accent", colors.accent);
      root.style.setProperty("--accent-foreground", "0 0% 9%");
    }

    // Apply font family to the root element
    document.documentElement.classList.remove(
      "font-sans",
      "font-serif",
      "font-mono"
    );
    document.documentElement.classList.add(settings.font);

    // Apply background pattern to the main element
    const mainElement = document.querySelector("main");
    if (mainElement) {
      // Remove all pattern classes
      mainElement.classList.remove(
        "pattern-none",
        "pattern-dots",
        "pattern-grid",
        "pattern-stripes",
        "pattern-waves",
        "pattern-hexagons"
      );

      // Add the selected pattern class
      if (settings.pattern !== "none") {
        mainElement.classList.add(settings.pattern);
      }
    }

    // Apply animation speed
    root.style.setProperty(
      "--animation-speed",
      `${settings.effects.animationSpeed}ms`
    );

    // Apply card opacity
    root.style.setProperty(
      "--card-opacity",
      settings.effects.cardOpacity.toString()
    );

    // Apply border radius to CSS variable for consistent use
    root.style.setProperty(
      "--card-border-radius",
      getBorderRadiusValue(settings.borderRadius)
    );
  };

  // Helper function to get the actual pixel value for border radius
  const getBorderRadiusValue = (borderRadiusClass: string): string => {
    switch (borderRadiusClass) {
      case "rounded-none":
        return "0px";
      case "rounded-sm":
        return "0.125rem";
      case "rounded":
        return "0.25rem";
      case "rounded-lg":
        return "0.5rem";
      default:
        return "0.5rem";
    }
  };

  // Optimized update functions with useCallback to prevent unnecessary re-renders
  const updateColorTheme = useCallback(
    (value: string) => {
      setThemeSettings((prev) => ({ ...prev, colorTheme: value }));

      // Apply theme colors immediately for responsive feedback
      const colors = getThemeColors(value);
      const root = document.documentElement;
      const isDark = theme === "dark";

      // Apply colors directly without adjustment
      root.style.setProperty("--primary", colors.primary);
      root.style.setProperty("--secondary", colors.secondary);
      root.style.setProperty("--accent", colors.accent);
    },
    [theme, getThemeColors]
  );

  const updateGradient = useCallback((value: string) => {
    setThemeSettings((prev) => ({ ...prev, gradient: value }));
  }, []);

  const updatePattern = useCallback((value: string) => {
    setThemeSettings((prev) => ({ ...prev, pattern: value }));

    // Apply pattern immediately for responsive feedback
    const mainElement = document.querySelector("main");
    if (mainElement) {
      // Remove all pattern classes
      mainElement.classList.remove(
        "pattern-none",
        "pattern-dots",
        "pattern-grid",
        "pattern-stripes",
        "pattern-waves",
        "pattern-hexagons"
      );

      // Add the selected pattern class
      if (value !== "none") {
        mainElement.classList.add(value);
      }
    }
  }, []);

  const updateFont = useCallback((value: string) => {
    setThemeSettings((prev) => ({ ...prev, font: value }));

    // Apply font immediately for responsive feedback
    document.documentElement.classList.remove(
      "font-sans",
      "font-serif",
      "font-mono"
    );
    document.documentElement.classList.add(value);
  }, []);

  const updateBorderRadius = useCallback((value: string) => {
    setThemeSettings((prev) => ({ ...prev, borderRadius: value }));

    // Apply border radius immediately for responsive feedback
    document.documentElement.style.setProperty(
      "--card-border-radius",
      getBorderRadiusValue(value)
    );
  }, []);

  const updateCardOpacity = useCallback((value: number) => {
    setThemeSettings((prev) => ({
      ...prev,
      effects: {
        ...prev.effects,
        cardOpacity: value,
      },
    }));

    // Apply opacity immediately for responsive feedback
    document.documentElement.style.setProperty(
      "--card-opacity",
      value.toString()
    );
  }, []);

  const updateAnimationSpeed = useCallback((value: number) => {
    setThemeSettings((prev) => ({
      ...prev,
      effects: {
        ...prev.effects,
        animationSpeed: value,
      },
    }));

    // Apply animation speed immediately for responsive feedback
    document.documentElement.style.setProperty(
      "--animation-speed",
      `${value}ms`
    );
  }, []);

  const toggleShadow = useCallback((value: boolean) => {
    setThemeSettings((prev) => ({
      ...prev,
      effects: {
        ...prev.effects,
        shadow: value,
      },
    }));
  }, []);

  const toggleGlassmorphism = useCallback((value: boolean) => {
    setThemeSettings((prev) => ({
      ...prev,
      effects: {
        ...prev.effects,
        glassmorphism: value,
      },
    }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setThemeSettings(defaultThemeSettings); // Reset to defaults from data.json
  }, []);

  return (
    <ThemeSettingsContext.Provider
      value={{
        themeSettings,
        updateColorTheme,
        updateGradient,
        updatePattern,
        updateFont,
        updateBorderRadius,
        updateCardOpacity,
        updateAnimationSpeed,
        toggleShadow,
        toggleGlassmorphism,
        resetToDefaults,
        getThemeColors,
      }}
    >
      {children}
    </ThemeSettingsContext.Provider>
  );
}

export function useThemeSettings() {
  return useContext(ThemeSettingsContext);
}
