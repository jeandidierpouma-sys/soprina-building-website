import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-32 w-full rounded-xl border border-sb-grayline bg-white px-4 py-3 text-sm text-sb-navy placeholder:text-sb-body/50 outline-none transition-colors focus-visible:border-sb-gold focus-visible:ring-2 focus-visible:ring-sb-gold/30 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/20",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
