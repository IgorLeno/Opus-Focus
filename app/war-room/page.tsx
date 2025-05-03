"use client"

import { useState, useEffect } from "react"
import { ResourceBar } from "@/components/resource-bar"
import { WarRoomMap } from "@/components/war-room-map"
import { MissionPanel } from "@/components/mission-panel"
import { TaskDetails } from "@/components/task-details"
import { EventLog } from "@/components/event-log"
import { FogAttackModal } from "@/components/fog-attack-modal"
import { VictoryModal } from "@/components/victory-modal"
import { TopMenu } from "@/components/top-menu"
import type { Territory, Mission, FogAttack } from "@/types/war-room"

// Dados de exemplo para demonstração
const exampleTerritories: Territory[] = [
  {
    id: "t1",
    name: "Planejamento Inicial",
    description: "Defina os objetivos e escopo do projeto",
    path: "M100,100 L200,50 L300,100 L200,150 Z",
    center: { x: 200, y: 100 },
    owner: "player",
    connections: ["t2", "t3"],
    difficulty: 2,
    estimatedTime: "15min",
    value: 10,
    defensePoints: 5,
  },
  {
    id: "t2",
    name: "Pesquisa",
    description: "Colete informações e referências",
    path: "M300,100 L400,50 L500,100 L400,150 Z",
    center: { x: 400, y: 100 },
    owner: "neutral",
    connections: ["t1", "t4"],
    difficulty: 3,
    estimatedTime: "30min",
    value: 15,
  },
  {
    id: "t3",
    name: "Brainstorming",
    description: "Gere ideias criativas para o projeto",
    path: "M100,200 L200,150 L300,200 L200,250 Z",
    center: { x: 200, y: 200 },
    owner: "none",
    connections: ["t1", "t5"],
    difficulty: 2,
    estimatedTime: "20min",
    value: 12,
  },
  {
    id: "t4",
    name: "Análise de Dados",
    description: "Analise os dados coletados",
    path: "M300,200 L400,150 L500,200 L400,250 Z",
    center: { x: 400, y: 200 },
    owner: "fog",
    connections: ["t2", "t6"],
    difficulty: 4,
    estimatedTime: "45min",
    value: 20,
    requirements: ["Completar Pesquisa"],
  },
  {
    id: "t5",
    name: "Protótipo",
    description: "Crie um protótipo inicial",
    path: "M100,300 L200,250 L300,300 L200,350 Z",
    center: { x: 200, y: 300 },
    owner: "none",
    connections: ["t3", "t6"],
    difficulty: 3,
    estimatedTime: "40min",
    value: 18,
    requirements: ["Completar Brainstorming"],
  },
  {
    id: "t6",
    name: "Revisão Final",
    description: "Revise e finalize o projeto",
    path: "M300,300 L400,250 L500,300 L400,350 Z",
    center: { x: 400, y: 300 },
    owner: "none",
    connections: ["t4", "t5"],
    difficulty: 5,
    estimatedTime: "60min",
    value: 25,
    requirements: ["Completar Análise de Dados", "Completar Protótipo"],
  },
]

const exampleMissions: Mission[] = [
  {
    id: "m1",
    title: "Conquistar todos os territórios",
    description: "Conquiste todos os territórios do mapa",
    type: "main",
    completed: false,
    reward: "+50 Pontos Recreativos",
  },
  {
    id: "m2",
    title: "Defender contra 3 ataques",
    description: "Defenda seus territórios contra 3 ataques da Névoa",
    type: "main",
    completed: false,
    reward: "+30 Foco",
  },
  {
    id: "m3",
    title: "Conquistar Análise de Dados",
    description: "Conquiste o território da Análise de Dados",
    type: "side",
    completed: false,
    reward: "+15 Humor",
  },
  {
    id: "m4",
    title: "Completar em menos de 2 horas",
    description: "Complete todas as tarefas em menos de 2 horas",
    type: "side",
    completed: false,
    reward: "+20 Pontos Recreativos",
  },
]

export default function WarRoomPage() {
  const [territories, setTerritories] = useState<Territory[]>(exampleTerritories)
  const [missions, setMissions] = useState<Mission[]>(exampleMissions)
  const [selectedTerritory, setSelectedTerritory] = useState<string | undefined>("t1")
  const [resources, setResources] = useState({
    focus: 80,
    recreation: 50,
    mood: 70,
    dayProgress: 10,
  })
  const [activeFogAttack, setActiveFogAttack] = useState<FogAttack | null>(null)
  const [showVictoryModal, setShowVictoryModal] = useState(false)

  // Selecionar um território
  const handleSelectTerritory = (territoryId: string) => {
    setSelectedTerritory(territoryId)
  }

  // Iniciar uma tarefa (conquistar território)
  const handleStartTask = (territoryId: string) => {
    // Simulação de conquista de território
    const updatedTerritories = territories.map((territory) => {
      if (territory.id === territoryId) {
        return {
          ...territory,
          owner: "player",
          defensePoints: 3,
        }
      }
      return territory
    })

    setTerritories(updatedTerritories)

    // Atualizar recursos
    const territory = territories.find((t) => t.id === territoryId)
    if (territory) {
      setResources((prev) => ({
        ...prev,
        focus: Math.max(0, prev.focus - 10),
        recreation: Math.min(100, prev.recreation + territory.value),
        mood: Math.min(100, prev.mood + 5),
      }))
    }

    // Verificar missões
    checkMissions(updatedTerritories)

    // Simular ataque da névoa após um tempo
    setTimeout(() => {
      simulateFogAttack()
    }, 30000) // 30 segundos
  }

  // Defender contra um ataque da névoa
  const handleDefend = (defenseType: "focus" | "mini-task" | "points") => {
    if (!activeFogAttack) return

    // Atualizar recursos com base no tipo de defesa
    switch (defenseType) {
      case "focus":
        setResources((prev) => ({
          ...prev,
          focus: Math.max(0, prev.focus - 20),
        }))
        break
      case "mini-task":
        // Simulação de mini-tarefa bem-sucedida
        setResources((prev) => ({
          ...prev,
          focus: Math.max(0, prev.focus - 5),
        }))
        break
      case "points":
        setResources((prev) => ({
          ...prev,
          recreation: Math.max(0, prev.recreation - 15),
        }))
        break
    }

    // Aumentar defesa do território
    const updatedTerritories = territories.map((territory) => {
      if (territory.id === activeFogAttack.territoryId) {
        return {
          ...territory,
          defensePoints: (territory.defensePoints || 0) + 2,
        }
      }
      return territory
    })

    setTerritories(updatedTerritories)
    setActiveFogAttack(null)

    // Verificar missões de defesa
    const defendMission = missions.find((m) => m.id === "m2")
    if (defendMission && !defendMission.completed) {
      // Incrementar contador de defesas (simulado aqui)
      const updatedMissions = missions.map((m) => {
        if (m.id === "m2") {
          // Simulando que esta é a terceira defesa
          return { ...m, completed: true }
        }
        return m
      })
      setMissions(updatedMissions)
    }
  }

  // Simular um ataque da névoa
  const simulateFogAttack = () => {
    // Encontrar territórios do jogador
    const playerTerritories = territories.filter((t) => t.owner === "player")
    if (playerTerritories.length === 0) return

    // Selecionar um território aleatório para atacar
    const targetTerritory = playerTerritories[Math.floor(Math.random() * playerTerritories.length)]

    setActiveFogAttack({
      territoryId: targetTerritory.id,
      timeRemaining: 30, // 30 segundos para defender
    })

    // Iniciar contagem regressiva
    let timeLeft = 30
    const timer = setInterval(() => {
      timeLeft -= 1
      setActiveFogAttack((prev) => {
        if (!prev) return null
        return { ...prev, timeRemaining: timeLeft }
      })

      // Se o tempo acabar, o território é perdido
      if (timeLeft <= 0) {
        clearInterval(timer)
        setActiveFogAttack(null)

        // Território volta a ser neutro
        setTerritories((prev) =>
          prev.map((t) => {
            if (t.id === targetTerritory.id) {
              return { ...t, owner: "neutral", defensePoints: 0 }
            }
            return t
          }),
        )
      }
    }, 1000)
  }

  // Verificar missões
  const checkMissions = (updatedTerritories: Territory[]) => {
    const updatedMissions = missions.map((mission) => {
      // Verificar missão de conquistar todos os territórios
      if (mission.id === "m1" && !mission.completed) {
        const allConquered = updatedTerritories.every((t) => t.owner === "player")
        if (allConquered) {
          setShowVictoryModal(true)
          return { ...mission, completed: true }
        }
      }

      // Verificar missão de conquistar Análise de Dados
      if (mission.id === "m3" && !mission.completed) {
        const analysisTerritory = updatedTerritories.find((t) => t.id === "t4")
        if (analysisTerritory && analysisTerritory.owner === "player") {
          return { ...mission, completed: true }
        }
      }

      return mission
    })

    setMissions(updatedMissions)
  }

  // Atualizar progresso do dia
  useEffect(() => {
    const timer = setInterval(() => {
      setResources((prev) => ({
        ...prev,
        dayProgress: Math.min(100, prev.dayProgress + 1),
      }))
    }, 10000) // A cada 10 segundos (simulando um dia de 8 horas)

    return () => clearInterval(timer)
  }, [])

  // Território selecionado
  const selectedTerritoryData = territories.find((t) => t.id === selectedTerritory)

  return (
    <div className="flex flex-col h-screen bg-aoe-dark-blue">
      <TopMenu activeItem="mapa-do-dia" />

      <div className="pt-16">
        <ResourceBar
          focus={resources.focus}
          recreation={resources.recreation}
          mood={resources.mood}
          dayProgress={resources.dayProgress}
        />

        <div className="flex h-[calc(100vh-116px)]">
          {/* Painel lateral esquerdo - Missões */}
          <div className="w-64 border-r border-aoe-border bg-aoe-panel">
            <MissionPanel
              missions={missions}
              onMissionClick={(missionId) => {
                // Implementação futura: destacar territórios relacionados à missão
                console.log("Missão selecionada:", missionId)
              }}
            />
          </div>

          {/* Mapa central */}
          <div className="flex-1 relative">
            <WarRoomMap
              territories={territories}
              selectedTerritory={selectedTerritory}
              activeFogAttack={activeFogAttack}
              onSelectTerritory={handleSelectTerritory}
              onStartTask={handleStartTask}
            />
          </div>

          {/* Painel lateral direito - Detalhes e Log */}
          <div className="w-80 border-l border-aoe-border flex flex-col bg-aoe-panel">
            {/* Detalhes do território selecionado */}
            <div className="h-1/2 border-b border-aoe-border">
              {selectedTerritoryData ? (
                <TaskDetails
                  territory={selectedTerritoryData}
                  onStartTask={() => handleStartTask(selectedTerritoryData.id)}
                />
              ) : (
                <div className="p-4 text-aoe-muted">Selecione um território no mapa</div>
              )}
            </div>

            {/* Log de eventos */}
            <div className="h-1/2">
              <EventLog />
            </div>
          </div>
        </div>
      </div>

      {/* Modal de ataque da névoa */}
      {activeFogAttack && (
        <FogAttackModal
          attack={activeFogAttack}
          territory={territories.find((t) => t.id === activeFogAttack.territoryId)}
          onDefend={handleDefend}
          resources={resources}
        />
      )}

      {/* Modal de vitória */}
      {showVictoryModal && (
        <VictoryModal
          resources={resources}
          completedMissions={missions.filter((m) => m.completed).length}
          totalMissions={missions.length}
          onClose={() => setShowVictoryModal(false)}
        />
      )}
    </div>
  )
}
