import { cn } from "@/lib/utils";
import React from "react";

const Section = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={cn(
        "container mx-auto max-w-5xl px-4 py-16 md:py-24",
        className
      )}
      {...props}
    />
  );
});
Section.displayName = "Section";

export { Section };
