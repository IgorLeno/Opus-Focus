"use client"
import { usePathname } from "next/navigation"
import {
  HomeIcon,
  MapIcon,
  CalendarIcon,
  ListTodoIcon,
  BarChart3Icon,
  ShoppingCartIcon,
  Settings2Icon,
  BuildingIcon,
} from "lucide-react"
import { AoE4SidebarItem } from "./aoe4-sidebar-item"
import Link from "next/link"

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    // Special case for war-room (Mapa do Dia)
    if (path === "/war-room" && pathname === "/map-of-day") {
      return true
    }
    return pathname === path
  }

  return (
    <div className="fixed left-0 top-0 bottom-0 w-16 bg-[#0a1929] border-r border-[#3a4b5c] flex flex-col items-center py-4 z-20">
      <div className="mb-6">
        <Link href="/qg">
          <div className="w-10 h-10 rounded-full bg-[#162c45] border-2 border-[#d4b374] flex items-center justify-center">
            <HomeIcon className="w-5 h-5 text-[#d4b374]" />
          </div>
        </Link>
      </div>

      <div className="flex flex-col items-center space-y-4 flex-1">
        <AoE4SidebarItem href="/qg" icon={<BuildingIcon className="w-5 h-5" />} label="QG" isActive={isActive("/qg")} />

        <AoE4SidebarItem
          href="/maps"
          icon={<MapIcon className="w-5 h-5" />}
          label="Mapas"
          isActive={isActive("/maps")}
        />

        <AoE4SidebarItem
          href="/war-room"
          icon={<CalendarIcon className="w-5 h-5" />}
          label="Mapa do Dia"
          isActive={isActive("/war-room")}
        />

        <AoE4SidebarItem
          href="/tasks"
          icon={<ListTodoIcon className="w-5 h-5" />}
          label="Tarefas"
          isActive={isActive("/tasks")}
        />

        <AoE4SidebarItem
          href="/stats"
          icon={<BarChart3Icon className="w-5 h-5" />}
          label="Estatísticas"
          isActive={isActive("/stats")}
        />

        <AoE4SidebarItem
          href="/store"
          icon={<ShoppingCartIcon className="w-5 h-5" />}
          label="Loja"
          isActive={isActive("/store")}
        />
      </div>

      <div>
        <AoE4SidebarItem
          href="/settings"
          icon={<Settings2Icon className="w-5 h-5" />}
          label="Configurações"
          isActive={isActive("/settings")}
        />
      </div>
    </div>
  )
}
