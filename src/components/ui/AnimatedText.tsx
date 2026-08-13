import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

type AnimatedTextProps = {
  text: string
  className?: string
}

export function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.55'],
  })

  const characters = Array.from(text)

  return (
    <p ref={ref} className={`relative ${className}`.trim()}>
      {characters.map((char, index) => (
        <Char
          key={`${index}-${char}`}
          char={char}
          index={index}
          total={characters.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  )
}

function Char({
  char,
  index,
  total,
  progress,
}: {
  char: string
  index: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const start = index / total
  const end = Math.min(1, start + 1 / total)
  const opacity = useTransform(progress, [start, end], [0.45, 1])

  if (char === ' ') {
    return <span className="inline-block w-[0.3em]">&nbsp;</span>
  }

  return (
    <span className="relative inline-block">
      <span className="invisible">{char}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  )
}
