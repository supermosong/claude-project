import PlanGate from '@/components/ui/PlanGate'
import { createClient } from '@/lib/supabase/server'

export default async function DrawAndGuessPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isPro = user?.user_metadata?.plan === 'pro'

  return (
    <div className="p-6 max-w-4xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">🎨 วาดและทาย</h1>
        <p className="text-slate-400 mt-1">วาดรูปให้เพื่อนทายแบบเรียลไทม์</p>
      </div>
      <PlanGate isPro={isPro} feature="วาดและทาย">
        <div className="bg-game-card border border-game-border rounded-2xl p-8 text-center">
          <p className="text-slate-400">กำลังโหลดห้องเกม...</p>
        </div>
      </PlanGate>
    </div>
  )
}
