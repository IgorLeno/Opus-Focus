"use client"

import { useState } from "react"
import { TopMenu } from "@/components/top-menu"
import { AoE4Panel } from "@/components/aoe4-panel"
import { AoE4Button } from "@/components/aoe4-button"
import { Settings, Bell, Moon, Sun, Volume2, VolumeX, User } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "appearance" | "notifications" | "account">("general")
  const [darkMode, setDarkMode] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [soundVolume, setSoundVolume] = useState(70)
  const [musicVolume, setMusicVolume] = useState(50)
  const [dailyReminder, setDailyReminder] = useState(true)
  const [taskNotifications, setTaskNotifications] = useState(true)
  const [achievementNotifications, setAchievementNotifications] = useState(true)

  return (
    <main className="flex flex-col min-h-screen">
      <TopMenu activeItem="settings" />

      <div className="container mx-auto px-4 py-8 mt-16 flex-1">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar de Navegação */}
          <div className="lg:w-64 flex-shrink-0">
            <AoE4Panel>
              <div className="aoe4-panel-header">
                <h2 className="text-xl font-trajan text-aoe-gold">Configurações</h2>
              </div>
              <div className="p-4">
                <nav className="space-y-1">
                  <button
                    className={`w-full text-left px-3 py-2 rounded-sm flex items-center ${
                      activeTab === "general"
                        ? "bg-aoe-gold/20 text-aoe-gold"
                        : "text-aoe-light hover:bg-aoe-dark-blue"
                    }`}
                    onClick={() => setActiveTab("general")}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    <span>Geral</span>
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-sm flex items-center ${
                      activeTab === "appearance"
                        ? "bg-aoe-gold/20 text-aoe-gold"
                        : "text-aoe-light hover:bg-aoe-dark-blue"
                    }`}
                    onClick={() => setActiveTab("appearance")}
                  >
                    <Moon className="h-4 w-4 mr-2" />
                    <span>Aparência</span>
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-sm flex items-center ${
                      activeTab === "notifications"
                        ? "bg-aoe-gold/20 text-aoe-gold"
                        : "text-aoe-light hover:bg-aoe-dark-blue"
                    }`}
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    <span>Notificações</span>
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-sm flex items-center ${
                      activeTab === "account"
                        ? "bg-aoe-gold/20 text-aoe-gold"
                        : "text-aoe-light hover:bg-aoe-dark-blue"
                    }`}
                    onClick={() => setActiveTab("account")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    <span>Conta</span>
                  </button>
                </nav>
              </div>
            </AoE4Panel>
          </div>

          {/* Conteúdo Principal */}
          <div className="flex-1">
            <AoE4Panel>
              {/* Configurações Gerais */}
              {activeTab === "general" && (
                <>
                  <div className="aoe4-panel-header">
                    <h2 className="text-xl font-trajan text-aoe-gold">Configurações Gerais</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-aoe-light mb-4">Preferências de Idioma</h3>
                        <div className="bg-aoe-dark-blue border border-aoe-border rounded-md p-4">
                          <div className="flex justify-between items-center">
                            <label className="text-sm text-aoe-light">Idioma</label>
                            <select className="bg-aoe-panel border border-aoe-border text-aoe-light rounded-sm px-3 py-1 text-sm">
                              <option value="pt-BR">Português (Brasil)</option>
                              <option value="en-US">English (US)</option>
                              <option value="es">Español</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-aoe-light mb-4">Preferências de Tempo</h3>
                        <div className="bg-aoe-dark-blue border border-aoe-border rounded-md p-4 space-y-4">
                          <div className="flex justify-between items-center">
                            <label className="text-sm text-aoe-light">Formato de Hora</label>
                            <select className="bg-aoe-panel border border-aoe-border text-aoe-light rounded-sm px-3 py-1 text-sm">
                              <option value="24h">24 horas</option>
                              <option value="12h">12 horas (AM/PM)</option>
                            </select>
                          </div>
                          <div className="flex justify-between items-center">
                            <label className="text-sm text-aoe-light">Primeiro Dia da Semana</label>
                            <select className="bg-aoe-panel border border-aoe-border text-aoe-light rounded-sm px-3 py-1 text-sm">
                              <option value="sunday">Domingo</option>
                              <option value="monday">Segunda-feira</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-aoe-light mb-4">Comportamento do Aplicativo</h3>
                        <div className="bg-aoe-dark-blue border border-aoe-border rounded-md p-4 space-y-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <label className="text-sm text-aoe-light">Iniciar com o Sistema</label>
                              <p className="text-xs text-aoe-muted mt-1">
                                Abrir o aplicativo automaticamente quando você ligar o computador
                              </p>
                            </div>
                            <Switch checked={true} />
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <label className="text-sm text-aoe-light">Confirmar antes de Excluir</label>
                              <p className="text-xs text-aoe-muted mt-1">
                                Mostrar diálogo de confirmação antes de excluir tarefas ou mapas
                              </p>
                            </div>
                            <Switch checked={true} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <AoE4Button>Salvar Alterações</AoE4Button>
                    </div>
                  </div>
                </>
              )}

              {/* Configurações de Aparência */}
              {activeTab === "appearance" && (
                <>
                  <div className="aoe4-panel-header">
                    <h2 className="text-xl font-trajan text-aoe-gold">Aparência</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-aoe-light mb-4">Tema</h3>
                        <div className="bg-aoe-dark-blue border border-aoe-border rounded-md p-4 space-y-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <label className="text-sm text-aoe-light">Modo Escuro</label>
                              <p className="text-xs text-aoe-muted mt-1">
                                Usar cores escuras para reduzir o cansaço visual
                              </p>
                            </div>
                            <div className="flex items-center">
                              <Sun className="h-4 w-4 text-aoe-muted mr-2" />
                              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                              <Moon className="h-4 w-4 text-aoe-gold ml-2" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-aoe-light mb-4">Som</h3>
                        <div className="bg-aoe-dark-blue border border-aoe-border rounded-md p-4 space-y-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <label className="text-sm text-aoe-light">Efeitos Sonoros</label>
                              <p className="text-xs text-aoe-muted mt-1">
                                Reproduzir sons para ações e notificações
                              </p>
                            </div>
                            <div className="flex items-center">
                              <VolumeX className="h-4 w-4 text-aoe-muted mr-2" />
                              <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                              <Volume2 className="h-4 w-4 text-aoe-gold ml-2" />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="text-sm text-aoe-light">Volume dos Efeitos</label>
                              <span className="text-xs text-aoe-gold">{soundVolume}%</span>
                            </div>
                            <Slider
                              value={[soundVolume]}
                              min={0}
                              max={100}
                              step={1}
                              onValueChange={(value) => setSoundVolume(value[0])}
                              disabled={!soundEnabled}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="text-sm text-aoe-light">Volume da Música</label>
                              <span className="text-xs text-aoe-gold">{musicVolume}%</span>
                            </div>
                            <Slider
                              value={[musicVolume]}
                              min={0}
                              max={100}
                              step={1}
                              onValueChange={(value) => setMusicVolume(value[0])}
                              disabled={!soundEnabled}
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-aoe-light mb-4">Tema Visual</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-aoe-dark-blue border-2 border-aoe-gold rounded-md p-3 cursor-pointer">
                            <div className="h-24 bg-[url('/images/aoe-bg-texture.png')] bg-cover rounded-sm mb-2"></div>
                            <div className="text-center">
                              <h4 className="text-sm text-aoe-light">Medieval</h4>
                              <p className="text-xs text-aoe-gold">Ativo</p>
                            </div>
                          </div>
                          <div className="bg-aoe-dark-blue border border-aoe-border rounded-md p-3 cursor-pointer hover:border-aoe-gold/50">
                            <div className="h-24 bg-gradient-to-br from-[#1a2a4a] to-[#0a1525] rounded-sm mb-2"></div>
                            <div className="text-center">
                              <h4 className="text-sm text-aoe-light">Renascentista</h4>
                              <p className="text-xs text-aoe-muted">Disponível na Loja</p>
                            </div>
                          </div>
                          <div className="bg-aoe-dark-blue border border-aoe-border rounded-md p-3 cursor-pointer hover:border-aoe-gold/50">
                            <div className="h-24 bg-gradient-to-br from-[#2a1a2a] to-[#150a15] rounded-sm mb-2"></div>
                            <div className="text-center">
                              <h4 className="text-sm text-aoe-light">Bizantino</h4>
                              <p className="text-xs text-aoe-muted">Disponível na Loja</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <AoE4Button>Salvar Alterações</AoE4Button>
                    </div>
                  </div>
                </>
              )}

              { /* Configur
