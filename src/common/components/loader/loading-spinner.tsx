import { cn } from "@/common/lib/utils";
import type { HTMLProps } from "react";

export default function LoadingSpinner({
  className,
  ...restProps
}: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn("loader", "size-5 border-2 border-white", className)}
      {...restProps}
    />
  );
}
