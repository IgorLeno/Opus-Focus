"use client"

import { Trophy, Star, ArrowRight } from "lucide-react"
import { AoE4Button } from "@/components/aoe4-button"

interface VictoryModalProps {
  resources: {
    focus: number
    recreation: number
    mood: number
  }
  completedMissions: number
  totalMissions: number
  onClose: () => void
}

export function VictoryModal({ resources, completedMissions, totalMissions, onClose }: VictoryModalProps) {
  // Calcular pontuação
  const calculateScore = () => {
    const baseScore = resources.focus + resources.recreation + resources.mood
    const missionBonus = (completedMissions / totalMissions) * 100
    return Math.round(baseScore + missionBonus)
  }

  // Determinar classificação
  const getRank = () => {
    const score = calculateScore()
    if (score >= 250) return "S"
    if (score >= 200) return "A"
    if (score >= 150) return "B"
    if (score >= 100) return "C"
    return "D"
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-aoe-panel border border-aoe-border rounded-md w-full max-w-md p-0 shadow-xl">
        <div className="bg-gradient-to-r from-yellow-900/50 to-amber-700/30 p-4 flex items-center justify-center border-b border-aoe-border">
          <Trophy className="h-8 w-8 text-yellow-400 mr-3" />
          <h2 className="text-2xl font-bold text-aoe-gold">Vitória!</h2>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-aoe-light text-lg">Você conquistou todos os territórios e completou suas missões!</p>
            <p className="text-aoe-muted text-sm mt-2">A Névoa da Distração foi derrotada... por hoje.</p>
          </div>

          <div className="bg-aoe-dark-blue/50 border border-aoe-border rounded-md p-4 mb-6">
            <h3 className="text-aoe-gold font-bold text-center mb-4">Resultados</h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-aoe-muted">Foco Restante:</span>
                <span className="text-blue-400 font-bold">{resources.focus}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-aoe-muted">Pontos Recreativos:</span>
                <span className="text-green-400 font-bold">{resources.recreation}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-aoe-muted">Humor Final:</span>
                <span className="text-yellow-400 font-bold">{resources.mood}%</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-aoe-muted">Missões Completadas:</span>
                <span className="text-purple-400 font-bold">
                  {completedMissions}/{totalMissions}
                </span>
              </div>

              <div className="border-t border-aoe-border pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-aoe-light font-bold">Pontuação Total:</span>
                  <span className="text-aoe-gold font-bold text-xl">{calculateScore()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="text-center mb-2">
              <span className="text-aoe-muted text-sm">Classificação:</span>
            </div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-600 to-amber-800 flex items-center justify-center border-4 border-yellow-500">
              <span className="text-4xl font-bold text-white">{getRank()}</span>
            </div>
            <div className="flex mt-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${i < "SABCD".indexOf(getRank()) ? "text-aoe-muted" : "text-yellow-400"}`}
                  fill={i < "SABCD".indexOf(getRank()) ? "none" : "currentColor"}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <AoE4Button className="px-8 flex items-center" onClick={onClose}>
              <span>Continuar</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </AoE4Button>
          </div>
        </div>
      </div>
    </div>
  )
}
