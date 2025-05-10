import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AoE4SidebarItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive?: boolean
  className?: string
}

export function AoE4SidebarItem({ href, icon, label, isActive = false, className }: AoE4SidebarItemProps) {
  return (
    <Link href={href} className="block">
      <div
        className={cn(
          "aoe4-sidebar-item relative w-10 h-10 flex items-center justify-center rounded-md transition-colors",
          isActive
            ? "bg-aoe-gold/20 border-2 border-aoe-gold text-aoe-gold"
            : "hover:bg-aoe-dark-blue border-2 border-transparent text-aoe-light hover:border-aoe-border",
          className,
        )}
        title={label}
      >
        {icon}
      </div>
    </Link>
  )
}
