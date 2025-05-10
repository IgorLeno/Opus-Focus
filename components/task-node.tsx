"use client"
import { useState, useEffect } from "react"
import type { Task } from "./task-map"
import { CheckCircle, Clock, Circle, Star, AlertTriangle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSound } from "@/contexts/sound-context"

type TaskNodeProps = {
  task: Task
  onClick: () => void
  isSelected: boolean
  scale: number
}

export function TaskNode({ task, onClick, isSelected, scale }: TaskNodeProps) {
  const { playSound } = useSound()
  const [isHovered, setIsHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [completionEffect, setCompletionEffect] = useState(false)

  // Efeito de conclusão quando o status muda para "completed"
  useEffect(() => {
    if (task.status === "completed") {
      setCompletionEffect(true)
      playSound("territoryConquer")
      const timer = setTimeout(() => {
        setCompletionEffect(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [task.status, playSound])

  // Determina o tamanho do nó com base na prioridade
  const getSize = () => {
    switch (task.priority) {
      case "high":
        return 70
      case "medium":
        return 60
      case "low":
        return 50
      default:
        return 60
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
        return <CheckCircle className="w-8 h-8 text-white" />
      case "in-progress":
        return <Clock className="w-8 h-8 text-white" />
      case "pending":
        return <Circle className="w-8 h-8 text-white" />
      default:
        return <Circle className="w-8 h-8 text-white" />
    }
  }

  // Determina o texto de status
  const getStatusText = () => {
    switch (task.status) {
      case "completed":
        return "Concluída"
      case "in-progress":
        return "Em Progresso"
      case "pending":
        return "Pendente"
      default:
        return "Pendente"
    }
  }

  const size = getSize()
  const color = getColor()
  const icon = getIcon()
  const statusText = getStatusText()

  // Ajusta o tamanho do texto com base na escala
  const getFontSize = () => {
    if (scale < 0.7) return "text-xs"
    if (scale > 1.3) return "text-base"
    return "text-sm"
  }

  return (
    <div
      className="absolute"
      style={{
        left: `calc(50% + ${task.position.x}px)`,
        top: `calc(50% + ${task.position.y}px)`,
        transform: "translate(-50%, -50%)",
        zIndex: isSelected || isHovered ? 10 : 5,
      }}
      onMouseEnter={() => {
        setIsHovered(true)
        setShowTooltip(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setShowTooltip(false)
      }}
    >
      {/* Efeito de conclusão */}
      <AnimatePresence>
        {completionEffect && (
          <motion.div
            className="absolute inset-0 rounded-full bg-green-500"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Efeito de brilho para nós selecionados */}
      {isSelected && (
        <div
          className="absolute rounded-full animate-pulse-slow"
          style={{
            width: `${size + 20}px`,
            height: `${size + 20}px`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, rgba(245, 158, 11, 0) 70%)",
          }}
        />
      )}

      {/* Nó principal */}
      <motion.div
        className={`rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${color} ${
          isSelected ? "ring-4 ring-gold" : isHovered ? "ring-2 ring-gold/70" : ""
        }`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.6)",
        }}
        onClick={() => {
          playSound("buttonClick")
          onClick()
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={false}
      >
        <div className="flex flex-col items-center justify-center">
          {icon}
          <div
            className={`absolute -bottom-10 whitespace-nowrap ${getFontSize()} font-cinzel text-gold bg-blue-950/90 px-3 py-1 rounded-full border border-gold/50 shadow-lg`}
          >
            {task.title}
          </div>
        </div>
      </motion.div>

      {/* Indicador de prioridade */}
      <div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          width: "24px",
          height: "24px",
          right: "-5px",
          top: "-5px",
          background: task.priority === "high" ? "#ef4444" : task.priority === "medium" ? "#f59e0b" : "#10b981",
          border: "2px solid #0f172a",
        }}
      >
        <span className="text-xs font-bold text-white">
          {task.priority === "high" ? "A" : task.priority === "medium" ? "M" : "B"}
        </span>
      </div>

      {/* Tooltip detalhado */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="absolute z-20 bg-blue-950/95 border border-gold/50 rounded-md p-3 shadow-lg w-64"
            style={{
              left: "50%",
              bottom: `${size + 40}px`,
              transform: "translateX(-50%)",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-gold font-cinzel font-bold text-sm">{task.title}</h3>
            <p className="text-gold/80 text-xs mt-1">{task.description}</p>

            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="flex items-center">
                <Clock className="w-3 h-3 text-gold mr-1" />
                <span className="text-gold/80 text-xs">{task.dueDate || "Sem prazo"}</span>
              </div>

              <div className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-1 ${
                    task.status === "completed"
                      ? "bg-green-500"
                      : task.status === "in-progress"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  }`}
                />
                <span className="text-gold/80 text-xs">{statusText}</span>
              </div>

              <div className="flex items-center">
                <AlertTriangle className="w-3 h-3 text-gold mr-1" />
                <span
                  className={`text-xs ${
                    task.priority === "high"
                      ? "text-red-500"
                      : task.priority === "medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                  }`}
                >
                  Prioridade {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Média" : "Baixa"}
                </span>
              </div>

              <div className="flex items-center">
                <Star className="w-3 h-3 text-gold mr-1" fill="currentColor" />
                <span className="text-gold/80 text-xs">
                  {task.priority === "high" ? "30" : task.priority === "medium" ? "20" : "10"} pontos
                </span>
              </div>
            </div>

            {task.dependencies.length > 0 && (
              <div className="mt-2">
                <p className="text-gold/80 text-xs">Dependências:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {task.dependencies.map((dep) => (
                    <span
                      key={dep}
                      className="text-[10px] bg-blue-800/50 text-gold/90 px-1.5 py-0.5 rounded-full border border-gold/30"
                    >
                      {dep}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
