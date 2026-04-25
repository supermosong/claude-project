import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'
import './globals.css'

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-kanit',
})

export const metadata: Metadata = {
  title: 'จริงหรือกล้า — เกมปาร์ตี้ออนไลน์',
  description: 'เล่นจริงหรือกล้า เดาคำ วาดและทาย กับเพื่อน ๆ ออนไลน์ ฟรี ไม่ต้องโหลดแอป',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={`${kanit.variable} font-sans bg-game-dark text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  )
}
