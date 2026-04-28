'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function FakeCheckoutPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handlePay() {
    setLoading(true)
    await fetch('/api/fake-stripe/confirm', { method: 'POST' })
    router.push('/dashboard?upgraded=1')
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-sm text-center space-y-6">
        <div className="space-y-1">
          <p className="text-xs text-yellow-400 font-semibold uppercase tracking-widest">Test Mode</p>
          <h1 className="text-2xl font-bold text-white">Fake Checkout</h1>
          <p className="text-gray-400 text-sm">No real payment will be made</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Plan</span>
            <span className="text-white font-medium">Pro</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Price</span>
            <span className="text-white font-medium">฿175 / month</span>
          </div>
          <div className="border-t border-gray-700 pt-2 flex justify-between text-sm font-semibold">
            <span className="text-gray-300">Total today</span>
            <span className="text-green-400">฿0 (test)</span>
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition"
        >
          {loading ? 'Processing...' : 'Complete Payment'}
        </button>

        <button
          onClick={() => router.push('/pricing')}
          className="text-sm text-gray-500 hover:text-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
