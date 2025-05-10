"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useSoundEffects, type SoundEvent } from "@/hooks/use-sound-effects"

interface SoundContextType {
  playSound: (event: SoundEvent, options?: { volume?: number; loop?: boolean }) => void
  stopAllSounds: () => void
  toggleSounds: () => void
  adjustVolume: (volume: number) => void
  enabled: boolean
  volume: number
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: ReactNode }) {
  const soundEffects = useSoundEffects()

  return <SoundContext.Provider value={soundEffects}>{children}</SoundContext.Provider>
}

export function useSound() {
  const context = useContext(SoundContext)
  if (context === undefined) {
    throw new Error("useSound must be used within a SoundProvider")
  }
  return context
}
