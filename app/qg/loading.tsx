import { TopMenu } from "@/components/top-menu"
import { AoE4Panel } from "@/components/aoe4-panel"

export default function Loading() {
  return (
    <main className="flex flex-col min-h-screen bg-aoe-bg bg-cover bg-center">
      <TopMenu activeItem="qg" />

      <div className="container mx-auto px-4 py-8 mt-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Painel Esquerdo - Mapas Ativos */}
          <div className="lg:col-span-4">
            <AoE4Panel>
              <div className="aoe4-panel-header">
                <h2 className="text-xl font-trajan text-aoe-gold">Mapas Ativos</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-3 rounded-md border border-transparent animate-pulse">
                      <div className="h-6 bg-aoe-dark-blue/50 rounded mb-2"></div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <div className="h-4 w-20 bg-aoe-dark-blue/50 rounded"></div>
                          <div className="h-4 w-10 bg-aoe-dark-blue/50 rounded"></div>
                        </div>
                        <div className="h-1.5 bg-aoe-dark-blue/50 rounded-sm"></div>
                        <div className="h-4 w-32 bg-aoe-dark-blue/50 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="h-9 bg-aoe-dark-blue/50 rounded"></div>
                </div>
              </div>
            </AoE4Panel>
          </div>

          {/* Painel Central - Mapa do Dia */}
          <div className="lg:col-span-5">
            <AoE4Panel>
              <div className="aoe4-panel-header flex justify-between items-center">
                <h2 className="text-xl font-trajan text-aoe-gold">Mapa do Dia</h2>
                <div className="h-4 w-32 bg-aoe-dark-blue/50 rounded"></div>
              </div>

              <div className="p-4">
                <div className="h-[200px] border-2 border-aoe-border rounded-md bg-aoe-dark-blue/30 mb-4"></div>

                <div className="flex justify-between items-center mb-2">
                  <div className="h-6 w-40 bg-aoe-dark-blue/50 rounded"></div>
                  <div className="h-4 w-16 bg-aoe-dark-blue/50 rounded"></div>
                </div>

                <div className="h-2 bg-aoe-dark-blue/50 rounded-sm mb-4"></div>

                <div className="flex justify-between items-center">
                  <div className="h-4 w-48 bg-aoe-dark-blue/50 rounded"></div>
                  <div className="h-9 w-24 bg-aoe-dark-blue/50 rounded"></div>
                </div>
              </div>
            </AoE4Panel>

            {/* Missões Diárias */}
            <AoE4Panel className="mt-6">
              <div className="aoe4-panel-header">
                <h2 className="text-xl font-trajan text-aoe-gold">Missões Diárias</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="border border-aoe-border rounded-md p-3 bg-aoe-dark-blue/50 animate-pulse">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-aoe-dark-blue/70 mr-2"></div>
                          <div className="h-5 w-32 bg-aoe-dark-blue/70 rounded"></div>
                        </div>
                        <div className="h-4 w-16 bg-aoe-dark-blue/70 rounded"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <div className="h-4 w-20 bg-aoe-dark-blue/70 rounded"></div>
                          <div className="h-4 w-10 bg-aoe-dark-blue/70 rounded"></div>
                        </div>
                        <div className="h-1.5 bg-aoe-dark-blue/70 rounded-sm"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AoE4Panel>
          </div>

          {/* Painel Direito - Atualizações e Estatísticas */}
          <div className="lg:col-span-3">
            <AoE4Panel>
              <div className="aoe4-panel-header">
                <h2 className="text-xl font-trajan text-aoe-gold">Atualizações</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4 animate-pulse">
                  {[1, 2].map((i) => (
                    <div key={i} className="border-b border-aoe-border pb-3 last:border-0 last:pb-0">
                      <div className="h-5 w-32 bg-aoe-dark-blue/50 rounded mb-1"></div>
                      <div className="h-4 w-full bg-aoe-dark-blue/50 rounded mb-1"></div>
                      <div className="h-4 w-20 bg-aoe-dark-blue/50 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </AoE4Panel>

            {/* Resumo de Estatísticas */}
            <AoE4Panel className="mt-6">
              <div className="aoe4-panel-header">
                <h2 className="text-xl font-trajan text-aoe-gold">Resumo</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4 animate-pulse">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-aoe-dark-blue/70 mr-3"></div>
                      <div>
                        <div className="h-4 w-24 bg-aoe-dark-blue/50 rounded mb-1"></div>
                        <div className="h-6 w-12 bg-aoe-dark-blue/50 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="h-9 bg-aoe-dark-blue/50 rounded"></div>
                </div>
              </div>
            </AoE4Panel>
          </div>
        </div>
      </div>
    </main>
  )
}
