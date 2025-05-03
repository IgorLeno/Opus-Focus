"use client"

import { useState } from "react"
import type { Mission } from "@/types/war-room"
import { CheckCircle, Circle, ChevronDown, ChevronUp, Star } from "lucide-react"

interface MissionPanelProps {
  missions: Mission[]
  onMissionClick: (missionId: string) => void
}

export function MissionPanel({ missions, onMissionClick }: MissionPanelProps) {
  const [expanded, setExpanded] = useState(true)

  // Separar missões por tipo
  const mainMissions = missions.filter((m) => m.type === "main")
  const sideMissions = missions.filter((m) => m.type === "side")

  return (
    <div className="h-full flex flex-col">
      <div className="aoe4-panel-header flex items-center justify-between">
        <h2 className="text-aoe-gold font-bold">Missões</h2>
        <button className="text-aoe-muted hover:text-aoe-light" onClick={() => setExpanded(!expanded)}>
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {expanded && (
        <div className="flex-1 overflow-y-auto scrollbar-thin p-2">
          {/* Missões principais */}
          <div className="mb-4">
            <h3 className="text-aoe-gold text-sm font-bold mb-2 border-b border-aoe-border pb-1">Missões Principais</h3>
            <ul className="space-y-2">
              {mainMissions.map((mission) => (
                <li
                  key={mission.id}
                  className={`p-2 rounded border ${
                    mission.completed ? "border-green-800 bg-green-900/20" : "border-aoe-border bg-aoe-dark-blue/30"
                  } cursor-pointer hover:bg-aoe-dark-blue/50 transition-colors`}
                  onClick={() => onMissionClick(mission.id)}
                >
                  <div className="flex items-start">
                    <div className="mt-0.5 mr-2">
                      {mission.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Circle className="h-4 w-4 text-aoe-muted" />
                      )}
                    </div>
                    <div>
                      <h4 className={`text-sm font-medium ${mission.completed ? "text-green-400" : "text-aoe-light"}`}>
                        {mission.title}
                      </h4>
                      <p className="text-xs text-aoe-muted mt-1">{mission.description}</p>

                      {/* Recompensa */}
                      <div className="flex items-center mt-2 text-xs text-aoe-gold">
                        <Star className="h-3 w-3 mr-1" fill="currentColor" />
                        <span>Recompensa: {mission.reward}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Missões secundárias */}
          <div>
            <h3 className="text-aoe-gold text-sm font-bold mb-2 border-b border-aoe-border pb-1">
              Missões Secundárias
            </h3>
            <ul className="space-y-2">
              {sideMissions.map((mission) => (
                <li
                  key={mission.id}
                  className={`p-2 rounded border ${
                    mission.completed ? "border-green-800 bg-green-900/20" : "border-aoe-border bg-aoe-dark-blue/30"
                  } cursor-pointer hover:bg-aoe-dark-blue/50 transition-colors`}
                  onClick={() => onMissionClick(mission.id)}
                >
                  <div className="flex items-start">
                    <div className="mt-0.5 mr-2">
                      {mission.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Circle className="h-4 w-4 text-aoe-muted" />
                      )}
                    </div>
                    <div>
                      <h4 className={`text-sm font-medium ${mission.completed ? "text-green-400" : "text-aoe-light"}`}>
                        {mission.title}
                      </h4>
                      <p className="text-xs text-aoe-muted mt-1">{mission.description}</p>

                      {/* Recompensa */}
                      <div className="flex items-center mt-2 text-xs text-aoe-gold">
                        <Star className="h-3 w-3 mr-1" fill="currentColor" />
                        <span>Recompensa: {mission.reward}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Progresso geral */}
      <div className="p-2 border-t border-aoe-border">
        <div className="flex justify-between items-center text-xs text-aoe-light mb-1">
          <span>Progresso da Conquista</span>
          <span>
            {missions.filter((m) => m.completed).length}/{missions.length}
          </span>
        </div>
        <div className="h-2 bg-aoe-dark-blue rounded-sm overflow-hidden">
          <div
            className="h-full bg-aoe-gold"
            style={{
              width: `${(missions.filter((m) => m.completed).length / missions.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
