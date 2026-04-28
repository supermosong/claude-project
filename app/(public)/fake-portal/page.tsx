'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function FakePortalPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleCancel() {
    setLoading(true)
    await fetch('/api/fake-stripe/cancel', { method: 'POST' })
    router.push('/settings?downgraded=1')
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-sm text-center space-y-6">
        <div className="space-y-1">
          <p className="text-xs text-yellow-400 font-semibold uppercase tracking-widest">Test Mode</p>
          <h1 className="text-2xl font-bold text-white">Fake Billing Portal</h1>
          <p className="text-gray-400 text-sm">Manage your subscription</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Current plan</span>
            <span className="text-indigo-400 font-medium">Pro</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Status</span>
            <span className="text-green-400 font-medium">Active</span>
          </div>
        </div>

        <button
          onClick={handleCancel}
          disabled={loading}
          className="w-full bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition"
        >
          {loading ? 'Cancelling...' : 'Cancel Subscription'}
        </button>

        <button
          onClick={() => router.push('/settings')}
          className="text-sm text-gray-500 hover:text-gray-300 transition"
        >
          Go back
        </button>
      </div>
    </div>
  )
}
