"use client"

import { useState, useEffect } from "react"
import { Scroll } from "lucide-react"

// Tipos de eventos
type EventType = "conquest" | "attack" | "defense" | "mission" | "system"

interface GameEvent {
  id: string
  type: EventType
  message: string
  timestamp: Date
}

export function EventLog() {
  const [events, setEvents] = useState<GameEvent[]>([
    {
      id: "1",
      type: "system",
      message: "Bem-vindo ao War Room! Conquiste territórios e defenda-se da Névoa da Distração.",
      timestamp: new Date(),
    },
  ])

  // Simular alguns eventos para demonstração
  useEffect(() => {
    const demoEvents = [
      {
        id: "2",
        type: "conquest" as EventType,
        message: "Você conquistou o território 'Planejamento Inicial'!",
        timestamp: new Date(Date.now() - 120000), // 2 minutos atrás
      },
      {
        id: "3",
        type: "attack" as EventType,
        message: "A Névoa da Distração está atacando 'Revisão de Literatura'!",
        timestamp: new Date(Date.now() - 60000), // 1 minuto atrás
      },
      {
        id: "4",
        type: "defense" as EventType,
        message: "Você defendeu com sucesso o território 'Revisão de Literatura'!",
        timestamp: new Date(Date.now() - 30000), // 30 segundos atrás
      },
      {
        id: "5",
        type: "mission" as EventType,
        message: "Missão completada: 'Conquistar 3 territórios'",
        timestamp: new Date(Date.now() - 10000), // 10 segundos atrás
      },
    ]

    setEvents((prev) => [...prev, ...demoEvents])
  }, [])

  // Formatar timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Obter cor do evento
  const getEventColor = (type: EventType) => {
    switch (type) {
      case "conquest":
        return "text-green-400"
      case "attack":
        return "text-red-400"
      case "defense":
        return "text-blue-400"
      case "mission":
        return "text-yellow-400"
      case "system":
        return "text-aoe-gold"
      default:
        return "text-aoe-light"
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="aoe4-panel-header flex items-center">
        <Scroll className="h-4 w-4 text-aoe-gold mr-2" />
        <h2 className="text-aoe-gold font-bold">Log de Eventos</h2>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-2">
        <ul className="space-y-2">
          {events.map((event) => (
            <li
              key={event.id}
              className="text-xs border-l-2 pl-2 py-1"
              style={{ borderColor: getEventColor(event.type).replace("text", "border") }}
            >
              <div className="flex justify-between">
                <span className={getEventColor(event.type)}>{event.message}</span>
                <span className="text-aoe-muted ml-2">{formatTime(event.timestamp)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
