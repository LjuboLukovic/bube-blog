"use client";
import { cn } from "@/lib/utils";
import type React from "react";

import { useTheme } from "next-themes";
import { useThemeSettings } from "@/hooks/use-theme-settings";
import { getLinkIcon } from "@/components/link-item/utils";
import { useMemo } from "react";

interface ViewModeProps {
  title: string;
  url: string;
}

export function ViewMode({ title, url }: ViewModeProps) {
  const { theme } = useTheme();
  const { themeSettings, getThemeColors } = useThemeSettings();
  const isDarkTheme = theme === "dark";

  // Memoize theme colors to prevent unnecessary recalculations
  const themeColors = useMemo(() => {
    return getThemeColors(themeSettings.colorTheme);
  }, [themeSettings.colorTheme, getThemeColors]);

  // Helper function to convert HSL values to RGB
  function hslToRgb(h: number, s: number, l: number) {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    };
  }

  // Update the dynamicStyles useMemo to handle the new HSL format
  const dynamicStyles = useMemo(() => {
    const primaryColor = themeColors.primary;
    let primaryColorRgb;

    // Check if the color is in HSL format (space-separated values)
    if (primaryColor.includes(" ")) {
      const [h, s, l] = primaryColor.split(" ").map(Number);
      primaryColorRgb = hslToRgb(h, s, l);
    } else {
      // Default fallback if not HSL (e.g., if it's a direct color name or invalid)
      // For this application, we expect HSL, so this path should ideally not be hit
      primaryColorRgb = { r: 0, g: 0, b: 0 };
    }
    return {
      hoverBg: isDarkTheme
        ? `rgba(${primaryColorRgb?.r || 0}, ${primaryColorRgb?.g || 0}, ${
            primaryColorRgb?.b || 0
          }, 0.15)`
        : `rgba(${primaryColorRgb?.r || 0}, ${primaryColorRgb?.g || 0}, ${
            primaryColorRgb?.b || 0
          }, 0.07)`,
      iconBg: `hsl(${primaryColor})`,
      gradientFrom: `rgba(${primaryColorRgb?.r || 0}, ${
        primaryColorRgb?.g || 0
      }, ${primaryColorRgb?.b || 0}, 0.07)`,
      transitionDuration: `${themeSettings.effects.animationSpeed}ms`,
      opacity: themeSettings.effects.cardOpacity,
    };
  }, [themeColors, isDarkTheme, themeSettings.effects]);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener"
      className={cn(
        "relative overflow-hidden group border shadow-sm",
        "transition-all ease-in-out",
        "hover:shadow-md hover:border-primary/30",
        "active:scale-[0.98] active:shadow-inner",
        "flex items-center gap-3 p-3 w-full",
        "text-foreground hover:text-primary transition-colors",
        "font-medium cursor-pointer",
        themeSettings.borderRadius,
        themeSettings.font,
        themeSettings.effects.glassmorphism && "glassmorphism"
      )}
      style={
        {
          transitionDuration: dynamicStyles.transitionDuration,
          opacity: dynamicStyles.opacity,
          "--hover-bg": dynamicStyles.hoverBg,
        } as React.CSSProperties
      }
    >
      {/* Overlay gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `linear-gradient(to right, ${dynamicStyles.gradientFrom}, transparent)`,
          transitionDuration: dynamicStyles.transitionDuration,
        }}
      ></div>

      {/* Icon */}
      <div
        className={cn(
          "flex items-center justify-center",
          "w-8 h-8 rounded-full text-white",
          "transition-all",
          "group-hover:scale-110 group-hover:shadow-sm"
        )}
        style={{
          backgroundColor: dynamicStyles.iconBg,
          transitionDuration: dynamicStyles.transitionDuration,
        }}
      >
        {getLinkIcon(url)}
      </div>

      {/* Title */}
      <span className="flex-1">{title}</span>
    </a>
  );
}

// Removed hexToRgb and hslToHex as they are not used.
// hslToRgb is kept as it is used in dynamicStyles.
