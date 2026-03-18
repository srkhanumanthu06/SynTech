import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  subtitle,
  highlight,
  align = "center",
  className,
}) {
  return (
    <div className={cn("mb-12 md:mb-20", align === "center" && "text-center", className)}>
      {highlight && (
        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold tracking-wider uppercase mb-4">
          {highlight}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 max-w-2xl text-lg md:text-xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
