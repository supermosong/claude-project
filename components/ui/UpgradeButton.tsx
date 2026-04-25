'use client'
import { useState } from 'react'
import Button from './Button'

export default function UpgradeButton({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      if (res.status === 401) {
        window.location.href = '/auth/login?redirect=/pricing'
        return
      }
      const { url } = await res.json()
      window.location.href = url
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button className={className} loading={loading} onClick={handleClick}>
      อัปเกรดเป็น Pro
    </Button>
  )
}
