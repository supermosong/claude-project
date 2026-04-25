import Link from 'next/link'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

const games = [
  { icon: '🎲', name: 'จริงหรือกล้า', desc: 'คำถามและภารกิจกว่า 50+ ข้อ ระดับความสนุกเลือกได้', plan: 'ฟรี', planType: 'free' as const, color: 'from-violet-600 to-purple-700' },
  { icon: '📝', name: 'เดาคำ', desc: 'เกม Wordle ในภาษาไทย เดา 5 ตัวอักษรใน 6 ครั้ง', plan: 'ฟรี', planType: 'free' as const, color: 'from-emerald-600 to-teal-700' },
  { icon: '⚡', name: 'ทดสอบปฏิกิริยา', desc: 'ทดสอบความเร็วในการตอบสนอง แข่งกับเพื่อนได้', plan: 'ฟรี', planType: 'free' as const, color: 'from-amber-500 to-orange-600' },
  { icon: '🎨', name: 'วาดและทาย', desc: 'วาดรูปให้เพื่อนทายแบบเรียลไทม์ สนุกสุด ๆ', plan: 'Pro', planType: 'pro' as const, color: 'from-pink-600 to-rose-700' },
]

const features = [
  { icon: '🎮', title: 'เกม 4 แบบ', desc: 'จริงหรือกล้า เดาคำ วาดและทาย ทดสอบปฏิกิริยา' },
  { icon: '👥', title: 'เล่นกับเพื่อน', desc: 'เพิ่มเพื่อน ดูคะแนน และแข่งกันได้เลย' },
  { icon: '🏆', title: 'กระดานอันดับ', desc: 'ดูว่าใครเก่งที่สุดในกลุ่ม (Pro)' },
  { icon: '🎴', title: 'การ์ดแบบกำหนดเอง', desc: 'สร้างคำถามและภารกิจของตัวเอง (Pro)' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-pink-900/10 pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <Badge variant="new">ใหม่ — เพิ่มเกมวาดและทาย! 🎉</Badge>
          <h1 className="mt-6 text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
            เกมปาร์ตี้
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent"> ออนไลน์</span>
            <br />สำหรับทุกวง
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            เล่นจริงหรือกล้า เดาคำ และอีกมากมาย กับเพื่อน ๆ ได้เลยทันที ไม่ต้องโหลดแอป
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto animate-pulse-glow">
                🎲 เริ่มเล่นเลย — ฟรี!
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                ดูแผน Pro
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-600">ไม่ต้องใส่บัตรเครดิต • ลงทะเบียนใน 30 วินาที</p>
        </div>

        {/* Preview card */}
        <div className="relative max-w-sm mx-auto mt-16 animate-fade-in">
          <div className="bg-game-card border border-game-border rounded-3xl p-8 text-center shadow-2xl shadow-violet-900/20">
            <div className="text-6xl mb-4">🎲</div>
            <p className="text-xs text-violet-400 font-semibold uppercase tracking-widest mb-3">จริง — ระดับกลาง</p>
            <p className="text-lg font-semibold text-white leading-snug">
              "ถ้าเพื่อนรู้ความลับที่น่าอายที่สุดของคุณ คุณจะรู้สึกอย่างไร?"
            </p>
            <div className="mt-6 flex gap-3">
              <button className="flex-1 bg-violet-600 hover:bg-violet-500 text-white rounded-xl py-3 font-semibold transition-colors">💬 จริง</button>
              <button className="flex-1 bg-pink-600 hover:bg-pink-500 text-white rounded-xl py-3 font-semibold transition-colors">🔥 กล้า</button>
            </div>
          </div>
        </div>
      </section>

      {/* Games */}
      <section id="games" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">เลือกเกมที่ชอบ</h2>
            <p className="mt-3 text-slate-400">มีทั้งแบบฟรีและ Pro เลือกเล่นได้เลย</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {games.map(g => (
              <div key={g.name} className="bg-game-card border border-game-border rounded-2xl p-6 hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-1">
                <div className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${g.color} items-center justify-center text-2xl mb-4`}>
                  {g.icon}
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">{g.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">{g.desc}</p>
                  </div>
                  <Badge variant={g.planType}>{g.plan}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-game-surface/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">ทำไมต้องเล่นกับเรา?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-game-card border border-game-border rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-violet-900/30 to-pink-900/20 border border-violet-500/30 rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">พร้อมเล่นหรือยัง?</h2>
          <p className="mt-4 text-slate-400 text-lg">สมัครฟรีวันนี้ ไม่ต้องใส่บัตรเครดิต</p>
          <div className="mt-8">
            <Link href="/auth/signup">
              <Button size="lg">🎮 สมัครฟรี — เริ่มเลย!</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-game-border py-8 px-4 text-center text-slate-600 text-sm">
        <p>© 2026 จริงหรือกล้า — เกมปาร์ตี้ออนไลน์</p>
        <div className="mt-2 flex gap-4 justify-center">
          <Link href="/pricing" className="hover:text-slate-400">ราคา</Link>
          <span>·</span>
          <Link href="/auth/login" className="hover:text-slate-400">เข้าสู่ระบบ</Link>
          <span>·</span>
          <Link href="/auth/signup" className="hover:text-slate-400">สมัครสมาชิก</Link>
        </div>
      </footer>
    </div>
  )
}
