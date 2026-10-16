import { cn } from "@/lib/utils";
import { Cross } from "lucide-react";

interface ChapelLoaderProps {
  className?: string;
  label?: string;
  compact?: boolean;
}

const ChapelLoader = ({ className, label = "Loading", compact = false }: ChapelLoaderProps) => (
  <span
    className={cn(
      "flex items-center justify-center gap-3 text-muted-foreground",
      compact ? "py-0" : "py-12",
      className,
    )}
    role="status"
    aria-live="polite"
  >
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center",
        compact ? "h-4 w-4" : "h-12 w-12",
      )}
      aria-hidden="true"
    >
      <span className="absolute inset-0 animate-spin rounded-full border-2 border-dashed border-secondary" />
      <span className="absolute inset-[4px] animate-[spin_3.2s_linear_infinite_reverse] rounded-full border border-primary/35" />
      <Cross className={cn("text-primary", compact ? "h-2.5 w-2.5" : "h-5 w-5")} strokeWidth={2.4} />
    </span>
    {label && !compact && <span className="text-sm font-medium">{label}</span>}
  </span>
);

export default ChapelLoader;