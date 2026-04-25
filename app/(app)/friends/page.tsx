'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function FriendsPage() {
  const [search, setSearch] = useState('')

  return (
    <div className="p-6 max-w-2xl mx-auto w-full">
      <h1 className="text-2xl font-bold text-white mb-6">👥 เพื่อน</h1>

      {/* Search */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-game-surface border border-game-border rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
          placeholder="ค้นหาเพื่อนด้วยชื่อหรืออีเมล..."
        />
        <Button>ค้นหา</Button>
      </div>

      {/* Friend requests placeholder */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-slate-400 mb-3">คำขอเป็นเพื่อน</h2>
        <div className="bg-game-card border border-game-border rounded-2xl p-6 text-center text-slate-500">
          <p className="text-sm">ไม่มีคำขอใหม่</p>
        </div>
      </div>

      {/* Friends list */}
      <div>
        <h2 className="text-sm font-semibold text-slate-400 mb-3">เพื่อนทั้งหมด</h2>
        <div className="bg-game-card border border-game-border rounded-2xl p-10 text-center">
          <div className="text-4xl mb-3">👋</div>
          <p className="text-slate-400 font-medium">ยังไม่มีเพื่อน</p>
          <p className="text-slate-500 text-sm mt-1">ค้นหาเพื่อนด้วยชื่อหรืออีเมลด้านบน</p>
        </div>
      </div>
    </div>
  )
}
