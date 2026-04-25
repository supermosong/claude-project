'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function SettingsPage() {
  const router = useRouter()
  const [displayName, setDisplayName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault()
    if (!displayName.trim()) return
    setSaving(true)
    const supabase = createClient()
    await supabase.auth.updateUser({ data: { display_name: displayName.trim() } })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className="p-6 max-w-2xl mx-auto w-full space-y-6">
      <h1 className="text-2xl font-bold text-white">⚙️ ตั้งค่า</h1>

      {/* Profile */}
      <div className="bg-game-card border border-game-border rounded-2xl p-6">
        <h2 className="font-semibold text-white mb-5">โปรไฟล์</h2>
        <form onSubmit={saveProfile} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">ชื่อที่แสดง</label>
            <input
              type="text"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className="w-full bg-game-surface border border-game-border rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
              placeholder="ชื่อใหม่ของคุณ"
              maxLength={30}
            />
          </div>
          <Button type="submit" loading={saving} disabled={!displayName.trim()}>
            {saved ? '✓ บันทึกแล้ว' : 'บันทึก'}
          </Button>
        </form>
      </div>

      {/* Plan */}
      <div className="bg-game-card border border-game-border rounded-2xl p-6">
        <h2 className="font-semibold text-white mb-1">แผนการใช้งาน</h2>
        <p className="text-slate-400 text-sm mb-5">ปัจจุบัน: แผนฟรี</p>
        <div className="flex gap-3 flex-wrap">
          <Link href="/pricing">
            <Button>อัปเกรดเป็น Pro ✦</Button>
          </Link>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-game-card border border-red-900/50 rounded-2xl p-6">
        <h2 className="font-semibold text-red-400 mb-5">โซนอันตราย</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="ghost" onClick={handleLogout} className="text-slate-400 hover:text-white border border-game-border">
            ออกจากระบบ
          </Button>
          {!showDelete ? (
            <Button variant="danger" onClick={() => setShowDelete(true)}>ลบบัญชี</Button>
          ) : (
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-sm text-red-400">แน่ใจหรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้</p>
              <Button variant="danger">ยืนยันลบบัญชี</Button>
              <Button variant="ghost" onClick={() => setShowDelete(false)}>ยกเลิก</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
