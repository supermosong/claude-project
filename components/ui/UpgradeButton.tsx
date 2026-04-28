'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from './Button'

export default function UpgradeButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleUpgrade() {
    setLoading(true)
    const res = await fetch('/api/fake-stripe/confirm', { method: 'POST' })
    if (res.status === 401) {
      router.push('/auth/signup')
    } else {
      router.push('/dashboard?upgraded=1')
    }
  }

  return (
    <Button onClick={handleUpgrade} loading={loading} className="w-full">
      อัปเกรดเป็น Pro
    </Button>
  )
}
