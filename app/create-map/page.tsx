"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, Shuffle } from "lucide-react"

export default function CreateMapPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [mapName, setMapName] = useState("Mapa de Estudos Python")
  const [mapTheme, setMapTheme] = useState("tech")
  const [layers, setLayers] = useState(3)
  const [tasksPerLayer, setTasksPerLayer] = useState<number[]>([3, 5, 7])
  const [mandatoryTasks, setMandatoryTasks] = useState(3)
  const [completionPercentage, setCompletionPercentage] = useState(70)
  const [draggedTask, setDraggedTask] = useState<any | null>(null)
  const [mapSlots, setMapSlots] = useState<(any | null)[][]>([])

  // Inicializar slots vazios
  useState(() => {
    const initialSlots = Array(layers)
      .fill(null)
      .map(() => Array(Math.max(...tasksPerLayer)).fill(null))
    setMapSlots(initialSlots)
  })

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      // Finalizar criação do mapa
      router.push("/")
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      router.push("/")
    }
  }

  const handleLayersChange = (value: string) => {
    const newLayers = Number.parseInt(value)
    setLayers(newLayers)

    // Ajustar o array de tarefas por camada
    const newTasksPerLayer = [...tasksPerLayer]
    while (newTasksPerLayer.length < newLayers) {
      newTasksPerLayer.push(3) // Valor padrão para novas camadas
    }
    setTasksPerLayer(newTasksPerLayer.slice(0, newLayers))
  }

  const handleTasksPerLayerChange = (index: number, value: number) => {
    const newTasksPerLayer = [...tasksPerLayer]
    newTasksPerLayer[index] = value
    setTasksPerLayer(newTasksPerLayer)
  }

  const handleAutoFill = () => {
    // Lógica para preencher automaticamente os slots
    // Implementação simplificada para demonstração
    const newMapSlots = Array(layers)
      .fill(null)
      .map((_, layerIndex) =>
        Array(tasksPerLayer[layerIndex] || 3).fill({
          title: `Tarefa ${Math.floor(Math.random() * 100)}`,
          type: ["Leitura", "Código", "Vídeo"][Math.floor(Math.random() * 3)],
          difficulty: ["Fácil", "Médio", "Difícil"][Math.floor(Math.random() * 3)],
          points: Math.floor(Math.random() * 50) + 10,
        }),
      )
    setMapSlots(newMapSlots)
  }

  const renderStep1 = () => {
    return (
      <div className="space-y-6">
        {/* Indicador de Progresso */}
        <div className="flex items-center justify-between mb-8 max-w-md">
          <div className="flex items-center">
            <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
              1
            </div>
            <div className="h-1 w-16 bg-border mx-2"></div>
            <div className="bg-muted text-muted-foreground rounded-full w-8 h-8 flex items-center justify-center">
              2
            </div>
            <div className="h-1 w-16 bg-border mx-2"></div>
            <div className="bg-muted text-muted-foreground rounded-full w-8 h-8 flex items-center justify-center">
              3
            </div>
          </div>
        </div>

        {/* Conteúdo em duas colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
          {/* Coluna de formulário */}
          <div className="space-y-6">
            {/* Seção de Informações Gerais */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Título do Mapa</label>
                  <Input
                    type="text"
                    value={mapName}
                    onChange={(e) => setMapName(e.target.value)}
                    placeholder="Ex: Mapa de Estudos Python"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Tema Visual (Opcional)</label>
                  <Select value={mapTheme} onValueChange={setMapTheme}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Tecnologia (Circuitos)</SelectItem>
                      <SelectItem value="space">Espaço</SelectItem>
                      <SelectItem value="forest">Floresta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Seção de Estrutura */}
            <Card>
              <CardHeader>
                <CardTitle>Estrutura do Mapa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Número de Camadas</label>
                  <Select value={layers.toString()} onValueChange={handleLayersChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o número de camadas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 camadas</SelectItem>
                      <SelectItem value="3">3 camadas</SelectItem>
                      <SelectItem value="4">4 camadas</SelectItem>
                      <SelectItem value="5">5 camadas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {Array.from({ length: layers }).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Camada {index + 1}: Número de Tarefas</label>
                      <span className="text-sm">{tasksPerLayer[index] || 3}</span>
                    </div>
                    <Slider
                      min={1}
                      max={7}
                      step={1}
                      value={[tasksPerLayer[index] || 3]}
                      onValueChange={(value) => handleTasksPerLayerChange(index, value[0])}
                    />
                  </div>
                ))}

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Número de Tarefas Obrigatórias</label>
                    <span className="text-sm">{mandatoryTasks}</span>
                  </div>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={[mandatoryTasks]}
                    onValueChange={(value) => setMandatoryTasks(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">% de Pontos para Concluir</label>
                    <span className="text-sm">{completionPercentage}%</span>
                  </div>
                  <Slider
                    min={50}
                    max={100}
                    step={5}
                    value={[completionPercentage]}
                    onValueChange={(value) => setCompletionPercentage(value[0])}
                  />
                </div>

                <Button
                  variant="secondary"
                  className="w-full flex justify-center items-center gap-2"
                  onClick={handleAutoFill}
                >
                  <Shuffle className="h-4 w-4" />
                  <span>Gerar Estrutura Automaticamente</span>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Visualização da Estrutura */}
          <Card className="flex items-center justify-center">
            <CardContent className="p-6 w-full h-full">
              <div className="relative h-full w-full max-h-96">
                {/* Implementar visualização limitada ao container */}
                <div className="flex flex-col items-center justify-center h-full gap-8">
                  {Array.from({ length: layers }).map((_, layerIndex) => (
                    <div key={layerIndex} className="flex justify-center gap-4">
                      {Array.from({ length: tasksPerLayer[layerIndex] || 3 }).map((_, taskIndex) => (
                        <div
                          key={taskIndex}
                          className="w-10 h-10 bg-primary/20 rounded-full border border-primary/50 flex items-center justify-center text-xs"
                        >
                          {layerIndex + 1}.{taskIndex + 1}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botões de ação */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => router.push("/")}>
            Cancelar
          </Button>
          <Button onClick={handleNextStep}>
            Próximo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  const renderStep2 = () => {
    return (
      <div className="space-y-6">
        {/* Indicador de Progresso (destacando etapa 2) */}
        <div className="flex items-center justify-between mb-8 max-w-md">
          <div className="flex items-center">
            <div className="bg-secondary text-secondary-foreground rounded-full w-8 h-8 flex items-center justify-center">
              ✓
            </div>
            <div className="h-1 w-16 bg-primary mx-2"></div>
            <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
              2
            </div>
            <div className="h-1 w-16 bg-border mx-2"></div>
            <div className="bg-muted text-muted-foreground rounded-full w-8 h-8 flex items-center justify-center">
              3
            </div>
          </div>
        </div>

        <h2 className="text-lg font-medium">Alocação de Tarefas</h2>

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 h-[calc(100vh-240px)]">
          {/* Visualização do mapa para alocação */}
          <Card>
            <CardContent className="p-4 relative h-full">
              <div className="absolute inset-0 bg-card">
                {/* Grid de fundo */}
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                >
                  {Array.from({ length: layers }).map((_, layerIndex) => (
                    <div
                      key={layerIndex}
                      className="flex justify-center gap-4"
                      style={{ marginTop: layerIndex === 0 ? "2rem" : "4rem" }}
                    >
                      {Array.from({ length: tasksPerLayer[layerIndex] || 3 }).map((_, taskIndex) => (
                        <div
                          key={taskIndex}
                          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => {
                            if (draggedTask) {
                              const newMapSlots = [...mapSlots]
                              if (!newMapSlots[layerIndex]) {
                                newMapSlots[layerIndex] = Array(tasksPerLayer[layerIndex]).fill(null)
                              }
                              newMapSlots[layerIndex][taskIndex] = draggedTask
                              setMapSlots(newMapSlots)
                              setDraggedTask(null)
                            }
                          }}
                        >
                          {mapSlots[layerIndex]?.[taskIndex] ? (
                            <div className="text-xs font-medium">
                              {mapSlots[layerIndex][taskIndex].title.substring(0, 1)}
                            </div>
                          ) : (
                            <div className="text-xs text-muted-foreground">+</div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de tarefas disponíveis */}
          <Card className="flex flex-col">
            <CardHeader className="pb-0">
              <CardTitle className="text-base">Tarefas Disponíveis</CardTitle>
            </CardHeader>

            {/* Lista com scroll */}
            <CardContent className="flex-1 overflow-y-auto p-2">
              <div className="space-y-2">
                {/* Tarefa 1 */}
                <div
                  className="border rounded-md p-3 bg-card/60 hover:bg-card/80 cursor-grab"
                  draggable
                  onDragStart={() =>
                    setDraggedTask({
                      title: "Artigo sobre algoritmos de machine learning",
                      type: "Leitura",
                      difficulty: "Fácil",
                      points: 25,
                    })
                  }
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Artigo sobre algoritmos de machine learning</h4>
                      <div className="text-xs text-muted-foreground mt-1">Leitura</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="rounded-full bg-blue-500/20 text-blue-500 text-xs px-2 py-0.5">25 pts</div>
                      <div className="text-xs mt-1">Fácil</div>
                    </div>
                  </div>
                </div>

                {/* Tarefa 2 */}
                <div
                  className="border rounded-md p-3 bg-card/60 hover:bg-card/80 cursor-grab"
                  draggable
                  onDragStart={() =>
                    setDraggedTask({
                      title: "Aula de React Hooks",
                      type: "Vídeo",
                      difficulty: "Médio",
                      points: 50,
                    })
                  }
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Aula de React Hooks</h4>
                      <div className="text-xs text-muted-foreground mt-1">Vídeo do YouTube</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="rounded-full bg-purple-500/20 text-purple-500 text-xs px-2 py-0.5">50 pts</div>
                      <div className="text-xs mt-1">Médio</div>
                    </div>
                  </div>
                </div>

                {/* Tarefa 3 */}
                <div
                  className="border rounded-md p-3 bg-card/60 hover:bg-card/80 cursor-grab"
                  draggable
                  onDragStart={() =>
                    setDraggedTask({
                      title: "Implementar algoritmo de ordenação",
                      type: "Código",
                      difficulty: "Difícil",
                      points: 75,
                    })
                  }
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Implementar algoritmo de ordenação</h4>
                      <div className="text-xs text-muted-foreground mt-1">Código</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="rounded-full bg-red-500/20 text-red-500 text-xs px-2 py-0.5">75 pts</div>
                      <div className="text-xs mt-1">Difícil</div>
                    </div>
                  </div>
                </div>

                {/* Tarefa 4 */}
                <div
                  className="border rounded-md p-3 bg-card/60 hover:bg-card/80 cursor-grab"
                  draggable
                  onDragStart={() =>
                    setDraggedTask({
                      title: "Revisão de Flash Cards",
                      type: "NotebookLM",
                      difficulty: "Fácil",
                      points: 30,
                    })
                  }
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Revisão de Flash Cards</h4>
                      <div className="text-xs text-muted-foreground mt-1">NotebookLM</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="rounded-full bg-blue-500/20 text-blue-500 text-xs px-2 py-0.5">30 pts</div>
                      <div className="text-xs mt-1">Fácil</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            {/* Botões de preenchimento automático */}
            <div className="p-3 space-y-2 border-t">
              <Button className="w-full" onClick={handleAutoFill}>
                Preencher Tudo Aleatoriamente
              </Button>
              <Button variant="secondary" className="w-full">
                Preencher Restante Aleatoriamente
              </Button>
            </div>
          </Card>
        </div>

        {/* Botões de ação */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => router.push("/")}>
            Cancelar
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handlePrevStep}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            <Button onClick={handleNextStep}>
              Próximo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const renderStep3 = () => {
    // Calcular estatísticas do mapa
    const totalTasks = tasksPerLayer.reduce((sum, count) => sum + count, 0)
    const filledTasks = mapSlots.flat().filter(Boolean).length

    return (
      <div className="space-y-6">
        {/* Indicador de Progresso (destacando etapa 3) */}
        <div className="flex items-center justify-between mb-8 max-w-md">
          <div className="flex items-center">
            <div className="bg-secondary text-secondary-foreground rounded-full w-8 h-8 flex items-center justify-center">
              ✓
            </div>
            <div className="h-1 w-16 bg-secondary mx-2"></div>
            <div className="bg-secondary text-secondary-foreground rounded-full w-8 h-8 flex items-center justify-center">
              ✓
            </div>
            <div className="h-1 w-16 bg-primary mx-2"></div>
            <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
              3
            </div>
          </div>
        </div>

        <h2 className="text-xl font-medium mb-6">Revisar e Confirmar</h2>

        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Informações do Mapa */}
            <div>
              <h3 className="text-lg font-medium mb-3">Informações do Mapa</h3>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="text-muted-foreground w-36">Título:</span>
                  <span>{mapName}</span>
                </div>
                <div className="flex">
                  <span className="text-muted-foreground w-36">Tema:</span>
                  <span>
                    {mapTheme === "tech" ? "Tecnologia (Circuitos)" : mapTheme === "space" ? "Espaço" : "Floresta"}
                  </span>
                </div>
                <div className="flex">
                  <span className="text-muted-foreground w-36">Camadas:</span>
                  <span>{layers}</span>
                </div>
                <div className="flex">
                  <span className="text-muted-foreground w-36">Tarefas obrigatórias:</span>
                  <span>{mandatoryTasks}</span>
                </div>
                <div className="flex">
                  <span className="text-muted-foreground w-36">% para completar:</span>
                  <span>{completionPercentage}%</span>
                </div>
              </div>
            </div>

            {/* Distribuição de Tarefas */}
            <div>
              <h3 className="text-lg font-medium mb-3">Distribuição de Tarefas</h3>
              <div className="text-sm">
                <p className="text-blue-400">
                  {filledTasks} de {totalTasks} tarefas distribuídas em {layers} camadas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botões de ação */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => router.push("/")}>
            Cancelar
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handlePrevStep}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            <Button onClick={handleNextStep}>
              <Check className="mr-2 h-4 w-4" />
              Criar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background p-6">
        <div className="container max-w-6xl">
          <h1 className="text-2xl font-bold mb-2">Criar Novo Mapa</h1>
          <p className="text-muted-foreground mb-6">Configure a estrutura e distribua tarefas pelo mapa</p>

          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>
      </main>
    </div>
  )
}
