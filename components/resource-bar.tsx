import { Crown, Clock, Brain, Coffee } from "lucide-react"

interface ResourceBarProps {
  focus: number
  recreation: number
  mood: number
  dayProgress: number
}

export function ResourceBar({ focus, recreation, mood, dayProgress }: ResourceBarProps) {
  // Formatar o tempo restante
  const formatTimeRemaining = () => {
    // Simulando um dia de 8 horas
    const totalMinutes = (8 * 60 * (100 - dayProgress)) / 100
    const hours = Math.floor(totalMinutes / 60)
    const minutes = Math.floor(totalMinutes % 60)
    return `${hours}h ${minutes}m`
  }

  // Determinar o status de humor
  const getMoodStatus = () => {
    if (mood >= 80) return "Excelente"
    if (mood >= 60) return "Bom"
    if (mood >= 40) return "Neutro"
    if (mood >= 20) return "Baixo"
    return "Crítico"
  }

  // Determinar a cor do humor
  const getMoodColor = () => {
    if (mood >= 80) return "text-green-400"
    if (mood >= 60) return "text-lime-400"
    if (mood >= 40) return "text-yellow-400"
    if (mood >= 20) return "text-amber-400"
    return "text-red-400"
  }

  return (
    <div className="bg-aoe-panel border-b border-aoe-border p-2 flex items-center justify-between">
      {/* Logo/Nome do mapa */}
      <div className="flex items-center">
        <div className="bg-aoe-button px-3 py-1 rounded border border-aoe-border">
          <h1 className="text-aoe-gold font-bold text-lg">War Room</h1>
        </div>
        <div className="ml-4 text-aoe-light text-sm">Mapa do Dia: Conquista Estratégica</div>
      </div>

      {/* Recursos */}
      <div className="flex items-center space-x-6">
        {/* Foco */}
        <div className="flex items-center">
          <div className="flex items-center mr-2">
            <Brain className="h-4 w-4 text-blue-400 mr-1" />
            <span className="text-aoe-light text-sm">Foco:</span>
          </div>
          <div className="w-24 h-3 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: `${focus}%` }}></div>
          </div>
          <span className="ml-1 text-xs text-aoe-light">{focus}</span>
        </div>

        {/* Pontos Recreativos */}
        <div className="flex items-center">
          <div className="flex items-center mr-2">
            <Coffee className="h-4 w-4 text-green-400 mr-1" />
            <span className="text-aoe-light text-sm">Recreação:</span>
          </div>
          <div className="w-24 h-3 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: `${recreation}%` }}></div>
          </div>
          <span className="ml-1 text-xs text-aoe-light">{recreation}</span>
        </div>

        {/* Humor */}
        <div className="flex items-center">
          <div className="flex items-center mr-2">
            <Crown className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-aoe-light text-sm">Humor:</span>
          </div>
          <div className="flex items-center">
            <span className={`text-sm ${getMoodColor()}`}>{getMoodStatus()}</span>
            <div className="ml-2 w-16 h-3 bg-gray-700 rounded-full overflow-hidden">
              <div className={`h-full ${getMoodColor().replace("text", "bg")}`} style={{ width: `${mood}%` }}></div>
            </div>
          </div>
        </div>

        {/* Tempo restante */}
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-aoe-gold mr-1" />
          <span className="text-aoe-light text-sm">Restante:</span>
          <span className="ml-1 text-aoe-gold text-sm">{formatTimeRemaining()}</span>
        </div>
      </div>
    </div>
  )
}
