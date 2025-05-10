"use client"

import type React from "react"

import { Volume2, VolumeX, Volume1 } from "lucide-react"
import { useSound } from "@/contexts/sound-context"
import { useState } from "react"
import { motion } from "framer-motion"

export function SoundControls() {
  const { enabled, toggleSounds, volume, adjustVolume, playSound } = useSound()
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  const handleToggle = () => {
    toggleSounds()
    playSound("buttonClick")
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    adjustVolume(newVolume)
  }

  const getVolumeIcon = () => {
    if (!enabled) return <VolumeX />
    if (volume < 0.3) return <Volume1 />
    return <Volume2 />
  }

  return (
    <div className="relative">
      <button
        className="w-10 h-10 bg-aoe-button text-aoe-gold flex items-center justify-center rounded border border-aoe-border"
        onClick={handleToggle}
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
        title={enabled ? "Desativar sons" : "Ativar sons"}
      >
        {getVolumeIcon()}
      </button>

      {showVolumeSlider && enabled && (
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-aoe-panel border border-aoe-border rounded p-3 w-32"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full accent-aoe-gold"
          />
          <div className="text-center text-xs text-aoe-gold mt-1">{Math.round(volume * 100)}%</div>
        </motion.div>
      )}
    </div>
  )
}
