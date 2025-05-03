"use client"

import type React from "react"

import { useState } from "react"
import { TopMenu } from "@/components/top-menu"
import { AoE4Panel } from "@/components/aoe4-panel"
import { AoE4Button } from "@/components/aoe4-button"
import { Clock, Music, ImageIcon, Sparkles, Palette, Bookmark, Shield, Award, CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

// Tipos para itens da loja
interface StoreItem {
  id: number
  name: string
  description: string
  price: number
  category: "theme" | "background" | "icon" | "bonus" | "feature"
  icon: React.ReactNode
  owned: boolean
}

// Dados de exemplo para itens da loja
const storeItems: StoreItem[] = [
  {
    id: 1,
    name: "Tema Medieval",
    description: "Um tema visual inspirado em castelos e cavaleiros medievais",
    price: 500,
    category: "theme",
    icon: <Palette className="h-6 w-6" />,
    owned: true,
  },
  {
    id: 2,
    name: "Tema Renascentista",
    description: "Um tema visual inspirado na era do Renascimento",
    price: 750,
    category: "theme",
    icon: <Palette className="h-6 w-6" />,
    owned: false,
  },
  {
    id: 3,
    name: "Fundo Mapa-múndi",
    description: "Um fundo de mapa-múndi antigo para seu painel principal",
    price: 300,
    category: "background",
    icon: <ImageIcon className="h-6 w-6" />,
    owned: false,
  },
  {
    id: 4,
    name: "Fundo Pergaminho",
    description: "Um fundo de pergaminho antigo para seu painel principal",
    price: 300,
    category: "background",
    icon: <ImageIcon className="h-6 w-6" />,
    owned: true,
  },
  {
    id: 5,
    name: "Pacote de Ícones Heráldicos",
    description: "Um conjunto de ícones inspirados em brasões medievais",
    price: 400,
    category: "icon",
    icon: <Shield className="h-6 w-6" />,
    owned: false,
  },
  {
    id: 6,
    name: "Trilha Sonora Medieval",
    description: "Música de fundo temática para aumentar sua imersão",
    price: 600,
    category: "feature",
    icon: <Music className="h-6 w-6" />,
    owned: false,
  },
  {
    id: 7,
    name: "Bônus de XP (1 dia)",
    description: "Ganhe 25% mais XP por tarefas concluídas durante 24 horas",
    price: 200,
    category: "bonus",
    icon: <Sparkles className="h-6 w-6" />,
    owned: false,
  },
  {
    id: 8,
    name: "Marcadores Especiais",
    description: "Marcadores visuais especiais para destacar tarefas importantes",
    price: 350,
    category: "feature",
    icon: <Bookmark className="h-6 w-6" />,
    owned: false,
  },
]

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null)
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false)

  // Pontos recreativos disponíveis
  const availablePoints = 850

  // Filtrar itens por categoria
  const filteredItems = selectedCategory ? storeItems.filter((item) => item.category === selectedCategory) : storeItems

  // Categorias únicas para o filtro
  const categories = [
    { id: "theme", name: "Temas", icon: <Palette className="h-5 w-5" /> },
    { id: "background", name: "Fundos", icon: <ImageIcon className="h-5 w-5" /> },
    { id: "icon", name: "Ícones", icon: <Shield className="h-5 w-5" /> },
    { id: "feature", name: "Recursos", icon: <Bookmark className="h-5 w-5" /> },
    { id: "bonus", name: "Bônus", icon: <Sparkles className="h-5 w-5" /> },
  ]

  const handlePurchase = (item: StoreItem) => {
    setSelectedItem(item)
    setPurchaseDialogOpen(true)
  }

  const confirmPurchase = () => {
    // Lógica para confirmar a compra
    setPurchaseDialogOpen(false)
    setSelectedItem(null)
  }

  return (
    <main className="flex flex-col min-h-screen">
      <TopMenu activeItem="store" />

      <div className="container mx-auto px-4 py-8 mt-16 flex-1">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Painel Principal */}
          <div className="flex-1">
            <AoE4Panel>
              <div className="aoe4-panel-header flex justify-between items-center">
                <h2 className="text-xl font-trajan text-aoe-gold">Loja de Tempo</h2>
                <div className="flex items-center text-aoe-accent">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="text-lg font-semibold">{availablePoints}</span>
                  <span className="text-sm ml-1">pontos</span>
                </div>
              </div>

              {/* Filtros de Categoria */}
              <div className="p-4 border-b border-aoe-border">
                <div className="flex flex-wrap gap-2">
                  <AoE4Button
                    variant={selectedCategory === null ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                  >
                    Todos
                  </AoE4Button>
                  {categories.map((category) => (
                    <AoE4Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center"
                    >
                      <span className="mr-1">{category.icon}</span>
                      {category.name}
                    </AoE4Button>
                  ))}
                </div>
              </div>

              {/* Lista de Itens */}
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="bg-aoe-dark-blue border border-aoe-border rounded-md overflow-hidden">
                      <div className="p-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-aoe-panel flex items-center justify-center shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-aoe-light font-medium">{item.name}</h3>
                          <div className="flex items-center mt-1">
                            <Clock className="h-4 w-4 text-aoe-accent mr-1" />
                            <span className="text-sm text-aoe-accent">{item.price} pontos</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 pb-4">
                        <p className="text-sm text-aoe-muted mb-3">{item.description}</p>
                        {item.owned ? (
                          <div className="bg-aoe-accent/20 text-aoe-accent text-center py-2 rounded-sm text-sm">
                            Adquirido
                          </div>
                        ) : (
                          <AoE4Button
                            className="w-full"
                            disabled={availablePoints < item.price}
                            onClick={() => handlePurchase(item)}
                          >
                            {availablePoints >= item.price ? "Adquirir" : "Pontos Insuficientes"}
                          </AoE4Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AoE4Panel>
          </div>

          {/* Painel Lateral */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="space-y-6">
              <AoE4Panel>
                <div className="aoe4-panel-header">
                  <h2 className="text-xl font-trajan text-aoe-gold">Como Funciona</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <p className="text-sm text-aoe-light">
                      A Loja de Tempo permite que você troque seus pontos recreativos por itens e recursos especiais.
                    </p>
                    <div className="bg-aoe-dark-blue p-3 rounded-md">
                      <h3 className="text-sm font-medium text-aoe-light mb-2">Como ganhar pontos:</h3>
                      <ul className="text-xs text-aoe-muted space-y-2">
                        <li className="flex items-start">
                          <div className="w-4 h-4 rounded-full bg-aoe-accent/20 flex items-center justify-center mr-2 mt-0.5">
                            <CheckCircle className="h-2 w-2 text-aoe-accent" />
                          </div>
                          <span>Completando tarefas diárias</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-4 h-4 rounded-full bg-aoe-accent/20 flex items-center justify-center mr-2 mt-0.5">
                            <CheckCircle className="h-2 w-2 text-aoe-accent" />
                          </div>
                          <span>Mantendo sequências de dias</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-4 h-4 rounded-full bg-aoe-accent/20 flex items-center justify-center mr-2 mt-0.5">
                            <CheckCircle className="h-2 w-2 text-aoe-accent" />
                          </div>
                          <span>Alcançando conquistas especiais</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AoE4Panel>

              <AoE4Panel>
                <div className="aoe4-panel-header">
                  <h2 className="text-xl font-trajan text-aoe-gold">Ofertas Especiais</h2>
                </div>
                <div className="p-4">
                  <div className="bg-aoe-dark-blue border border-aoe-gold/30 rounded-md p-4 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Award className="h-6 w-6 text-aoe-gold" />
                      <h3 className="text-aoe-gold font-medium">Pacote Premium</h3>
                    </div>
                    <p className="text-sm text-aoe-muted mb-3">
                      Desbloqueie todos os temas, fundos e ícones com um desconto especial.
                    </p>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm text-aoe-muted">Preço normal: 2500</div>
                      <div className="text-sm text-aoe-gold">1800 pontos</div>
                    </div>
                    <AoE4Button className="w-full" disabled={availablePoints < 1800}>
                      Adquirir Pacote
                    </AoE4Button>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-aoe-muted">
                      Novas ofertas especiais disponíveis a cada semana. Volte para conferir!
                    </p>
                  </div>
                </div>
              </AoE4Panel>
            </div>
          </div>
        </div>
      </div>

      {/* Diálogo de Confirmação de Compra */}
      <Dialog open={purchaseDialogOpen} onOpenChange={setPurchaseDialogOpen}>
        <DialogContent className="bg-aoe-panel border-aoe-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-trajan text-aoe-gold">Confirmar Compra</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="py-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-aoe-dark-blue flex items-center justify-center">
                  {selectedItem.icon}
                </div>
                <div>
                  <h3 className="text-aoe-light font-medium">{selectedItem.name}</h3>
                  <div className="flex items-center mt-1">
                    <Clock className="h-4 w-4 text-aoe-accent mr-1" />
                    <span className="text-sm text-aoe-accent">{selectedItem.price} pontos</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-aoe-muted mb-4">{selectedItem.description}</p>
              <div className="bg-aoe-dark-blue p-3 rounded-md mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-aoe-muted">Seu saldo atual:</span>
                  <span className="text-sm text-aoe-accent">{availablePoints} pontos</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-aoe-muted">Após a compra:</span>
                  <span className="text-sm text-aoe-accent">{availablePoints - selectedItem.price} pontos</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <AoE4Button variant="secondary" onClick={() => setPurchaseDialogOpen(false)}>
              Cancelar
            </AoE4Button>
            <AoE4Button onClick={confirmPurchase}>Confirmar</AoE4Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
