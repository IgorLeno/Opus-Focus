"use client"

import { useState } from "react"
import { TopMenu } from "@/components/top-menu"
import { AoE4Panel } from "@/components/aoe4-panel"
import { AoE4Button } from "@/components/aoe4-button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, ChevronDown, Star, CheckCircle, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Tipos para os mapas
interface Map {
  id: string
  name: string
  description: string
  status: "active" | "completed" | "inactive"
  progress: number
  theme: string
  totalTasks: number
  completedTasks: number
  createdAt: string
  completedAt?: string
  sector: string
  deadline?: string
  collaborators?: number
}

// Dados de exemplo para os setores
const sectors = [
  { id: "sector1", name: "Trabalho" },
  { id: "sector2", name: "Estudos" },
  { id: "sector3", name: "Projetos Pessoais" },
  { id: "sector4", name: "Não Categorizado" },
  { id: "sector5", name: "Arquivados" },
]

// Dados de exemplo para os mapas
const sampleMaps: Map[] = [
  {
    id: "map1",
    name: "Projeto Final",
    description: "Desenvolvimento do projeto de conclusão de curso",
    status: "active",
    progress: 45,
    theme: "space",
    totalTasks: 10,
    completedTasks: 4,
    createdAt: "2025-04-15",
    sector: "sector1",
    deadline: "2025-05-30",
    collaborators: 2,
  },
  {
    id: "map2",
    name: "Curso de React",
    description: "Aprendizado completo de React e seus hooks",
    status: "completed",
    progress: 100,
    theme: "tech",
    totalTasks: 12,
    completedTasks: 12,
    createdAt: "2025-03-10",
    completedAt: "2025-04-05",
    sector: "sector2",
  },
  {
    id: "map3",
    name: "Aprendizado de Inglês",
    description: "Estudo diário para aprimorar o inglês",
    status: "inactive",
    progress: 30,
    theme: "forest",
    totalTasks: 20,
    completedTasks: 6,
    createdAt: "2025-04-01",
    sector: "sector2",
    deadline: "2025-12-31",
  },
  {
    id: "map4",
    name: "Preparação para Certificação",
    description: "Estudos para certificação profissional",
    status: "inactive",
    progress: 15,
    theme: "space",
    totalTasks: 8,
    completedTasks: 1,
    createdAt: "2025-04-10",
    sector: "sector2",
    deadline: "2025-06-15",
  },
  {
    id: "map5",
    name: "Leitura de Livros",
    description: "Meta de leitura anual",
    status: "completed",
    progress: 100,
    theme: "forest",
    totalTasks: 15,
    completedTasks: 15,
    createdAt: "2025-02-20",
    completedAt: "2025-03-25",
    sector: "sector3",
  },
  {
    id: "map6",
    name: "Projeto Pessoal",
    description: "Desenvolvimento de aplicativo pessoal",
    status: "inactive",
    progress: 60,
    theme: "tech",
    totalTasks: 20,
    completedTasks: 12,
    createdAt: "2025-03-15",
    sector: "sector3",
    deadline: "2025-07-01",
    collaborators: 1,
  },
]

export default function MapsPage() {
  const [maps, setMaps] = useState<Map[]>(sampleMaps)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [sectorFilter, setSectorFilter] = useState<string | null>(null)

  // Filtrar mapas com base na pesquisa e filtros
  const filteredMaps = maps.filter((map) => {
    // Filtrar por pesquisa
    if (searchQuery && !map.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Filtrar por status
    if (activeFilters.length > 0 && !activeFilters.includes(map.status)) {
      return false
    }

    // Filtrar por setor
    if (sectorFilter && map.sector !== sectorFilter) {
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
    setSectorFilter(null)
  }

  // Obter nome do setor
  const getSectorName = (sectorId: string) => {
    return sectors.find((s) => s.id === sectorId)?.name || "Desconhecido"
  }

  return (
    <main className="flex flex-col min-h-screen bg-aoe-bg bg-cover bg-center">
      <TopMenu activeItem="maps" />

      <div className="container mx-auto px-4 py-8 mt-16 flex-1">
        <AoE4Panel>
          <div className="aoe4-panel-header flex justify-between items-center">
            <h2 className="text-xl font-trajan text-aoe-gold">Mapas de Conquista</h2>
            <AoE4Button size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Criar Novo Mapa</span>
            </AoE4Button>
          </div>

          <div className="p-6">
            {/* Barra de pesquisa e filtros */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-aoe-muted" />
                <Input
                  placeholder="Pesquisar mapas..."
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
                    <span>Status</span>
                    <ChevronDown className="h-4 w-4" />
                  </AoE4Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-aoe-dark-blue border-aoe-border">
                  <DropdownMenuLabel className="text-aoe-light">Filtrar por Status</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-aoe-border" />
                  <DropdownMenuItem
                    className={`flex items-center gap-2 cursor-pointer ${activeFilters.includes("active") ? "bg-aoe-gold/20" : ""}`}
                    onClick={() => toggleFilter("active")}
                  >
                    <Star className="h-4 w-4 text-aoe-gold" />
                    <span className="text-aoe-light">Ativos</span>
                    {activeFilters.includes("active") && <CheckCircle className="h-4 w-4 ml-auto text-aoe-gold" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`flex items-center gap-2 cursor-pointer ${activeFilters.includes("completed") ? "bg-aoe-gold/20" : ""}`}
\
