import { motion } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'

type FadeInProps = {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  x?: number
  y?: number
  as?: ElementType
}

const easing: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const motionComponents = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
  article: motion.article,
  span: motion.span,
  p: motion.p,
} as const

type MotionTag = keyof typeof motionComponents

function getMotionComponent(as: ElementType) {
  if (typeof as === 'string' && as in motionComponents) {
    return motionComponents[as as MotionTag]
  }
  return motion.div
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
}: FadeInProps) {
  const Component = getMotionComponent(as)

  return (
    <Component
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px', amount: 0 }}
      transition={{ duration, delay, ease: easing }}
    >
      {children}
    </Component>
  )
}
