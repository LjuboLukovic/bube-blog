"use client"
import { ViewMode } from "@/components/link-item/view-mode"

export interface LinkItemProps {
  id: string
  title: string
  url: string
}

export function LinkItem({ title, url }: LinkItemProps) {
  return <ViewMode title={title} url={url} />
}
