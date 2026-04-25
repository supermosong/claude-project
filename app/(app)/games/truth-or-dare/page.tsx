'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import { getRandomCard, type Card } from '@/lib/cards'

type Phase = 'setup' | 'choice' | 'card'
type Difficulty = 'light' | 'medium' | 'intense' | 'all'

const difficultyLabel: Record<Difficulty, string> = {
  light: '😊 เบา',
  medium: '🌶️ กลาง',
  intense: '🔥 เข้มข้น',
  all: '🎲 ทุกระดับ',
}

export default function TruthOrDarePage() {
  const [phase, setPhase] = useState<Phase>('setup')
  const [players, setPlayers] = useState<string[]>([])
  const [nameInput, setNameInput] = useState('')
  const [currentIdx, setCurrentIdx] = useState(0)
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [card, setCard] = useState<Card | null>(null)
  const [usedIds] = useState(new Set<number>())
  const [flipped, setFlipped] = useState(false)
  const [round, setRound] = useState(1)

  function addPlayer() {
    const trimmed = nameInput.trim()
    if (trimmed && !players.includes(trimmed) && players.length < 10) {
      setPlayers([...players, trimmed])
      setNameInput('')
    }
  }

  function removePlayer(i: number) {
    setPlayers(players.filter((_, idx) => idx !== i))
  }

  function startGame() {
    if (players.length >= 2) {
      setCurrentIdx(0)
      setRound(1)
      setPhase('choice')
    }
  }

  function chooseCard(type: 'truth' | 'dare') {
    const c = getRandomCard(type, difficulty, usedIds)
    usedIds.add(c.id)
    setCard(c)
    setFlipped(false)
    setPhase('card')
    setTimeout(() => setFlipped(true), 50)
  }

  function nextTurn() {
    const nextIdx = (currentIdx + 1) % players.length
    if (nextIdx === 0) setRound(r => r + 1)
    setCurrentIdx(nextIdx)
    setCard(null)
    setFlipped(false)
    setPhase('choice')
  }

  // Setup phase
  if (phase === 'setup') {
    return (
      <div className="p-6 max-w-lg mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">🎲 จริงหรือกล้า</h1>
          <p className="text-slate-400 mt-1">เพิ่มผู้เล่นอย่างน้อย 2 คนเพื่อเริ่มเกม</p>
        </div>

        {/* Difficulty */}
        <div className="mb-6">
          <p className="text-sm text-slate-400 mb-3">ระดับความสนุก</p>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(difficultyLabel) as Difficulty[]).map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`py-2.5 px-3 rounded-xl text-sm font-semibold border transition-all ${
                  difficulty === d
                    ? 'bg-violet-600 border-violet-500 text-white'
                    : 'bg-game-card border-game-border text-slate-400 hover:text-white hover:border-violet-500/40'
                }`}
              >
                {difficultyLabel[d]}
              </button>
            ))}
          </div>
        </div>

        {/* Add players */}
        <div className="mb-6">
          <p className="text-sm text-slate-400 mb-3">ผู้เล่น ({players.length}/10)</p>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addPlayer()}
              className="flex-1 bg-game-surface border border-game-border rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
              placeholder="ชื่อผู้เล่น"
              maxLength={20}
            />
            <Button onClick={addPlayer} size="md" disabled={!nameInput.trim() || players.length >= 10}>
              เพิ่ม
            </Button>
          </div>
          <div className="space-y-2">
            {players.map((p, i) => (
              <div key={i} className="flex items-center justify-between bg-game-card border border-game-border rounded-xl px-4 py-2.5">
                <span className="text-white font-medium">
                  <span className="text-slate-500 text-sm mr-2">{i + 1}.</span>{p}
                </span>
                <button onClick={() => removePlayer(i)} className="text-slate-500 hover:text-red-400 transition-colors text-sm">
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={startGame}
          disabled={players.length < 2}
          className="w-full"
          size="lg"
        >
          {players.length < 2 ? `เพิ่มผู้เล่นอีก ${2 - players.length} คน` : '🎲 เริ่มเกม!'}
        </Button>
      </div>
    )
  }

  // Choice phase
  if (phase === 'choice') {
    return (
      <div className="p-6 max-w-lg mx-auto w-full flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-8 text-sm text-slate-400">
          <span>รอบที่ {round}</span>
          <button onClick={() => setPhase('setup')} className="hover:text-white transition-colors">
            ← ออก
          </button>
        </div>

        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-4">🎯</div>
          <p className="text-slate-400 text-sm mb-2">ถึงคิวของ</p>
          <h2 className="text-4xl font-bold text-white">{players[currentIdx]}</h2>
          <p className="mt-3 text-slate-400">เลือกเลย!</p>
        </div>

        <div className="flex gap-4 w-full max-w-xs">
          <button
            onClick={() => chooseCard('truth')}
            className="flex-1 bg-violet-600 hover:bg-violet-500 active:scale-95 text-white rounded-2xl py-6 font-bold text-xl shadow-lg shadow-violet-900/40 transition-all"
          >
            💬<br />จริง
          </button>
          <button
            onClick={() => chooseCard('dare')}
            className="flex-1 bg-pink-600 hover:bg-pink-500 active:scale-95 text-white rounded-2xl py-6 font-bold text-xl shadow-lg shadow-pink-900/40 transition-all"
          >
            🔥<br />กล้า
          </button>
        </div>

        <div className="mt-8 flex gap-2 flex-wrap justify-center">
          {players.map((p, i) => (
            <span
              key={i}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                i === currentIdx
                  ? 'bg-violet-600 text-white'
                  : 'bg-game-card text-slate-500'
              }`}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    )
  }

  // Card phase
  return (
    <div className="p-6 max-w-lg mx-auto w-full flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-8 text-sm text-slate-400">
        <span>{players[currentIdx]} เลือก {card?.type === 'truth' ? 'จริง' : 'กล้า'}</span>
        <span>รอบที่ {round}</span>
      </div>

      <div
        className={`w-full max-w-sm transition-all duration-500 ${flipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div className={`rounded-3xl p-8 text-center shadow-2xl border-2 ${
          card?.type === 'truth'
            ? 'bg-gradient-to-br from-violet-900/40 to-violet-800/20 border-violet-500/50 shadow-violet-900/30'
            : 'bg-gradient-to-br from-pink-900/40 to-rose-800/20 border-pink-500/50 shadow-pink-900/30'
        }`}>
          <div className="text-5xl mb-4">{card?.type === 'truth' ? '💬' : '🔥'}</div>
          <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${
            card?.type === 'truth' ? 'text-violet-400' : 'text-pink-400'
          }`}>
            {card?.type === 'truth' ? 'จริง' : 'กล้า'} — {
              card?.difficulty === 'light' ? 'เบา' : card?.difficulty === 'medium' ? 'กลาง' : 'เข้มข้น'
            }
          </p>
          <p className="text-xl md:text-2xl font-semibold text-white leading-snug">
            {card?.content}
          </p>
        </div>
      </div>

      <Button onClick={nextTurn} size="lg" className="mt-10 w-full max-w-sm">
        ถัดไป → {players[(currentIdx + 1) % players.length]}
      </Button>
    </div>
  )
}
