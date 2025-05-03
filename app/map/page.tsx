"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { GameMap } from "@/components/game-map"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Pause, RotateCcw, ShoppingCart, Trophy, Target, Eye } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"

export default function MapPage() {
  const [currentPoints, setCurrentPoints] = useState(250)
  const [currentProgress, setCurrentProgress] = useState(70)

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-hidden bg-[#0c0c14]">
        <div className="container h-full py-6 flex flex-col">
          {/* Cabeçalho */}
          <div>
            <h1 className="text-2xl font-bold">Mapa do Dia</h1>
            <p className="text-muted-foreground">Mapa de Estudos - {currentProgress}% concluído</p>
          </div>

          {/* Métricas principais */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {/* Progresso do Dia */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Progresso do Dia</h3>
                <span className="text-xs text-muted-foreground">{currentProgress}% concluído</span>
              </div>
              <Progress value={currentProgress} className="h-2" />
            </div>

            {/* Pontos Recreativos */}
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Pontos Recreativos</h3>
              <div className="flex items-center">
                <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-semibold">{currentPoints}</span>
              </div>
            </div>

            {/* Pontos de Progresso */}
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Pontos de Progresso</h3>
              <div className="flex items-center">
                <Target className="h-4 w-4 text-blue-500 mr-1" />
                <span className="font-semibold">750</span>
                <span className="text-xs ml-1 text-muted-foreground">(1000 para próxima camada)</span>
              </div>
            </div>
          </div>

          {/* Ações rápidas */}
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" className="gap-1">
              <Pause className="h-4 w-4" />
              <span>Pausar (2 grátis)</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <RotateCcw className="h-4 w-4" />
              <span>Trocar Tarefa</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1 ml-auto">
              <ShoppingCart className="h-4 w-4" />
              <span>Loja</span>
            </Button>
            <Button size="sm" className="gap-1">
              <Eye className="h-4 w-4" />
              <span>Nova Tarefa</span>
            </Button>
          </div>

          {/* Abas de navegação */}
          <Tabs defaultValue="map" className="flex-1 flex flex-col mt-4">
            <TabsList className="w-full max-w-md">
              <TabsTrigger value="map" className="flex-1">
                Mapa de Conquista
              </TabsTrigger>
              <TabsTrigger value="list" className="flex-1">
                Lista de Tarefas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="mt-4 flex-1 flex flex-col">
              <Card className="border-[#2a2a35] bg-[#12121a] flex-1 flex flex-col">
                <CardContent className="flex-1 p-0">
                  <div className="h-full w-full">
                    <GameMap />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="list" className="mt-4 flex-1">
              <Card className="border-[#2a2a35] bg-[#12121a]">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {/* Tarefa 1 */}
                    <div className="rounded-lg border border-[#2a2a35] bg-[#1e1e28] p-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">Implementar algoritmo de ordenação</h3>
                          <div className="flex items-center mt-1 text-sm text-muted-foreground">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 mr-1"
                            >
                              <path d="M18 16.98h-5.99c-1.66 0-2.49-1.99-.84-3.15l1.67-1.17a4 4 0 0 0 4-3.66"></path>
                              <path d="M6 7V5.5c0-.8.7-1.5 1.5-1.5S9 4.7 9 5.5v10c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-2"></path>
                              <path d="M10 21V10"></path>
                            </svg>
                            <span>Código</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="bg-red-500/20 text-red-500 rounded-full px-3 py-0.5 text-sm">
                            Difícil
                            <span className="ml-1 font-bold">75 ★</span>
                          </div>
                          <div className="flex items-center mt-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 mr-1"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span className="text-xs">Nenhum</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tarefa 2 */}
                    <div className="rounded-lg border border-[#2a2a35] bg-[#1e1e28] p-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">Aula de React Hooks</h3>
                          <div className="flex items-center mt-1 text-sm text-muted-foreground">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 mr-1"
                            >
                              <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            <span>Vídeo do YouTube</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="bg-purple-500/20 text-purple-500 rounded-full px-3 py-0.5 text-sm">
                            Médio
                            <span className="ml-1 font-bold">50 ★</span>
                          </div>
                          <div className="flex items-center mt-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 mr-1"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span className="text-xs">Tempo</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tarefa 3 */}
                    <div className="rounded-lg border border-[#2a2a35] bg-[#1e1e28] p-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">Revisão de Flash Cards</h3>
                          <div className="flex items-center mt-1 text-sm text-muted-foreground">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 mr-1"
                            >
                              <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                              <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"></path>
                            </svg>
                            <span>NotebookLM</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="bg-blue-500/20 text-blue-500 rounded-full px-3 py-0.5 text-sm">
                            Fácil
                            <span className="ml-1 font-bold">30 ★</span>
                          </div>
                          <div className="flex items-center mt-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 mr-1"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span className="text-xs">Tempo</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Toaster />
    </div>
  )
}
