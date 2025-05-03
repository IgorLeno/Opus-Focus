import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col h-screen bg-aoe-dark-blue">
      <div className="pt-16 flex items-center justify-center h-full">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-aoe-gold animate-spin" />
          <h2 className="text-aoe-gold mt-4 text-xl font-cinzel">Carregando War Room...</h2>
          <p className="text-aoe-muted mt-2">Preparando o mapa estratégico</p>
        </div>
      </div>
    </div>
  )
}
