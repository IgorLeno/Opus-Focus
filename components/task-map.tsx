"use client"

import type React from "react"
import { useState } from "react"
import { TaskNode } from "./task-node"
import { TaskMapGraph } from "./task-map-graph"
import { Aoe4Panel } from "./aoe4-panel"
import { Aoe4Button } from "./aoe4-button"
import { CheckCircle, Circle, Clock, Flag } from "lucide-react"

// Tipos
export type Task = {
  id: string
  title: string
  description: string
  status: "completed" | "in-progress" | "pending"
  dueDate?: string
  priority: "high" | "medium" | "low"
  position: { x: number; y: number }
  dependencies: string[]
}

type TaskMapProps = {
  tasks: Task[]
  onTaskClick: (task: Task) => void
  onTaskStatusChange?: (taskId: string, status: "completed" | "in-progress" | "pending") => void
}

export function TaskMap({ tasks, onTaskClick, onTaskStatusChange }: TaskMapProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [mapScale, setMapScale] = useState(1)
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    onTaskClick(task)
  }

  const handleStatusChange = (status: "completed" | "in-progress" | "pending") => {
    if (selectedTask && onTaskStatusChange) {
      onTaskStatusChange(selectedTask.id, status)
      setSelectedTask({
        ...selectedTask,
        status,
      })
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      // Left mouse button
      setIsDragging(true)
      setDragStart({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.x
      const dy = e.clientY - dragStart.y
      setMapPosition({
        x: mapPosition.x + dx,
        y: mapPosition.y + dy,
      })
      setDragStart({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
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

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full bg-blue-950 bg-[url('/images/map-background.png')] bg-cover bg-center"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div
          className="absolute"
          style={{
            transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${mapScale})`,
            transformOrigin: "center",
            transition: isDragging ? "none" : "transform 0.1s ease-out",
          }}
        >
          <TaskMapGraph tasks={tasks} />

          {tasks.map((task) => (
            <TaskNode
              key={task.id}
              task={task}
              onClick={() => handleTaskClick(task)}
              isSelected={selectedTask?.id === task.id}
              scale={mapScale}
            />
          ))}
        </div>
      </div>

      <div className="absolute top-4 right-4 flex gap-2">
        <Aoe4Button onClick={() => setMapScale(mapScale * 1.2)} size="sm">
          +
        </Aoe4Button>
        <Aoe4Button onClick={() => setMapScale(mapScale * 0.8)} size="sm">
          -
        </Aoe4Button>
        <Aoe4Button onClick={resetView} size="sm">
          Resetar
        </Aoe4Button>
      </div>

      {selectedTask && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
          <Aoe4Panel className="p-4">
            <h3 className="text-gold font-cinzel text-xl mb-2">{selectedTask.title}</h3>
            <p className="text-gold/80 mb-4">{selectedTask.description}</p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-gold mr-1" />
                <span className="text-gold/80 text-sm">{selectedTask.dueDate || "Sem prazo"}</span>
              </div>
              <div className="flex items-center">
                <Flag className="w-4 h-4 text-gold mr-1" />
                <span
                  className={`text-sm ${
                    selectedTask.priority === "high"
                      ? "text-red-500"
                      : selectedTask.priority === "medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                  }`}
                >
                  {selectedTask.priority === "high" ? "Alta" : selectedTask.priority === "medium" ? "Média" : "Baixa"}
                </span>
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <Aoe4Button
                onClick={() => handleStatusChange("pending")}
                variant={selectedTask.status === "pending" ? "default" : "outline"}
                size="sm"
                className="flex-1"
              >
                <Circle className="w-4 h-4 mr-1" /> Pendente
              </Aoe4Button>
              <Aoe4Button
                onClick={() => handleStatusChange("in-progress")}
                variant={selectedTask.status === "in-progress" ? "default" : "outline"}
                size="sm"
                className="flex-1"
              >
                <Clock className="w-4 h-4 mr-1" /> Em Progresso
              </Aoe4Button>
              <Aoe4Button
                onClick={() => handleStatusChange("completed")}
                variant={selectedTask.status === "completed" ? "default" : "outline"}
                size="sm"
                className="flex-1"
              >
                <CheckCircle className="w-4 h-4 mr-1" /> Concluída
              </Aoe4Button>
            </div>
          </Aoe4Panel>
        </div>
      )}
    </div>
  )
}
