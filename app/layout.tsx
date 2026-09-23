import '../styles/globals.css'
import React from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import BottomNav from '../components/BottomNav'

export const metadata = {
  title: 'Tribey',
  description: 'Connect for sports, trips, and rooms'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-brand-surface text-slate-800 antialiased">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6">
            <Sidebar />
            <div className="flex-1 pb-20 md:pb-0">
              <header className="py-4 md:py-6">
                <div className="md:hidden">
                  <Nav />
                </div>
              </header>

              <main>{children}</main>

              <Footer />
            </div>
          </div>
        </div>
        <BottomNav />
      </body>
    </html>
  )
}
