"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import type { Territory, FogAttack } from "@/types/war-room"
import { Flag, Shield, AlertTriangle } from "lucide-react"

interface WarRoomMapProps {
  territories: Territory[]
  selectedTerritory: string | undefined
  activeFogAttack: FogAttack | null
  onSelectTerritory: (territoryId: string) => void
  onStartTask: (territoryId: string) => void
}

export function WarRoomMap({
  territories,
  selectedTerritory,
  activeFogAttack,
  onSelectTerritory,
  onStartTask,
}: WarRoomMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapScale, setMapScale] = useState(1)
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Efeito de ataque da névoa
  const [fogOpacity, setFogOpacity] = useState(0.3)

  useEffect(() => {
    if (activeFogAttack) {
      const fogPulse = setInterval(() => {
        setFogOpacity((prev) => (prev === 0.3 ? 0.5 : 0.3))
      }, 500)

      return () => clearInterval(fogPulse)
    } else {
      setFogOpacity(0.3)
    }
  }, [activeFogAttack])

  // Funções para zoom e pan
  const handleZoomIn = () => {
    setMapScale((prev) => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setMapScale((prev) => Math.max(prev - 0.1, 0.5))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      // Botão esquerdo
      setIsDragging(true)
      setDragStart({
        x: e.clientX - mapPosition.x,
        y: e.clientY - mapPosition.y,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setMapPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const resetView = () => {
    setMapScale(1)
    setMapPosition({ x: 0, y: 0 })
  }

  // Obter cor do território com base no proprietário
  const getTerritoryColor = (territory: Territory) => {
    switch (territory.owner) {
      case "player":
        return "#3b82f6" // Azul para o jogador
      case "fog":
        return "#7e22ce" // Roxo para a névoa
      case "neutral":
        return "#6b7280" // Cinza para neutro
      default:
        return "#d1d5db" // Cinza claro para não conquistado
    }
  }

  // Verificar se um território está sob ataque
  const isUnderAttack = (territoryId: string) => {
    return activeFogAttack?.territoryId === territoryId
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-aoe-map-bg"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Controles de zoom */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          className="w-8 h-8 bg-aoe-button text-aoe-gold flex items-center justify-center rounded border border-aoe-border"
          onClick={handleZoomIn}
        >
          +
        </button>
        <button
          className="w-8 h-8 bg-aoe-button text-aoe-gold flex items-center justify-center rounded border border-aoe-border"
          onClick={handleZoomOut}
        >
          -
        </button>
        <button
          className="w-8 h-8 bg-aoe-button text-aoe-gold flex items-center justify-center rounded border border-aoe-border"
          onClick={resetView}
        >
          ↺
        </button>
      </div>

      {/* Mapa SVG */}
      <div
        ref={mapRef}
        className="w-full h-full"
        style={{
          transform: `scale(${mapScale}) translate(${mapPosition.x / mapScale}px, ${mapPosition.y / mapScale}px)`,
          transformOrigin: "center",
          transition: isDragging ? "none" : "transform 0.2s ease-out",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
          {/* Definições de filtros e gradientes */}
          <defs>
            <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="2" dy="2" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <pattern
              id="diagonalHatch"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="8" stroke="#000" strokeWidth="1" strokeOpacity="0.2" />
            </pattern>

            <radialGradient id="fogGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#7e22ce" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#7e22ce" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Fundo do mapa com detalhes */}
          <rect x="0" y="0" width="1000" height="600" fill="#1f2937" />

          {/* Detalhes do terreno */}
          <g className="terrain-details">
            {/* Água */}
            <path d="M0,100 Q250,150 500,50 T1000,150 V600 H0 Z" fill="#1e40af" fillOpacity="0.3" />

            {/* Montanhas */}
            <g transform="translate(700, 100)">
              <path d="M0,100 L30,20 L60,90 L90,0 L120,110 Z" fill="#4b5563" />
              <path d="M20,100 L50,40 L80,110 Z" fill="#6b7280" />
            </g>

            {/* Florestas (círculos representando árvores) */}
            <g transform="translate(100, 400)">
              {[...Array(20)].map((_, i) => (
                <circle
                  key={i}
                  cx={Math.random() * 100}
                  cy={Math.random() * 100}
                  r={Math.random() * 5 + 2}
                  fill="#065f46"
                />
              ))}
            </g>
          </g>

          {/* Territórios */}
          <g className="territories">
            {territories.map((territory) => {
              const isSelected = territory.id === selectedTerritory
              const isAttacked = isUnderAttack(territory.id)
              const fillColor = getTerritoryColor(territory)

              return (
                <g key={territory.id}>
                  {/* Forma do território */}
                  <path
                    d={territory.path}
                    fill={fillColor}
                    fillOpacity={isAttacked ? fogOpacity : 0.7}
                    stroke={isSelected ? "#f59e0b" : "#374151"}
                    strokeWidth={isSelected ? 3 : 1}
                    filter={isSelected ? "url(#dropShadow)" : ""}
                    onClick={() => onSelectTerritory(territory.id)}
                    className="cursor-pointer transition-all duration-300 hover:brightness-110"
                  />

                  {/* Padrão para territórios não conquistados */}
                  {territory.owner === "none" && (
                    <path d={territory.path} fill="url(#diagonalHatch)" fillOpacity="0.5" pointerEvents="none" />
                  )}

                  {/* Ícone do território */}
                  <g transform={`translate(${territory.center.x}, ${territory.center.y})`} pointerEvents="none">
                    {/* Círculo de fundo */}
                    <circle
                      r="15"
                      fill={
                        territory.owner === "player" ? "#1e3a8a" : territory.owner === "fog" ? "#581c87" : "#374151"
                      }
                      stroke="#d1d5db"
                      strokeWidth="1"
                    />

                    {/* Ícone baseado no tipo */}
                    <foreignObject x="-8" y="-8" width="16" height="16">
                      <div className="w-full h-full flex items-center justify-center text-white">
                        {territory.owner === "player" ? (
                          <Flag className="w-3 h-3" />
                        ) : territory.owner === "fog" ? (
                          <AlertTriangle className="w-3 h-3" />
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-gray-400" />
                        )}
                      </div>
                    </foreignObject>
                  </g>

                  {/* Nome do território */}
                  <text
                    x={territory.center.x}
                    y={territory.center.y + 30}
                    textAnchor="middle"
                    fill="#e5e7eb"
                    fontSize="10"
                    fontWeight="bold"
                    pointerEvents="none"
                  >
                    {territory.name}
                  </text>

                  {/* Indicador de defesa para territórios do jogador */}
                  {territory.owner === "player" && territory.defensePoints && (
                    <g
                      transform={`translate(${territory.center.x + 20}, ${territory.center.y - 10})`}
                      pointerEvents="none"
                    >
                      <circle r="8" fill="#1e3a8a" stroke="#d1d5db" strokeWidth="1" />
                      <foreignObject x="-6" y="-6" width="12" height="12">
                        <div className="w-full h-full flex items-center justify-center">
                          <Shield className="w-2 h-2 text-white" />
                        </div>
                      </foreignObject>
                      <text x="10" y="3" textAnchor="start" fill="#e5e7eb" fontSize="8" fontWeight="bold">
                        {territory.defensePoints}
                      </text>
                    </g>
                  )}

                  {/* Indicador de ataque da névoa */}
                  {isAttacked && (
                    <>
                      <circle
                        cx={territory.center.x}
                        cy={territory.center.y}
                        r="40"
                        fill="url(#fogGradient)"
                        className="animate-pulse-slow"
                        pointerEvents="none"
                      />
                      <text
                        x={territory.center.x}
                        y={territory.center.y - 30}
                        textAnchor="middle"
                        fill="#f87171"
                        fontSize="12"
                        fontWeight="bold"
                        className="animate-pulse"
                        pointerEvents="none"
                      >
                        SOB ATAQUE!
                      </text>
                    </>
                  )}
                </g>
              )
            })}
          </g>

          {/* Conexões entre territórios */}
          <g className="connections" pointerEvents="none">
            {territories.map((territory) =>
              territory.connections?.map((connectionId) => {
                const connectedTerritory = territories.find((t) => t.id === connectionId)
                if (!connectedTerritory) return null

                const bothPlayerOwned = territory.owner === "player" && connectedTerritory.owner === "player"

                return (
                  <line
                    key={`${territory.id}-${connectionId}`}
                    x1={territory.center.x}
                    y1={territory.center.y}
                    x2={connectedTerritory.center.x}
                    y2={connectedTerritory.center.y}
                    stroke={bothPlayerOwned ? "#3b82f6" : "#6b7280"}
                    strokeWidth={bothPlayerOwned ? 2 : 1}
                    strokeOpacity={bothPlayerOwned ? 0.8 : 0.3}
                    strokeDasharray={bothPlayerOwned ? "" : "5,5"}
                  />
                )
              }),
            )}
          </g>
        </svg>
      </div>
    </div>
  )
}
