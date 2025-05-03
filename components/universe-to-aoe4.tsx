"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AoE4Panel } from "./aoe4-panel"
import { AoE4Button } from "./aoe4-button"

export function UniverseToAoE4() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push("/headquarters")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <AoE4Panel title="Atualizando Interface" className="max-w-md">
        <div className="text-center p-6">
          <div className="mb-6">
            <h2 className="font-cinzel text-xl text-[#d4b374] mb-2">Transformando o Universo de Mapas</h2>
            <p className="text-gray-300">
              Estamos atualizando a interface para o estilo Age of Empires IV. Você será redirecionado para o novo QG em{" "}
              {countdown} segundos.
            </p>
          </div>

          <div className="relative h-2 bg-[#1e3851] rounded-full overflow-hidden mb-6">
            <div
              className="absolute top-0 left-0 h-full bg-[#d4b374] transition-all duration-1000"
              style={{ width: `${(5 - countdown) * 20}%` }}
            ></div>
          </div>

          <AoE4Button onClick={() => router.push("/headquarters")}>Ir para o QG Agora</AoE4Button>
        </div>
      </AoE4Panel>
    </div>
  )
}
