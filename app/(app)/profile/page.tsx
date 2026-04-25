import { createClient } from '@/lib/supabase/server'
import Badge from '@/components/ui/Badge'
import Link from 'next/link'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const name = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'ผู้เล่น'
  const email = user?.email || ''
  const isPro = user?.user_metadata?.plan === 'pro'
  const initials = name.slice(0, 2).toUpperCase()

  return (
    <div className="p-6 max-w-2xl mx-auto w-full">
      <h1 className="text-2xl font-bold text-white mb-8">👤 โปรไฟล์</h1>

      {/* Avatar + name */}
      <div className="bg-game-card border border-game-border rounded-2xl p-6 mb-4 flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center text-2xl font-bold text-white shrink-0">
          {initials}
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{name}</h2>
          <p className="text-slate-400 text-sm mt-0.5">{email}</p>
          <div className="mt-2">
            <Badge variant={isPro ? 'pro' : 'free'}>{isPro ? '👑 Pro' : 'ฟรี'}</Badge>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: 'เกมที่เล่น', value: '0' },
          { label: 'ชนะ', value: '0' },
          { label: 'เพื่อน', value: '0' },
        ].map(s => (
          <div key={s.label} className="bg-game-card border border-game-border rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent games placeholder */}
      <div className="bg-game-card border border-game-border rounded-2xl p-6">
        <h3 className="font-semibold text-white mb-4">เกมล่าสุด</h3>
        <div className="text-center py-8 text-slate-500">
          <div className="text-4xl mb-3">🎮</div>
          <p className="text-sm">ยังไม่มีประวัติเกม</p>
          <p className="text-xs mt-1">เล่นเกมแล้วผลลัพธ์จะปรากฏที่นี่</p>
        </div>
      </div>

      {!isPro && (
        <div className="mt-4 bg-gradient-to-br from-violet-900/30 to-pink-900/20 border border-violet-500/30 rounded-2xl p-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-white text-sm">อัปเกรดเป็น Pro</p>
            <p className="text-xs text-slate-400 mt-0.5">ปลดล็อคเกมและฟีเจอร์ทั้งหมด</p>
          </div>
          <Link href="/pricing">
            <button className="bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors whitespace-nowrap">
              อัปเกรด →
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}
