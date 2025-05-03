import type React from "react"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"

interface AoE4ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "secondary"
  size?: "default" | "sm" | "lg"
  asChild?: boolean
}

export function AoE4Button({
  children,
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  ...props
}: AoE4ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      className={cn(
        "aoe4-button relative inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-aoe-gold disabled:pointer-events-none disabled:opacity-50",
        variant === "primary"
          ? "bg-aoe-button text-aoe-light border border-aoe-gold/50 hover:bg-aoe-button-hover"
          : "bg-aoe-dark-blue text-aoe-light border border-aoe-border hover:bg-aoe-dark-blue/80",
        size === "default" && "h-9 px-4 py-2 text-sm",
        size === "sm" && "h-7 px-3 text-xs",
        size === "lg" && "h-10 px-6 text-base",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}
