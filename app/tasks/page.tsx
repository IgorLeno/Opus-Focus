"use client"

import { useState } from "react"
import { TopMenu } from "@/components/top-menu"
import { AoE4Panel } from "@/components/aoe4-panel"
import { AoE4Button } from "@/components/aoe4-button"
import { TaskMap } from "@/components/task-map"
import { PlusIcon, FilterIcon, SearchIcon, MapIcon, ListIcon } from "lucide-react"

// Dados de exemplo para tarefas
const tasks = [
  {
    id: "t1",
    title: "Pesquisar referências",
    description: "Encontrar artigos e livros sobre o tema do projeto",
    status: "completed",
    priority: "high",
    dueDate: "2025-04-25",
    map: "Projeto Final",
    dependencies: [],
  },
  {
    id: "t2",
    title: "Escrever introdução",
    description: "Redigir a introdução do trabalho com base nas referências",
    status: "in-progress",
    priority: "high",
    dueDate: "2025-04-28",
    map: "Projeto Final",
    dependencies: ["t1"],
  },
  {
    id: "t3",
    title: "Criar slides de apresentação",
    description: "Preparar slides para a apresentação do projeto",
    status: "not-started",
    priority: "medium",
    dueDate: "2025-05-05",
    map: "Projeto Final",
    dependencies: ["t2"],
  },
  {
    id: "t4",
    title: "Praticar vocabulário",
    description: "Revisar as palavras novas da semana",
    status: "in-progress",
    priority: "medium",
    dueDate: "2025-04-26",
    map: "Aprendizado de Inglês",
    dependencies: [],
  },
  {
    id: "t5",
    title: "Assistir vídeo-aula",
    description: "Ver a aula sobre gramática avançada",
    status: "not-started",
    priority: "low",
    dueDate: "2025-04-30",
    map: "Aprendizado de Inglês",
    dependencies: [],
  },
]

export default function TasksPage() {
  const [viewMode, setViewMode] = useState<"list" | "map">("map")
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState({
    status: "all", // all, completed, in-progress, not-started
    priority: "all", // all, high, medium, low
    map: "all",
  })

  // Filtrar tarefas com base no termo de pesquisa e filtros
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filter.status === "all" || task.status === filter.status
    const matchesPriority = filter.priority === "all" || task.priority === filter.priority
    const matchesMap = filter.map === "all" || task.map === filter.map

    return matchesSearch && matchesStatus && matchesPriority && matchesMap
  })

  // Obter mapas únicos para o filtro
  const uniqueMaps = Array.from(new Set(tasks.map((task) => task.map)))

  return (
    <div className="flex flex-col min-h-screen bg-aoe-dark-blue">
      <TopMenu activeItem="tasks" />

      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-cinzel text-aoe-gold">Suas Tarefas</h1>
          <div className="flex space-x-2">
            <button
              className={`p-2 rounded-md ${
                viewMode === "list"
                  ? "bg-aoe-gold text-aoe-dark-blue"
                  : "bg-aoe-dark-blue text-aoe-light border border-aoe-border"
              }`}
              onClick={() => setViewMode("list")}
              aria-label="Visualização em lista"
            >
              <ListIcon className="h-5 w-5" />
            </button>
            <button
              className={`p-2 rounded-md ${
                viewMode === "map"
                  ? "bg-aoe-gold text-aoe-dark-blue"
                  : "bg-aoe-dark-blue text-aoe-light border border-aoe-border"
              }`}
              onClick={() => setViewMode("map")}
              aria-label="Visualização em mapa"
            >
              <MapIcon className="h-5 w-5" />
            </button>
            <AoE4Button href="/task/new">
              <PlusIcon className="h-4 w-4 mr-2" />
              Nova Tarefa
            </AoE4Button>
          </div>
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
                    placeholder="Buscar tarefas..."
                    className="w-full pl-10 pr-4 py-2 bg-aoe-dark-blue border border-aoe-border rounded-md text-aoe-light focus:outline-none focus:ring-2 focus:ring-aoe-gold/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2">
                  <div className="relative">
                    <button className="px-4 py-2 bg-aoe-dark-blue text-aoe-light border border-aoe-border rounded-md hover:bg-aoe-dark-blue/80 flex items-center">
                      <FilterIcon className="h-4 w-4 mr-2" />
                      Status: {filter.status === "all" ? "Todos" : filter.status}
                    </button>
                    {/* Dropdown para status (simplificado) */}
                  </div>
                  <div className="relative">
                    <button className="px-4 py-2 bg-aoe-dark-blue text-aoe-light border border-aoe-border rounded-md hover:bg-aoe-dark-blue/80 flex items-center">
                      <FilterIcon className="h-4 w-4 mr-2" />
                      Prioridade: {filter.priority === "all" ? "Todas" : filter.priority}
                    </button>
                    {/* Dropdown para prioridade (simplificado) */}
                  </div>
                  <div className="relative">
                    <button className="px-4 py-2 bg-aoe-dark-blue text-aoe-light border border-aoe-border rounded-md hover:bg-aoe-dark-blue/80 flex items-center">
                      <FilterIcon className="h-4 w-4 mr-2" />
                      Mapa: {filter.map === "all" ? "Todos" : filter.map}
                    </button>
                    {/* Dropdown para mapa (simplificado) */}
                  </div>
                </div>
              </div>
            </div>
          </AoE4Panel>
        </div>

        {viewMode === "map" ? (
          <AoE4Panel>
            <div className="p-4">
              <div className="h-[600px] relative">
                <TaskMap tasks={filteredTasks} />
              </div>
            </div>
          </AoE4Panel>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <AoE4Panel key={task.id}>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-cinzel text-aoe-gold">{task.title}</h2>
                      <p className="text-sm text-aoe-muted">{task.description}</p>
                      <div className="mt-2 flex items-center text-xs text-aoe-muted">
                        <MapIcon className="h-3 w-3 mr-1" />
                        <span>{task.map}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div
                        className={`px-2 py-1 rounded-md text-xs ${
                          task.status === "completed"
                            ? "bg-green-900/30 text-green-400"
                            : task.status === "in-progress"
                              ? "bg-blue-900/30 text-blue-400"
                              : "bg-gray-900/30 text-gray-400"
                        }`}
                      >
                        {task.status === "completed"
                          ? "Concluída"
                          : task.status === "in-progress"
                            ? "Em Progresso"
                            : "Não Iniciada"}
                      </div>
                      <div
                        className={`mt-1 px-2 py-1 rounded-md text-xs ${
                          task.priority === "high"
                            ? "bg-red-900/30 text-red-400"
                            : task.priority === "medium"
                              ? "bg-yellow-900/30 text-yellow-400"
                              : "bg-green-900/30 text-green-400"
                        }`}
                      >
                        {task.priority === "high"
                          ? "Alta Prioridade"
                          : task.priority === "medium"
                            ? "Média Prioridade"
                            : "Baixa Prioridade"}
                      </div>
                      <div className="mt-1 text-xs text-aoe-muted">
                        Prazo: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <AoE4Button size="sm" href={`/task/${task.id}`}>
                      Ver Detalhes
                    </AoE4Button>
                  </div>
                </div>
              </AoE4Panel>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
