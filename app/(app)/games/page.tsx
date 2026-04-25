import Link from 'next/link'
import Badge from '@/components/ui/Badge'

const games = [
  { href: '/games/truth-or-dare', icon: '🎲', name: 'จริงหรือกล้า', desc: 'คำถามและภารกิจกว่า 50+ ข้อ', badge: 'free' as const },
  { href: '/games/wordle', icon: '📝', name: 'เดาคำ', desc: 'เดา 5 ตัวอักษรใน 6 ครั้ง', badge: 'free' as const },
  { href: '/games/reaction-test', icon: '⚡', name: 'ทดสอบปฏิกิริยา', desc: 'แข่งความเร็วในการตอบสนอง', badge: 'free' as const },
  { href: '/games/draw-and-guess', icon: '🎨', name: 'วาดและทาย', desc: 'วาดรูปให้เพื่อนทายแบบเรียลไทม์', badge: 'pro' as const },
]

export default function GamesPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto w-full">
      <h1 className="text-2xl font-bold text-white mb-6">🎮 เกมทั้งหมด</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
    </div>
  )
}
