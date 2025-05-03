"use client"

import { useState } from "react"
import { TopMenu } from "@/components/top-menu"
import { AoE4Panel } from "@/components/aoe4-panel"
import { AoE4Button } from "@/components/aoe4-button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Plus,
  Search,
  Filter,
  ChevronDown,
  Edit,
  Trash2,
  BookOpen,
  Video,
  Code,
  FileText,
  CheckCircle,
  X,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Tipos para as tarefas
interface Task {
  id: string
  title: string
  type: string
  difficulty: "Fácil" | "Médio" | "Difícil"
  points: number
  validation: string
}

// Dados de exemplo para as tarefas
const sampleTasks: Task[] = [
  {
    id: "task1",
    title: "Artigo sobre algoritmos de machine learning",
    type: "Leitura",
    difficulty: "Fácil",
    points: 25,
    validation: "Quiz",
  },
  {
    id: "task2",
    title: "Aula de React Hooks",
    type: "Vídeo do YouTube",
    difficulty: "Médio",
    points: 50,
    validation: "Tempo",
  },
  {
    id: "task3",
    title: "Implementar algoritmo de ordenação",
    type: "Código",
    difficulty: "Difícil",
    points: 75,
    validation: "Nenhum",
  },
  {
    id: "task4",
    title: "Revisão de Flash Cards",
    type: "NotebookLM",
    difficulty: "Fácil",
    points: 30,
    validation: "Tempo",
  },
  {
    id: "task5",
    title: "Estudo de Estrutura de Dados",
    type: "Leitura",
    difficulty: "Médio",
    points: 45,
    validation: "Quiz",
  },
  {
    id: "task6",
    title: "Curso de Python Básico",
    type: "Curso",
    difficulty: "Fácil",
    points: 35,
    validation: "Quiz",
  },
  {
    id: "task7",
    title: "Construir um Dashboard",
    type: "Código",
    difficulty: "Difícil",
    points: 80,
    validation: "Nenhum",
  },
  {
    id: "task8",
    title: "Leitura sobre Design Patterns",
    type: "Leitura",
    difficulty: "Médio",
    points: 55,
    validation: "Tempo",
  },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Filtrar tarefas com base na pesquisa e filtros
  const filteredTasks = tasks.filter((task) => {
    // Filtrar por pesquisa
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Filtrar por tipo
    if (activeFilters.length > 0 && !activeFilters.includes(task.type)) {
      return false
    }

    return true
  })

  // Função para alternar filtros
  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  // Limpar todos os filtros
  const clearFilters = () => {
    setActiveFilters([])
    setSearchQuery("")
  }

  // Ícone baseado no tipo de tarefa
  const getTaskIcon = (type: string) => {
    switch (type) {
      case "Leitura":
        return <BookOpen className="h-5 w-5 text-blue-500" />
      case "Vídeo do YouTube":
        return <Video className="h-5 w-5 text-red-500" />
      case "Código":
        return <Code className="h-5 w-5 text-purple-500" />
      case "NotebookLM":
        return <FileText className="h-5 w-5 text-teal-500" />
      case "Curso":
        return <BookOpen className="h-5 w-5 text-amber-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <main className="flex flex-col min-h-screen bg-aoe-bg bg-cover bg-center">
      <TopMenu activeItem="tasks" />

      <div className="container mx-auto px-4 py-8 mt-16 flex-1">
        <AoE4Panel>
          <div className="aoe4-panel-header flex justify-between items-center">
            <h2 className="text-xl font-trajan text-aoe-gold">Banco de Tarefas</h2>
            <AoE4Button size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Adicionar Nova Tarefa</span>
            </AoE4Button>
          </div>

          <div className="p-6">
            {/* Barra de pesquisa e filtros */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-aoe-muted" />
                <Input
                  placeholder="Pesquisar tarefas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-aoe-dark-blue border-aoe-border text-aoe-light"
                />
                {searchQuery && (
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-aoe-muted hover:text-aoe-light"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <AoE4Button variant="secondary" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filtrar</span>
                    <ChevronDown className="h-4 w-4" />
                  </AoE4Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-aoe-dark-blue border-aoe-border">
                  <DropdownMenuLabel className="text-aoe-light">Filtrar por Tipo</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-aoe-border" />
                  <DropdownMenuItem
                    className={`flex items-center gap-2 cursor-pointer ${activeFilters.includes("Leitura") ? "bg-aoe-gold/20" : ""}`}
                    onClick={() => toggleFilter("Leitura")}
                  >
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <span className="text-aoe-light">Leitura</span>
                    {activeFilters.includes("Leitura") && <CheckCircle className="h-4 w-4 ml-auto text-aoe-gold" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`flex items-center gap-2 cursor-pointer ${activeFilters.includes("Vídeo do YouTube") ? "bg-aoe-gold/20" : ""}`}
                    onClick={() => toggleFilter("Vídeo do YouTube")}
                  >
                    <Video className="h-4 w-4 text-red-500" />
                    <span className="text-aoe-light">Vídeo do YouTube</span>
                    {activeFilters.includes("Vídeo do YouTube") && (
                      <CheckCircle className="h-4 w-4 ml-auto text-aoe-gold" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`flex items-center gap-2 cursor-pointer ${activeFilters.includes("Código") ? "bg-aoe-gold/20" : ""}`}
                    onClick={() => toggleFilter("Código")}
                  >
                    <Code className="h-4 w-4 text-purple-500" />
                    <span className="text-aoe-light">Código</span>
                    {activeFilters.includes("Código") && <CheckCircle className="h-4 w-4 ml-auto text-aoe-gold" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`flex items-center gap-2 cursor-pointer ${activeFilters.includes("Curso") ? "bg-aoe-gold/20" : ""}`}
                    onClick={() => toggleFilter("Curso")}
                  >
                    <BookOpen className="h-4 w-4 text-amber-500" />
                    <span className="text-aoe-light">Curso</span>
                    {activeFilters.includes("Curso") && <CheckCircle className="h-4 w-4 ml-auto text-aoe-gold" />}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-aoe-border" />
                  <DropdownMenuItem
                    className="text-aoe-muted cursor-pointer hover:text-aoe-light"
                    onClick={clearFilters}
                  >
                    Limpar filtros
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Exibição de filtros ativos */}
            {(activeFilters.length > 0 || searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <div className="text-xs text-aoe-muted">Filtros ativos:</div>
                {searchQuery && (
                  <Badge variant="outline" className="gap-1 bg-aoe-dark-blue/50 border-aoe-border">
                    <Search className="h-3 w-3 text-aoe-gold" />
                    {searchQuery}
                    <button className="ml-1" onClick={() => setSearchQuery("")}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {activeFilters.map((filter) => (
                  <Badge key={filter} variant="outline" className="gap-1 bg-aoe-dark-blue/50 border-aoe-border">
                    {getTaskIcon(filter)}
                    {filter}
                    <button className="ml-1" onClick={() => toggleFilter(filter)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <button className="text-xs text-aoe-gold hover:text-aoe-gold/80" onClick={clearFilters}>
                  Limpar todos
                </button>
              </div>
            )}

            {/* Tabela de tarefas */}
            <div className="rounded-lg border border-aoe-border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-aoe-border bg-aoe-dark-blue/70">
                    <th className="text-left p-3 font-medium text-aoe-gold">Título</th>
                    <th className="text-left p-3 font-medium text-aoe-gold">Tipo</th>
                    <th className="text-left p-3 font-medium text-aoe-gold">Dificuldade</th>
                    <th className="text-center p-3 font-medium text-aoe-gold">Pontos</th>
                    <th className="text-left p-3 font-medium text-aoe-gold">Validação</th>
                    <th className="text-center p-3 font-medium text-aoe-gold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task) => (
                    <tr key={task.id} className="border-b border-aoe-border hover:bg-aoe-dark-blue/50">
                      <td className="p-3">
                        <div className="font-medium text-aoe-light">{task.title}</div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {getTaskIcon(task.type)}
                          <span className="text-aoe-muted">{task.type}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div
                          className={`text-xs px-2 py-0.5 rounded-full w-fit ${
                            task.difficulty === "Fácil"
                              ? "bg-blue-500/20 text-blue-400"
                              : task.difficulty === "Médio"
                                ? "bg-purple-500/20 text-purple-400"
                                : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {task.difficulty}
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <div className="text-aoe-gold font-medium">{task.points}</div>
                      </td>
                      <td className="p-3 text-aoe-muted">{task.validation}</td>
                      <td className="p-3">
                        <div className="flex justify-center gap-2">
                          <button className="text-aoe-muted hover:text-aoe-light">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-aoe-muted hover:text-aoe-red">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredTasks.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-aoe-muted">
                        Nenhuma tarefa encontrada. Tente ajustar sua pesquisa ou adicione uma nova tarefa.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </AoE4Panel>
      </div>
    </main>
  )
}
