"use client"
import type { Task } from "./task-map"
import { CheckCircle, Clock, Circle } from "lucide-react"

type TaskNodeProps = {
  task: Task
  onClick: () => void
  isSelected: boolean
  scale: number
}

export function TaskNode({ task, onClick, isSelected, scale }: TaskNodeProps) {
  // Determina o tamanho do nó com base na prioridade
  const getSize = () => {
    switch (task.priority) {
      case "high":
        return 60
      case "medium":
        return 50
      case "low":
        return 40
      default:
        return 50
    }
  }

  // Determina a cor do nó com base no status
  const getColor = () => {
    switch (task.status) {
      case "completed":
        return "bg-green-700"
      case "in-progress":
        return "bg-yellow-600"
      case "pending":
        return "bg-blue-700"
      default:
        return "bg-blue-700"
    }
  }

  // Determina o ícone com base no status
  const getIcon = () => {
    switch (task.status) {
      case "completed":
        return <CheckCircle className="w-6 h-6 text-white" />
      case "in-progress":
        return <Clock className="w-6 h-6 text-white" />
      case "pending":
        return <Circle className="w-6 h-6 text-white" />
      default:
        return <Circle className="w-6 h-6 text-white" />
    }
  }

  const size = getSize()
  const color = getColor()
  const icon = getIcon()

  // Ajusta o tamanho do texto com base na escala
  const getFontSize = () => {
    if (scale < 0.7) return "text-xs"
    if (scale > 1.3) return "text-base"
    return "text-sm"
  }

  return (
    <div
      className={`absolute rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${color} ${isSelected ? "ring-4 ring-gold" : ""}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `calc(50% + ${task.position.x}px)`,
        top: `calc(50% + ${task.position.y}px)`,
        transform: "translate(-50%, -50%)",
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
      }}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center">
        {icon}
        <div
          className={`absolute -bottom-8 whitespace-nowrap ${getFontSize()} font-cinzel text-gold bg-blue-950/80 px-2 py-0.5 rounded border border-gold/30`}
        >
          {task.title}
        </div>
      </div>
    </div>
  )
}
