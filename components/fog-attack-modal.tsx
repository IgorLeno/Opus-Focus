"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Territory, FogAttack } from "@/types/war-room"
import { AoE4Button } from "@/components/aoe4-button"
import { AlertTriangle, Shield, Brain, Coffee, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSound } from "@/contexts/sound-context"

interface FogAttackModalProps {
  attack: FogAttack
  territory: Territory | undefined
  onDefend: (defenseType: "focus" | "mini-task" | "points") => void
  resources: {
    focus: number
    recreation: number
    mood: number
  }
}

export function FogAttackModal({ attack, territory, onDefend, resources }: FogAttackModalProps) {
  const { playSound } = useSound()
  const [selectedDefense, setSelectedDefense] = useState<"focus" | "mini-task" | "points" | null>(null)
  const [showMiniTask, setShowMiniTask] = useState(false)
  const [miniTaskAnswer, setMiniTaskAnswer] = useState("")
  const [miniTaskQuestion, setMiniTaskQuestion] = useState("")
  const [fogParticles, setFogParticles] = useState<Array<{ x: number; y: number; size: number; opacity: number }>>([])

  // Gerar partículas de névoa para o efeito visual
  useEffect(() => {
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 2,
      opacity: Math.random() * 0.5 + 0.1,
    }))
    setFogParticles(particles)

    // Animar partículas
    const animateParticles = setInterval(() => {
      setFogParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: (particle.x + (Math.random() * 2 - 1)) % 100,
          y: (particle.y + (Math.random() * 2 - 1)) % 100,
          opacity: Math.max(0.1, Math.min(0.6, particle.opacity + (Math.random() * 0.1 - 0.05))),
        })),
      )
    }, 100)

    return () => clearInterval(animateParticles)
  }, [])

  // Gerar uma mini-tarefa aleatória
  useEffect(() => {
    if (showMiniTask) {
      const questions = [
        { q: "Quanto é 8 × 7?", a: "56" },
        { q: "Qual é a capital da França?", a: "Paris" },
        { q: "Quanto é 15 + 27?", a: "42" },
        { q: "Qual é o símbolo químico do ouro?", a: "Au" },
        { q: "Quanto é 144 ÷ 12?", a: "12" },
      ]
      const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
      setMiniTaskQuestion(randomQuestion.q)
      setMiniTaskAnswer(randomQuestion.a)
    }
  }, [showMiniTask])

  // Manipular seleção de defesa
  const handleDefenseSelect = (type: "focus" | "mini-task" | "points") => {
    setSelectedDefense(type)
    playSound("buttonClick")

    if (type === "mini-task") {
      setShowMiniTask(true)
      playSound("menuOpen")
    } else {
      // Para outros tipos, defender imediatamente
      onDefend(type)
      playSound("fogDefend")
    }
  }

  // Verificar resposta da mini-tarefa
  const handleMiniTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const input = (e.currentTarget as HTMLFormElement).answer.value

    if (input.toLowerCase() === miniTaskAnswer.toLowerCase()) {
      onDefend("mini-task")
      playSound("fogDefend")
    } else {
      // Feedback de erro
      playSound("error")
      const answerInput = document.getElementById("answer") as HTMLInputElement
      answerInput.classList.add("border-red-500", "animate-shake")
      setTimeout(() => {
        answerInput.classList.remove("border-red-500", "animate-shake")
      }, 500)
    }
  }

  if (!territory) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {fogParticles.map((particle, i) => (
          <div
            key={`fog-particle-${i}`}
            className="absolute rounded-full bg-purple-700"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              filter: "blur(2px)",
            }}
          />
        ))}
      </div>

      <motion.div
        className="bg-aoe-panel border border-aoe-border rounded-md w-full max-w-md p-0 shadow-xl relative"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 15 }}
      >
        <div className="bg-red-900/30 p-4 flex items-center border-b border-aoe-border">
          <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
          <h2 className="text-xl font-bold text-aoe-gold">Alerta de Ataque!</h2>
        </div>

        <AnimatePresence mode="wait">
          {showMiniTask ? (
            <motion.div
              className="p-6"
              key="mini-task"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <button
                className="absolute top-4 right-4 text-aoe-muted hover:text-aoe-light"
                onClick={() => {
                  setShowMiniTask(false)
                  playSound("menuClose")
                }}
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-aoe-gold font-bold mb-4">Mini-Desafio de Defesa</h3>

              <p className="text-aoe-light mb-6">
                Responda corretamente para defender o território{" "}
                <span className="text-aoe-gold font-bold">{territory.name}</span>!
              </p>

              <div className="bg-aoe-dark-blue/50 border border-aoe-border rounded-md p-4 mb-6">
                <p className="text-lg text-center text-aoe-light font-medium mb-4">{miniTaskQuestion}</p>

                <form onSubmit={handleMiniTaskSubmit} className="space-y-4">
                  <input
                    id="answer"
                    name="answer"
                    type="text"
                    className="w-full bg-aoe-dark-blue border border-aoe-border rounded p-2 text-aoe-light focus:border-aoe-gold focus:outline-none"
                    placeholder="Sua resposta..."
                    autoComplete="off"
                  />

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-aoe-muted">
                      Tempo restante: <span className="text-red-400 font-bold">{attack.timeRemaining}s</span>
                    </div>

                    <AoE4Button type="submit">Defender</AoE4Button>
                  </div>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="p-6"
              key="defense-options"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
            >
              <p className="text-aoe-light mb-4">
                A Névoa da Distração está atacando o território{" "}
                <span className="text-aoe-gold font-bold">{territory.name}</span>!
              </p>

              <div className="bg-aoe-dark-blue/50 border border-aoe-border rounded-md p-3 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-aoe-muted">Tempo restante:</span>
                  <span className="text-lg font-bold text-red-400">{attack.timeRemaining}s</span>
                </div>

                <div className="h-2 bg-aoe-dark-blue rounded-sm overflow-hidden">
                  <motion.div
                    className="h-full bg-red-500"
                    initial={{ width: `${(attack.timeRemaining / 30) * 100}%` }}
                    animate={{ width: "0%" }}
                    transition={{ duration: attack.timeRemaining, ease: "linear" }}
                  />
                </div>
              </div>

              <h3 className="text-aoe-light font-bold mb-3">Escolha como defender:</h3>

              <div className="space-y-3">
                {/* Defesa com Foco */}
                <motion.div
                  className={`border ${selectedDefense === "focus" ? "border-blue-500" : "border-aoe-border"} rounded-md p-3 transition-colors duration-300`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Brain className="h-5 w-5 text-blue-400 mr-2" />
                      <h4 className="text-aoe-light font-medium">Usar Foco</h4>
                    </div>
                    <span className="text-blue-400 font-bold">-20</span>
                  </div>
                  <p className="text-xs text-aoe-muted mb-3">
                    Use sua energia mental para repelir a Névoa instantaneamente.
                  </p>
                  <AoE4Button
                    variant="secondary"
                    className="w-full"
                    disabled={resources.focus < 20}
                    onClick={() => handleDefenseSelect("focus")}
                  >
                    {resources.focus < 20 ? "Foco Insuficiente" : "Defender com Foco"}
                  </AoE4Button>
                </motion.div>

                {/* Defesa com Mini-tarefa */}
                <motion.div
                  className={`border ${selectedDefense === "mini-task" ? "border-yellow-500" : "border-aoe-border"} rounded-md p-3 transition-colors duration-300`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-yellow-400 mr-2" />
                      <h4 className="text-aoe-light font-medium">Mini-tarefa</h4>
                    </div>
                    <span className="text-yellow-400 font-bold">Quiz</span>
                  </div>
                  <p className="text-xs text-aoe-muted mb-3">
                    Complete um pequeno desafio relacionado à tarefa para defender o território.
                  </p>
                  <AoE4Button className="w-full" onClick={() => handleDefenseSelect("mini-task")}>
                    Iniciar Mini-tarefa
                  </AoE4Button>
                </motion.div>

                {/* Defesa com Pontos Recreativos */}
                <motion.div
                  className={`border ${selectedDefense === "points" ? "border-green-500" : "border-aoe-border"} rounded-md p-3 transition-colors duration-300`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Coffee className="h-5 w-5 text-green-400 mr-2" />
                      <h4 className="text-aoe-light font-medium">Usar Pontos Recreativos</h4>
                    </div>
                    <span className="text-green-400 font-bold">-15</span>
                  </div>
                  <p className="text-xs text-aoe-muted mb-3">
                    Gaste pontos recreativos para contratar mercenários que defenderão o território.
                  </p>
                  <AoE4Button
                    variant="secondary"
                    className="w-full"
                    disabled={resources.recreation < 15}
                    onClick={() => handleDefenseSelect("points")}
                  >
                    {resources.recreation < 15 ? "Pontos Insuficientes" : "Contratar Mercenários"}
                  </AoE4Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
