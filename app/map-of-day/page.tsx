"use client"

import { useState } from "react"
import { TopMenu } from "@/components/top-menu"
import { AoE4Panel } from "@/components/aoe4-panel"
import { AoE4Button } from "@/components/aoe4-button"
import { Clock, CheckCircle, Flag, Trophy, Star, ArrowRight } from "lucide-react"

// Dados de exemplo para o mapa do dia
const dailyMapData = {
  name: "Estudos Avançados",
  description: "Complete as tarefas de estudo para avançar em seu conhecimento",
  progress: 40,
  timeRemaining: "4h 15m",
  tasks: [
    {
      id: 1,
      name: "Revisão de Conteúdo",
      description: "Revise o material da aula anterior",
      completed: true,
      estimatedTime: "30min",
      reward: "+10 XP",
    },
    {
      id: 2,
      name: "Leitura Complementar",
      description: "Leia o capítulo 5 do livro recomendado",
      completed: true,
      estimatedTime: "45min",
      reward: "+15 XP",
    },
    {
      id: 3,
      name: "Resolver Exercícios",
      description: "Complete a lista de exercícios práticos",
      completed: false,
      estimatedTime: "60min",
      reward: "+20 XP",
      current: true,
    },
    {
      id: 4,
      name: "Projeto Prático",
      description: "Inicie o projeto aplicando os conceitos aprendidos",
      completed: false,
      estimatedTime: "90min",
      reward: "+25 XP",
    },
    {
      id: 5,
      name: "Avaliação Final",
      description: "Faça o teste de conhecimento para concluir o mapa",
      completed: false,
      estimatedTime: "30min",
      reward: "+30 XP",
    },
  ],
  rewards: {
    xp: 100,
    focus: 20,
    recreation: 15,
  },
}

export default function MapOfDayPage() {
  const [selectedTask, setSelectedTask] = useState(dailyMapData.tasks.find((t) => t.current) || dailyMapData.tasks[0])

  return (
    <div className="flex flex-col min-h-screen bg-aoe-dark-blue">
      <TopMenu activeItem="map-of-day" />

      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-cinzel text-aoe-gold">{dailyMapData.name}</h1>
            <p className="text-aoe-muted">{dailyMapData.description}</p>
          </div>
          <div className="flex items-center text-aoe-light">
            <Clock className="h-5 w-5 mr-2 text-aoe-gold" />
            <span>Restante: {dailyMapData.timeRemaining}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Mapa Visual - Lado Esquerdo */}
          <div className="lg:col-span-8">
            <AoE4Panel>
              <div className="p-6">
                <div className="relative h-[300px] border-2 border-aoe-border rounded-md overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-aoe-dark-blue">
                    <div className="absolute inset-0 bg-[url('/images/aoe4/map-background.jpg')] bg-cover bg-center opacity-30"></div>
                  </div>

                  {/* Representação visual do mapa */}
                  <div className="absolute inset-0 p-4">
                    {/* Caminho central */}
                    <div className="absolute top-1/2 left-0 right-0 h-2 bg-aoe-gold/30 transform -translate-y-1/2"></div>

                    {/* Pontos no mapa */}
                    {dailyMapData.tasks.map((task, index) => {
                      const position = (index / (dailyMapData.tasks.length - 1)) * 100
                      const isCompleted = task.completed
                      const isCurrent = task.current

                      return (
                        <div
                          key={task.id}
                          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
                          style={{ left: `${position}%` }}
                          onClick={() => setSelectedTask(task)}
                        >
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              isCompleted
                                ? "bg-aoe-accent border-2 border-aoe-accent/50"
                                : isCurrent
                                  ? "bg-aoe-gold border-2 border-aoe-gold/50 animate-pulse-slow"
                                  : "bg-aoe-dark-blue border-2 border-aoe-border"
                            } ${selectedTask.id === task.id ? "ring-2 ring-white" : ""}`}
                          >
                            {isCompleted ? (
                              <CheckCircle className="h-6 w-6 text-white" />
                            ) : (
                              <span className="text-sm font-bold text-aoe-light">{index + 1}</span>
                            )}
                          </div>
                          <div
                            className={`absolute mt-2 w-max text-center left-1/2 transform -translate-x-1/2 text-xs ${
                              selectedTask.id === task.id ? "text-aoe-gold font-bold" : "text-aoe-muted"
                            }`}
                          >
                            {task.name}
                          </div>
                        </div>
                      )
                    })}

                    {/* Bandeira de início */}
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2">
                      <div className="w-12 h-12 flex items-center justify-center">
                        <Flag className="h-8 w-8 text-aoe-gold" />
                      </div>
                    </div>

                    {/* Troféu de conclusão */}
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2">
                      <div className="w-12 h-12 flex items-center justify-center">
                        <Trophy className="h-8 w-8 text-aoe-gold opacity-50" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-aoe-light">Progresso Geral</h3>
                  <div className="text-sm text-aoe-gold">
                    {dailyMapData.tasks.filter((t) => t.completed).length}/{dailyMapData.tasks.length} concluídas
                  </div>
                </div>

                <div className="h-2 bg-aoe-dark-blue rounded-sm overflow-hidden mb-6">
                  <div className="h-full bg-aoe-gold" style={{ width: `${dailyMapData.progress}%` }}></div>
                </div>

                {/* Detalhes da Tarefa Selecionada */}
                <div className="border-2 border-aoe-border rounded-md p-4 bg-aoe-dark-blue/30">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-cinzel text-aoe-gold">{selectedTask.name}</h3>
                      <p className="text-aoe-muted">{selectedTask.description}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center text-aoe-light mb-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{selectedTask.estimatedTime}</span>
                      </div>
                      <div className="text-aoe-gold">{selectedTask.reward}</div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    {selectedTask.completed ? (
                      <div className="flex items-center text-aoe-accent">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span>Concluído</span>
                      </div>
                    ) : (
                      <AoE4Button href={`/war-room?task=${selectedTask.id}`}>
                        {selectedTask.current ? "Continuar" : "Iniciar"} <ArrowRight className="ml-2 h-4 w-4" />
                      </AoE4Button>
                    )}
                  </div>
                </div>
              </div>
            </AoE4Panel>
          </div>

          {/* Informações e Recompensas - Lado Direito */}
          <div className="lg:col-span-4">
            {/* Recompensas do Mapa */}
            <AoE4Panel>
              <div className="aoe4-panel-header">
                <h2 className="text-xl font-cinzel text-aoe-gold">Recompensas</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-aoe-border rounded-md bg-aoe-dark-blue/50">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-aoe-dark-blue flex items-center justify-center mr-3">
                        <Star className="h-5 w-5 text-aoe-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-aoe-light">Experiência</p>
                        <p className="text-lg font-bold text-aoe-gold">+{dailyMapData.rewards.xp} XP</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-aoe-border rounded-md bg-aoe-dark-blue/50">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-aoe-dark-blue flex items-center justify-center mr-3">
                        <div className="h-5 w-5 text-aoe-accent font-bold">F</div>
                      </div>
                      <div>
                        <p className="text-sm text-aoe-light">Foco</p>
                        <p className="text-lg font-bold text-aoe-accent">+{dailyMapData.rewards.focus}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-aoe-border rounded-md bg-aoe-dark-blue/50">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-aoe-dark-blue flex items-center justify-center mr-3">
                        <div className="h-5 w-5 text-aoe-gold font-bold">R</div>
                      </div>
                      <div>
                        <p className="text-sm text-aoe-light">Pontos Recreativos</p>
                        <p className="text-lg font-bold text-aoe-light">+{dailyMapData.rewards.recreation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AoE4Panel>

            {/* Dicas e Informações */}
            <AoE4Panel className="mt-6">
              <div className="aoe4-panel-header">
                <h2 className="text-xl font-cinzel text-aoe-gold">Dicas</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="border-b border-aoe-border pb-3">
                    <h3 className="text-sm font-medium text-aoe-light mb-1">Mantenha o foco</h3>
                    <p className="text-xs text-aoe-muted">
                      Dedique-se a uma tarefa por vez e evite distrações para maximizar sua eficiência.
                    </p>
                  </div>

                  <div className="border-b border-aoe-border pb-3">
                    <h3 className="text-sm font-medium text-aoe-light mb-1">Faça pausas estratégicas</h3>
                    <p className="text-xs text-aoe-muted">
                      A cada 25-30 minutos de estudo intenso, faça uma pausa curta de 5 minutos para descansar.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-aoe-light mb-1">Revise regularmente</h3>
                    <p className="text-xs text-aoe-muted">
                      Ao concluir uma tarefa, reserve alguns minutos para revisar o que aprendeu antes de seguir para a
                      próxima.
                    </p>
                  </div>
                </div>
              </div>
            </AoE4Panel>
          </div>
        </div>
      </div>
    </div>
  )
}
