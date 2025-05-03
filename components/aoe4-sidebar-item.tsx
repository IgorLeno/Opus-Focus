import type React from "react"
import { cn } from "@/lib/utils"

interface AoE4SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  active?: boolean
}

export function AoE4SidebarItem({ children, className, active = false, ...props }: AoE4SidebarItemProps) {
  return (
    <div
      className={cn(
        "aoe4-sidebar-item relative px-3 py-2 cursor-pointer transition-colors",
        active
          ? "bg-aoe-gold/20 border-l-4 border-aoe-gold text-aoe-gold"
          : "hover:bg-aoe-dark-blue border-l-4 border-transparent text-aoe-light hover:border-aoe-border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
