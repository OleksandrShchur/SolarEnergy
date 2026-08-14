import { motion, useReducedMotion } from 'framer-motion'
import type { HeroTheme } from '../../context/HeroThemeContext'

type DayNightToggleProps = {
  theme: HeroTheme
  onChange: (theme: HeroTheme) => void
  morningLabel: string
  nightLabel: string
  subtext: string
}

const PILL_SPRING = { type: 'spring' as const, stiffness: 420, damping: 32 }

export function DayNightToggle({
  theme,
  onChange,
  morningLabel,
  nightLabel,
  subtext,
}: DayNightToggleProps) {
  const isMorning = theme === 'morning'
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className={`relative inline-flex max-w-full rounded-full p-1 shadow-[0_10px_40px_rgba(21,18,14,0.28)] backdrop-blur-lg ring-1 transition-colors duration-700 ${
        isMorning ? 'bg-slate-ink/50 ring-white/20' : 'bg-black/55 ring-primary/20'
      }`}
      role="group"
      aria-label="Day and night view"
    >
      <motion.div
        className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-cream shadow-[0_2px_18px_rgba(240,166,31,0.28)]"
        animate={{ left: isMorning ? '4px' : 'calc(50% + 0px)' }}
        transition={prefersReducedMotion ? { duration: 0 } : PILL_SPRING}
      />

      <button
        type="button"
        onClick={() => onChange('morning')}
        aria-pressed={isMorning}
        className={`relative z-10 flex min-h-11 min-w-[7.25rem] flex-col items-center rounded-full px-4 py-2.5 transition-colors duration-500 sm:min-w-[11.5rem] sm:px-9 sm:py-3.5 ${
          isMorning ? 'text-slate-ink' : 'text-white/95'
        }`}
      >
        <span className="font-heading text-[0.8125rem] font-semibold tracking-tight sm:text-base">
          {morningLabel}
        </span>
        <span
          className={`mt-0.5 text-[0.625rem] sm:text-xs ${
            isMorning ? 'text-stone-500' : 'text-white/65'
          }`}
        >
          {subtext}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onChange('night')}
        aria-pressed={!isMorning}
        className={`relative z-10 flex min-h-11 min-w-[7.25rem] flex-col items-center rounded-full px-4 py-2.5 transition-colors duration-500 sm:min-w-[11.5rem] sm:px-9 sm:py-3.5 ${
          !isMorning ? 'text-slate-ink' : 'text-white/95'
        }`}
      >
        <span className="font-heading text-[0.8125rem] font-semibold tracking-tight sm:text-base">
          {nightLabel}
        </span>
        <span
          className={`mt-0.5 text-[0.625rem] sm:text-xs ${
            !isMorning ? 'text-stone-500' : 'text-white/65'
          }`}
        >
          {subtext}
        </span>
      </button>
    </div>
  )
}
