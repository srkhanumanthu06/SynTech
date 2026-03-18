import { cn } from "@/lib/utils";

export function Card({ children, className, hoverEffect = true }) {
  return (
    <div
      className={cn(
        "relative p-8 rounded-2xl bg-card-bg border border-glass-border backdrop-blur-sm overflow-hidden group transition-all duration-300",
        hoverEffect && "hover:border-primary/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:-translate-y-1",
        className
      )}
    >
      {/* Background Hover Glow */}
      {hoverEffect && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
