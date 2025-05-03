import type React from "react"
import { cn } from "@/lib/utils"

interface AoE4PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function AoE4Panel({ children, className, ...props }: AoE4PanelProps) {
  return (
    <div
      className={cn("aoe4-panel bg-aoe-panel border border-aoe-border rounded-md overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  )
}
