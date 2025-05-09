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
import { ZoomIn, ZoomOut, Maximize, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import type React from "react"
import { Flag, Trophy, Clock, MapPin } from "lucide-react"

// Tipos
export type Region = {
  id: string
  name: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  status: "conquered" | "in-progress" | "locked"
  position: { x: number; y: number }
  size: number
  tasks: number
  completedTasks: number
}

// Definição das regiões do mapa
const mapRegions = [
  {
    id: "region1",
    name: "Região Inicial",
    taskIds: ["task1"],
    status: "conquered", // conquered, active, blocked
    path: "M0,30 Q10,20 15,35 Q20,50 10,65 Q5,80 0,70 Z",
    center: { x: 10, y: 50 },
    description: "Descrição da Região Inicial",
    difficulty: "easy",
    position: { x: 10, y: 10 },
    size: 10,
    tasks: 5,
    completedTasks: 5,
  },
  {
    id: "region2",
    name: "Região de Pesquisa",
    taskIds: ["task2", "task3"],
    status: "active",
    path: "M15,35 Q25,20 35,15 Q45,20 50,35 Q45,50 35,65 Q25,80 10,65 Q20,50 15,35 Z",
    center: { x: 30, y: 50 },
    description: "Descrição da Região de Pesquisa",
    difficulty: "medium",
    position: { x: 30, y: 30 },
    size: 15,
    tasks: 7,
    completedTasks: 3,
  },
  {
    id: "region3",
    name: "Região de Desenvolvimento",
    taskIds: ["task4", "task5", "task6"],
    status: "active",
    path: "M35,15 Q50,5 65,15 Q75,30 70,50 Q65,70 50,80 Q35,65 45,50 Q50,35 35,15 Z",
    center: { x: 50, y: 45 },
    description: "Descrição da Região de Desenvolvimento",
    difficulty: "hard",
    position: { x: 50, y: 50 },
    size: 20,
    tasks: 10,
    completedTasks: 2,
  },
  {
    id: "region4",
    name: "Região de Testes",
    taskIds: ["task7", "task8"],
    status: "blocked",
    path: "M65,15 Q80,10 90,25 Q95,40 85,60 Q75,75 65,70 Q70,50 75,30 Q65,15 65,15 Z",
    center: { x: 75, y: 40 },
    description: "Descrição da Região de Testes",
    difficulty: "medium",
    position: { x: 70, y: 70 },
    size: 12,
    tasks: 6,
    completedTasks: 0,
  },
  {
    id: "region5",
    name: "Região Final",
    taskIds: ["task9", "task10"],
    status: "blocked",
    path: "M85,60 Q95,70 95,85 Q85,95 70,90 Q60,80 65,70 Q75,75 85,60 Z",
    center: { x: 80, y: 75 },
    description: "Descrição da Região Final",
    difficulty: "hard",
    position: { x: 90, y: 90 },
    size: 18,
    tasks: 8,
    completedTasks: 0,
  },
]

type GameMapProps = {
  regions: Region[]
  onRegionClick: (region: Region) => void
}

// Componente para os nós de tarefas (locais no mapa)
const TaskNode = ({ id, title, status, difficulty, points, x, y, onClick }) => {
  // Definir estilos com base no status
  const statusStyles = {
    available: {
      baseColor: "hsl(var(--primary))",
      glowColor: "rgba(137, 180, 250, 0.6)",
      iconClass: "task-node-available",
    },
    blocked: {
      baseColor: "hsl(var(--muted))",
      glowColor: "rgba(100, 100, 120, 0.2)",
      iconClass: "task-node-blocked",
    },
    completed: {
      baseColor: "hsl(var(--accent))",
      glowColor: "rgba(196, 141, 250, 0.6)",
      iconClass: "task-node-completed",
    },
    mandatory: {
      baseColor: "hsl(var(--destructive))",
      glowColor: "rgba(250, 141, 141, 0.6)",
      iconClass: "task-node-mandatory",
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
      className={`absolute cursor-pointer transition-all duration-300 ${style.iconClass}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: status === "blocked" ? 5 : 10,
      }}
      onClick={() => onClick(id)}
    >
      {/* Hexágono base */}
      <div className="relative">
        {/* Efeito de brilho de fundo */}
        <div
          className={`absolute inset-0 hexagon-glow ${status !== "blocked" ? "animate-pulse-slow" : ""}`}
          style={{
            filter: `drop-shadow(0 0 6px ${style.glowColor})`,
            opacity: status === "blocked" ? 0.3 : 0.8,
          }}
        ></div>

        {/* Hexágono principal */}
        <svg width="40" height="46" viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 0L39.0526 11.5V34.5L20 46L0.947441 34.5V11.5L20 0Z"
            fill={status === "blocked" ? "rgba(30, 30, 40, 0.5)" : "rgba(30, 30, 40, 0.8)"}
            stroke={style.baseColor}
            strokeWidth="1.5"
            className={status === "completed" ? "hexagon-completed" : ""}
          />

          {/* Linhas internas do hexágono */}
          <path
            d="M20 5L33.5 13.5V30.5L20 39L6.5 30.5V13.5L20 5Z"
            stroke={style.baseColor}
            strokeWidth="0.5"
            strokeOpacity="0.6"
          />

          {/* Ícone central */}
          <foreignObject x="10" y="13" width="20" height="20">
            <div className="flex items-center justify-center h-full text-lg">
              <span style={{ color: style.baseColor }}>{statusIcons[status]}</span>
            </div>
          </foreignObject>
        </svg>

        {/* Indicador de tarefa obrigatória */}
        {status === "mandatory" && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center text-[10px] text-white font-bold animate-pulse">
            !
          </div>
        )}
      </div>

      {/* Título da tarefa */}
      <div
        className="mt-1 text-xs font-medium max-w-[80px] text-center"
        style={{
          color: status === "blocked" ? "rgba(150, 150, 170, 0.6)" : "rgba(255, 255, 255, 0.9)",
          textShadow: status === "blocked" ? "none" : "0 0 10px rgba(0, 0, 0, 0.8)",
        }}
      >
        {title}
      </div>

      {/* Dificuldade e pontos */}
      <div
        className="mt-0.5 text-[10px] text-center"
        style={{
          color: status === "blocked" ? "rgba(150, 150, 170, 0.4)" : "rgba(200, 200, 220, 0.7)",
        }}
      >
        <span title={`Dificuldade: ${difficulty}`}>{difficultyStars[difficulty]}</span>
        <span className="ml-1">{points}pts</span>
      </div>
    </div>
  )
}

// Componente para as conexões entre tarefas (rotas no mapa)
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
    return `M ${x1}% ${y1}% C ${(x1 + x2) / 2 + (Math.random() * 5 - 2.5)}% ${y1 + (Math.random() * 5 - 2.5)}%, ${
      (x1 + x2) / 2 + (Math.random() * 5 - 2.5)
    }% ${y2 + (Math.random() * 5 - 2.5)}%, ${x2}% ${y2}%`
  }

  // Verificar se uma conexão está ativa
  const isConnectionActive = (sourceId, targetId) => {
    const source = tasks.find((t) => t.id === sourceId)
    const target = tasks.find((t) => t.id === targetId)

    return source?.status === "completed" && (target?.status === "available" || target?.status === "mandatory")
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <linearGradient id="activePathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {connections.map((conn) => {
        const active = isConnectionActive(conn.source, conn.target)
        return (
          <g key={`${conn.source}-${conn.target}`}>
            {/* Caminho de fundo (mais largo) */}
            <path
              d={getConnectionPath(conn.source, conn.target)}
              fill="none"
              stroke="rgba(40, 40, 60, 0.6)"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* Caminho principal */}
            <path
              d={getConnectionPath(conn.source, conn.target)}
              fill="none"
              stroke={active ? "url(#activePathGradient)" : "rgba(80, 80, 100, 0.3)"}
              strokeWidth={active ? 3 : 1.5}
              strokeDasharray={active ? "none" : "5,5"}
              className={active ? "path-active" : ""}
              filter={active ? "url(#glow)" : "none"}
              strokeLinecap="round"
            />

            {/* Partículas animadas para caminhos ativos */}
            {active && (
              <path
                d={getConnectionPath(conn.source, conn.target)}
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="1,15"
                className="path-particles"
                strokeLinecap="round"
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}

// Componente para o efeito de conquista de região
const RegionConquestEffect = ({ region, onAnimationComplete }) => {
  const [animationStarted, setAnimationStarted] = useState(false)

  useEffect(() => {
    // Iniciar a animação após um pequeno delay para garantir que o componente foi montado
    const startTimer = setTimeout(() => {
      setAnimationStarted(true)
    }, 100)

    // Definir um timeout para a duração da animação
    const completeTimer = setTimeout(() => {
      if (onAnimationComplete) onAnimationComplete()
    }, 3000) // 3 segundos de duração da animação

    return () => {
      clearTimeout(startTimer)
      clearTimeout(completeTimer)
    }
  }, [onAnimationComplete])

  // Estilos de animação inline para garantir que funcionem
  const waveStyle = {
    animation: animationStarted ? "conquestWave 3s ease-out forwards" : "none",
    transformOrigin: "center",
  }

  const waveStyle2 = {
    animation: animationStarted ? "conquestWave 3s ease-out 0.5s forwards" : "none",
    transformOrigin: "center",
  }

  const waveStyle3 = {
    animation: animationStarted ? "conquestWave 3s ease-out 1s forwards" : "none",
    transformOrigin: "center",
  }

  const centerGlowStyle = {
    animation: animationStarted ? "centerGlow 3s ease-out forwards" : "none",
    transformOrigin: "center",
  }

  const outlineStyle = {
    animation: animationStarted ? "drawPath 2s ease-out forwards" : "none",
    strokeDasharray: 1000,
    strokeDashoffset: 1000,
  }

  const fillStyle = {
    animation: animationStarted ? "fillRegion 2s ease-out 1s forwards" : "none",
    opacity: 0,
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-30">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Efeito de onda de energia se expandindo do centro da região */}
        <circle
          cx={region.center.x}
          cy={region.center.y}
          r="0"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="1"
          style={waveStyle}
        />

        <circle
          cx={region.center.x}
          cy={region.center.y}
          r="0"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          style={waveStyle2}
        />

        <circle
          cx={region.center.x}
          cy={region.center.y}
          r="0"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="1"
          style={waveStyle3}
        />

        {/* Brilho intenso no centro */}
        <circle cx={region.center.x} cy={region.center.y} r="1" fill="white" style={centerGlowStyle} />

        {/* Caminho da região com efeito de brilho */}
        <path d={region.path} fill="none" stroke="hsl(var(--accent))" strokeWidth="1" style={outlineStyle} />

        {/* Preenchimento da região com efeito de fade-in */}
        <path d={region.path} fill="url(#conquestGradient)" style={fillStyle} />

        {/* Definição do gradiente para o preenchimento */}
        <defs>
          <radialGradient
            id="conquestGradient"
            cx={region.center.x + "%"}
            cy={region.center.y + "%"}
            r="50%"
            fx={region.center.x + "%"}
            fy={region.center.y + "%"}
          >
            <stop offset="0%" stopColor="rgba(196, 141, 250, 0.4)" />
            <stop offset="100%" stopColor="rgba(196, 141, 250, 0)" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}

// Componente para notificação de conquista
const ConquestNotification = ({ region, onClose }) => {
  return (
    <div className="conquest-notification">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent">
          <div className="text-lg">🏆</div>
        </div>
        <div>
          <h4 className="font-bold">Região Conquistada!</h4>
          <p className="text-sm">{region.name} foi completamente dominada.</p>
        </div>
      </div>
      <div className="mt-3 text-sm">
        <p>+50 pontos de conquista desbloqueados!</p>
        <p className="text-xs text-muted-foreground mt-1">Novas tarefas disponíveis no mapa.</p>
      </div>
      <Button className="mt-3 w-full" onClick={onClose}>
        Continuar
      </Button>
    </div>
  )
}

// Dados de exemplo para as tarefas
const initialTasks = [
  // Região inicial
  {
    id: "task1",
    title: "Início do Projeto",
    status: "completed",
    difficulty: "easy",
    points: 10,
    x: 15,
    y: 50,
    regionId: "region1",
  },

  // Região de pesquisa
  {
    id: "task2",
    title: "Pesquisa Inicial",
    status: "completed",
    difficulty: "medium",
    points: 20,
    x: 28,
    y: 35,
    regionId: "region2",
  },
  {
    id: "task3",
    title: "Planejamento",
    status: "mandatory",
    difficulty: "medium",
    points: 25,
    x: 30,
    y: 65,
    regionId: "region2",
  },

  // Região de desenvolvimento
  {
    id: "task4",
    title: "Desenvolvimento Parte 1",
    status: "available",
    difficulty: "hard",
    points: 40,
    x: 45,
    y: 25,
    regionId: "region3",
  },
  {
    id: "task5",
    title: "Desenvolvimento Parte 2",
    status: "available",
    difficulty: "hard",
    points: 40,
    x: 50,
    y: 50,
    regionId: "region3",
  },
  {
    id: "task6",
    title: "Revisão de Literatura",
    status: "available",
    difficulty: "medium",
    points: 30,
    x: 42,
    y: 75,
    regionId: "region3",
  },

  // Região de testes
  {
    id: "task7",
    title: "Testes Iniciais",
    status: "blocked",
    difficulty: "medium",
    points: 25,
    x: 65,
    y: 30,
    regionId: "region4",
  },
  {
    id: "task8",
    title: "Documentação",
    status: "blocked",
    difficulty: "easy",
    points: 15,
    x: 62,
    y: 70,
    regionId: "region4",
  },

  // Região final
  {
    id: "task9",
    title: "Finalização",
    status: "blocked",
    difficulty: "hard",
    points: 50,
    x: 80,
    y: 40,
    regionId: "region5",
  },
  {
    id: "task10",
    title: "Entrega Final",
    status: "blocked",
    difficulty: "hard",
    points: 60,
    x: 85,
    y: 60,
    regionId: "region5",
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

export function GameMap() {
  const [tasks, setTasks] = useState(initialTasks)
  const [regions, setRegions] = useState(mapRegions)
  const [selectedTask, setSelectedTask] = useState(null)
  const [showInfo, setShowInfo] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [conquestEffect, setConquestEffect] = useState(null)
  const [showConquestNotification, setShowConquestNotification] = useState(false)
  const [conqueredRegion, setConqueredRegion] = useState(null)
  const [completedTaskEffect, setCompletedTaskEffect] = useState(null)
  const [isMounted, setIsMounted] = useState(false)
  const mapRef = useRef(null)
  const { toast } = useToast()

  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [mapScale, setMapScale] = useState(1)
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 })
  const [isMapDragging, setIsMapDragging] = useState(false)
  const [mapDragStart, setMapDragStart] = useState({ x: 0, y: 0 })

  // Use useEffect to ensure window is only accessed after component mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Verificar se uma região está completamente conquistada
  const isRegionConquered = (regionId) => {
    const region = regions.find((r) => r.id === regionId)
    if (!region) return false

    const regionTasks = tasks.filter((t) => region.taskIds.includes(t.id))
    return regionTasks.every((t) => t.status === "completed")
  }

  // Atualizar o status de uma região
  const updateRegionStatus = (regionId, newStatus) => {
    setRegions((prevRegions) =>
      prevRegions.map((region) => (region.id === regionId ? { ...region, status: newStatus } : region)),
    )
  }

  // Manipular clique em uma tarefa
  const handleTaskClick = (id) => {
    const task = tasks.find((t) => t.id === id)
    if (task) {
      setSelectedTask(task)
    }
  }

  // Iniciar a tarefa selecionada
  const handleStartTask = () => {
    if (selectedTask) {
      // Em um app real, isso navegaria para a página da tarefa
      console.log(`Navegando para /task?id=${selectedTask.id}`)
    }
    setSelectedTask(null)
  }

  // Efeito de conclusão de tarefa
  const TaskCompletionEffect = ({ task }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        setCompletedTaskEffect(null)
      }, 1500)
      return () => clearTimeout(timer)
    }, [])

    return (
      <div className="absolute pointer-events-none z-20" style={{ left: `${task.x}%`, top: `${task.y}%` }}>
        <div className="relative" style={{ transform: "translate(-50%, -50%)" }}>
          <div
            className="absolute inset-0 animate-ping rounded-full bg-accent opacity-75"
            style={{ width: "40px", height: "40px" }}
          ></div>
          <div
            className="absolute inset-0 animate-pulse rounded-full bg-accent opacity-50"
            style={{ width: "60px", height: "60px", left: "-10px", top: "-10px" }}
          ></div>
          <div
            className="absolute inset-0 animate-pulse rounded-full bg-accent opacity-25"
            style={{ width: "80px", height: "80px", left: "-20px", top: "-20px" }}
          ></div>
        </div>
      </div>
    )
  }

  // Completar uma tarefa (simulação)
  const completeTask = (taskId) => {
    // Primeiro, encontrar a tarefa antes de atualizar o estado
    const taskToComplete = tasks.find((t) => t.id === taskId)
    if (!taskToComplete) return

    // Mostrar efeito de conclusão de tarefa
    setCompletedTaskEffect(taskToComplete)

    // Atualizar o status da tarefa para "completed"
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => (task.id === taskId ? { ...task, status: "completed" } : task))
      return updatedTasks
    })

    // Verificar se a região foi conquistada após a atualização
    setTimeout(() => {
      const regionId = taskToComplete.regionId
      const region = regions.find((r) => r.id === regionId)

      if (region) {
        const regionTasks = tasks.filter((t) => region.taskIds.includes(t.id))
        // Verificar se todas as tarefas da região estão completas (incluindo a que acabou de ser completada)
        const allCompleted = regionTasks.every((t) => (t.id === taskId ? true : t.status === "completed"))

        if (allCompleted) {
          triggerRegionConquest(regionId)
        }
      }
    }, 1000) // Delay para permitir que o efeito de conclusão da tarefa seja exibido
  }

  // Desbloquear tarefas após conquista de região
  const unlockNextRegionTasks = (conqueredRegionId) => {
    // Encontrar a próxima região a ser desbloqueada
    const conqueredRegionIndex = regions.findIndex((r) => r.id === conqueredRegionId)
    const nextRegionIndex = conqueredRegionIndex + 1

    if (nextRegionIndex < regions.length) {
      const nextRegion = regions[nextRegionIndex]

      // Atualizar status da próxima região
      updateRegionStatus(nextRegion.id, "active")

      // Desbloquear tarefas da próxima região
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          nextRegion.taskIds.includes(task.id)
            ? { ...task, status: task.status === "blocked" ? "available" : task.status }
            : task,
        ),
      )
    }
  }

  // Iniciar efeito de conquista de região
  const triggerRegionConquest = (regionId) => {
    const region = regions.find((r) => r.id === regionId)
    if (!region) return

    console.log("Iniciando efeito de conquista para região:", region.name)

    // Atualizar status da região
    updateRegionStatus(regionId, "conquered")

    // Iniciar efeito visual
    setConquestEffect(region)
    setConqueredRegion(region)

    // Lançar confetes
    try {
      if (typeof window !== "undefined" && isMounted) {
        import("canvas-confetti")
          .then((confettiModule) => {
            const confetti = confettiModule.default

            // Criar um canvas temporário para os confetes
            const canvas = document.createElement("canvas")
            canvas.style.position = "fixed"
            canvas.style.top = "0"
            canvas.style.left = "0"
            canvas.style.width = "100vw"
            canvas.style.height = "100vh"
            canvas.style.pointerEvents = "none"
            canvas.style.zIndex = "9999"
            document.body.appendChild(canvas)

            // Criar instância do confetti
            const myConfetti = confetti.create(canvas, { resize: true })

            // Lançar confetes
            myConfetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#89B4FA", "#C48DFA", "#AECBFA"],
            })

            // Remover o canvas após a animação
            setTimeout(() => {
              document.body.removeChild(canvas)
            }, 3000)
          })
          .catch((err) => {
            console.error("Erro ao carregar confetti:", err)
          })
      }
    } catch (error) {
      console.error("Erro ao executar efeito de confete:", error)
    }

    // Mostrar notificação após o efeito
    setTimeout(() => {
      setShowConquestNotification(true)
    }, 2000)
  }

  // Finalizar efeito de conquista
  const handleConquestEffectComplete = () => {
    console.log("Efeito de conquista concluído")
    setConquestEffect(null)

    // Desbloquear próxima região
    if (conqueredRegion) {
      unlockNextRegionTasks(conqueredRegion.id)
    }
  }

  // Fechar notificação de conquista
  const handleCloseConquestNotification = () => {
    setShowConquestNotification(false)
    setConqueredRegion(null)

    // Mostrar toast de confirmação
    toast({
      title: "Região Conquistada!",
      description: "Novas tarefas foram desbloqueadas no mapa.",
    })
  }

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
    if (!isMounted) return

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragStart, isMounted])

  const handleRegionClick = (region: Region) => {
    if (region.status !== "locked") {
      setSelectedRegion(region)
      //onRegionClick(region);
    }
  }

  const handleMapMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      // Left mouse button
      setIsMapDragging(true)
      setMapDragStart({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMapMouseMove = (e: React.MouseEvent) => {
    if (isMapDragging) {
      const dx = e.clientX - mapDragStart.x
      const dy = e.clientY - mapDragStart.y
      setMapPosition({
        x: mapPosition.x + dx,
        y: mapPosition.y + dy,
      })
      setMapDragStart({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMapMouseUp = () => {
    setIsMapDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1
    setMapScale(Math.min(Math.max(mapScale * scaleFactor, 0.5), 2))
  }

  const resetView = () => {
    setMapScale(1)
    setMapPosition({ x: 0, y: 0 })
  }

  // Função para determinar a cor da região com base no status
  const getRegionColor = (status: Region["status"]) => {
    switch (status) {
      case "conquered":
        return "bg-green-700"
      case "in-progress":
        return "bg-yellow-600"
      case "locked":
        return "bg-gray-700"
      default:
        return "bg-blue-700"
    }
  }

  // Função para determinar o ícone da região com base no status
  const getRegionIcon = (status: Region["status"]) => {
    switch (status) {
      case "conquered":
        return <Trophy className="w-6 h-6 text-white" />
      case "in-progress":
        return <Clock className="w-6 h-6 text-white" />
      case "locked":
        return <MapPin className="w-6 h-6 text-white" />
      default:
        return <Flag className="w-6 h-6 text-white" />
    }
  }

  // Botão de simulação para completar tarefas (apenas para demonstração)
  const renderSimulationControls = () => {
    return (
      <div className="absolute left-4 top-20 z-20">
        <Card className="w-48">
          <CardContent className="p-3">
            <h4 className="mb-2 text-sm font-medium">Simulação</h4>
            <div className="space-y-2">
              {tasks
                .filter((t) => t.status === "available" || t.status === "mandatory")
                .map((task) => (
                  <Button
                    key={task.id}
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => completeTask(task.id)}
                  >
                    Completar: {task.title}
                  </Button>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Se o componente não estiver montado (server-side), retorne um estado de carregamento
  if (!isMounted) {
    return (
      <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
        <p className="text-muted-foreground">Carregando mapa de jogo...</p>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Controles de zoom e navegação */}
      <div className="absolute right-4 top-4 z-20 flex flex-col gap-2">
        <Button variant="secondary" size="icon" onClick={() => setShowInfo(!showInfo)}>
          <Info className="h-4 w-4" />
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

      {/* Informações sobre o mapa */}
      {showInfo && (
        <div className="absolute left-4 top-4 z-20">
          <Card className="w-48">
            <CardContent className="p-3">
              <h4 className="mb-2 text-sm font-medium">Regiões do Mapa</h4>
              <div className="space-y-2">
                {regions.map((region) => (
                  <div key={region.id} className="flex items-center justify-between">
                    <span className="text-xs">{region.name}</span>
                    <Badge
                      variant={region.status === "blocked" ? "secondary" : "default"}
                      className={region.status === "blocked" ? "opacity-50" : ""}
                    >
                      {region.status === "conquered"
                        ? "Conquistada"
                        : region.status === "active"
                          ? "Ativa"
                          : "Bloqueada"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Controles de simulação (apenas para demonstração) */}
      {renderSimulationControls()}

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

      {/* Mapa de jogo */}
      <div
        ref={mapRef}
        className="relative h-full w-full game-map-bg cursor-grab active:cursor-grabbing"
        style={{
          transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
          transformOrigin: "center",
          transition: isDragging ? "none" : "transform 0.3s ease",
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Fundo do mapa SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Definições de gradientes e filtros */}
          <defs>
            <radialGradient id="regionGlow1" cx="15%" cy="50%" r="30%" fx="15%" fy="50%">
              <stop offset="0%" stopColor="rgba(137, 180, 250, 0.15)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
            </radialGradient>
            <radialGradient id="regionGlow2" cx="45%" cy="50%" r="30%" fx="45%" fy="50%">
              <stop offset="0%" stopColor="rgba(196, 141, 250, 0.1)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
            </radialGradient>
            <radialGradient id="regionGlow3" cx="80%" cy="50%" r="30%" fx="80%" fy="50%">
              <stop offset="0%" stopColor="rgba(100, 100, 120, 0.05)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
            </radialGradient>
            <filter id="mapNoise">
              <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
            </filter>
          </defs>

          {/* Regiões do mapa */}
          {regions.map((region) => (
            <path
              key={region.id}
              d={region.path}
              fill={
                region.status === "conquered"
                  ? "url(#regionGlow1)"
                  : region.status === "active"
                    ? "rgba(30, 30, 40, 0.3)"
                    : "rgba(20, 20, 30, 0.4)"
              }
              stroke={
                region.status === "conquered"
                  ? "rgba(137, 180, 250, 0.3)"
                  : region.status === "active"
                    ? "rgba(137, 180, 250, 0.2)"
                    : "rgba(80, 80, 100, 0.2)"
              }
              strokeWidth="0.5"
              className={
                region.status === "conquered"
                  ? "region-conquered"
                  : region.status === "active"
                    ? "region-active"
                    : "region-blocked"
              }
            />
          ))}

          {/* Linhas de grade e detalhes */}
          <g className="map-grid" opacity="0.15">
            {/* Linhas horizontais */}
            {Array.from({ length: 10 }).map((_, i) => (
              <path
                key={`h-line-${i}`}
                d={`M0,${i * 10} Q25,${i * 10 + (Math.random() * 4 - 2)} 50,${i * 10} Q75,${i * 10 + (Math.random() * 4 - 2)} 100,${i * 10}`}
                stroke="rgba(137, 180, 250, 0.3)"
                strokeWidth="0.2"
                fill="none"
              />
            ))}

            {/* Linhas verticais */}
            {Array.from({ length: 10 }).map((_, i) => (
              <path
                key={`v-line-${i}`}
                d={`M${i * 10},0 Q${i * 10 + (Math.random() * 4 - 2)},25 ${i * 10},50 Q${i * 10 + (Math.random() * 4 - 2)},75 ${i * 10},100`}
                stroke="rgba(137, 180, 250, 0.3)"
                strokeWidth="0.2"
                fill="none"
              />
            ))}
          </g>

          {/* Círculos de energia nas junções */}
          <circle cx="15" cy="35" r="1" fill="rgba(137, 180, 250, 0.6)" className="energy-node" />
          <circle cx="10" cy="65" r="1" fill="rgba(137, 180, 250, 0.6)" className="energy-node" />
          <circle cx="35" cy="15" r="1" fill="rgba(137, 180, 250, 0.6)" className="energy-node" />
          <circle cx="35" cy="65" r="1" fill="rgba(137, 180, 250, 0.6)" className="energy-node" />
          <circle cx="65" cy="15" r="1" fill="rgba(100, 100, 120, 0.4)" className="energy-node" />
          <circle cx="65" cy="70" r="1" fill="rgba(100, 100, 120, 0.4)" className="energy-node" />
          <circle cx="85" cy="60" r="1" fill="rgba(100, 100, 120, 0.4)" className="energy-node" />

          {/* Névoa para regiões bloqueadas */}
          {regions
            .filter((region) => region.status === "blocked")
            .map((region) => (
              <path key={`fog-${region.id}`} d={region.path} fill="rgba(20, 20, 30, 0.6)" className="region-fog" />
            ))}
        </svg>

        {/* Conexões entre tarefas */}
        <TaskConnections tasks={tasks} connections={initialConnections} />

        {/* Nós de tarefas */}
        {tasks.map((task) => (
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

        {/* Efeito de conclusão de tarefa */}
        {completedTaskEffect && <TaskCompletionEffect task={completedTaskEffect} />}

        {/* Efeito de conquista de região */}
        {conquestEffect && (
          <RegionConquestEffect region={conquestEffect} onAnimationComplete={handleConquestEffectComplete} />
        )}
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
              <p className="text-xs text-muted-foreground">Região</p>
              <p className="font-medium">
                {regions.find((r) => r.id === selectedTask?.regionId)?.name || "Desconhecida"}
              </p>
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

      {/* Notificação de conquista */}
      {showConquestNotification && conqueredRegion && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full">
            <ConquestNotification region={conqueredRegion} onClose={handleCloseConquestNotification} />
          </div>
        </div>
      )}
    </div>
  )
}
