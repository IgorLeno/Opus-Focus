"use client"

import { TopMenu } from "@/components/top-menu"
import { AoE4Panel } from "@/components/aoe4-panel"
import { AoE4Button } from "@/components/aoe4-button"
import { Trophy, CheckCircle, Target } from "lucide-react"
import { useState } from "react"
import { TrendingUp, Flag } from "lucide-react"

// Dados de exemplo para estatísticas
const statsData = {
  totalTasks: 157,
  completedTasks: 132,
  completionRate: 84,
  totalXP: 12450,
  currentLevel: 5,
  nextLevelXP: 1000,
  currentXP: 750,
  streak: 5,
  longestStreak: 14,
  timeSpent: "87h 30m",
  mostProductiveDay: "Terça-feira",
  mostProductiveTime: "09:00 - 11:00",
}

// Dados de exemplo para conquistas
const achievements = [
  {
    id: 1,
    name: "Primeiro Passo",
    description: "Complete sua primeira tarefa",
    completed: true,
    date: "15/04/2025",
    icon: <CheckCircle className="h-5 w-5" />,
  },
  {
    id: 2,
    name: "Explorador",
    description: "Crie 3 mapas diferentes",
    completed: true,
    date: "18/04/2025",
    icon: <Flag className="h-5 w-5" />,
  },
  {
    id: 3,
    name: "Conquistador",
    description: "Complete um mapa inteiro",
    completed: false,
    progress: 80,
    icon: <Trophy className="h-5 w-5" />,
  },
  {
    id: 4,
    name: "Mestre da Produtividade",
    description: "Mantenha uma sequência de 7 dias",
    completed: false,
    progress: 71,
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    id: 5,
    name: "Especialista",
    description: "Complete 50 tarefas em um único mapa",
    completed: true,
    date: "20/04/2025",
    icon: <Target className="h-5 w-5" />,
  },
]

// Dados de exemplo para histórico de atividades
const activityHistory = [
  { date: "22/04/2025", tasks: 5, xp: 320 },
  { date: "21/04/2025", tasks: 4, xp: 280 },
  { date: "20/04/2025", tasks: 6, xp: 420 },
  { date: "19/04/2025", tasks: 3, xp: 210 },
  { date: "18/04/2025", tasks: 5, xp: 350 },
  { date: "17/04/2025", tasks: 4, xp: 290 },
  { date: "16/04/2025", tasks: 2, xp: 150 },
]

export default function StatsPage() {
  // Dados de exemplo para estatísticas
  const stats = {
    totalMaps: 12,
    completedMaps: 5,
    totalTasks: 87,
    completedTasks: 62,
    totalXP: 3750,
    streak: 7,
    level: 5,
    levelProgress: 75,
    levelXP: 750,
    levelMaxXP: 1000,
    timeSpent: 42, // horas
    averageTasksPerDay: 3.5,
    completionRate: 71, // porcentagem
  }

  // Dados de exemplo para conquistas
  const achievements = [
    {
      id: 1,
      name: "Primeiro Passo",
      description: "Complete sua primeira tarefa",
      completed: true,
      date: "10/03/2025",
      xp: 50,
    },
    {
      id: 2,
      name: "Explorador",
      description: "Crie 3 mapas diferentes",
      completed: true,
      date: "15/03/2025",
      xp: 100,
    },
    {
      id: 3,
      name: "Conquistador",
      description: "Complete um mapa inteiro",
      completed: true,
      date: "28/03/2025",
      xp: 200,
    },
    {
      id: 4,
      name: "Estrategista",
      description: "Complete 50 tarefas",
      completed: true,
      date: "05/04/2025",
      xp: 250,
    },
    {
      id: 5,
      name: "Mestre da Produtividade",
      description: "Mantenha um streak de 7 dias",
      completed: true,
      date: "12/04/2025",
      xp: 150,
    },
    {
      id: 6,
      name: "Imperador",
      description: "Alcance o nível 10",
      completed: false,
      xp: 0,
    },
  ]
  const [activeTab, setActiveTab] = useState<"overview" | "achievements" | "history">("overview")

  return (
    <main className="flex flex-col min-h-screen">
      <TopMenu activeItem="stats" />

      <div className="container mx-auto px-4 py-8 mt-16 flex-1">
        <AoE4Panel>
          <div className="aoe4-panel-header">
            <h2 className="text-xl font-trajan text-aoe-gold">Estatísticas</h2>
          </div>

          {/* Tabs de Navegação */}
          <div className="border-b border-aoe-border">
            <div className="flex">
              <button
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === "overview"
                    ? "text-aoe-gold border-b-2 border-aoe-gold"
                    : "text-aoe-muted hover:text-aoe-light"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Visão Geral
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === "achievements"
                    ? "text-aoe-gold border-b-2 border-aoe-gold"
                    : "text-aoe-muted hover:text-aoe-light"
                }`}
                onClick={() => setActiveTab("achievements")}
              >
                Conquistas
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === "history"
                    ? "text-aoe-gold border-b-2 border-aoe-gold"
                    : "text-aoe-muted hover:text-aoe-light"
                }`}
                onClick={() => setActiveTab("history")}
              >
                Histórico
              </button>
            </div>
          </div>

          {/* Conteúdo da Tab Visão Geral */}
          {activeTab === "overview" && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Estatísticas de Tarefas */}
                <div className="bg-aoe-dark-blue border border-aoe-border rounded-md p-4">
                  <h3 className="text-lg font-trajan text-aoe-gold mb-4">Tarefas</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-aoe-muted">Total de Tarefas</div>
                      <div className="text-lg text-aoe-light">{statsData.totalTasks}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-aoe-muted">Tarefas Concluídas</div>
                      <div className="text-lg text-aoe-light">{statsData.completedTasks}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-aoe-muted">Taxa de Conclusão</div>
                      <div className="text-lg text-aoe-accent">{statsData.completionRate}%</div>
                    </div>
                    <div className="h-2 bg-aoe-panel rounded-sm overflow-hidden">
                      <div className="h-full bg-aoe-accent" style={{ width: `${statsData.completionRate}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Estatísticas de Nível */}
                <div className="bg-aoe-dark-blue border border-aoe-border rounded-md p-4">
                  <h3 className="text-lg font-trajan text-aoe-gold mb-4">Nível e Experiência</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-aoe-muted">Nível Atual</div>
                      <div className="text-lg text-aoe-light">{statsData.currentLevel}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-aoe-muted">Total de XP</div>
                      <div className="text-lg text-aoe-light">{statsData.totalXP}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-aoe-muted">Próximo Nível</div>
                      <div className="text-sm text-aoe-gold">
                        {statsData.currentXP}/{statsData.nextLevelXP} XP
                      </div>
                    </div>
                    <div className="h-2 bg-aoe-panel rounded-sm overflow-hidden">
                      <div
                        className="h-full bg-aoe-gold"
                        style={{ width: `${(statsData.currentXP / statsData.nextLevelXP) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Estatísticas de Sequência */}
                <div className="bg-aoe-dark-blue border border-aoe-border rounded-md p-4">
                  <h3 className="text-lg font-trajan text-aoe-gold mb-4">Sequência</h3>
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-aoe-panel border-4 border-aoe-gold flex items-center justify-center mb-4">
                      <div className="text-3xl font-bold text-aoe-gold">{statsData.streak}</div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-aoe-light">Dias Consecutivos</p>
                      <p className="text-xs text-aoe-muted mt-1">Recorde: {statsData.longestStreak} dias</p>
                    </div>
                  </div>
                </div>

                {/* Estatísticas de Tempo */}
                <div className="bg-aoe-dark-blue border border-aoe-border rounded-md p-4">
                  <h3 className="text-lg font-trajan text-aoe-gold mb-4">Tempo</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-aoe-muted">Tempo Total</div>
                      <div className="text-lg text-aoe-light">{statsData.timeSpent}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-aoe-muted">Dia Mais Produtivo</div>
                      <div className="text-sm text-aoe-light">{statsData.mostProductiveDay}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-aoe-muted">Horário Mais Produtivo</div>
                      <div className="text-sm text-aoe-light">{statsData.mostProductiveTime}</div>
                    </div>
                  </div>
                </div>

                {/* Gráfico de Atividade (Simulado) */}
                <div className="bg-aoe-dark-blue border border-aoe-border rounded-md p-4 lg:col-span-2">
                  <h3 className="text-lg font-trajan text-aoe-gold mb-4">Atividade Recente</h3>
                  <div className="h-48 flex items-end justify-between gap-2">
                    {activityHistory.map((day, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div
                          className="w-full bg-aoe-gold/70 hover:bg-aoe-gold transition-colors"
                          style={{ height: `${(day.tasks / 6) * 100}%` }}
                        ></div>
                        <div className="text-xs text-aoe-muted mt-2">{day.date.split("/")[0]}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="text-xs text-aoe-muted">16/04</div>
                    <div className="text-xs text-aoe-muted">22/04</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Conteúdo da Tab Conquistas */}
          {activeTab === "achievements" && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`bg-aoe-dark-blue border rounded-md p-4 ${
                      achievement.completed ? "border-aoe-gold/50" : "border-aoe-border"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          achievement.completed ? "bg-aoe-gold/20 text-aoe-gold" : "bg-aoe-panel text-aoe-muted"
                        }`}
                      >
                        {achievement.icon}
                      </div>
                      <div>
                        <h3 className="text-aoe-light font-medium">{achievement.name}</h3>
                        <p className="text-xs text-aoe-muted">{achievement.description}</p>
                      </div>
                    </div>
                    {achievement.completed ? (
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-aoe-gold">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          <span className="text-sm">Concluído</span>
                        </div>
                        <div className="text-xs text-aoe-muted">{achievement.date}</div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-aoe-muted">Progresso</span>
                          <span className="text-aoe-light">{achievement.progress}%</span>
                        </div>
                        <div className="h-2 bg-aoe-panel rounded-sm overflow-hidden">
                          <div className="h-full bg-aoe-gold/70" style={{ width: `${achievement.progress}%` }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conteúdo da Tab Histórico */}
          {activeTab === "history" && (
            <div className="p-6">
              <div className="bg-aoe-dark-blue border border-aoe-border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-aoe-border">
                      <th className="text-left p-4 text-sm font-trajan text-aoe-gold">Data</th>
                      <th className="text-left p-4 text-sm font-trajan text-aoe-gold">Tarefas Concluídas</th>
                      <th className="text-left p-4 text-sm font-trajan text-aoe-gold">XP Ganho</th>
                      <th className="text-left p-4 text-sm font-trajan text-aoe-gold">Detalhes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activityHistory.map((day, index) => (
                      <tr key={index} className="border-b border-aoe-border/50 hover:bg-aoe-panel/50">
                        <td className="p-4 text-sm text-aoe-light">{day.date}</td>
                        <td className="p-4 text-sm text-aoe-light">{day.tasks}</td>
                        <td className="p-4 text-sm text-aoe-gold">+{day.xp} XP</td>
                        <td className="p-4">
                          <AoE4Button variant="secondary" size="sm">
                            Ver
                          </AoE4Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <AoE4Button variant="secondary">Carregar Mais</AoE4Button>
              </div>
            </div>
          )}
        </AoE4Panel>
      </div>
    </main>
  )
}
