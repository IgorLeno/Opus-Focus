import type React from "react"

export function ThemeAssets() {
  return null // Este componente é apenas para organizar os assets, não renderiza nada
}

// Exportando constantes para uso em toda a aplicação
export const AOE4_ASSETS = {
  backgrounds: {
    main: "/images/aoe4/background-texture.jpg",
    panel: "/images/aoe4/panel-background.jpg",
    map: "/images/aoe4/map-background.jpg",
    parchment: "/images/aoe4/parchment-texture.jpg",
  },
  borders: {
    gold: "/images/aoe4/gold-border.png",
    panel: "/images/aoe4/panel-border.png",
  },
  icons: {
    loading: "/images/aoe4/loading-compass.svg",
  },
  sounds: {
    click: "/sounds/aoe4/button-click.mp3",
    complete: "/sounds/aoe4/task-complete.mp3",
  },
}

// Componente de carregamento temático
export function AoE4Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className="w-16 h-16 border-4 border-aoe-gold border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-aoe-gold font-cinzel text-lg">Preparando o campo de batalha...</p>
    </div>
  )
}

// Componente de fundo temático para mapas
export function MapBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-lg overflow-hidden border-2 border-aoe-border">
      <div className="absolute inset-0 bg-aoe-map-bg opacity-30"></div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
