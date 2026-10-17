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
        compact ? "h-5 w-5" : "h-14 w-14",
      )}
      aria-hidden="true"
    >
      <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-dashed border-secondary" />
      <span className="absolute inset-[5px] animate-[spin_2.4s_linear_infinite_reverse] rounded-full border-2 border-primary/45" />
      <Cross className={cn("text-primary", compact ? "h-3 w-3" : "h-6 w-6")} strokeWidth={2.6} />
    </span>
    {label && !compact && <span className="text-sm font-medium">{label}</span>}
  </span>
);

export default ChapelLoader;