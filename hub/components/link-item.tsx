"use client";
import { ViewMode } from "@/components/link-item/view-mode";

export interface LinkItemProps {
  id: string;
  title: string;
  url: string;
  disabled?: boolean;
}

export function LinkItem({ title, url, disabled }: LinkItemProps) {
  return <ViewMode title={title} url={url} disabled={disabled} />;
}
