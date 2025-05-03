import { AoE4Panel } from "@/components/aoe4-panel"

export default function HeadquartersLoading() {
  return (
    <div className="min-h-screen bg-[#0a1929] bg-opacity-95 text-[#d4b374] p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna da esquerda */}
        <div className="space-y-6">
          <AoE4Panel title="Mapas Disponíveis" className="h-full">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border border-[#3a4b5c] rounded-md p-3">
                  <div className="h-6 bg-[#162c45] rounded-md w-3/4 mb-2"></div>
                  <div className="h-4 bg-[#162c45] rounded-md w-full mb-3"></div>
                  <div className="h-2 bg-[#1e3851] rounded-full"></div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <div className="h-10 bg-[#162c45] rounded-md w-40"></div>
            </div>
          </AoE4Panel>
        </div>

        {/* Coluna do meio */}
        <div className="space-y-6">
          <AoE4Panel title="Missão Diária" className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="h-5 bg-[#162c45] rounded-md w-24"></div>
              <div className="h-5 bg-[#162c45] rounded-md w-20"></div>
            </div>

            <div className="border border-[#3a4b5c] rounded-md p-4 mb-4 bg-[#0e2137]">
              <div className="h-6 bg-[#162c45] rounded-md w-3/4 mb-2"></div>
              <div className="h-4 bg-[#162c45] rounded-md w-full mb-4"></div>

              <div className="flex justify-center">
                <div className="h-10 bg-[#162c45] rounded-md w-40"></div>
              </div>
            </div>

            <div className="mt-6">
              <div className="h-6 bg-[#162c45] rounded-md w-1/2 mb-3"></div>

              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-l-2 border-[#3a4b5c] pl-3">
                    <div className="h-5 bg-[#162c45] rounded-md w-3/4 mb-1"></div>
                    <div className="h-4 bg-[#162c45] rounded-md w-full mb-2"></div>
                    <div className="h-8 bg-[#162c45] rounded-md w-32"></div>
                  </div>
                ))}
              </div>
            </div>
          </AoE4Panel>
        </div>

        {/* Coluna da direita */}
        <div className="space-y-6">
          <AoE4Panel title="Notícias" className="h-full">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-[#3a4b5c] rounded-md p-4 mb-4 bg-[#0e2137]">
                <div className="h-6 bg-[#162c45] rounded-md w-3/4 mb-2"></div>
                <div className="h-4 bg-[#162c45] rounded-md w-full mb-2"></div>
                <div className="h-8 bg-[#162c45] rounded-md w-24"></div>
              </div>
            ))}

            <div className="mt-6 flex justify-between">
              <div className="h-10 bg-[#162c45] rounded-md w-32"></div>
              <div className="h-10 bg-[#162c45] rounded-md w-32"></div>
            </div>
          </AoE4Panel>
        </div>
      </div>
    </div>
  )
}
