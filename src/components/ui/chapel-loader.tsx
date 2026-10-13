import { cn } from "@/lib/utils";

interface ChapelLoaderProps {
  className?: string;
  label?: string;
}

const ChapelLoader = ({ className, label = "Loading" }: ChapelLoaderProps) => (
  <div
    className={cn("flex items-center justify-center gap-3 py-12 text-muted-foreground", className)}
    role="status"
    aria-live="polite"
  >
    <span className="relative flex h-12 w-12 items-center justify-center" aria-hidden="true">
      <span className="absolute inset-0 animate-spin rounded-full border-2 border-primary/20 border-t-secondary" />
      <img
        src="/lovable-uploads/cot_logo.png"
        alt=""
        className="h-7 w-7 object-contain"
      />
    </span>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export default ChapelLoader;
