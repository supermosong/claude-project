'use client'
import Link from 'next/link'
import Button from './Button'

type PlanGateProps = {
  children: React.ReactNode
  isPro?: boolean
  feature?: string
}

export default function PlanGate({ children, isPro = false, feature = 'ฟีเจอร์นี้' }: PlanGateProps) {
  if (isPro) return <>{children}</>
  return (
    <div className="relative min-h-[400px]">
      <div className="pointer-events-none select-none blur-sm opacity-40 overflow-hidden max-h-64">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-game-card border border-violet-500/50 rounded-2xl p-8 text-center max-w-sm mx-4 shadow-2xl shadow-violet-900/50 animate-fade-in">
          <div className="text-5xl mb-4">👑</div>
          <h3 className="text-xl font-bold text-white mb-2">{feature}</h3>
          <p className="text-sm text-slate-400 mb-2">สำหรับสมาชิก Pro เท่านั้น</p>
          <p className="text-sm text-slate-500 mb-6">อัปเกรดเพื่อปลดล็อคทุกเกมและฟีเจอร์พิเศษ เพียง ฿175/เดือน</p>
          <Link href="/pricing">
            <Button>อัปเกรดเป็น Pro ✦</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
