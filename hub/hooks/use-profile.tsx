"use client"

import { useState, useEffect } from "react"

export interface Profile {
  name: string
  bio: string
  avatarUrl: string
  secondaryBg: string
  // verified: boolean // Removed verified property
}

export function useProfile(initialProfile: Profile) {
  const [profile, setProfile] = useState<Profile>(initialProfile)

  // Apply secondary background color when component mounts or when it changes
  useEffect(() => {
    if (profile.secondaryBg) {
      document.querySelector("main")?.classList.remove(
        ...document
          .querySelector("main")
          ?.classList.value.split(" ")
          .filter((cls) => cls.startsWith("bg-")),
      )
      document.querySelector("main")?.classList.add(profile.secondaryBg)
    }
  }, [profile.secondaryBg])

  return {
    profile,
  }
}
