"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Brain, Check, Clock, FileQuestion, FlaskConical, Lightbulb, Mic, Upload } from "lucide-react"

export default function TaskPage() {
  const [timer, setTimer] = useState(25 * 60) // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const [activeTab, setActiveTab] = useState("content")

  // Format timer as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <div className="flex h-14 items-center border-b px-4">
          <Button variant="ghost" size="icon" asChild>
            <a href="/">
              <ArrowLeft className="h-5 w-5" />
            </a>
          </Button>
          <h1 className="ml-4 text-lg font-medium">Pesquisa Inicial</h1>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{formatTime(timer)}</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsTimerRunning(!isTimerRunning)}>
              {isTimerRunning ? "Pausar" : "Continuar"}
            </Button>
          </div>
        </div>

        <div className="grid h-[calc(100vh-3.5rem)] grid-cols-[1fr_350px]">
          {/* Main Content Area */}
          <div className="overflow-auto border-r">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <div className="border-b bg-card/50 px-4">
                <TabsList className="my-2">
                  <TabsTrigger value="content">Conteúdo</TabsTrigger>
                  <TabsTrigger value="notes">Minhas Notas</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent
                value="content"
                className="h-[calc(100%-3rem)] data-[state=active]:flex data-[state=active]:flex-col"
              >
                <div className="flex-1 overflow-auto p-6 task-content">
                  <div className="mx-auto max-w-3xl">
                    <iframe
                      src="about:blank"
                      className="h-[calc(100vh-10rem)] w-full rounded-lg border bg-white"
                      title="Content Frame"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="notes"
                className="h-[calc(100%-3rem)] data-[state=active]:flex data-[state=active]:flex-col"
              >
                <div className="flex-1 overflow-auto p-6">
                  <div className="mx-auto max-w-3xl space-y-4">
                    <Textarea placeholder="Digite suas anotações aqui..." className="min-h-[200px] resize-none" />

                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="h-8">
                        <Upload className="mr-2 h-3.5 w-3.5" />
                        <span>Imagem</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8">
                        <Mic className="mr-2 h-3.5 w-3.5" />
                        <span>Áudio</span>
                      </Button>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 text-sm font-medium">Anotações Salvas</h3>
                      <p className="text-sm text-muted-foreground">Nenhuma anotação salva ainda.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col overflow-auto bg-card/50">
            <div className="p-4">
              <h2 className="mb-4 text-lg font-medium">Detalhes da Tarefa</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tipo</span>
                    <span className="text-sm font-medium">Pesquisa</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Dificuldade</span>
                    <span className="text-sm font-medium">Médio</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Pontos</span>
                    <span className="text-sm font-medium">20 pontos</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tempo Estimado</span>
                    <span className="text-sm font-medium">25 minutos</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Progresso</h3>
                  <Progress value={45} className="h-2" />
                  <p className="text-xs text-muted-foreground">11:15 restantes</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Ações e Validação</h3>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="h-9 justify-start">
                      <Brain className="mr-2 h-4 w-4 text-notebookPurple" />
                      <span>Flashcards</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 justify-start">
                      <FlaskConical className="mr-2 h-4 w-4 text-notebookTeal" />
                      <span>Treino</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 justify-start">
                      <FileQuestion className="mr-2 h-4 w-4 text-notebookBlue" />
                      <span>Quiz</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 justify-start">
                      <Lightbulb className="mr-2 h-4 w-4 text-accent" />
                      <span>Dicas</span>
                    </Button>
                  </div>

                  <Button className="w-full">
                    <Check className="mr-2 h-4 w-4" />
                    <span>Concluir Tarefa</span>
                  </Button>
                </div>
              </div>
            </div>

            <Card className="mt-auto mx-4 mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Recompensa</h3>
                    <p className="text-xs text-muted-foreground">Ao concluir esta tarefa</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">+20</p>
                    <p className="text-xs text-muted-foreground">pontos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
