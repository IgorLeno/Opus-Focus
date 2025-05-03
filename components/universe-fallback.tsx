"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Aoe4Panel } from "./aoe4-panel"
import Link from "next/link"
import { CalendarDays, CheckSquare, Map, BarChart3, ShoppingCart, Settings } from "lucide-react"

// Types for the maps
export interface MapItem {
  id: string
  name: string
  status: "active" | "completed" | "inactive"
  progress: number
  theme: string
  position: { x: number; y: number; z: number }
  size: number
  createdAt: string
  completedAt?: string
}

interface UniverseFallbackProps {
  maps: MapItem[]
  onSelectMap: (map: MapItem) => void
}

// Fallback component that doesn't use Three.js
export default function UniverseFallback({ maps, onSelectMap }: UniverseFallbackProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Modo de compatibilidade",
        description: "Usando visualização simplificada devido a limitações do navegador.",
      })
    }, 1500)

    return () => clearTimeout(timer)
  }, [toast])

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.1, 1.5))
  }

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.1, 0.5))
  }

  const handleResetView = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#0c0c14]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <div className="text-center">
            <p className="text-lg font-medium">Carregando Universo</p>
            <p className="text-sm text-muted-foreground">Preparando visualização...</p>
          </div>
        </div>
      </div>
    )
  }

  const destinations = [
    { name: "Mapa do Dia", icon: CalendarDays, path: "/map-of-day", color: "from-yellow-600 to-yellow-800" },
    { name: "Tarefas Diárias", icon: CheckSquare, path: "/tasks", color: "from-blue-700 to-blue-900" },
    { name: "Banco de Mapas", icon: Map, path: "/maps", color: "from-green-600 to-green-800" },
    { name: "Estatísticas", icon: BarChart3, path: "/stats", color: "from-orange-600 to-orange-800" },
    { name: "Loja de Tempo", icon: ShoppingCart, path: "/store", color: "from-purple-600 to-purple-800" },
    { name: "Configurações", icon: Settings, path: "/settings", color: "from-gray-500 to-gray-700" },
  ]

  return (
    <div className="w-full h-full min-h-screen bg-blue-950 bg-[url('/images/map-background.png')] bg-cover bg-center p-4 md:p-8">
      <Aoe4Panel className="max-w-4xl mx-auto p-6">
        <h1 className="text-gold font-cinzel text-3xl mb-6 text-center">Quartel General</h1>

        <p className="text-gold/80 text-center mb-8">
          Bem-vindo ao seu centro de comando. Escolha um destino para sua jornada de conquistas.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.map((dest) => (
            <Link href={dest.path} key={dest.name} className="block">
              <div className="h-full">
                <Aoe4Panel
                  className={`h-full p-4 hover:brightness-125 transition-all duration-300 bg-gradient-to-br ${dest.color} bg-opacity-20`}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <dest.icon className="w-12 h-12 text-gold mb-3" />
                    <h3 className="text-gold font-cinzel text-lg text-center">{dest.name}</h3>
                  </div>
                </Aoe4Panel>
              </div>
            </Link>
          ))}
        </div>
      </Aoe4Panel>
    </div>
  )
}
