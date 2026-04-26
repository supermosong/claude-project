'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { clsx } from 'clsx'
import Badge from '@/components/ui/Badge'
import { createClient } from '@/lib/supabase/client'

const nav = [
  { href: '/dashboard', icon: '🏠', label: 'แดชบอร์ด' },
  { href: '/games/truth-or-dare', icon: '🎲', label: 'จริงหรือกล้า', badge: 'free' as const },
  { href: '/games/wordle', icon: '📝', label: 'เดาคำ', badge: 'free' as const },
  { href: '/games/reaction-test', icon: '⚡', label: 'ทดสอบปฏิกิริยา', badge: 'free' as const },
  { href: '/games/draw-and-guess', icon: '🎨', label: 'วาดและทาย' },
  { href: '/friends', icon: '👥', label: 'เพื่อน' },
  { href: '/profile', icon: '👤', label: 'โปรไฟล์' },
  { href: '/settings', icon: '⚙️', label: 'ตั้งค่า' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <aside className="w-64 shrink-0 min-h-screen bg-game-surface border-r border-game-border flex flex-col hidden md:flex">
      <div className="p-4 border-b border-game-border">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-white">
          <span className="text-2xl">🎲</span>จริงหรือกล้า
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {nav.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150',
              pathname === item.href
                ? 'bg-violet-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-game-card'
            )}
          >
            <span className="flex items-center gap-3 text-sm font-medium">
              <span className="text-base">{item.icon}</span>
              {item.label}
            </span>
            {item.badge === 'free' && <Badge variant="free">ฟรี</Badge>}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-game-border">
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 rounded-xl text-sm text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          ออกจากระบบ
        </button>
      </div>
    </aside>
  )
}
