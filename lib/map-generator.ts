import type { Territory, Mission } from "@/types/war-room"

// Função para gerar um mapa diário
export function generateDailyMap() {
  // Territórios do mapa
  const territories: Territory[] = [
    {
      id: "territory1",
      name: "Planejamento Inicial",
      description: "Defina os objetivos e tarefas para o dia",
      type: "task",
      owner: "player",
      difficulty: 1,
      value: 10,
      estimatedTime: "15 min",
      defensePoints: 50,
      center: { x: 150, y: 150 },
      path: "M100,100 L200,100 L200,200 L100,200 Z",
      connections: ["territory2", "territory3"],
    },
    {
      id: "territory2",
      name: "Revisão de Literatura",
      description: "Leia e revise os materiais necessários",
      type: "task",
      owner: "none",
      difficulty: 2,
      value: 20,
      estimatedTime: "30 min",
      center: { x: 300, y: 150 },
      path: "M250,100 L350,100 L350,200 L250,200 Z",
      connections: ["territory1", "territory4", "territory5"],
    },
    {
      id: "territory3",
      name: "Exercícios Práticos",
      description: "Pratique com exercícios relacionados ao tema",
      type: "task",
      owner: "none",
      difficulty: 3,
      value: 25,
      estimatedTime: "45 min",
      center: { x: 150, y: 300 },
      path: "M100,250 L200,250 L200,350 L100,350 Z",
      connections: ["territory1", "territory6"],
    },
    {
      id: "territory4",
      name: "Análise de Dados",
      description: "Analise os dados coletados e tire conclusões",
      type: "task",
      owner: "fog",
      difficulty: 4,
      value: 30,
      estimatedTime: "60 min",
      center: { x: 450, y: 150 },
      path: "M400,100 L500,100 L500,200 L400,200 Z",
      connections: ["territory2", "territory7"],
    },
    {
      id: "territory5",
      name: "Redação do Relatório",
      description: "Escreva um relatório sobre os resultados",
      type: "task",
      owner: "none",
      difficulty: 3,
      value: 25,
      estimatedTime: "40 min",
      center: { x: 300, y: 300 },
      path: "M250,250 L350,250 L350,350 L250,350 Z",
      connections: ["territory2", "territory6", "territory8"],
    },
    {
      id: "territory6",
      name: "Revisão e Correção",
      description: "Revise e corrija o trabalho realizado",
      type: "task",
      owner: "none",
      difficulty: 2,
      value: 15,
      estimatedTime: "25 min",
      center: { x: 150, y: 450 },
      path: "M100,400 L200,400 L200,500 L100,500 Z",
      connections: ["territory3", "territory5", "territory9"],
    },
    {
      id: "territory7",
      name: "Apresentação Final",
      description: "Prepare e ensaie a apresentação final",
      type: "task",
      owner: "fog",
      difficulty: 4,
      value: 35,
      estimatedTime: "50 min",
      center: { x: 600, y: 150 },
      path: "M550,100 L650,100 L650,200 L550,200 Z",
      connections: ["territory4", "territory10"],
    },
    {
      id: "territory8",
      name: "Discussão em Grupo",
      description: "Participe de uma discussão em grupo sobre o tema",
      type: "task",
      owner: "none",
      difficulty: 2,
      value: 20,
      estimatedTime: "35 min",
      center: { x: 450, y: 300 },
      path: "M400,250 L500,250 L500,350 L400,350 Z",
      connections: ["territory5", "territory10"],
    },
    {
      id: "territory9",
      name: "Feedback e Ajustes",
      description: "Receba feedback e faça os ajustes necessários",
      type: "task",
      owner: "none",
      difficulty: 2,
      value: 15,
      estimatedTime: "20 min",
      center: { x: 300, y: 450 },
      path: "M250,400 L350,400 L350,500 L250,500 Z",
      connections: ["territory6", "territory10"],
    },
    {
      id: "territory10",
      name: "Entrega Final",
      description: "Finalize e entregue o trabalho completo",
      type: "task",
      owner: "none",
      difficulty: 5,
      value: 50,
      estimatedTime: "15 min",
      center: { x: 600, y: 450 },
      path: "M550,400 L650,400 L650,500 L550,500 Z",
      connections: ["territory7", "territory8", "territory9"],
    },
  ]

  // Missões do dia
  const missions: Mission[] = [
    {
      id: "mission1",
      title: "Conquistador Estratégico",
      description: "Conquiste todos os territórios do mapa",
      type: "main",
      completed: false,
      reward: "500 XP + Desbloqueio de Mapa Especial",
    },
    {
      id: "mission2",
      title: "Defensor Resiliente",
      description: "Defenda com sucesso contra 3 ataques da Névoa",
      type: "main",
      completed: false,
      reward: "300 XP + Aumento de Defesa Permanente",
    },
    {
      id: "mission3",
      title: "Estrategista",
      description: "Conquiste o território 'Análise de Dados' antes do meio-dia",
      type: "side",
      targetId: "territory4",
      completed: false,
      reward: "150 XP + 50 Pontos Recreativos",
    },
    {
      id: "mission4",
      title: "Eficiência Máxima",
      description: "Complete todas as tarefas mantendo o Humor acima de 70%",
      type: "side",
      completed: false,
      reward: "200 XP + Item: Escudo da Clareza",
    },
    {
      id: "mission5",
      title: "Caminho Crítico",
      description: "Conquiste os territórios 'Revisão de Literatura' e 'Apresentação Final'",
      type: "side",
      completed: false,
      reward: "100 XP + Bônus de Foco",
    },
  ]

  return {
    territories,
    missions,
  }
}
