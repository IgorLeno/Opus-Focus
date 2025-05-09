import type React from "react"
import type { Metadata } from "next"
import { Inter, Cinzel, MedievalSharp } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", weight: ["400", "500", "600", "700"] })
const medievalSharp = MedievalSharp({
  subsets: ["latin"],
  variable: "--font-medieval-sharp",
  weight: ["400"],
})

export const metadata: Metadata = {
  title: "Conquer Focus",
  description: "Conquiste seu foco e produtividade",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} ${cinzel.variable} ${medievalSharp.variable} bg-aoe-dark-blue min-h-screen`}>
        <div className="fixed inset-0 bg-[url('/images/aoe4/background-texture.jpg')] bg-cover bg-center opacity-20 z-0 pointer-events-none"></div>
        <div className="flex relative z-10 min-h-screen">
          <Sidebar />
          <div className="flex-1 ml-16 overflow-x-hidden">{children}</div>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
