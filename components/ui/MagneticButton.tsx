'use client'

import { useRef, useCallback, ReactNode } from 'react'
import { gsap } from 'gsap'
import clsx from 'clsx'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  strength?: number
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  'data-cursor'?: string
}

export function MagneticButton({
  children,
  className,
  style,
  strength = 0.35,
  onClick,
  type = 'button',
  ...rest
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null)

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const el = btnRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    gsap.to(el, {
      x: dx * strength,
      y: dy * strength,
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [strength])

  const onMouseLeave = useCallback(() => {
    const el = btnRef.current
    if (!el) return
    gsap.to(el, {
      x: 0, y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    })
  }, [])

  return (
    <button
      ref={btnRef}
      type={type}
      className={clsx('magnetic-btn', className)}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      data-cursor="btn"
      {...rest}
    >
      {children}
    </button>
  )
}
