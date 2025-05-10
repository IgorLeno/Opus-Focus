"use client"

import { useEffect, useRef } from "react"
import { useSound } from "@/contexts/sound-context"

type NotificationType = "success" | "warning" | "error" | "info"

interface SoundNotificationProps {
  type: NotificationType
  message: string
  show: boolean
  onClose: () => void
  duration?: number
}

export function SoundNotification({ type, message, show, onClose, duration = 3000 }: SoundNotificationProps) {
  const { playSound } = useSound()
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (show) {
      // Tocar som baseado no tipo de notificação
      switch (type) {
        case "success":
          playSound("missionComplete")
          break
        case "warning":
          playSound("fogAttack")
          break
        case "error":
          playSound("error")
          break
        case "info":
          playSound("notification")
          break
      }

      // Configurar timer para fechar automaticamente
      timerRef.current = setTimeout(() => {
        onClose()
      }, duration)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [show, type, playSound, onClose, duration])

  if (!show) return null

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg border ${
        type === "success"
          ? "bg-green-900/90 border-green-600"
          : type === "warning"
            ? "bg-yellow-900/90 border-yellow-600"
            : type === "error"
              ? "bg-red-900/90 border-red-600"
              : "bg-blue-900/90 border-blue-600"
      }`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {type === "success" && (
            <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          )}
          {type === "warning" && (
            <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          )}
          {type === "error" && (
            <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {type === "info" && (
            <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
        <div className="ml-3">
          <p
            className={`text-sm font-medium ${
              type === "success"
                ? "text-green-300"
                : type === "warning"
                  ? "text-yellow-300"
                  : type === "error"
                    ? "text-red-300"
                    : "text-blue-300"
            }`}
          >
            {message}
          </p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={onClose}
              className={`inline-flex rounded-md p-1.5 ${
                type === "success"
                  ? "text-green-300 hover:bg-green-800"
                  : type === "warning"
                    ? "text-yellow-300 hover:bg-yellow-800"
                    : type === "error"
                      ? "text-red-300 hover:bg-red-800"
                      : "text-blue-300 hover:bg-blue-800"
              } focus:outline-none`}
            >
              <span className="sr-only">Fechar</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
