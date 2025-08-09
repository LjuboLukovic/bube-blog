"use client";

import { useEffect } from "react";
import { useProfile } from "@/hooks/use-profile";
import { useLinks } from "@/hooks/use-links";
import { Header } from "@/components/link-tree/header";
import { ProfileView } from "@/components/link-tree/profile-view";
import { Footer } from "@/components/footer"; // Import the new Footer component
import { useThemeSettings } from "@/hooks/use-theme-settings";
import { cn } from "@/lib/utils";

// Import data from the static JSON file
import data from "@/data.json";

export default function LinkTree() {
  // Use custom hooks for profile and links management, initialized with static data
  const { profile } = useProfile(data.profile);
  const { links } = useLinks(data.links);

  const { themeSettings } = useThemeSettings();

  // Apply font family to the entire application when it changes
  useEffect(() => {
    // Apply the selected font to the root element
    document.documentElement.classList.remove(
      "font-sans",
      "font-serif",
      "font-mono"
    );
    document.documentElement.classList.add(themeSettings.font);
  }, [themeSettings.font]);

  return (
    <div className={cn("w-full max-w-3xl mx-auto", themeSettings.font)}>
      <Header />
      <div className="w-full max-w-md mx-auto">
        <ProfileView profile={profile} links={links} />
      </div>
      <Footer /> {/* Add the Footer component here */}
    </div>
  );
}
