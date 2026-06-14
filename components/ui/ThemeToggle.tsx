'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      data-cursor="btn"
      className="w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-300"
      style={{
        border: '1px solid var(--border)',
        color: 'var(--ink)',
        background: 'transparent',
        cursor: 'none',
      }}
      aria-label="Toggle theme"
    >
      {isDark
        ? <Sun size={15} strokeWidth={1.5} />
        : <Moon size={15} strokeWidth={1.5} />
      }
    </button>
  )
}
