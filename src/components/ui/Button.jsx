import { cn } from "@/lib/utils";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary text-background hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] focus:ring-primary",
    secondary: "bg-secondary text-white hover:bg-secondary/90 hover:shadow-[0_0_15px_rgba(129,140,248,0.5)] focus:ring-secondary",
    outline: "border border-white/20 bg-transparent text-white hover:bg-white/5 hover:border-white/40 focus:ring-white",
    ghost: "bg-transparent text-gray-300 hover:text-white hover:bg-white/5 focus:ring-gray-300",
  };
  
  const sizes = {
    sm: "h-9 px-4 text-xs",
    md: "h-11 px-6 text-sm",
    lg: "h-14 px-8 text-base",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
