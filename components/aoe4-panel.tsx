import type React from "react"
import { cn } from "@/lib/utils"

interface AoE4PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gold" | "dark"
  children: React.ReactNode
}

export function AoE4Panel({ variant = "default", className, children, ...props }: AoE4PanelProps) {
  return (
    <div
      className={cn(
        "aoe4-panel relative overflow-hidden",
        {
          "border-2 border-aoe-border": variant === "default",
          "border-2 border-aoe-gold": variant === "gold",
          "border-2 border-aoe-dark-blue bg-aoe-dark-blue/80": variant === "dark",
        },
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-[url('/images/aoe4/panel-background.jpg')] bg-cover bg-center opacity-10 pointer-events-none"></div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Add the alternative export name to support both naming conventions
export const Aoe4Panel = AoE4Panel
