"use client"

import { useState } from "react"
import { TopMenu } from "@/components/top-menu"
import { AoE4Panel } from "@/components/aoe4-panel"
import { AoE4Button } from "@/components/aoe4-button"
import { MapIcon, CalendarIcon, ClockIcon, PlusIcon, SearchIcon } from "lucide-react"

// Dados de exemplo para mapas
const maps = [
  {
    id: 1,
    name: "Projeto Final",
    description: "Mapa para gerenciar as tarefas do projeto final do semestre",
    progress: 65,
    tasks: 10,
    completedTasks: 6,
    lastActivity: "Hoje",
    createdAt: "10/04/2025",
  },
  {
    id: 2,
    name: "Aprendizado de Inglês",
    description: "Mapa para acompanhar o progresso no curso de inglês",
    progress: 42,
    tasks: 20,
    completedTasks: 8,
    lastActivity: "Ontem",
    createdAt: "05/03/2025",
  },
  {
    id: 3,
    name: "Planejamento Financeiro",
    description: "Mapa para organizar e acompanhar metas financeiras",
    progress: 78,
    tasks: 8,
    completedTasks: 6,
    lastActivity: "3 dias atrás",
    createdAt: "15/02/2025",
  },
  {
    id: 4,
    name: "Hábitos Saudáveis",
    description: "Mapa para desenvolver e manter hábitos saudáveis",
    progress: 30,
    tasks: 15,
    completedTasks: 4,
    lastActivity: "1 semana atrás",
    createdAt: "20/01/2025",
  },
]

export default function MapsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all") // all, active, completed

  // Filtrar mapas com base no termo de pesquisa e filtro
  const filteredMaps = maps.filter((map) => {
    const matchesSearch = map.name.toLowerCase().includes(searchTerm.toLowerCase())

    if (filter === "all") return matchesSearch
    if (filter === "active") return matchesSearch && map.progress < 100
    if (filter === "completed") return matchesSearch && map.progress === 100

    return matchesSearch
  })

  return (
    <div className="flex flex-col min-h-screen bg-aoe-dark-blue">
      <TopMenu activeItem="maps" />

      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-cinzel text-aoe-gold">Seus Mapas de Conquista</h1>
          <AoE4Button href="/create-map">
            <PlusIcon className="h-4 w-4 mr-2" />
            Novo Mapa
          </AoE4Button>
        </div>

        <div className="mb-6">
          <AoE4Panel>
            <div className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-aoe-muted" />
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar mapas..."
                    className="w-full pl-10 pr-4 py-2 bg-aoe-dark-blue border border-aoe-border rounded-md text-aoe-light focus:outline-none focus:ring-2 focus:ring-aoe-gold/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    className={`px-4 py-2 rounded-md ${
                      filter === "all"
                        ? "bg-aoe-gold text-aoe-dark-blue"
                        : "bg-aoe-dark-blue text-aoe-light border border-aoe-border hover:bg-aoe-dark-blue/80"
                    }`}
                    onClick={() => setFilter("all")}
                  >
                    Todos
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md ${
                      filter === "active"
                        ? "bg-aoe-gold text-aoe-dark-blue"
                        : "bg-aoe-dark-blue text-aoe-light border border-aoe-border hover:bg-aoe-dark-blue/80"
                    }`}
                    onClick={() => setFilter("active")}
                  >
                    Em Progresso
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md ${
                      filter === "completed"
                        ? "bg-aoe-gold text-aoe-dark-blue"
                        : "bg-aoe-dark-blue text-aoe-light border border-aoe-border hover:bg-aoe-dark-blue/80"
                    }`}
                    onClick={() => setFilter("completed")}
                  >
                    Concluídos
                  </button>
                </div>
              </div>
            </div>
          </AoE4Panel>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaps.map((map) => (
            <AoE4Panel key={map.id} className="h-full">
              <div className="p-4 flex flex-col h-full">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-cinzel text-aoe-gold">{map.name}</h2>
                  <div className="flex items-center text-xs text-aoe-muted">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    <span>{map.createdAt}</span>
                  </div>
                </div>
                <p className="text-sm text-aoe-muted mb-4">{map.description}</p>

                <div className="space-y-3 mb-4 flex-grow">
                  <div className="flex justify-between text-xs">
                    <span className="text-aoe-muted">Progresso</span>
                    <span className="text-aoe-gold">{map.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-aoe-dark-blue rounded-sm overflow-hidden">
                    <div className="h-full bg-aoe-gold" style={{ width: `${map.progress}%` }}></div>
                  </div>

                  <div className="flex justify-between text-xs">
                    <div className="flex items-center text-aoe-muted">
                      <MapIcon className="h-3 w-3 mr-1" />
                      <span>
                        {map.completedTasks}/{map.tasks} tarefas
                      </span>
                    </div>
                    <div className="flex items-center text-aoe-muted">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      <span>{map.lastActivity}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <AoE4Button variant="secondary" size="sm" href={`/map/${map.id}`}>
                    Visualizar
                  </AoE4Button>
                  <AoE4Button size="sm" href={`/war-room?map=${map.id}`}>
                    Conquistar
                  </AoE4Button>
                </div>
              </div>
            </AoE4Panel>
          ))}
        </div>
      </div>
    </div>
  )
}
