import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export default function Button({ variant = 'primary', size = 'md', loading = false, className, children, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(clsx(
        'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95',
        {
          'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/30': variant === 'primary',
          'bg-game-card border border-game-border hover:border-violet-500/60 text-slate-200 hover:text-white': variant === 'secondary',
          'hover:bg-game-card text-slate-300 hover:text-white': variant === 'ghost',
          'bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/30': variant === 'danger',
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-5 py-2.5 text-base': size === 'md',
          'px-8 py-3.5 text-lg': size === 'lg',
        },
        className
      ))}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {children}
        </span>
      ) : children}
    </button>
  )
}
