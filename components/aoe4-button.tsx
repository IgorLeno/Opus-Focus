import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AoE4ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  href?: string
  children: React.ReactNode
}

export function AoE4Button({
  variant = "primary",
  size = "default",
  href,
  className,
  children,
  ...props
}: AoE4ButtonProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aoe-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    {
      "bg-aoe-gold hover:bg-aoe-gold/90 text-[#0a1929] font-bold": variant === "primary", // Dark text on gold background
      "bg-aoe-button hover:bg-aoe-button-hover text-aoe-light border border-aoe-border": variant === "secondary",
      "border border-aoe-gold bg-transparent hover:bg-aoe-gold/10 text-aoe-gold": variant === "outline",
      "bg-transparent hover:bg-aoe-dark-blue/50 text-aoe-light": variant === "ghost",
      "h-10 px-4 py-2 rounded-md text-sm": size === "default",
      "h-8 px-3 py-1 rounded-md text-xs": size === "sm",
      "h-12 px-6 py-3 rounded-md text-base": size === "lg",
      "h-10 w-10 rounded-full p-0": size === "icon",
    },
    className,
  )

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        <span className="z-10 relative text-current">{children}</span>
      </Link>
    )
  }

  return (
    <button className={baseStyles} {...props}>
      <span className="z-10 relative text-current">{children}</span>
    </button>
  )
}

// Add the alternative export name to support both naming conventions
export const Aoe4Button = AoE4Button
