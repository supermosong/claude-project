'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 6) { setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'); return }
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: name } },
    })
    if (error) {
      setError(error.message === 'User already registered' ? 'อีเมลนี้มีบัญชีอยู่แล้ว' : 'เกิดข้อผิดพลาด กรุณาลองใหม่')
      setLoading(false)
      return
    }
    if (data.session) {
      router.push('/dashboard')
      router.refresh()
    } else {
      setEmailSent(true)
      setLoading(false)
    }
  }

  async function handleGoogle() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="text-6xl mb-4">📧</div>
          <h1 className="text-2xl font-bold text-white mb-2">ตรวจสอบอีเมลของคุณ</h1>
          <p className="text-slate-400 text-sm mb-6">เราส่งลิงก์ยืนยันไปที่ <span className="text-white">{email}</span> แล้ว กรุณาคลิกลิงก์เพื่อเปิดใช้งานบัญชี</p>
          <Link href="/auth/login" className="text-violet-400 hover:text-violet-300 text-sm font-semibold">
            กลับไปหน้าเข้าสู่ระบบ →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-4xl">🎲</Link>
          <h1 className="mt-3 text-2xl font-bold text-white">สมัครสมาชิก</h1>
          <p className="mt-1 text-slate-400 text-sm">ฟรี ไม่ต้องใส่บัตรเครดิต</p>
        </div>

        <div className="bg-game-card border border-game-border rounded-2xl p-6">
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold py-2.5 px-4 rounded-xl transition-colors text-sm mb-5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            สมัครด้วย Google
          </button>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-game-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-game-card px-3 text-slate-500">หรือสมัครด้วยอีเมล</span>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl p-3 text-center">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">ชื่อที่แสดง</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-game-surface border border-game-border rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
                placeholder="ชื่อเล่นหรือชื่อจริง"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">อีเมล</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-game-surface border border-game-border rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">รหัสผ่าน</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-game-surface border border-game-border rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
                placeholder="อย่างน้อย 6 ตัวอักษร"
                required
              />
            </div>
            <Button type="submit" loading={loading} className="w-full">สมัครสมาชิก — ฟรี!</Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          มีบัญชีแล้ว?{' '}
          <Link href="/auth/login" className="text-violet-400 hover:text-violet-300 font-semibold">เข้าสู่ระบบ</Link>
        </p>
      </div>
    </div>
  )
}
