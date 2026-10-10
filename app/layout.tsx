import '../styles/globals.css'
import React from 'react'
import { Outfit } from 'next/font/google'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import BottomNav from '../components/BottomNav'

const font = Outfit({ subsets: ['latin'] })

export const metadata = {
  title: 'Tribey',
  description: 'Connect for sports, trips, and community'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${font.className} min-h-screen bg-brand-surface text-slate-800 antialiased`}>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 min-w-0 pb-20 md:pb-0">
            <Nav />
            <main className="px-4 md:px-6 pb-8">{children}</main>
          </div>
        </div>
        <BottomNav />
      </body>
    </html>
  )
}
