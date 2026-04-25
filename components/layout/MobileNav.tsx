'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'

const tabs = [
  { href: '/dashboard', icon: '🏠', label: 'หน้าหลัก' },
  { href: '/games/truth-or-dare', icon: '🎲', label: 'เกม' },
  { href: '/friends', icon: '👥', label: 'เพื่อน' },
  { href: '/profile', icon: '👤', label: 'โปรไฟล์' },
]

export default function MobileNav() {
  const pathname = usePathname()
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-game-surface border-t border-game-border z-40 flex">
      {tabs.map(t => (
        <Link
          key={t.href}
          href={t.href}
          className={clsx(
            'flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 text-xs transition-colors',
            pathname.startsWith(t.href) && t.href !== '/dashboard'
              ? 'text-violet-400'
              : pathname === t.href
              ? 'text-violet-400'
              : 'text-slate-500 hover:text-slate-300'
          )}
        >
          <span className="text-lg">{t.icon}</span>
          <span>{t.label}</span>
        </Link>
      ))}
    </nav>
  )
}
