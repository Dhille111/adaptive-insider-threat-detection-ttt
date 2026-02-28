import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  variant?: "default" | "success" | "warning" | "threat";
}

const variantStyles = {
  default: "border-border",
  success: "border-success/30",
  warning: "border-warning/30",
  threat: "border-threat/30",
};

const iconBgStyles = {
  default: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  threat: "bg-threat/10 text-threat",
};

export function MetricCard({ title, value, subtitle, icon, trend, trendValue, variant = "default" }: MetricCardProps) {
  return (
    <div className={cn("bg-card rounded-lg border p-5 card-hover", variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1 font-mono">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          {trend && trendValue && (
            <p className={cn("text-xs mt-2 font-medium", trend === "up" ? "text-success" : trend === "down" ? "text-threat" : "text-muted-foreground")}>
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
            </p>
          )}
        </div>
        <div className={cn("p-2.5 rounded-lg", iconBgStyles[variant])}>
          {icon}
        </div>
      </div>
    </div>
  );
}
