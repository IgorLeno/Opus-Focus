"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useSound } from "@/contexts/sound-context"
import { Volume2, VolumeX } from "lucide-react"

interface AmbientSoundsProps {
  scene?: "warRoom" | "map" | "headquarters" | "universe"
}

export function AmbientSoundsWebAudio({ scene = "warRoom" }: AmbientSoundsProps) {
  const { enabled } = useSound()
  const [ambientEnabled, setAmbientEnabled] = useState(true)
  const [ambientVolume, setAmbientVolume] = useState(0.2)
  const [isLoaded, setIsLoaded] = useState(false)

  // Refs para Web Audio API
  const audioContextRef = useRef<AudioContext | null>(null)
  const audioBufferRef = useRef<AudioBuffer | null>(null)
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const isPlayingRef = useRef<boolean>(false)

  // Mapear cenas para arquivos de áudio
  const sceneAudioMap: Record<string, string> = {
    warRoom: "/sounds/ambient-war-room.mp3",
    map: "/sounds/ambient-map.mp3",
    headquarters: "/sounds/ambient-headquarters.mp3",
    universe: "/sounds/ambient-universe.mp3",
  }

  // Inicializar o contexto de áudio e carregar o buffer
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

    // Criar contexto de áudio
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContext) {
      console.error("Web Audio API não suportada neste navegador")
      return
    }

    const context = new AudioContext()
    audioContextRef.current = context

    // Criar nó de ganho para controle de volume
    const gainNode = context.createGain()
    gainNode.gain.value = ambientVolume
    gainNode.connect(context.destination)
    gainNodeRef.current = gainNode

    // Carregar o arquivo de áudio
    fetch(sceneAudioMap[scene])
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        audioBufferRef.current = audioBuffer
        setIsLoaded(true)
      })
      .catch((error) => {
        console.error("Erro ao carregar arquivo de áudio:", error)
      })

    return () => {
      // Limpar ao desmontar
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop()
        sourceNodeRef.current.disconnect()
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect()
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close()
      }
    }
  }, [scene, sceneAudioMap])

  // Função para iniciar a reprodução
  const startPlayback = () => {
    if (!isLoaded || !audioContextRef.current || !audioBufferRef.current || !gainNodeRef.current) return

    // Se já estiver tocando, não fazer nada
    if (isPlayingRef.current) return

    try {
      // Retomar o contexto se estiver suspenso
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume()
      }

      // Criar novo nó de fonte
      const sourceNode = audioContextRef.current.createBufferSource()
      sourceNode.buffer = audioBufferRef.current
      sourceNode.loop = true
      sourceNode.connect(gainNodeRef.current)

      // Iniciar reprodução
      sourceNode.start(0)
      sourceNodeRef.current = sourceNode
      isPlayingRef.current = true

      // Configurar callback quando a reprodução terminar
      sourceNode.onended = () => {
        isPlayingRef.current = false
      }
    } catch (error) {
      console.error("Erro ao iniciar reprodução:", error)
    }
  }

  // Função para parar a reprodução
  const stopPlayback = () => {
    if (!isPlayingRef.current || !sourceNodeRef.current) return

    try {
      sourceNodeRef.current.stop()
      sourceNodeRef.current.disconnect()
      sourceNodeRef.current = null
      isPlayingRef.current = false
    } catch (error) {
      console.error("Erro ao parar reprodução:", error)
    }
  }

  // Gerenciar a reprodução quando as configurações mudarem
  useEffect(() => {
    if (!isLoaded) return

    if (enabled && ambientEnabled) {
      startPlayback()
    } else {
      stopPlayback()
    }
  }, [enabled, ambientEnabled, isLoaded])

  // Atualizar volume quando mudar
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = ambientVolume
    }
  }, [ambientVolume])

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
    // Se for a primeira interação do usuário, pode ser necessário retomar o contexto de áudio
    if (audioContextRef.current && audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume()
    }

    setAmbientEnabled((prev) => !prev)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setAmbientVolume(newVolume)
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
