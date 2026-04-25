import { clsx } from 'clsx'

type BadgeProps = {
  children: React.ReactNode
  variant?: 'free' | 'pro' | 'new' | 'default'
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
      {
        'bg-slate-700 text-slate-300': variant === 'default',
        'bg-slate-700/50 text-slate-400 border border-slate-600/50': variant === 'free',
        'bg-gradient-to-r from-violet-600 to-pink-600 text-white': variant === 'pro',
        'bg-green-500/20 text-green-400 border border-green-500/30': variant === 'new',
      }
    )}>
      {children}
    </span>
  )
}
