import { motion, useReducedMotion } from 'framer-motion'
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

const staticTags = {
  div: 'div',
  li: 'li',
  section: 'section',
  article: 'article',
  span: 'span',
  p: 'p',
} as const

type MotionTag = keyof typeof motionComponents

function getMotionComponent(as: ElementType) {
  if (typeof as === 'string' && as in motionComponents) {
    return motionComponents[as as MotionTag]
  }
  return motion.div
}

function getStaticTag(as: ElementType): ElementType {
  if (typeof as === 'string' && as in staticTags) {
    return staticTags[as as MotionTag]
  }
  return 'div'
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.55,
  x = 0,
  y = 18,
  as = 'div',
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion()
  const StaticTag = getStaticTag(as)

  if (prefersReducedMotion) {
    return <StaticTag className={className}>{children}</StaticTag>
  }

  const Component = getMotionComponent(as)

  return (
    <Component
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-64px', amount: 0 }}
      transition={{ duration, delay, ease: easing }}
    >
      {children}
    </Component>
  )
}
