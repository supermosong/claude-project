'use client'
import { useState, useRef, useEffect } from 'react'
import Button from '@/components/ui/Button'

type Phase = 'idle' | 'waiting' | 'ready' | 'early'

export default function ReactionTestPage() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [reactionTime, setReactionTime] = useState<number | null>(null)
  const [times, setTimes] = useState<number[]>([])
  const startRef = useRef<number>(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  function startRound() {
    setPhase('waiting')
    setReactionTime(null)
    const delay = 1500 + Math.random() * 3000
    timerRef.current = setTimeout(() => {
      startRef.current = Date.now()
      setPhase('ready')
    }, delay)
  }

  function handleClick() {
    if (phase === 'idle') return startRound()
    if (phase === 'waiting') {
      if (timerRef.current) clearTimeout(timerRef.current)
      setPhase('early')
      return
    }
    if (phase === 'ready') {
      const ms = Date.now() - startRef.current
      setReactionTime(ms)
      setTimes(t => [...t.slice(-4), ms])
      setPhase('idle')
    }
    if (phase === 'early') return startRound()
  }

  const best = times.length ? Math.min(...times) : null
  const avg = times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : null

  const bgColor = phase === 'ready' ? 'bg-emerald-500 cursor-pointer'
    : phase === 'waiting' ? 'bg-red-500 cursor-pointer'
    : phase === 'early' ? 'bg-amber-500 cursor-pointer'
    : 'bg-game-card cursor-pointer'

  const label = phase === 'ready' ? '🟢 แตะเดี๋ยวนี้!'
    : phase === 'waiting' ? '🔴 รอก่อน...'
    : phase === 'early' ? '⚠️ เร็วเกินไป! แตะเพื่อลองใหม่'
    : reactionTime !== null ? `✅ ${reactionTime} มิลลิวินาที\nแตะเพื่อเล่นอีกครั้ง`
    : 'แตะเพื่อเริ่ม'

  function speedLabel(ms: number) {
    if (ms < 200) return '⚡ เทพมาก!'
    if (ms < 250) return '🔥 เร็วมาก'
    if (ms < 300) return '👍 ดีมาก'
    if (ms < 400) return '😊 ปกติ'
    return '🐢 ช้าหน่อย'
  }

  return (
    <div className="p-6 max-w-lg mx-auto w-full">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">⚡ ทดสอบปฏิกิริยา</h1>
        <p className="text-slate-400 mt-1">รอให้หน้าจอเปลี่ยนเป็นสีเขียว แล้วแตะให้เร็วที่สุด!</p>
      </div>

      {/* Main click zone */}
      <div
        onClick={handleClick}
        className={`h-64 rounded-3xl flex items-center justify-center transition-all duration-150 select-none ${bgColor} ${phase === 'ready' ? 'animate-pulse-glow' : ''}`}
      >
        <div className="text-center px-6">
          <p className="text-white font-bold text-2xl leading-snug whitespace-pre-line">{label}</p>
        </div>
      </div>

      {/* Stats */}
      {times.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 animate-fade-in">
          <div className="bg-game-card border border-game-border rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-violet-400">{best}ms</p>
            <p className="text-xs text-slate-400 mt-1">เร็วที่สุด</p>
            {best && <p className="text-xs text-slate-500 mt-0.5">{speedLabel(best)}</p>}
          </div>
          <div className="bg-game-card border border-game-border rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-emerald-400">{avg}ms</p>
            <p className="text-xs text-slate-400 mt-1">เฉลี่ย ({times.length} ครั้ง)</p>
          </div>
        </div>
      )}

      {times.length >= 3 && (
        <div className="mt-4 bg-game-card border border-game-border rounded-2xl p-4">
          <p className="text-xs text-slate-400 mb-2 font-semibold">ผลล่าสุด</p>
          <div className="flex gap-2 flex-wrap">
            {times.map((t, i) => (
              <span key={i} className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold ${
                t === best ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/40'
                : 'bg-slate-700/50 text-slate-400'
              }`}>
                {t}ms
              </span>
            ))}
          </div>
        </div>
      )}

      {phase === 'idle' && times.length === 0 && (
        <p className="text-center text-slate-500 text-sm mt-6">
          เฉลี่ยของคนทั่วไปอยู่ที่ประมาณ 250–300ms
        </p>
      )}
    </div>
  )
}
