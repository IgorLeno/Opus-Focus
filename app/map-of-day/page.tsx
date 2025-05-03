"use client"

import { useState } from "react"
import { TopMenu } from "@/components/top-menu"
import { AoE4Panel } from "@/components/aoe4-panel"
import { AoE4Button } from "@/components/aoe4-button"
import { Star, Clock, CheckCircle, Flag, Trophy, ChevronRight, Info } from "lucide-react"

// Dados de exemplo para tarefas
const sampleTasks = [
  {
    id: 1,
    title: "Completar Capítulo 3",
    description: "Leitura do livro 'Estratégias Medievais'",
    difficulty: 2,
    status: "pending",
    xp: 120,
    estimatedTime: "45 min",
  },
  {
    id: 2,
    title: "Revisar Anotações",
    description: "Organizar material de estudo",
    difficulty: 1,
    status: "pending",
    xp: 80,
    estimatedTime: "30 min",
  },
  {
    id: 3,
    title: "Resolver Exercícios",
    description: "Completar lista de exercícios do capítulo 3",
    difficulty: 3,
    status: "pending",
    xp: 150,
    estimatedTime: "60 min",
  },
  {
    id: 4,
    title: "Praticar Exercícios",
    description: "30 minutos de atividade física",
    difficulty: 2,
    status: "completed",
    xp: 100,
    estimatedTime: "30 min",
  },
  {
    id: 5,
    title: "Meditar",
    description: "15 minutos de meditação guiada",
    difficulty: 1,
    status: "completed",
    xp: 50,
    estimatedTime: "15 min",
  },
]

export default function MapOfDayPage() {
  const [activeTask, setActiveTask] = useState<number | null>(null)

  return (
    <main className="flex flex-col min-h-screen bg-aoe-bg bg-cover bg-center">
      <TopMenu activeItem="map-of-day" />

      <div className="container mx-auto px-4 py-8 mt-16 flex-1">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Painel Principal */}
          <div className="flex-1">
            <AoE4Panel>
              <div className="aoe4-panel-header flex justify-between items-center">
                <h2 className="text-xl font-trajan text-aoe-gold">Mapa do Dia: Estudos Avançados</h2>
                <div className="flex items-center text-aoe-light text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Restante: 4h 15m</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Visualização do Mapa */}
                  <div className="lg:w-2/3">
                    <div className="relative h-[400px] border-2 border-aoe-border rounded-md overflow-hidden">
                      <div className="absolute inset-0 bg-aoe-map-bg"></div>

                      {/* Representação visual do mapa */}
                      <div className="absolute inset-0 p-4">
                        {/* Caminho central */}
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-aoe-gold/30 transform -translate-y-1/2"></div>

                        {/* Tarefas como pontos no mapa */}
                        {sampleTasks.map((task, index) => {
                          const position = (index / (sampleTasks.length - 1)) * 100
                          const isCompleted = task.status === "completed"
                          const isActive = activeTask === task.id

                          return (
                            <div
                              key={task.id}
                              className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer transition-all ${
                                isActive ? "scale-125" : ""
                              }`}
                              style={{ left: `${position}%` }}
                              onClick={() => setActiveTask(task.id)}
                            >
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  isCompleted
                                    ? "bg-aoe-accent border-2 border-aoe-accent/50"
                                    : isActive
                                      ? "bg-aoe-gold border-2 border-aoe-gold/50 animate-pulse-slow"
                                      : "bg-aoe-dark-blue border-2 border-aoe-border"
                                }`}
                              >
                                {isCompleted ? (
                                  <CheckCircle className="h-5 w-5 text-white" />
                                ) : (
                                  <span className="text-xs font-bold text-aoe-light">{task.id}</span>
                                )}
                              </div>
                              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                <p
                                  className={`text-xs font-medium ${
                                    isCompleted ? "text-aoe-accent" : isActive ? "text-aoe-gold" : "text-aoe-light"
                                  }`}
                                >
                                  {task.title}
                                </p>
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

                    <div className="mt-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold text-aoe-light">Progresso do Mapa</h3>
                        <div className="text-sm text-aoe-gold">2/5 concluídas</div>
                      </div>
                      <div className="h-2 bg-aoe-dark-blue rounded-sm overflow-hidden">
                        <div className="h-full bg-aoe-gold" style={{ width: "40%" }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Detalhes da Tarefa */}
                  <div className="lg:w-1/3">
                    {activeTask ? (
                      <div className="h-full">
                        {sampleTasks
                          .filter((t) => t.id === activeTask)
                          .map((task) => (
                            <div key={task.id} className="h-full flex flex-col">
                              <div className="mb-4 pb-4 border-b border-aoe-border">
                                <h3 className="text-lg font-semibold text-aoe-light">{task.title}</h3>
                                <p className="text-sm text-aoe-muted mt-1">{task.description}</p>
                              </div>

                              <div className="space-y-4 flex-1">
                                <div className="flex justify-between">
                                  <div className="text-sm text-aoe-muted">Dificuldade</div>
                                  <div className="flex">
                                    {Array.from({ length: task.difficulty }).map((_, i) => (
                                      <Star key={i} className="h-4 w-4 text-aoe-gold" fill="currentColor" />
                                    ))}
                                    {Array.from({ length: 3 - task.difficulty }).map((_, i) => (
                                      <Star key={i} className="h-4 w-4 text-aoe-muted" />
                                    ))}
                                  </div>
                                </div>

                                <div className="flex justify-between">
                                  <div className="text-sm text-aoe-muted">Experiência</div>
                                  <div className="text-sm text-aoe-gold">+{task.xp} XP</div>
                                </div>

                                <div className="flex justify-between">
                                  <div className="text-sm text-aoe-muted">Tempo estimado</div>
                                  <div className="text-sm text-aoe-light">{task.estimatedTime}</div>
                                </div>

                                <div className="flex justify-between">
                                  <div className="text-sm text-aoe-muted">Status</div>
                                  <div
                                    className={`text-sm ${task.status === "completed" ? "text-aoe-accent" : "text-aoe-light"}`}
                                  >
                                    {task.status === "completed" ? "Concluída" : "Pendente"}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-6">
                                {task.status === "completed" ? (
                                  <div className="bg-aoe-accent/20 border border-aoe-accent/50 rounded-md p-3 flex items-center">
                                    <CheckCircle className="h-5 w-5 text-aoe-accent mr-2" />
                                    <span className="text-sm text-aoe-light">Tarefa concluída com sucesso!</span>
                                  </div>
                                ) : (
                                  <AoE4Button className="w-full">Iniciar Tarefa</AoE4Button>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6">
                        <Info className="h-12 w-12 text-aoe-muted mb-4" />
                        <h3 className="text-lg font-semibold text-aoe-light mb-2">Selecione uma Tarefa</h3>
                        <p className="text-sm text-aoe-muted">
                          Clique em uma das tarefas no mapa para ver seus detalhes e iniciar sua jornada.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </AoE4Panel>
          </div>

          {/* Painel Lateral */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="space-y-6">
              <AoE4Panel>
                <div className="aoe4-panel-header">
                  <h2 className="text-xl font-trajan text-aoe-gold">Recompensas</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-aoe-dark-blue flex items-center justify-center mr-3">
                        <Trophy className="h-5 w-5 text-aoe-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-aoe-light">Completar o Mapa</p>
                        <p className="text-xs text-aoe-gold">+500 XP</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-aoe-dark-blue flex items-center justify-center mr-3">
                        <Clock className="h-5 w-5 text-aoe-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-aoe-light">Tempo Recreativo</p>
                        <p className="text-xs text-aoe-accent">+250 pontos</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-aoe-border">
                    <p className="text-xs text-aoe-muted mb-2">Progresso para próximo nível</p>
                    <div className="flex justify-between text-xs text-aoe-light mb-1">
                      <span>Nível 5</span>
                      <span>750/1000 XP</span>
                    </div>
                    <div className="h-2 bg-aoe-dark-blue rounded-sm overflow-hidden">
                      <div className="h-full bg-aoe-gold" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                </div>
              </AoE4Panel>

              <AoE4Panel>
                <div className="aoe4-panel-header">
                  <h2 className="text-xl font-trajan text-aoe-gold">Conquistas</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-aoe-accent/20 flex items-center justify-center mr-2">
                        <CheckCircle className="h-4 w-4 text-aoe-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-aoe-light">Primeiro Passo</p>
                        <p className="text-xs text-aoe-muted">Complete sua primeira tarefa</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-aoe-accent/20 flex items-center justify-center mr-2">
                        <CheckCircle className="h-4 w-4 text-aoe-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-aoe-light">Explorador</p>
                        <p className="text-xs text-aoe-muted">Crie 3 mapas diferentes</p>
                      </div>
                    </div>

                    <div className="flex items-center opacity-50">
                      <div className="w-8 h-8 rounded-full bg-aoe-dark-blue flex items-center justify-center mr-2">
                        <Flag className="h-4 w-4 text-aoe-muted" />
                      </div>
                      <div>
                        <p className="text-sm text-aoe-light">Conquistador</p>
                        <p className="text-xs text-aoe-muted">Complete um mapa inteiro</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <AoE4Button variant="secondary" className="w-full flex items-center justify-center">
                      <span>Ver Todas</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </AoE4Button>
                  </div>
                </div>
              </AoE4Panel>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
