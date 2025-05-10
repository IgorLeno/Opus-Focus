"use client"

import { useState, useEffect } from "react"
import type { Mission } from "@/types/war-room"
import { CheckCircle, Circle, ChevronDown, ChevronUp, Star, Trophy, Clock, AlertTriangle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSound } from "@/contexts/sound-context"

interface MissionPanelProps {
  missions: Mission[]
  onMissionClick: (missionId: string) => void
}

export function MissionPanel({ missions, onMissionClick }: MissionPanelProps) {
  const { playSound } = useSound()
  const [expanded, setExpanded] = useState(true)
  const [completedAnimation, setCompletedAnimation] = useState<string | null>(null)
  const [missionFilter, setMissionFilter] = useState<"all" | "main" | "side">("all")

  // Detectar quando uma missão é completada para mostrar animação
  useEffect(() => {
    const checkCompletions = () => {
      const justCompleted = missions.find(
        (m) => m.completed && !document.getElementById(`mission-${m.id}`)?.classList.contains("mission-animated"),
      )

      if (justCompleted) {
        setCompletedAnimation(justCompleted.id)
        playSound("missionComplete")
        setTimeout(() => {
          setCompletedAnimation(null)
          // Marcar como animada
          const element = document.getElementById(`mission-${justCompleted.id}`)
          if (element) element.classList.add("mission-animated")
        }, 2000)
      }
    }

    checkCompletions()
  }, [missions, playSound])

  // Separar missões por tipo
  const mainMissions = missions.filter((m) => m.type === "main")
  const sideMissions = missions.filter((m) => m.type === "side")

  // Filtrar missões com base no filtro selecionado
  const filteredMissions = missionFilter === "all" ? missions : missionFilter === "main" ? mainMissions : sideMissions

  // Calcular progresso
  const completedCount = missions.filter((m) => m.completed).length
  const totalCount = missions.length
  const progressPercentage = (completedCount / totalCount) * 100

  return (
    <div className="h-full flex flex-col">
      <div className="aoe4-panel-header flex items-center justify-between p-3 border-b border-aoe-border">
        <div className="flex items-center">
          <Trophy className="h-5 w-5 text-aoe-gold mr-2" />
          <h2 className="text-aoe-gold font-bold">Missões</h2>
        </div>
        <button
          className="text-aoe-muted hover:text-aoe-light"
          onClick={() => {
            setExpanded(!expanded)
            playSound(expanded ? "menuClose" : "menuOpen")
          }}
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {expanded && (
        <>
          <div className="p-2 border-b border-aoe-border flex justify-between">
            <button
              className={`px-2 py-1 text-xs rounded ${missionFilter === "all" ? "bg-aoe-gold/20 text-aoe-gold" : "text-aoe-muted hover:text-aoe-light"}`}
              onClick={() => {
                setMissionFilter("all")
                playSound("buttonClick")
              }}
            >
              Todas ({missions.length})
            </button>
            <button
              className={`px-2 py-1 text-xs rounded ${missionFilter === "main" ? "bg-aoe-gold/20 text-aoe-gold" : "text-aoe-muted hover:text-aoe-light"}`}
              onClick={() => {
                setMissionFilter("main")
                playSound("buttonClick")
              }}
            >
              Principais ({mainMissions.length})
            </button>
            <button
              className={`px-2 py-1 text-xs rounded ${missionFilter === "side" ? "bg-aoe-gold/20 text-aoe-gold" : "text-aoe-muted hover:text-aoe-light"}`}
              onClick={() => {
                setMissionFilter("side")
                playSound("buttonClick")
              }}
            >
              Secundárias ({sideMissions.length})
            </button>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin p-2">
            <AnimatePresence>
              {filteredMissions.length > 0 ? (
                <motion.ul
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {filteredMissions.map((mission) => (
                    <motion.li
                      id={`mission-${mission.id}`}
                      key={mission.id}
                      className={`p-2 rounded border ${
                        mission.completed ? "border-green-800 bg-green-900/20" : "border-aoe-border bg-aoe-dark-blue/30"
                      } cursor-pointer hover:bg-aoe-dark-blue/50 transition-colors relative overflow-hidden`}
                      onClick={() => {
                        onMissionClick(mission.id)
                        playSound("buttonClick")
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      layout
                    >
                      {/* Efeito de conclusão */}
                      {completedAnimation === mission.id && (
                        <motion.div
                          className="absolute inset-0 bg-green-500/30"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}

                      <div className="flex items-start">
                        <div className="mt-0.5 mr-2">
                          {mission.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : mission.type === "main" ? (
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          ) : (
                            <Circle className="h-4 w-4 text-aoe-muted" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h4
                              className={`text-sm font-medium ${mission.completed ? "text-green-400" : "text-aoe-light"}`}
                            >
                              {mission.title}
                            </h4>
                            <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-aoe-dark-blue/50 border border-aoe-border/50 text-aoe-muted">
                              {mission.type === "main" ? "Principal" : "Secundária"}
                            </span>
                          </div>
                          <p className="text-xs text-aoe-muted mt-1">{mission.description}</p>

                          {/* Recompensa */}
                          <div className="flex items-center mt-2 text-xs text-aoe-gold">
                            <Star className="h-3 w-3 mr-1" fill="currentColor" />
                            <span>Recompensa: {mission.reward}</span>
                          </div>
                        </div>
                      </div>

                      {/* Indicador de conclusão */}
                      {mission.completed && (
                        <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-r-[24px] border-t-transparent border-r-green-600"></div>
                      )}
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-aoe-muted text-sm">
                  <Clock className="h-8 w-8 mb-2 opacity-50" />
                  <p>
                    Nenhuma missão{" "}
                    {missionFilter === "main" ? "principal" : missionFilter === "side" ? "secundária" : ""} disponível
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}

      {/* Progresso geral */}
      <div className="p-3 border-t border-aoe-border">
        <div className="flex justify-between items-center text-xs text-aoe-light mb-1">
          <span>Progresso da Conquista</span>
          <span>
            {completedCount}/{totalCount}
          </span>
        </div>
        <div className="h-2 bg-aoe-dark-blue rounded-sm overflow-hidden">
          <motion.div
            className="h-full bg-aoe-gold"
            initial={{ width: `${progressPercentage}%` }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Medalhas de progresso */}
        <div className="flex justify-between mt-3">
          <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${progressPercentage >= 25 ? "bg-aoe-gold" : "bg-gray-700"}`}
            >
              <Trophy className={`w-3 h-3 ${progressPercentage >= 25 ? "text-black" : "text-gray-500"}`} />
            </div>
            <span className="text-[10px] mt-1 text-aoe-muted">25%</span>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${progressPercentage >= 50 ? "bg-aoe-gold" : "bg-gray-700"}`}
            >
              <Trophy className={`w-3 h-3 ${progressPercentage >= 50 ? "text-black" : "text-gray-500"}`} />
            </div>
            <span className="text-[10px] mt-1 text-aoe-muted">50%</span>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${progressPercentage >= 75 ? "bg-aoe-gold" : "bg-gray-700"}`}
            >
              <Trophy className={`w-3 h-3 ${progressPercentage >= 75 ? "text-black" : "text-gray-500"}`} />
            </div>
            <span className="text-[10px] mt-1 text-aoe-muted">75%</span>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${progressPercentage >= 100 ? "bg-aoe-gold" : "bg-gray-700"}`}
            >
              <Trophy className={`w-3 h-3 ${progressPercentage >= 100 ? "text-black" : "text-gray-500"}`} />
            </div>
            <span className="text-[10px] mt-1 text-aoe-muted">100%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
