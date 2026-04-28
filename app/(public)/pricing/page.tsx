import Link from 'next/link'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import UpgradeButton from '@/components/ui/UpgradeButton'

const freeFeatures = [
  'จริงหรือกล้า (58 การ์ด)',
  'เดาคำ (Wordle)',
  'ทดสอบปฏิกิริยา',
  'ระบบเพื่อน',
  'โปรไฟล์และสถิติ',
]

const proFeatures = [
  'ทุกอย่างในแผนฟรี',
  'วาดและทาย (มัลติเพลเยอร์)',
  'สร้างการ์ดของตัวเอง',
  'กระดานอันดับ',
  'ไม่มีโฆษณา',
]

const faqs = [
  {
    q: 'ยกเลิกได้ตอนไหน?',
    a: 'ยกเลิกได้ทุกเมื่อ ไม่มีค่าธรรมเนียมการยกเลิก และยังใช้งานได้ถึงสิ้นรอบบิล',
  },
  {
    q: 'แผนฟรีมีอะไรบ้าง?',
    a: 'แผนฟรีได้เล่นเกมหลักทั้งหมด 3 เกม พร้อมระบบเพื่อนและสถิติ ไม่จำกัดเวลา',
  },
  {
    q: 'ชำระเงินผ่านช่องทางไหน?',
    a: 'รองรับบัตรเครดิต/เดบิต ทุกธนาคารผ่าน Stripe (ปลอดภัย 100%)',
  },
  {
    q: 'ใช้ได้กี่อุปกรณ์?',
    a: 'ใช้ได้ไม่จำกัดอุปกรณ์ เข้าผ่านบราวเซอร์ได้เลย ไม่ต้องโหลดแอป',
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white">ราคาที่เหมาะกับทุกคน</h1>
          <p className="mt-4 text-slate-400 text-lg">เริ่มฟรี อัปเกรดเมื่อพร้อม</p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">

          {/* Free */}
          <div className="bg-game-card border border-game-border rounded-3xl p-8 flex flex-col">
            <div className="mb-6">
              <Badge variant="free">ฟรี</Badge>
              <p className="mt-4 text-4xl font-bold text-white">฿0</p>
              <p className="text-slate-500 text-sm mt-1">ตลอดไป ไม่มีบัตรเครดิต</p>
            </div>
            <ul className="space-y-3 flex-1">
              {freeFeatures.map(f => (
                <li key={f} className="flex items-center gap-3 text-slate-300 text-sm">
                  <span className="text-green-400">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/auth/signup" className="block">
                <Button variant="secondary" className="w-full">เริ่มใช้ฟรี</Button>
              </Link>
            </div>
          </div>

          {/* Pro */}
          <div className="relative bg-gradient-to-br from-violet-900/40 to-pink-900/20 border border-violet-500/50 rounded-3xl p-8 flex flex-col">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge variant="pro">แนะนำ</Badge>
            </div>
            <div className="mb-6">
              <Badge variant="pro">Pro</Badge>
              <p className="mt-4 text-4xl font-bold text-white">฿175</p>
              <p className="text-slate-500 text-sm mt-1">ต่อเดือน</p>
            </div>
            <ul className="space-y-3 flex-1">
              {proFeatures.map(f => (
                <li key={f} className="flex items-center gap-3 text-slate-300 text-sm">
                  <span className="text-violet-400">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <UpgradeButton />
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-24 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">คำถามที่พบบ่อย</h2>
          <div className="space-y-6">
            {faqs.map(item => (
              <div key={item.q} className="bg-game-card border border-game-border rounded-2xl p-6">
                <p className="font-semibold text-white mb-2">{item.q}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-slate-500 text-sm">
            มีคำถาม?{' '}
            <Link href="mailto:abc.mono.123@gmail.com" className="text-violet-400 hover:text-violet-300">
              ติดต่อเรา
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}
