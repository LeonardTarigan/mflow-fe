import { cn } from "@/common/lib/utils";
import type { HTMLProps } from "react";

export default function LoadingSpinner(props: HTMLProps<HTMLDivElement>) {
  return (
    <div className={cn("loader", "size-5 border-2 border-white")} {...props} />
  );
}
