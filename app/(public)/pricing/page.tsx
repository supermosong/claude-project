import Link from 'next/link'
import Button from '@/components/ui/Button'
import UpgradeButton from '@/components/ui/UpgradeButton'

const freePlan = [
  'จริงหรือกล้า (50+ คำถาม)',
  'เกมเดาคำ',
  'ทดสอบปฏิกิริยา',
  'ระบบเพื่อน',
  'โปรไฟล์ผู้เล่น',
]

const proPlan = [
  'ทุกอย่างในแผนฟรี',
  'วาดและทาย (เรียลไทม์)',
  'สร้างการ์ดแบบกำหนดเอง',
  'กระดานอันดับ',
  'ไม่มีโฆษณา',
  'รองรับทางเทคนิคพิเศษ',
]

export default function PricingPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white">เลือกแผนที่ใช่</h1>
          <p className="mt-4 text-slate-400 text-lg">เริ่มเล่นฟรีวันนี้ อัปเกรดเมื่อต้องการฟีเจอร์เพิ่ม</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free */}
          <div className="bg-game-card border border-game-border rounded-3xl p-8">
            <h2 className="text-xl font-bold text-white mb-1">ฟรี</h2>
            <div className="mt-4 mb-2 flex items-end gap-1">
              <span className="text-5xl font-bold text-white">฿0</span>
              <span className="text-slate-400 mb-1">/เดือน</span>
            </div>
            <p className="text-sm text-slate-500 mb-8">ไม่ต้องใส่บัตรเครดิต</p>
            <ul className="space-y-3 mb-8">
              {freePlan.map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>{item}
                </li>
              ))}
            </ul>
            <Link href="/auth/signup">
              <Button variant="secondary" className="w-full">เริ่มใช้งานฟรี</Button>
            </Link>
          </div>

          {/* Pro */}
          <div className="relative bg-gradient-to-br from-violet-900/30 to-pink-900/20 border-2 border-violet-500 rounded-3xl p-8 overflow-hidden">
            <div className="absolute top-5 right-5 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              ยอดนิยม ✦
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Pro</h2>
            <div className="mt-4 mb-2 flex items-end gap-1">
              <span className="text-5xl font-bold text-white">฿175</span>
              <span className="text-slate-400 mb-1">/เดือน</span>
            </div>
            <p className="text-sm text-slate-500 mb-8">ประมาณ ~$5/เดือน • ยกเลิกได้ทุกเวลา</p>
            <ul className="space-y-3 mb-8">
              {proPlan.map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="text-violet-400 mt-0.5 shrink-0">✦</span>{item}
                </li>
              ))}
            </ul>
            <UpgradeButton className="w-full" />
          </div>
        </div>

        <p className="mt-10 text-center text-slate-600 text-sm">
          ยกเลิกได้ทุกเวลา ไม่มีค่าธรรมเนียมซ่อน
        </p>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">คำถามที่พบบ่อย</h2>
          <div className="space-y-4">
            {[
              { q: 'ยกเลิกได้เมื่อไหร่?', a: 'ยกเลิกได้ทุกเวลา ไม่มีค่าปรับ ฟีเจอร์ Pro จะใช้งานได้จนครบรอบบิล' },
              { q: 'ชำระเงินด้วยอะไรได้บ้าง?', a: 'รับบัตรเครดิต/เดบิตทุกประเภท และ PromptPay ผ่าน Stripe' },
              { q: 'ฟรีมีโฆษณาไหม?', a: 'มีโฆษณาบ้างในแผนฟรี แต่ไม่รบกวนการเล่นเกม อัปเกรด Pro เพื่อปิดโฆษณา' },
            ].map(({ q, a }) => (
              <div key={q} className="bg-game-card border border-game-border rounded-2xl p-5">
                <h3 className="font-semibold text-white mb-2">{q}</h3>
                <p className="text-sm text-slate-400">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
