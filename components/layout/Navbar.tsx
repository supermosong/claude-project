'use client'
import Link from 'next/link'
import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-game-dark/80 backdrop-blur-md border-b border-game-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
          <span className="text-2xl">🎲</span>จริงหรือกล้า
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/#games" className="text-slate-400 hover:text-white transition-colors">เกม</Link>
          <Link href="/pricing" className="text-slate-400 hover:text-white transition-colors">ราคา</Link>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/login"><Button variant="ghost" size="sm">เข้าสู่ระบบ</Button></Link>
          <Link href="/auth/signup"><Button size="sm">สมัครฟรี</Button></Link>
        </div>
        <button className="md:hidden text-slate-400" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-game-border bg-game-dark px-4 py-4 space-y-2">
          <Link href="/#games" className="block py-2 text-slate-300 hover:text-white">เกม</Link>
          <Link href="/pricing" className="block py-2 text-slate-300 hover:text-white">ราคา</Link>
          <Link href="/auth/login" className="block py-2 text-slate-300 hover:text-white">เข้าสู่ระบบ</Link>
          <Link href="/auth/signup" className="block"><Button size="sm" className="w-full">สมัครฟรี</Button></Link>
        </div>
      )}
    </nav>
  )
}
