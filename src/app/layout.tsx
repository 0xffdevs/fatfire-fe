import './globals.css'
import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono'
})

export const metadata: Metadata = {
  title: '0xffdevs - Code Your Way to Financial Independence',
  description: 'Master high-value tech skills and smart investing strategies. Learn ZK proofs, Rust, Golang, and achieve FIRE.',
  keywords: 'FIRE, financial independence, programming, rust, golang, solidity, investing, trading',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={spaceMono.variable}>
      <body className="font-mono bg-black text-green-400 min-h-screen">
        <div className="scanlines"></div>
        <div className="terminal-glow">
          <Navbar />
          <main className="w-full flex flex-col items-center container-spacing py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="w-full max-w-7xl mx-auto">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}