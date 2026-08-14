import {
  useCallback,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from 'react'
import { useReducedMotion } from 'framer-motion'

type MagnetProps = {
  children: ReactNode
  className?: string
  strength?: number
  padding?: number
}

const restStyle = {
  transform: 'translate3d(0px, 0px, 0)',
  transition: 'transform 0.6s ease-in-out',
  willChange: 'transform' as const,
}

export function Magnet({
  children,
  className = '',
  strength = 8,
  padding = 40,
}: MagnetProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState(restStyle)

  const handleMove = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = event.clientX - centerX
      const distY = event.clientY - centerY

      const withinX =
        event.clientX >= rect.left - padding && event.clientX <= rect.right + padding
      const withinY =
        event.clientY >= rect.top - padding && event.clientY <= rect.bottom + padding

      if (!withinX || !withinY) {
        setStyle(restStyle)
        return
      }

      setStyle({
        transform: `translate3d(${distX / strength}px, ${distY / strength}px, 0)`,
        transition: 'transform 0.3s ease-out',
        willChange: 'transform',
      })
    },
    [padding, strength],
  )

  const handleLeave = useCallback(() => {
    setStyle(restStyle)
  }, [])

  if (prefersReducedMotion) {
    return <div className={`inline-block ${className}`.trim()}>{children}</div>
  }

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`.trim()}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  )
}
