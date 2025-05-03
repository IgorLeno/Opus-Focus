"use client"

import type { Territory, FogAttack } from "@/types/war-room"
import { AoE4Button } from "@/components/aoe4-button"
import { AlertTriangle, Shield, Brain, Coffee } from "lucide-react"

interface FogAttackModalProps {
  attack: FogAttack
  territory: Territory | undefined
  onDefend: (defenseType: "focus" | "mini-task" | "points") => void
  resources: {
    focus: number
    recreation: number
    mood: number
  }
}

export function FogAttackModal({ attack, territory, onDefend, resources }: FogAttackModalProps) {
  if (!territory) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-aoe-panel border border-aoe-border rounded-md w-full max-w-md p-0 shadow-xl">
        <div className="bg-red-900/30 p-4 flex items-center border-b border-aoe-border">
          <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
          <h2 className="text-xl font-bold text-aoe-gold">Alerta de Ataque!</h2>
        </div>

        <div className="p-6">
          <p className="text-aoe-light mb-4">
            A Névoa da Distração está atacando o território{" "}
            <span className="text-aoe-gold font-bold">{territory.name}</span>!
          </p>

          <div className="bg-aoe-dark-blue/50 border border-aoe-border rounded-md p-3 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-aoe-muted">Tempo restante:</span>
              <span className="text-lg font-bold text-red-400">{attack.timeRemaining}s</span>
            </div>

            <div className="h-2 bg-aoe-dark-blue rounded-sm overflow-hidden">
              <div
                className="h-full bg-red-500 transition-all duration-1000 ease-linear"
                style={{ width: `${(attack.timeRemaining / 30) * 100}%` }}
              ></div>
            </div>
          </div>

          <h3 className="text-aoe-light font-bold mb-3">Escolha como defender:</h3>

          <div className="space-y-3">
            {/* Defesa com Foco */}
            <div className="border border-aoe-border rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Brain className="h-5 w-5 text-blue-400 mr-2" />
                  <h4 className="text-aoe-light font-medium">Usar Foco</h4>
                </div>
                <span className="text-blue-400 font-bold">-20</span>
              </div>
              <p className="text-xs text-aoe-muted mb-3">
                Use sua energia mental para repelir a Névoa instantaneamente.
              </p>
              <AoE4Button
                variant="secondary"
                className="w-full"
                disabled={resources.focus < 20}
                onClick={() => onDefend("focus")}
              >
                {resources.focus < 20 ? "Foco Insuficiente" : "Defender com Foco"}
              </AoE4Button>
            </div>

            {/* Defesa com Mini-tarefa */}
            <div className="border border-aoe-border rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-yellow-400 mr-2" />
                  <h4 className="text-aoe-light font-medium">Mini-tarefa</h4>
                </div>
                <span className="text-yellow-400 font-bold">Quiz</span>
              </div>
              <p className="text-xs text-aoe-muted mb-3">
                Complete um pequeno desafio relacionado à tarefa para defender o território.
              </p>
              <AoE4Button className="w-full" onClick={() => onDefend("mini-task")}>
                Iniciar Mini-tarefa
              </AoE4Button>
            </div>

            {/* Defesa com Pontos Recreativos */}
            <div className="border border-aoe-border rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Coffee className="h-5 w-5 text-green-400 mr-2" />
                  <h4 className="text-aoe-light font-medium">Usar Pontos Recreativos</h4>
                </div>
                <span className="text-green-400 font-bold">-15</span>
              </div>
              <p className="text-xs text-aoe-muted mb-3">
                Gaste pontos recreativos para contratar mercenários que defenderão o território.
              </p>
              <AoE4Button
                variant="secondary"
                className="w-full"
                disabled={resources.recreation < 15}
                onClick={() => onDefend("points")}
              >
                {resources.recreation < 15 ? "Pontos Insuficientes" : "Contratar Mercenários"}
              </AoE4Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
