"use client"

import { useState, useRef } from "react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import { useRouter } from "next/navigation"
import { Aoe4Panel } from "./aoe4-panel"
import { Aoe4Button } from "./aoe4-button"

// Types for the maps
export interface MapItem {
  id: string
  name: string
  status: "active" | "completed" | "inactive"
  progress: number
  theme: string
  position: { x: number; y: number; z: number }
  size: number
  createdAt: string
  completedAt?: string
}

interface Universe3DProps {
  maps: MapItem[]
  onSelectMap: (map: MapItem) => void
}

// Planeta componente
const Planet = ({ position, size, color, name, onClick, hovered, setHovered }) => {
  const mesh = useRef()

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.005
    }
  })

  return (
    <mesh
      position={position}
      ref={mesh}
      onClick={onClick}
      onPointerOver={() => setHovered(name)}
      onPointerOut={() => setHovered(null)}
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        metalness={0.2}
        roughness={0.8}
        emissive={hovered === name ? color : "#000000"}
        emissiveIntensity={hovered === name ? 0.5 : 0}
      />
      {hovered === name && (
        <Html position={[0, size + 0.5, 0]}>
          <div className="text-gold font-cinzel text-lg bg-blue-950/80 px-3 py-1 rounded-md border border-gold/50">
            {name}
          </div>
        </Html>
      )}
    </mesh>
  )
}

// Componente de texto HTML em 3D
const Html = ({ children, position }) => {
  const ref = useRef()

  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.style.transform = `translate(-50%, -50%) translate3d(${position[0]}px, ${-position[1]}px, ${position[2]}px)`
      ref.current.style.zIndex = (-position[2]).toString()
    }
  })

  return (
    <div
      ref={ref}
      className="absolute left-1/2 top-1/2 pointer-events-none"
      style={{
        transform: `translate(-50%, -50%) translate3d(${position[0]}px, ${-position[1]}px, ${position[2]}px)`,
      }}
    >
      {children}
    </div>
  )
}

// Dados dos planetas (mapas)
const planets = [
  { name: "Mapa do Dia", position: [0, 0, 0], size: 2.5, color: "#FFD700", path: "/map-of-day" },
  { name: "Tarefas Diárias", position: [-8, 2, -5], size: 1.8, color: "#4169E1", path: "/tasks" },
  { name: "Banco de Mapas", position: [7, -1, -7], size: 2.0, color: "#32CD32", path: "/maps" },
  { name: "Estatísticas", position: [5, 3, 5], size: 1.5, color: "#FF4500", path: "/stats" },
  { name: "Loja de Tempo", position: [-6, -2, 6], size: 1.7, color: "#9370DB", path: "/store" },
  { name: "Configurações", position: [-4, -4, -8], size: 1.3, color: "#C0C0C0", path: "/settings" },
]

export default function Universe3D() {
  const [hoveredPlanet, setHoveredPlanet] = useState(null)
  const router = useRouter()

  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {planets.map((planet) => (
          <Planet
            key={planet.name}
            position={planet.position}
            size={planet.size}
            color={planet.color}
            name={planet.name}
            onClick={() => router.push(planet.path)}
            hovered={hoveredPlanet}
            setHovered={setHoveredPlanet}
          />
        ))}

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.5}
        />
      </Canvas>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
        <Aoe4Panel className="p-4">
          <h2 className="text-gold font-cinzel text-xl mb-3 text-center">Quartel General</h2>
          <p className="text-gold/80 text-sm mb-4 text-center">
            Navegue pelo universo de conquistas e selecione um destino para sua jornada
          </p>
          {hoveredPlanet && (
            <Aoe4Button
              onClick={() => router.push(planets.find((p) => p.name === hoveredPlanet)?.path || "/")}
              className="w-full"
            >
              Ir para {hoveredPlanet}
            </Aoe4Button>
          )}
        </Aoe4Panel>
      </div>
    </div>
  )
}
