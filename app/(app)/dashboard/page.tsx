import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import Badge from '@/components/ui/Badge'

const games = [
  { href: '/games/truth-or-dare', icon: '🎲', name: 'จริงหรือกล้า', desc: 'เล่นกับเพื่อน', badge: 'free' as const },
  { href: '/games/wordle', icon: '📝', name: 'เดาคำ', desc: 'เดา 5 ตัวอักษร', badge: 'free' as const },
  { href: '/games/reaction-test', icon: '⚡', name: 'ทดสอบปฏิกิริยา', desc: 'แข่งความเร็ว', badge: 'free' as const },
  { href: '/games/draw-and-guess', icon: '🎨', name: 'วาดและทาย', desc: 'เรียลไทม์', badge: 'pro' as const },
]

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const name = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'นักเล่นเกม'

  return (
    <div className="p-6 max-w-5xl mx-auto w-full">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          สวัสดี, {name}! 👋
        </h1>
        <p className="mt-1 text-slate-400">พร้อมเล่นเกมกับเพื่อน ๆ แล้วหรือยัง?</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'เกมที่เล่น', value: '0', icon: '🎮' },
          { label: 'เพื่อน', value: '0', icon: '👥' },
          { label: 'ชัยชนะ', value: '0', icon: '🏆' },
          { label: 'แผน', value: 'ฟรี', icon: '⭐' },
        ].map(s => (
          <div key={s.label} className="bg-game-card border border-game-border rounded-2xl p-4 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Games */}
      <h2 className="text-lg font-bold text-white mb-4">เล่นเกม</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {games.map(g => (
          <Link
            key={g.href}
            href={g.href}
            className="bg-game-card border border-game-border rounded-2xl p-5 hover:border-violet-500/40 transition-all duration-200 hover:-translate-y-0.5 group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">{g.icon}</span>
              <Badge variant={g.badge}>{g.badge === 'pro' ? 'Pro' : 'ฟรี'}</Badge>
            </div>
            <h3 className="font-bold text-white group-hover:text-violet-300 transition-colors">{g.name}</h3>
            <p className="text-sm text-slate-400 mt-0.5">{g.desc}</p>
          </Link>
        ))}
      </div>

      {/* Pro upsell */}
      <div className="bg-gradient-to-br from-violet-900/30 to-pink-900/20 border border-violet-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white">👑 อัปเกรดเป็น Pro</h3>
          <p className="text-sm text-slate-400 mt-1">ปลดล็อควาดและทาย กระดานอันดับ และการ์ดแบบกำหนดเอง</p>
        </div>
        <Link href="/pricing" className="shrink-0">
          <button className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap">
            ดูแผน Pro →
          </button>
        </Link>
      </div>
    </div>
  )
}
