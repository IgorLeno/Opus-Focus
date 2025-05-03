export interface Territory {
  id: string
  name: string
  description: string
  path: string // SVG path para desenhar o território
  center: { x: number; y: number } // Centro do território para posicionar ícones
  owner: "player" | "fog" | "neutral" | "none" // Proprietário do território
  connections?: string[] // IDs dos territórios conectados
  difficulty: number // 1-5
  estimatedTime: string // Tempo estimado para completar
  value: number // Valor em pontos
  defensePoints?: number // Pontos de defesa (apenas para territórios do jogador)
  requirements?: string[] // Requisitos para conquistar o território
}

export interface Mission {
  id: string
  title: string
  description: string
  type: "main" | "side" // Principal ou secundária
  completed: boolean
  reward: string
}

export interface FogAttack {
  territoryId: string
  timeRemaining: number // Tempo restante em segundos
}
