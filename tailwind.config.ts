import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        game: {
          dark: '#0a0a14',
          surface: '#13131f',
          card: '#1c1c2e',
          border: '#2a2a3e',
        },
      },
      fontFamily: {
        sans: ['var(--font-kanit)', 'Kanit', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(124, 58, 237, 0.7)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.35s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
    },
  },
  plugins: [],
}

export default config
