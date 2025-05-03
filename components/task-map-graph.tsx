"use client"

import { useState, useRef, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { ZoomIn, ZoomOut, Maximize, Layers } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Task } from "./task-map"

type TaskMapGraphProps = {
  tasks: Task[]
}

// Componente para os nós de tarefas
const TaskNode = ({ id, title, status, difficulty, points, x, y, onClick }) => {
  // Definir cores e estilos com base no status
  const statusStyles = {
    available: {
      borderColor: "hsl(var(--primary))",
      bgColor: "rgba(137, 180, 250, 0.15)",
      iconColor: "text-primary",
      glow: "task-node-glow-primary",
    },
    blocked: {
      borderColor: "hsl(var(--muted))",
      bgColor: "rgba(100, 100, 120, 0.1)",
      iconColor: "text-muted-foreground",
      glow: "",
    },
    completed: {
      borderColor: "hsl(var(--accent))",
      bgColor: "rgba(196, 141, 250, 0.15)",
      iconColor: "text-accent",
      glow: "task-node-glow-accent",
    },
    mandatory: {
      borderColor: "hsl(var(--destructive))",
      bgColor: "rgba(250, 141, 141, 0.15)",
      iconColor: "text-destructive",
      glow: "task-node-glow-destructive",
    },
  }

  const style = statusStyles[status]

  // Ícones para diferentes tipos de tarefas
  const statusIcons = {
    available: "📄",
    blocked: "🔒",
    completed: "✓",
    mandatory: "🔥",
  }

  // Indicador de dificuldade
  const difficultyStars = {
    easy: "⭐",
    medium: "⭐⭐",
    hard: "⭐⭐⭐",
  }

  return (
    <div
      className={`task-node ${style.glow} absolute flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-110 z-10`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
      onClick={() => onClick(id)}
    >
      <div
        className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center ${style.iconColor} relative`}
        style={{
          borderColor: style.borderColor,
          backgroundColor: style.bgColor,
          boxShadow: status !== "blocked" ? `0 0 10px ${style.borderColor}` : "none",
        }}
      >
        {/* Efeito de brilho */}
        <div
          className={`absolute inset-1 rounded-full blur-md opacity-70`}
          style={{ backgroundColor: style.borderColor }}
        ></div>

        {/* Conteúdo */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="text-lg">{statusIcons[status]}</div>

          {/* Indicador de tarefa obrigatória */}
          {status === "mandatory" && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center text-[10px] text-white font-bold">
              !
            </div>
          )}
        </div>
      </div>

      {/* Título da tarefa */}
      <div className="mt-1 text-xs font-medium max-w-[80px] text-center truncate">{title}</div>

      {/* Dificuldade e pontos */}
      <div className="mt-0.5 text-[10px] text-muted-foreground">
        <span title={`Dificuldade: ${difficulty}`}>{difficultyStars[difficulty]}</span>
        <span className="ml-1">{points}pts</span>
      </div>
    </div>
  )
}

// Componente para as conexões entre tarefas
const TaskConnections = ({ tasks, connections }) => {
  // Função para calcular as coordenadas das conexões
  const getConnectionPath = (sourceId, targetId) => {
    const source = tasks.find((t) => t.id === sourceId)
    const target = tasks.find((t) => t.id === targetId)

    if (!source || !target) return ""

    // Calcular posições em porcentagem
    const x1 = source.x
    const y1 = source.y
    const x2 = target.x
    const y2 = target.y

    // Criar um caminho curvo
    return `M ${x1}% ${y1}% C ${(x1 + x2) / 2}% ${y1}%, ${(x1 + x2) / 2}% ${y2}%, ${x2}% ${y2}%`
  }

  // Verificar se uma conexão está ativa
  const isConnectionActive = (sourceId, targetId) => {
    const source = tasks.find((t) => t.id === sourceId)
    const target = tasks.find((t) => t.id === targetId)

    return source?.status === "completed" && (target?.status === "available" || target?.status === "mandatory")
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      {connections.map((conn) => {
        const active = isConnectionActive(conn.source, conn.target)
        return (
          <path
            key={`${conn.source}-${conn.target}`}
            d={getConnectionPath(conn.source, conn.target)}
            fill="none"
            stroke={active ? "hsl(var(--primary))" : "rgba(100, 100, 120, 0.3)"}
            strokeWidth={active ? 2 : 1.5}
            strokeDasharray={active ? "none" : "5,5"}
            className={active ? "task-edge-active" : ""}
          />
        )
      })}
    </svg>
  )
}

// Dados de exemplo para as tarefas
const initialTasks = [
  // Camada 1 (Início)
  {
    id: "task1",
    title: "Início do Projeto",
    status: "completed",
    difficulty: "easy",
    points: 10,
    layer: 1,
    x: 10,
    y: 50,
  },

  // Camada 2
  {
    id: "task2",
    title: "Pesquisa Inicial",
    status: "completed",
    difficulty: "medium",
    points: 20,
    layer: 2,
    x: 25,
    y: 30,
  },
  {
    id: "task3",
    title: "Planejamento",
    status: "mandatory",
    difficulty: "medium",
    points: 25,
    layer: 2,
    x: 25,
    y: 70,
  },

  // Camada 3
  {
    id: "task4",
    title: "Desenvolvimento Parte 1",
    status: "available",
    difficulty: "hard",
    points: 40,
    layer: 3,
    x: 40,
    y: 20,
  },
  {
    id: "task5",
    title: "Desenvolvimento Parte 2",
    status: "available",
    difficulty: "hard",
    points: 40,
    layer: 3,
    x: 40,
    y: 50,
  },
  {
    id: "task6",
    title: "Revisão de Literatura",
    status: "available",
    difficulty: "medium",
    points: 30,
    layer: 3,
    x: 40,
    y: 80,
  },

  // Camada 4
  {
    id: "task7",
    title: "Testes Iniciais",
    status: "blocked",
    difficulty: "medium",
    points: 25,
    layer: 4,
    x: 55,
    y: 35,
  },
  {
    id: "task8",
    title: "Documentação",
    status: "blocked",
    difficulty: "easy",
    points: 15,
    layer: 4,
    x: 55,
    y: 65,
  },

  // Camada 5
  {
    id: "task9",
    title: "Finalização",
    status: "blocked",
    difficulty: "hard",
    points: 50,
    layer: 5,
    x: 70,
    y: 50,
  },

  // Camada 6
  {
    id: "task10",
    title: "Entrega Final",
    status: "blocked",
    difficulty: "hard",
    points: 60,
    layer: 6,
    x: 85,
    y: 50,
  },
]

// Conexões entre as tarefas
const initialConnections = [
  { source: "task1", target: "task2" },
  { source: "task1", target: "task3" },
  { source: "task2", target: "task4" },
  { source: "task2", target: "task6" },
  { source: "task3", target: "task5" },
  { source: "task4", target: "task7" },
  { source: "task5", target: "task7" },
  { source: "task6", target: "task8" },
  { source: "task7", target: "task9" },
  { source: "task8", target: "task9" },
  { source: "task9", target: "task10" },
]

export function TaskMapGraph({ tasks }: TaskMapGraphProps) {
  const [selectedTask, setSelectedTask] = useState(null)
  const [showLayerInfo, setShowLayerInfo] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const mapRef = useRef(null)

  // Função para desenhar as linhas de dependência entre tarefas
  const renderDependencyLines = () => {
    return tasks.flatMap((task) => {
      return task.dependencies
        .map((depId) => {
          const dependencyTask = tasks.find((t) => t.id === depId)
          if (!dependencyTask) return null

          // Calcula os pontos de início e fim da linha
          const startX = task.position.x
          const startY = task.position.y
          const endX = dependencyTask.position.x
          const endY = dependencyTask.position.y

          // Calcula o comprimento da linha para determinar a intensidade do gradiente
          const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2))

          // Determina a cor com base no status da tarefa de destino
          const getGradientColor = () => {
            switch (dependencyTask.status) {
              case "completed":
                return "rgba(34, 197, 94, 0.7)" // verde
              case "in-progress":
                return "rgba(234, 179, 8, 0.7)" // amarelo
              case "pending":
                return "rgba(59, 130, 246, 0.7)" // azul
              default:
                return "rgba(59, 130, 246, 0.7)"
            }
          }

          // Cria um ID único para o gradiente
          const gradientId = `gradient-${task.id}-${depId}`

          return (
            <g key={`${task.id}-${depId}`}>
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(234, 179, 8, 0.7)" />
                  <stop offset="100%" stopColor={getGradientColor()} />
                </linearGradient>
              </defs>
              <line
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke={`url(#${gradientId})`}
                strokeWidth="3"
                strokeDasharray={dependencyTask.status === "completed" ? "none" : "5,5"}
                markerEnd="url(#arrowhead)"
              />
            </g>
          )
        })
        .filter(Boolean)
    })
  }

  // Manipular clique em uma tarefa
  const handleTaskClick = (id) => {
    const task = initialTasks.find((t) => t.id === id)
    if (task) {
      setSelectedTask(task)
    }
  }

  // Iniciar a tarefa selecionada
  const handleStartTask = () => {
    if (selectedTask) {
      // Em um app real, isso navegaria para a página da tarefa
      window.location.href = `/task?id=${selectedTask.id}`
    }
    setSelectedTask(null)
  }

  // Obter camadas únicas para exibir informações
  const layers = Array.from(new Set(initialTasks.map((task) => task.layer))).sort()

  // Funções para zoom e pan
  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.1, 1.5))
  }

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.1, 0.5))
  }

  const handleResetView = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  // Funções para arrastar o mapa
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Adicionar e remover event listeners
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragStart])

  // Renderizar camadas do mapa
  const renderLayers = () => {
    return layers.map((layer) => {
      const isBlocked = layer > 3
      return (
        <div
          key={`layer-${layer}`}
          className={`absolute h-full ${
            layer % 2 === 0 ? "bg-[#1e1e28]/40" : "bg-[#1e1e28]/20"
          } border-x border-[#2a2a35]`}
          style={{
            left: `${(layer - 1) * 15}%`,
            width: "15%",
            zIndex: 0,
          }}
        >
          <div className="absolute top-2 left-2 text-xs font-medium text-muted-foreground">Camada {layer}</div>

          {/* Névoa para camadas bloqueadas */}
          {isBlocked && <div className="absolute inset-0 bg-[#12121a]/70 backdrop-blur-[2px] z-5"></div>}
        </div>
      )
    })
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#12121a]">
      {/* Controles de zoom e navegação */}
      <div className="absolute right-4 top-4 z-20 flex flex-col gap-2">
        <Button variant="secondary" size="icon" onClick={() => setShowLayerInfo(!showLayerInfo)}>
          <Layers className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={handleZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={handleZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={handleResetView}>
          <Maximize className="h-4 w-4" />
        </Button>
      </div>

      {/* Informações sobre as camadas */}
      {showLayerInfo && (
        <div className="absolute left-4 top-4 z-20">
          <Card className="w-48">
            <CardContent className="p-3">
              <h4 className="mb-2 text-sm font-medium">Camadas</h4>
              <div className="space-y-2">
                {layers.map((layer) => (
                  <div key={layer} className="flex items-center justify-between">
                    <span className="text-xs">Camada {layer}</span>
                    <Badge variant={layer <= 3 ? "default" : "secondary"} className={layer <= 3 ? "" : "opacity-50"}>
                      {layer <= 3 ? "Desbloqueada" : "Bloqueada"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Legenda */}
      <div className="absolute left-4 bottom-4 z-20">
        <Card className="w-auto">
          <CardContent className="p-3">
            <h4 className="mb-2 text-xs font-medium">Legenda</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-xs">Disponível</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent"></div>
                <span className="text-xs">Concluída</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <span className="text-xs">Obrigatória</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted"></div>
                <span className="text-xs">Bloqueada</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mapa de tarefas */}
      <div
        ref={mapRef}
        className="relative h-full w-full bg-map-texture cursor-grab active:cursor-grabbing"
        style={{
          transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
          transformOrigin: "center",
          transition: isDragging ? "none" : "transform 0.3s ease",
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Camadas do mapa */}
        {renderLayers()}

        {/* Conexões entre tarefas */}
        <TaskConnections tasks={initialTasks} connections={initialConnections} />

        {/* Nós de tarefas */}
        {initialTasks.map((task) => (
          <TaskNode
            key={task.id}
            id={task.id}
            title={task.title}
            status={task.status}
            difficulty={task.difficulty}
            points={task.points}
            x={task.x}
            y={task.y}
            onClick={handleTaskClick}
          />
        ))}
      </div>

      {/* Diálogo de detalhes da tarefa */}
      <Dialog open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedTask?.title}</DialogTitle>
            <DialogDescription>{selectedTask?.description || "Detalhes da tarefa selecionada."}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Dificuldade</p>
              <p className="font-medium capitalize">{selectedTask?.difficulty}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Pontos</p>
              <p className="font-medium">{selectedTask?.points}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="font-medium capitalize">{selectedTask?.status}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Camada</p>
              <p className="font-medium">{selectedTask?.layer}</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleStartTask}
              disabled={selectedTask?.status === "blocked"}
              className={selectedTask?.status === "mandatory" ? "bg-destructive hover:bg-destructive/90" : ""}
            >
              {selectedTask?.status === "completed" ? "Revisar" : "Iniciar Tarefa"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#FFD700" />
          </marker>
        </defs>
        <g transform={`translate(${window.innerWidth / 2}, ${window.innerHeight / 2})`}>{renderDependencyLines()}</g>
      </svg>
    </div>
  )
}
