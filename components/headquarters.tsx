import Link from "next/link"
import { MapIcon, CalendarIcon, TrophyIcon, BarChart3Icon, Settings2Icon } from "lucide-react"
import { AoE4Panel } from "./aoe4-panel"
import { AoE4Button } from "./aoe4-button"

interface MapItem {
  id: string
  name: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  completionRate: number
  imageSrc: string
}

const maps: MapItem[] = [
  {
    id: "map-1",
    name: "Conquista de Territórios",
    description: "Expanda seu império conquistando novas terras",
    difficulty: "medium",
    completionRate: 65,
    imageSrc: "/placeholder.svg?height=150&width=250",
  },
  {
    id: "map-2",
    name: "Domínio Estratégico",
    description: "Domine as rotas comerciais e recursos estratégicos",
    difficulty: "hard",
    completionRate: 42,
    imageSrc: "/placeholder.svg?height=150&width=250",
  },
  {
    id: "map-3",
    name: "Fronteiras do Reino",
    description: "Defenda e expanda as fronteiras do seu reino",
    difficulty: "easy",
    completionRate: 78,
    imageSrc: "/placeholder.svg?height=150&width=250",
  },
  {
    id: "map-4",
    name: "Campanha Imperial",
    description: "Lidere seu império através de uma campanha épica",
    difficulty: "medium",
    completionRate: 51,
    imageSrc: "/placeholder.svg?height=150&width=250",
  },
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "text-emerald-400"
    case "medium":
      return "text-amber-400"
    case "hard":
      return "text-red-400"
    default:
      return "text-white"
  }
}

export function Headquarters() {
  return (
    <div className="min-h-screen bg-[#0a1929] bg-opacity-95 text-[#d4b374] p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna da esquerda */}
        <div className="space-y-6">
          <AoE4Panel title="Mapas Disponíveis" className="h-full">
            <div className="space-y-4">
              {maps.map((map) => (
                <Link href={`/map/${map.id}`} key={map.id} className="block">
                  <div className="border border-[#3a4b5c] hover:border-[#d4b374] rounded-md p-3 transition-all hover:bg-[#162c45] cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-cinzel text-lg font-semibold text-[#d4b374]">{map.name}</h3>
                      <span className={`text-sm font-medium ${getDifficultyColor(map.difficulty)}`}>
                        {map.difficulty.charAt(0).toUpperCase() + map.difficulty.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">{map.description}</p>
                    <div className="relative h-2 bg-[#1e3851] rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-[#d4b374]"
                        style={{ width: `${map.completionRate}%` }}
                      ></div>
                    </div>
                    <div className="mt-1 text-xs text-right text-gray-400">{map.completionRate}% completo</div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <AoE4Button>
                <Link href="/maps" className="flex items-center">
                  <MapIcon className="w-4 h-4 mr-2" />
                  Ver Todos os Mapas
                </Link>
              </AoE4Button>
            </div>
          </AoE4Panel>
        </div>

        {/* Coluna do meio */}
        <div className="space-y-6">
          <AoE4Panel title="Missão Diária" className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-[#d4b374]" />
                <span className="text-sm text-gray-300">21 Abr 2025</span>
              </div>
              <div className="flex items-center">
                <TrophyIcon className="w-5 h-5 mr-2 text-[#d4b374]" />
                <span className="text-sm text-amber-400">+200 XP</span>
              </div>
            </div>

            <div className="border border-[#3a4b5c] rounded-md p-4 mb-4 bg-[#0e2137]">
              <h3 className="font-cinzel text-lg font-semibold text-[#d4b374] mb-2">Complete Qualquer Mapa</h3>
              <p className="text-sm text-gray-300 mb-4">
                Complete um mapa à sua escolha para ganhar recompensas especiais
              </p>

              <div className="flex justify-center">
                <AoE4Button>
                  <Link href="/map-of-day" className="flex items-center">
                    Ir para Mapa do Dia
                  </Link>
                </AoE4Button>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-cinzel text-lg font-semibold text-[#d4b374] mb-3">Eventos Recentes</h3>

              <div className="space-y-3">
                <div className="border-l-2 border-[#d4b374] pl-3">
                  <h4 className="font-cinzel text-base text-[#d4b374]">Domine o Conquer Focus!</h4>
                  <p className="text-sm text-gray-300">Complete 5 mapas para desbloquear conquistas especiais</p>
                  <AoE4Button variant="secondary" size="sm" className="mt-2">
                    <Link href="/tasks">Ir para Tarefas</Link>
                  </AoE4Button>
                </div>

                <div className="border-l-2 border-[#3a4b5c] pl-3">
                  <h4 className="font-cinzel text-base text-[#d4b374]">Campanha de Produtividade</h4>
                  <p className="text-sm text-gray-300">Explore estratégias e teste suas habilidades</p>
                  <AoE4Button variant="secondary" size="sm" className="mt-2">
                    <Link href="/maps">Ir para Campanha</Link>
                  </AoE4Button>
                </div>

                <div className="border-l-2 border-[#3a4b5c] pl-3">
                  <h4 className="font-cinzel text-base text-[#d4b374]">Suba de Nível</h4>
                  <p className="text-sm text-gray-300">Você alcançou o Nível 3</p>
                </div>
              </div>
            </div>
          </AoE4Panel>
        </div>

        {/* Coluna da direita */}
        <div className="space-y-6">
          <AoE4Panel title="Notícias" className="h-full">
            <div className="border border-[#3a4b5c] rounded-md p-4 mb-4 bg-[#0e2137]">
              <h3 className="font-cinzel text-lg font-semibold text-[#d4b374] mb-2">Atualização v1.2.3</h3>
              <p className="text-sm text-gray-300 mb-2">Confira as novidades da última atualização</p>
              <AoE4Button variant="secondary" size="sm">
                Ler Mais
              </AoE4Button>
            </div>

            <div className="border border-[#3a4b5c] rounded-md p-4 mb-4 bg-[#0e2137]">
              <h3 className="font-cinzel text-lg font-semibold text-[#d4b374] mb-2">Evento Semanal</h3>
              <p className="text-sm text-gray-300 mb-2">Participe do evento semanal e ganhe recompensas exclusivas</p>
              <AoE4Button variant="secondary" size="sm">
                Participar
              </AoE4Button>
            </div>

            <div className="border border-[#3a4b5c] rounded-md p-4 bg-[#0e2137]">
              <h3 className="font-cinzel text-lg font-semibold text-[#d4b374] mb-2">Dicas de Produtividade</h3>
              <p className="text-sm text-gray-300 mb-2">Aprenda como maximizar sua produtividade com o Conquer Focus</p>
              <AoE4Button variant="secondary" size="sm">
                Ver Dicas
              </AoE4Button>
            </div>

            <div className="mt-6 flex justify-between">
              <AoE4Button>
                <Link href="/stats" className="flex items-center">
                  <BarChart3Icon className="w-4 h-4 mr-2" />
                  Estatísticas
                </Link>
              </AoE4Button>

              <AoE4Button>
                <Link href="/settings" className="flex items-center">
                  <Settings2Icon className="w-4 h-4 mr-2" />
                  Configurações
                </Link>
              </AoE4Button>
            </div>
          </AoE4Panel>
        </div>
      </div>
    </div>
  )
}
