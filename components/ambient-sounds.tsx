"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useSound } from "@/contexts/sound-context"
import { Volume2, VolumeX } from "lucide-react"

interface AmbientSoundsProps {
  scene?: "warRoom" | "map" | "headquarters" | "universe"
}

export function AmbientSounds({ scene = "warRoom" }: AmbientSoundsProps) {
  const { enabled } = useSound()
  const [ambientEnabled, setAmbientEnabled] = useState(true)
  const [ambientVolume, setAmbientVolume] = useState(0.2)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const initialPlayAttemptedRef = useRef(false)

  // Mapear cenas para arquivos de áudio
  const sceneAudioMap: Record<string, string> = {
    warRoom: "/sounds/ambient-war-room.mp3",
    map: "/sounds/ambient-map.mp3",
    headquarters: "/sounds/ambient-headquarters.mp3",
    universe: "/sounds/ambient-universe.mp3",
  }

  // Inicializar o áudio apenas uma vez na montagem do componente
  useEffect(() => {
    if (typeof window === "undefined") return

    // Verificar preferências salvas
    const savedAmbientEnabled = localStorage.getItem("ambientEnabled")
    if (savedAmbientEnabled !== null) {
      setAmbientEnabled(savedAmbientEnabled === "true")
    }

    const savedAmbientVolume = localStorage.getItem("ambientVolume")
    if (savedAmbientVolume !== null) {
      setAmbientVolume(Number.parseFloat(savedAmbientVolume))
    }

    // Criar elemento de áudio
    const audioElement = new Audio(sceneAudioMap[scene])
    audioElement.loop = true
    audioElement.volume = ambientVolume
    audioElement.preload = "auto"

    // Configurar eventos
    audioElement.addEventListener("canplaythrough", () => {
      setIsLoaded(true)
    })

    audioElement.addEventListener("play", () => {
      setIsPlaying(true)
    })

    audioElement.addEventListener("pause", () => {
      setIsPlaying(false)
    })

    audioRef.current = audioElement

    // Limpar ao desmontar
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current.remove()
        audioRef.current = null
      }
    }
  }, [scene, sceneAudioMap])

  // Gerenciar a reprodução do áudio quando as configurações mudarem
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !isLoaded) return

    // Atualizar volume
    audio.volume = ambientVolume

    // Gerenciar reprodução
    if (enabled && ambientEnabled && !isPlaying) {
      // Usar setTimeout para evitar chamadas rápidas de play/pause
      const timer = setTimeout(() => {
        try {
          // Usar uma Promise para lidar com a reprodução de forma segura
          const playPromise = audio.play()
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.error("Erro ao reproduzir som ambiente:", error)
              // Se falhar devido à política de autoplay, marcar para tentar novamente após interação
              initialPlayAttemptedRef.current = true
            })
          }
        } catch (error) {
          console.error("Erro ao tentar reproduzir áudio:", error)
        }
      }, 100)

      return () => clearTimeout(timer)
    } else if ((!enabled || !ambientEnabled) && isPlaying) {
      // Usar setTimeout para evitar chamadas rápidas de play/pause
      const timer = setTimeout(() => {
        try {
          audio.pause()
        } catch (error) {
          console.error("Erro ao tentar pausar áudio:", error)
        }
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [enabled, ambientEnabled, ambientVolume, isLoaded, isPlaying])

  // Salvar preferências
  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.setItem("ambientEnabled", ambientEnabled.toString())
  }, [ambientEnabled])

  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.setItem("ambientVolume", ambientVolume.toString())
  }, [ambientVolume])

  const toggleAmbient = () => {
    // Se for a primeira interação do usuário e o áudio não começou devido à política de autoplay
    if (initialPlayAttemptedRef.current && !isPlaying && ambientEnabled) {
      const audio = audioRef.current
      if (audio) {
        try {
          audio.play().catch((error) => {
            console.error("Erro ao reproduzir após interação:", error)
          })
        } catch (error) {
          console.error("Erro ao tentar reproduzir após interação:", error)
        }
      }
      initialPlayAttemptedRef.current = false
    }

    setAmbientEnabled((prev) => !prev)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setAmbientVolume(newVolume)

    const audio = audioRef.current
    if (audio) {
      audio.volume = newVolume
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        className="flex items-center justify-center text-aoe-gold text-xs gap-1 px-2 py-1 rounded border border-aoe-border bg-aoe-button hover:bg-aoe-button/80"
        onClick={toggleAmbient}
        title={ambientEnabled ? "Desativar som ambiente" : "Ativar som ambiente"}
      >
        {ambientEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
        <span>Ambiente</span>
      </button>
      {ambientEnabled && (
        <input
          type="range"
          min="0"
          max="0.5"
          step="0.01"
          value={ambientVolume}
          onChange={handleVolumeChange}
          className="w-20 accent-aoe-gold"
        />
      )}
    </div>
  )
}
