import { cn } from "@/lib/utils";

interface ChapelLoaderProps {
  className?: string;
  label?: string;
  compact?: boolean;
}

const ChapelLoader = ({ className, label = "Loading", compact = false }: ChapelLoaderProps) => {
  if (!label) return null;

  return (
    <span
      className={cn(
        "flex items-center justify-center text-sm font-medium text-muted-foreground",
        compact ? "py-0" : "py-12",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      {label}
    </span>
  );
};

export default ChapelLoader;