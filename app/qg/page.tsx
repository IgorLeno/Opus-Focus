"use client"

import { useState } from "react"
import { TopMenu } from "@/components/top-menu"
import { AoE4Panel } from "@/components/aoe4-panel"
import { AoE4Button } from "@/components/aoe4-button"
import { Star, Clock, CheckCircle, Flag, Trophy, ChevronRight, Calendar, MapPin } from "lucide-react"

// Dados de exemplo para missões diárias
const dailyMissions = [
  {
    id: 1,
    title: "Complete 3 tarefas hoje",
    reward: "+100 XP",
    progress: 1,
    total: 3,
  },
  {
    id: 2,
    title: "Estude por 2 horas",
    reward: "+150 XP",
    progress: 45,
    total: 120,
    unit: "min",
  },
]

// Dados de exemplo para mapas ativos
const activeMaps = [
  {
    id: 1,
    name: "Projeto Final",
    progress: 65,
    tasks: 10,
    completedTasks: 6,
    lastActivity: "Hoje",
  },
  {
    id: 2,
    name: "Domínio Estratégico",
    progress: 42,
    tasks: 20,
    completedTasks: 8,
    lastActivity: "Ontem",
  },
  {
    id: 3,
    name: "Fronteiras do Reino",
    progress: 78,
    tasks: 8,
    completedTasks: 6,
    lastActivity: "3 dias atrás",
  },
]

// Dados de exemplo para notícias/atualizações
const updates = [
  {
    id: 1,
    title: "Nova funcionalidade: Colaboração",
    description: "Agora você pode convidar amigos para colaborar em seus mapas de conquista.",
    date: "22/04/2025",
  },
  {
    id: 2,
    title: "Conquistas desbloqueadas",
    description: "Novas conquistas foram adicionadas. Verifique seu progresso na seção de estatísticas.",
    date: "18/04/2025",
  },
]

export default function QGPage() {
  const [selectedMap, setSelectedMap] = useState(activeMaps[0])

  return (
    <div className="flex flex-col min-h-screen bg-aoe-dark-blue">
      <TopMenu activeItem="qg" />

      <div className="container mx-auto px-4 py-8 mt-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Painel Esquerdo - Mapas Ativos */}
          <div className="lg:col-span-4">
            <AoE4Panel>
              <div className="aoe4-panel-header">
                <h2 className="text-xl font-cinzel text-aoe-gold">Mapas Ativos</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {activeMaps.map((map) => (
                    <div
                      key={map.id}
                      className={`p-3 rounded-md cursor-pointer transition-colors ${
                        selectedMap.id === map.id
                          ? "bg-aoe-gold/20 border border-aoe-gold/50"
                          : "hover:bg-aoe-dark-blue/50 border border-transparent"
                      }`}
                      onClick={() => setSelectedMap(map)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-aoe-light">{map.name}</h3>
                        <span className="text-xs text-aoe-muted">{map.lastActivity}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-aoe-muted">Progresso</span>
                          <span className="text-aoe-gold">{map.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-aoe-dark-blue rounded-sm overflow-hidden">
                          <div className="h-full bg-aoe-gold" style={{ width: `${map.progress}%` }}></div>
                        </div>
                        <div className="text-xs text-aoe-muted">
                          {map.completedTasks} de {map.tasks} tarefas concluídas
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <AoE4Button variant="secondary" className="w-full flex items-center justify-center" href="/maps">
                    <span>Ver Todos os Mapas</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </AoE4Button>
                </div>
              </div>
            </AoE4Panel>
          </div>

          {/* Painel Central - Mapa do Dia */}
          <div className="lg:col-span-5">
            <AoE4Panel>
              <div className="aoe4-panel-header flex justify-between items-center">
                <h2 className="text-xl font-cinzel text-aoe-gold">Mapa do Dia</h2>
                <div className="flex items-center text-aoe-light text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Restante: 4h 15m</span>
                </div>
              </div>

              <div className="p-4">
                <div className="relative h-[200px] border-2 border-aoe-border rounded-md overflow-hidden mb-4">
                  <div className="absolute inset-0 bg-aoe-dark-blue">
                    <div className="absolute inset-0 bg-[url('/images/aoe4/map-background.jpg')] bg-cover bg-center opacity-30"></div>
                  </div>

                  {/* Representação visual simplificada do mapa */}
                  <div className="absolute inset-0 p-4">
                    {/* Caminho central */}
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-aoe-gold/30 transform -translate-y-1/2"></div>

                    {/* Pontos no mapa */}
                    {[0, 1, 2, 3, 4].map((i) => {
                      const position = (i / 4) * 100
                      const isCompleted = i < 2

                      return (
                        <div
                          key={i}
                          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
                          style={{ left: `${position}%` }}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isCompleted
                                ? "bg-aoe-accent border-2 border-aoe-accent/50"
                                : i === 2
                                  ? "bg-aoe-gold border-2 border-aoe-gold/50 animate-pulse-slow"
                                  : "bg-aoe-dark-blue border-2 border-aoe-border"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle className="h-4 w-4 text-white" />
                            ) : (
                              <span className="text-xs font-bold text-aoe-light">{i + 1}</span>
                            )}
                          </div>
                        </div>
                      )
                    })}

                    {/* Bandeira de início */}
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2">
                      <div className="w-10 h-10 flex items-center justify-center">
                        <Flag className="h-6 w-6 text-aoe-gold" />
                      </div>
                    </div>

                    {/* Troféu de conclusão */}
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2">
                      <div className="w-10 h-10 flex items-center justify-center">
                        <Trophy className="h-6 w-6 text-aoe-gold opacity-50" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-aoe-light">Estudos Avançados</h3>
                  <div className="text-sm text-aoe-gold">2/5 concluídas</div>
                </div>

                <div className="h-2 bg-aoe-dark-blue rounded-sm overflow-hidden mb-4">
                  <div className="h-full bg-aoe-gold" style={{ width: "40%" }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-aoe-muted">Próxima tarefa: Resolver Exercícios</div>
                  <AoE4Button size="sm" href="/map-of-day">
                    Continuar
                  </AoE4Button>
                </div>
              </div>
            </AoE4Panel>

            {/* Missões Diárias */}
            <AoE4Panel className="mt-6">
              <div className="aoe4-panel-header">
                <h2 className="text-xl font-cinzel text-aoe-gold">Missões Diárias</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {dailyMissions.map((mission) => (
                    <div key={mission.id} className="border border-aoe-border rounded-md p-3 bg-aoe-dark-blue/50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-aoe-dark-blue flex items-center justify-center mr-2">
                            <Star className="h-4 w-4 text-aoe-gold" />
                          </div>
                          <h3 className="text-sm font-medium text-aoe-light">{mission.title}</h3>
                        </div>
                        <div className="text-xs text-aoe-gold">{mission.reward}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-aoe-muted">Progresso</span>
                          <span className="text-aoe-light">
                            {mission.progress}
                            {mission.unit ? mission.unit : ""}/{mission.total}
                            {mission.unit ? mission.unit : ""}
                          </span>
                        </div>
                        <div className="h-1.5 bg-aoe-dark-blue rounded-sm overflow-hidden">
                          <div
                            className="h-full bg-aoe-gold"
                            style={{ width: `${(mission.progress / mission.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AoE4Panel>
          </div>

          {/* Painel Direito - Atualizações e Estatísticas */}
          <div className="lg:col-span-3">
            <AoE4Panel>
              <div className="aoe4-panel-header">
                <h2 className="text-xl font-cinzel text-aoe-gold">Atualizações</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {updates.map((update) => (
                    <div key={update.id} className="border-b border-aoe-border pb-3 last:border-0 last:pb-0">
                      <h3 className="text-sm font-medium text-aoe-light mb-1">{update.title}</h3>
                      <p className="text-xs text-aoe-muted mb-1">{update.description}</p>
                      <div className="text-xs text-aoe-gold">{update.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AoE4Panel>

            {/* Resumo de Estatísticas */}
            <AoE4Panel className="mt-6">
              <div className="aoe4-panel-header">
                <h2 className="text-xl font-cinzel text-aoe-gold">Resumo</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-aoe-dark-blue flex items-center justify-center mr-3">
                      <Calendar className="h-5 w-5 text-aoe-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-aoe-light">Sequência Atual</p>
                      <p className="text-lg font-bold text-aoe-gold">5 dias</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-aoe-dark-blue flex items-center justify-center mr-3">
                      <CheckCircle className="h-5 w-5 text-aoe-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-aoe-light">Tarefas Concluídas</p>
                      <p className="text-lg font-bold text-aoe-accent">132</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-aoe-dark-blue flex items-center justify-center mr-3">
                      <MapPin className="h-5 w-5 text-aoe-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-aoe-light">Mapas Criados</p>
                      <p className="text-lg font-bold text-aoe-light">12</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-aoe-dark-blue flex items-center justify-center mr-3">
                      <Trophy className="h-5 w-5 text-aoe-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-aoe-light">Conquistas</p>
                      <p className="text-lg font-bold text-aoe-light">8/15</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <AoE4Button variant="secondary" className="w-full flex items-center justify-center" href="/stats">
                    <span>Ver Estatísticas</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </AoE4Button>
                </div>
              </div>
            </AoE4Panel>
          </div>
        </div>
      </div>
    </div>
  )
}
