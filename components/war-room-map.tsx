"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import type { Territory, FogAttack } from "@/types/war-room"
import { Flag, Shield, AlertTriangle, Sword, Target, Compass } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSound } from "@/contexts/sound-context"

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
  const { playSound } = useSound()
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapScale, setMapScale] = useState(1)
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [hoveredTerritory, setHoveredTerritory] = useState<string | null>(null)
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [tooltipContent, setTooltipContent] = useState<Territory | null>(null)

  // Efeito de ataque da névoa
  const [fogOpacity, setFogOpacity] = useState(0.3)
  const [fogParticles, setFogParticles] = useState<Array<{ x: number; y: number; size: number; speed: number }>>([])

  // Gerar partículas de névoa para territórios atacados
  useEffect(() => {
    if (activeFogAttack) {
      const attackedTerritory = territories.find((t) => t.id === activeFogAttack.territoryId)
      if (attackedTerritory) {
        // Tocar som de ataque
        playSound("fogAttack", { volume: 0.7 })

        // Gerar 20 partículas aleatórias ao redor do território
        const particles = Array.from({ length: 20 }, () => ({
          x: attackedTerritory.center.x + (Math.random() * 60 - 30),
          y: attackedTerritory.center.y + (Math.random() * 60 - 30),
          size: Math.random() * 5 + 2,
          speed: Math.random() * 0.5 + 0.2,
        }))
        setFogParticles(particles)
      }

      const fogPulse = setInterval(() => {
        setFogOpacity((prev) => (prev === 0.3 ? 0.5 : 0.3))
      }, 500)

      return () => {
        clearInterval(fogPulse)
        setFogParticles([])
      }
    } else {
      setFogOpacity(0.3)
      setFogParticles([])
    }
  }, [activeFogAttack, territories, playSound])

  // Animar partículas de névoa
  useEffect(() => {
    if (fogParticles.length > 0) {
      const animateParticles = setInterval(() => {
        setFogParticles((prev) =>
          prev.map((particle) => ({
            ...particle,
            x: particle.x + (Math.random() * 2 - 1) * particle.speed,
            y: particle.y + (Math.random() * 2 - 1) * particle.speed,
          })),
        )
      }, 100)

      return () => clearInterval(animateParticles)
    }
  }, [fogParticles])

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

  // Verificar se um território está adjacente a um território do jogador
  const isAdjacentToPlayer = (territory: Territory) => {
    if (territory.owner === "player") return false

    return (
      territory.connections?.some((connId) => {
        const connectedTerritory = territories.find((t) => t.id === connId)
        return connectedTerritory?.owner === "player"
      }) || false
    )
  }

  // Manipular hover em território
  const handleTerritoryHover = (territory: Territory, e: React.MouseEvent) => {
    setHoveredTerritory(territory.id)
    setShowTooltip(true)
    setTooltipContent(territory)

    // Posicionar tooltip próximo ao cursor
    const rect = mapRef.current?.getBoundingClientRect() || { left: 0, top: 0 }
    setTooltipPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 10,
    })

    // Tocar som de hover apenas se for um território diferente
    if (hoveredTerritory !== territory.id) {
      playSound("territorySelect", { volume: 0.3 })
    }
  }

  // Manipular saída do hover
  const handleTerritoryLeave = () => {
    setHoveredTerritory(null)
    setShowTooltip(false)
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-aoe-map-bg"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      ref={mapRef}
    >
      {/* Controles de zoom */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <motion.button
          className="w-10 h-10 bg-aoe-button text-aoe-gold flex items-center justify-center rounded border border-aoe-border"
          onClick={() => {
            handleZoomIn()
            playSound("buttonClick")
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Target className="w-5 h-5" />
        </motion.button>
        <motion.button
          className="w-10 h-10 bg-aoe-button text-aoe-gold flex items-center justify-center rounded border border-aoe-border"
          onClick={() => {
            handleZoomOut()
            playSound("buttonClick")
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Compass className="w-5 h-5" />
        </motion.button>
        <motion.button
          className="w-10 h-10 bg-aoe-button text-aoe-gold flex items-center justify-center rounded border border-aoe-border"
          onClick={() => {
            resetView()
            playSound("buttonClick")
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ↺
        </motion.button>
      </div>

      {/* Mapa SVG */}
      <div
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

            <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
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

            <radialGradient id="playerGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="attackGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>

            <filter id="fogFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="2" seed="1" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>

          {/* Fundo do mapa com detalhes */}
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

            {/* Linhas de grade estratégica */}
            <g className="strategic-grid" opacity="0.1">
              {[...Array(10)].map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={i * 60}
                  x2="1000"
                  y2={i * 60}
                  stroke="#a3a3a3"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
              ))}
              {[...Array(16)].map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={i * 60}
                  y1="0"
                  x2={i * 60}
                  y2="600"
                  stroke="#a3a3a3"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
              ))}
            </g>
          </g>

          {/* Conexões entre territórios */}
          <g className="connections" pointerEvents="none">
            {territories.map((territory) =>
              territory.connections?.map((connectionId) => {
                const connectedTerritory = territories.find((t) => t.id === connectionId)
                if (!connectedTerritory) return null

                const bothPlayerOwned = territory.owner === "player" && connectedTerritory.owner === "player"
                const isConquerable = territory.owner === "player" && connectedTerritory.owner !== "player"
                const isUnderAttackConnection = isUnderAttack(territory.id) || isUnderAttack(connectionId)

                return (
                  <g key={`${territory.id}-${connectionId}`}>
                    {/* Linha base */}
                    <line
                      x1={territory.center.x}
                      y1={territory.center.y}
                      x2={connectedTerritory.center.x}
                      y2={connectedTerritory.center.y}
                      stroke={
                        isUnderAttackConnection
                          ? "#ef4444"
                          : bothPlayerOwned
                            ? "#3b82f6"
                            : isConquerable
                              ? "#10b981"
                              : "#6b7280"
                      }
                      strokeWidth={bothPlayerOwned ? 3 : isConquerable ? 2 : 1}
                      strokeOpacity={bothPlayerOwned ? 0.8 : isConquerable ? 0.6 : 0.3}
                      strokeDasharray={bothPlayerOwned ? "" : isConquerable ? "5,3" : "5,5"}
                    />

                    {/* Efeito de fluxo para conexões do jogador */}
                    {bothPlayerOwned && (
                      <line
                        x1={territory.center.x}
                        y1={territory.center.y}
                        x2={connectedTerritory.center.x}
                        y2={connectedTerritory.center.y}
                        stroke="#60a5fa"
                        strokeWidth="1"
                        strokeOpacity="0.8"
                        strokeDasharray="3,15"
                        className="animate-flow"
                      />
                    )}

                    {/* Efeito de ataque para conexões sob ataque */}
                    {isUnderAttackConnection && (
                      <line
                        x1={territory.center.x}
                        y1={territory.center.y}
                        x2={connectedTerritory.center.x}
                        y2={connectedTerritory.center.y}
                        stroke="#ef4444"
                        strokeWidth="2"
                        strokeOpacity="0.8"
                        strokeDasharray="3,5"
                        className="animate-attack-pulse"
                      />
                    )}
                  </g>
                )
              }),
            )}
          </g>

          {/* Territórios */}
          <g className="territories">
            {territories.map((territory) => {
              const isSelected = territory.id === selectedTerritory
              const isHovered = territory.id === hoveredTerritory
              const isAttacked = isUnderAttack(territory.id)
              const isAdjacent = isAdjacentToPlayer(territory)
              const fillColor = getTerritoryColor(territory)

              return (
                <g key={territory.id}>
                  {/* Forma do território */}
                  <path
                    d={territory.path}
                    fill={fillColor}
                    fillOpacity={isAttacked ? fogOpacity : isHovered ? 0.85 : 0.7}
                    stroke={
                      isSelected
                        ? "#f59e0b"
                        : isHovered
                          ? "#f97316"
                          : isAdjacent && territory.owner !== "player"
                            ? "#10b981"
                            : "#374151"
                    }
                    strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
                    filter={isSelected || isHovered ? "url(#dropShadow)" : ""}
                    onMouseEnter={(e) => handleTerritoryHover(territory, e)}
                    onMouseLeave={handleTerritoryLeave}
                    onClick={() => {
                      playSound("buttonClick")
                      onSelectTerritory(territory.id)
                    }}
                    className={`cursor-pointer transition-all duration-300 hover:brightness-110 ${
                      isAttacked ? "animate-pulse-slow" : ""
                    } ${territory.owner === "player" ? "territory-player" : ""}`}
                  />

                  {/* Padrão para territórios não conquistados */}
                  {territory.owner === "none" && (
                    <path d={territory.path} fill="url(#diagonalHatch)" fillOpacity="0.5" pointerEvents="none" />
                  )}

                  {/* Efeito de brilho para territórios do jogador */}
                  {territory.owner === "player" && (
                    <path
                      d={territory.path}
                      fill="url(#playerGradient)"
                      fillOpacity="0.3"
                      filter="url(#glow)"
                      className="animate-pulse-very-slow"
                      pointerEvents="none"
                    />
                  )}

                  {/* Efeito de névoa para territórios da névoa */}
                  {territory.owner === "fog" && (
                    <path
                      d={territory.path}
                      fill="url(#fogGradient)"
                      fillOpacity="0.4"
                      filter="url(#fogFilter)"
                      className="animate-fog"
                      pointerEvents="none"
                    />
                  )}

                  {/* Ícone do território */}
                  <g
                    transform={`translate(${territory.center.x}, ${territory.center.y})`}
                    pointerEvents="none"
                    className={
                      isHovered ? "scale-125 transition-transform duration-300" : "transition-transform duration-300"
                    }
                  >
                    {/* Círculo de fundo */}
                    <circle
                      r="18"
                      fill={
                        territory.owner === "player" ? "#1e3a8a" : territory.owner === "fog" ? "#581c87" : "#374151"
                      }
                      stroke={isSelected ? "#f59e0b" : "#d1d5db"}
                      strokeWidth={isSelected ? "2" : "1"}
                      className={isHovered ? "animate-pulse-slow" : ""}
                    />

                    {/* Ícone baseado no tipo */}
                    <foreignObject x="-10" y="-10" width="20" height="20">
                      <div className="w-full h-full flex items-center justify-center text-white">
                        {territory.owner === "player" ? (
                          <Flag className="w-4 h-4" />
                        ) : territory.owner === "fog" ? (
                          <AlertTriangle className="w-4 h-4" />
                        ) : isAdjacent ? (
                          <Sword className="w-4 h-4" />
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-gray-400" />
                        )}
                      </div>
                    </foreignObject>
                  </g>

                  {/* Nome do território */}
                  <text
                    x={territory.center.x}
                    y={territory.center.y + 35}
                    textAnchor="middle"
                    fill={isHovered ? "#f8fafc" : "#e5e7eb"}
                    fontSize={isHovered ? "12" : "10"}
                    fontWeight="bold"
                    pointerEvents="none"
                    className="territory-name"
                    filter={isHovered ? "url(#dropShadow)" : ""}
                  >
                    {territory.name}
                  </text>

                  {/* Indicador de defesa para territórios do jogador */}
                  {territory.owner === "player" && territory.defensePoints && (
                    <g
                      transform={`translate(${territory.center.x + 25}, ${territory.center.y - 10})`}
                      pointerEvents="none"
                      className={
                        isHovered ? "scale-125 transition-transform duration-300" : "transition-transform duration-300"
                      }
                    >
                      <circle r="10" fill="#1e3a8a" stroke="#d1d5db" strokeWidth="1" />
                      <foreignObject x="-6" y="-6" width="12" height="12">
                        <div className="w-full h-full flex items-center justify-center">
                          <Shield className="w-3 h-3 text-white" />
                        </div>
                      </foreignObject>
                      <text x="12" y="4" textAnchor="start" fill="#e5e7eb" fontSize="10" fontWeight="bold">
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
                        r="50"
                        fill="url(#attackGradient)"
                        className="animate-pulse-slow"
                        pointerEvents="none"
                      />

                      {/* Timer visual */}
                      <g
                        transform={`translate(${territory.center.x}, ${territory.center.y - 45})`}
                        pointerEvents="none"
                      >
                        <rect
                          x="-40"
                          y="-10"
                          width="80"
                          height="20"
                          rx="5"
                          fill="rgba(0,0,0,0.7)"
                          stroke="#ef4444"
                          strokeWidth="1"
                        />
                        <rect
                          x="-38"
                          y="-8"
                          width={`${((activeFogAttack?.timeRemaining || 0) / 30) * 76}px`}
                          height="16"
                          rx="3"
                          fill="#ef4444"
                          className="transition-all duration-1000 ease-linear"
                        />
                        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                          {activeFogAttack?.timeRemaining || 0}s
                        </text>
                      </g>

                      <text
                        x={territory.center.x}
                        y={territory.center.y - 65}
                        textAnchor="middle"
                        fill="#f87171"
                        fontSize="14"
                        fontWeight="bold"
                        className="animate-pulse"
                        pointerEvents="none"
                        filter="url(#dropShadow)"
                      >
                        SOB ATAQUE!
                      </text>
                    </>
                  )}
                </g>
              )
            })}
          </g>

          {/* Partículas de névoa */}
          {fogParticles.map((particle, index) => (
            <circle
              key={`fog-particle-${index}`}
              cx={particle.x}
              cy={particle.y}
              r={particle.size}
              fill="#7e22ce"
              fillOpacity="0.5"
              className="animate-float"
            />
          ))}
        </svg>
      </div>

      {/* Tooltip para território */}
      <AnimatePresence>
        {showTooltip && tooltipContent && (
          <motion.div
            className="absolute z-20 bg-gray-900/90 border border-aoe-gold rounded-md p-3 shadow-lg max-w-xs pointer-events-none"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              transform: "translate(-50%, -100%)",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-aoe-gold font-bold text-sm">{tooltipContent.name}</h3>
            <p className="text-gray-300 text-xs mt-1">{tooltipContent.description}</p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
              <div className="flex items-center text-xs text-gray-300">
                <span className="text-aoe-gold mr-1">Status:</span>
                <span
                  className={
                    tooltipContent.owner === "player"
                      ? "text-blue-400"
                      : tooltipContent.owner === "fog"
                        ? "text-purple-400"
                        : "text-gray-400"
                  }
                >
                  {tooltipContent.owner === "player"
                    ? "Conquistado"
                    : tooltipContent.owner === "fog"
                      ? "Névoa"
                      : tooltipContent.owner === "neutral"
                        ? "Neutro"
                        : "Não conquistado"}
                </span>
              </div>

              <div className="flex items-center text-xs text-gray-300">
                <span className="text-aoe-gold mr-1">Dificuldade:</span>
                <span>{"⭐".repeat(tooltipContent.difficulty)}</span>
              </div>

              <div className="flex items-center text-xs text-gray-300">
                <span className="text-aoe-gold mr-1">Tempo:</span>
                <span>{tooltipContent.estimatedTime}</span>
              </div>

              <div className="flex items-center text-xs text-gray-300">
                <span className="text-aoe-gold mr-1">Valor:</span>
                <span>+{tooltipContent.value} pts</span>
              </div>

              {isUnderAttack(tooltipContent.id) && (
                <div className="col-span-2 mt-1 text-xs text-red-400 font-bold">
                  ⚠️ Sob ataque! {activeFogAttack?.timeRemaining}s para defender
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
