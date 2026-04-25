'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'
import Button from '@/components/ui/Button'

const WORDS = ['BRAVE', 'FLAME', 'QUEST', 'STONE', 'DANCE', 'CLOUD', 'LIGHT', 'POWER', 'DREAM', 'GRACE', 'SPARK', 'HEART', 'BLOOM', 'CHESS', 'SHARP', 'BLAST', 'CLASH', 'FROST', 'GLIDE', 'HAPPY', 'CRISP', 'FLINT', 'PRIDE', 'SWIFT', 'TRACK', 'VITAL', 'WRECK', 'YOUTH', 'ZEBRA', 'BLAZE']

function getDailyWord() {
  const day = Math.floor(Date.now() / 86400000)
  return WORDS[day % WORDS.length]
}

type LetterState = 'correct' | 'present' | 'absent' | 'empty'

function evaluateGuess(guess: string, answer: string): LetterState[] {
  const result: LetterState[] = Array(5).fill('absent')
  const ansArr = answer.split('')
  const guessArr = guess.split('')
  const used = Array(5).fill(false)

  guessArr.forEach((l, i) => {
    if (l === ansArr[i]) { result[i] = 'correct'; used[i] = true }
  })
  guessArr.forEach((l, i) => {
    if (result[i] === 'correct') return
    const j = ansArr.findIndex((a, idx) => a === l && !used[idx])
    if (j !== -1) { result[i] = 'present'; used[j] = true }
  })
  return result
}

const cellColor: Record<LetterState, string> = {
  correct: 'bg-emerald-600 border-emerald-500 text-white',
  present: 'bg-amber-500 border-amber-400 text-white',
  absent: 'bg-slate-700 border-slate-600 text-slate-300',
  empty: 'bg-game-surface border-game-border text-white',
}

const KEYBOARD = [['Q','W','E','R','T','Y','U','I','O','P'], ['A','S','D','F','G','H','J','K','L'], ['ENTER','Z','X','C','V','B','N','M','⌫']]

export default function WordlePage() {
  const [answer, setAnswer] = useState(getDailyWord)
  const [guesses, setGuesses] = useState<string[]>([])
  const [current, setCurrent] = useState('')
  const [shake, setShake] = useState(false)
  const [message, setMessage] = useState('')
  const [validating, setValidating] = useState(false)
  const [genLoading, setGenLoading] = useState(false)

  const won = guesses.some(g => g === answer)
  const lost = !won && guesses.length >= 6

  const states = useMemo((): Record<string, LetterState> => {
    const map: Record<string, LetterState> = {}
    guesses.forEach(g => {
      evaluateGuess(g, answer).forEach((s, i) => {
        const l = g[i]
        if (!map[l] || s === 'correct' || (s === 'present' && map[l] === 'absent')) map[l] = s
      })
    })
    return map
  }, [guesses, answer])

  function flash(msg: string) {
    setMessage(msg)
    setTimeout(() => setMessage(''), 1500)
  }

  function triggerShake() {
    setShake(true)
    setTimeout(() => setShake(false), 500)
  }

  function resetGame(newAnswer: string) {
    setAnswer(newAnswer)
    setGuesses([])
    setCurrent('')
    setMessage('')
  }

  const genNewWord = useCallback(async () => {
    setGenLoading(true)
    try {
      const res = await fetch('https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase')
      if (!res.ok) throw new Error()
      const data = await res.json()
      const word: string = Array.isArray(data) ? data[0] : data.word
      resetGame(word.toUpperCase())
    } catch {
      resetGame(WORDS[Math.floor(Math.random() * WORDS.length)])
    } finally {
      setGenLoading(false)
    }
  }, [])

  const onEnter = useCallback(async (word: string) => {
    if (word.length < 5) {
      triggerShake()
      flash('คำต้องมี 5 ตัวอักษร')
      return
    }
    setValidating(true)
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`)
      if (!res.ok) {
        triggerShake()
        flash('ไม่พบคำนี้ในพจนานุกรม')
        return
      }
      setGuesses(g => [...g, word])
      setCurrent('')
    } catch {
      setGuesses(g => [...g, word])
      setCurrent('')
    } finally {
      setValidating(false)
    }
  }, [])

  const handleKey = useCallback((key: string) => {
    if (won || lost || validating) return
    if (key === '⌫' || key === 'BACKSPACE') {
      setCurrent(c => c.slice(0, -1))
    } else if (key === 'ENTER') {
      onEnter(current)
    } else if (/^[A-Z]$/.test(key) && current.length < 5) {
      setCurrent(c => c + key)
    }
  }, [current, won, lost, validating, onEnter])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => handleKey(e.key.toUpperCase())
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleKey])

  return (
    <div className="p-4 max-w-sm mx-auto w-full flex flex-col items-center">
      <div className="w-full text-center mb-6">
        <h1 className="text-2xl font-bold text-white">📝 เดาคำ</h1>
        <p className="text-slate-400 text-sm mt-1">เดาคำภาษาอังกฤษ 5 ตัวอักษรใน 6 ครั้ง</p>
        <Button size="sm" variant="secondary" className="mt-3" loading={genLoading} onClick={genNewWord}>
          🎲 สุ่มคำใหม่
        </Button>
      </div>

      {message && (
        <div className="mb-4 bg-slate-700 text-white text-sm px-4 py-2 rounded-xl font-medium">
          {message}
        </div>
      )}
      {validating && !message && (
        <div className="mb-4 bg-slate-700 text-slate-400 text-sm px-4 py-2 rounded-xl font-medium flex items-center gap-2">
          <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          กำลังตรวจสอบ...
        </div>
      )}

      <div className="grid grid-rows-6 gap-1.5 mb-6">
        {Array(6).fill(null).map((_, row) => {
          const guess = guesses[row]
          const isActive = row === guesses.length && !won && !lost
          const displayWord = isActive ? current.padEnd(5, ' ') : (guess || '     ')
          const evals = guess ? evaluateGuess(guess, answer) : null
          return (
            <div key={row} className={`flex gap-1.5 ${isActive && shake ? 'animate-bounce' : ''}`}>
              {displayWord.split('').map((l, col) => {
                const state: LetterState = evals ? evals[col] : 'empty'
                return (
                  <div key={col} className={`w-14 h-14 flex items-center justify-center text-2xl font-bold rounded-lg border-2 transition-all ${cellColor[state]}`}>
                    {l.trim()}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      {(won || lost) && (
        <div className={`mb-4 rounded-2xl p-4 text-center w-full ${won ? 'bg-emerald-900/30 border border-emerald-500/40' : 'bg-red-900/30 border border-red-500/40'}`}>
          {won
            ? <p className="font-bold text-emerald-400">🎉 เก่งมาก! เดาถูกใน {guesses.length} ครั้ง</p>
            : <p className="font-bold text-red-400">😢 หมดแล้ว! คำตอบคือ <span className="text-white">{answer}</span></p>}
          <button onClick={genNewWord} className="mt-3 text-xs text-violet-400 hover:text-violet-300 font-semibold">
            🎲 เล่นอีกครั้ง
          </button>
        </div>
      )}

      <div className="space-y-1.5 w-full">
        {KEYBOARD.map((row, ri) => (
          <div key={ri} className="flex justify-center gap-1">
            {row.map(key => {
              const s = states[key]
              return (
                <button
                  key={key}
                  onClick={() => handleKey(key)}
                  disabled={validating}
                  className={`h-14 rounded-lg font-semibold text-sm transition-all active:scale-95 disabled:opacity-50 ${
                    key === 'ENTER' || key === '⌫' ? 'px-2 min-w-[52px] text-xs' : 'w-9'
                  } ${
                    s === 'correct' ? 'bg-emerald-600 text-white'
                    : s === 'present' ? 'bg-amber-500 text-white'
                    : s === 'absent' ? 'bg-slate-700 text-slate-400'
                    : 'bg-slate-600 hover:bg-slate-500 text-white'
                  }`}
                >
                  {key}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
