"use client"

import type { Territory } from "@/types/war-room"
import { AoE4Button } from "@/components/aoe4-button"
import { Clock, Star, Shield, AlertTriangle, CheckCircle } from "lucide-react"

interface TaskDetailsProps {
  territory: Territory
  onStartTask: () => void
}

export function TaskDetails({ territory, onStartTask }: TaskDetailsProps) {
  // Determinar se o território pode ser conquistado
  const canConquer = territory.owner !== "player"

  // Determinar o status do território
  const getStatusText = () => {
    switch (territory.owner) {
      case "player":
        return "Conquistado"
      case "fog":
        return "Controlado pela Névoa"
      case "neutral":
        return "Neutro"
      default:
        return "Não conquistado"
    }
  }

  // Determinar a cor do status
  const getStatusColor = () => {
    switch (territory.owner) {
      case "player":
        return "text-green-400"
      case "fog":
        return "text-purple-400"
      case "neutral":
        return "text-gray-400"
      default:
        return "text-aoe-muted"
    }
  }

  // Determinar o ícone do status
  const getStatusIcon = () => {
    switch (territory.owner) {
      case "player":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "fog":
        return <AlertTriangle className="h-4 w-4 text-purple-400" />
      default:
        return null
    }
  }

  return (
    <div className="flex-1 p-4 flex flex-col">
      <div className="border-b border-aoe-border pb-3 mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-aoe-gold text-lg font-bold">{territory.name}</h2>
          <div className={`flex items-center ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="text-sm ml-1">{getStatusText()}</span>
          </div>
        </div>
        <p className="text-aoe-muted text-sm mt-2">{territory.description}</p>
      </div>

      {/* Detalhes da tarefa */}
      <div className="space-y-4 flex-1">
        {/* Dificuldade */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-aoe-muted">Dificuldade:</span>
          <div className="flex">
            {[...Array(territory.difficulty)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-aoe-gold" fill="currentColor" />
            ))}
            {[...Array(5 - territory.difficulty)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-aoe-muted" />
            ))}
          </div>
        </div>

        {/* Tempo estimado */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-aoe-muted">Tempo estimado:</span>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-aoe-light mr-1" />
            <span className="text-sm text-aoe-light">{territory.estimatedTime}</span>
          </div>
        </div>

        {/* Valor */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-aoe-muted">Valor:</span>
          <span className="text-sm text-aoe-gold">+{territory.value} pontos</span>
        </div>

        {/* Defesa (se for do jogador) */}
        {territory.owner === "player" && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-aoe-muted">Defesa:</span>
            <div className="flex items-center">
              <Shield className="h-4 w-4 text-blue-400 mr-1" />
              <span className="text-sm text-blue-400">{territory.defensePoints || 0}</span>
            </div>
          </div>
        )}
      </div>

      {/* Requisitos */}
      {territory.requirements && (
        <div className="mt-4 border-t border-aoe-border pt-3">
          <h3 className="text-aoe-light text-sm font-medium mb-2">Requisitos:</h3>
          <ul className="space-y-1">
            {territory.requirements.map((req, index) => (
              <li key={index} className="text-xs text-aoe-muted flex items-center">
                <div className="w-1 h-1 bg-aoe-gold rounded-full mr-2"></div>
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Botão de ação */}
      <div className="mt-6">
        {canConquer ? (
          <AoE4Button className="w-full" onClick={onStartTask}>
            Conquistar Território
          </AoE4Button>
        ) : (
          <AoE4Button variant="secondary" className="w-full" onClick={onStartTask}>
            Revisar Território
          </AoE4Button>
        )}
      </div>
    </div>
  )
}
