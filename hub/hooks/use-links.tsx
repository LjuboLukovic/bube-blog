"use client"

import { useState } from "react"

export interface LinkItemProps {
  id: string
  title: string
  url: string
}

export function useLinks(initialLinks: LinkItemProps[]) {
  const [links, setLinks] = useState<LinkItemProps[]>(initialLinks)

  return {
    links,
  }
}
