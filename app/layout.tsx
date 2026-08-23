import '../styles/globals.css'
import React from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Tribey',
  description: 'Connect for sports, trips, and rooms'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-800 antialiased">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6">
            <Sidebar />
            <div className="flex-1">
              <header className="py-4 md:py-6">
                <div className="md:hidden">
                  <img src="/logo.svg" alt="Tribey" className="h-7 w-auto" />
                  <Nav />
                </div>
              </header>

              <main>{children}</main>

              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
