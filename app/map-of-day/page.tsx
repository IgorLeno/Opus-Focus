"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function MapOfDayRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/war-room")
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen bg-aoe-dark-blue">
      <div className="text-aoe-gold text-xl">Redirecionando para o Mapa do Dia...</div>
    </div>
  )
}
