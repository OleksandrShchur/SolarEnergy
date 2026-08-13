import { motion } from 'framer-motion'
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

  return (
    <div
      className={`relative inline-flex rounded-full p-1 shadow-[0_10px_40px_rgba(0,0,0,0.22)] backdrop-blur-lg ring-1 transition-colors duration-700 ${
        isMorning
          ? 'bg-slate-900/45 ring-white/15'
          : 'bg-black/55 ring-white/10'
      }`}
      role="group"
      aria-label="Day and night view"
    >
      <motion.div
        className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-cream shadow-[0_2px_14px_rgba(0,0,0,0.14)]"
        animate={{ left: isMorning ? '4px' : 'calc(50% + 0px)' }}
        transition={PILL_SPRING}
      />

      <button
        type="button"
        onClick={() => onChange('morning')}
        aria-pressed={isMorning}
        className={`relative z-10 flex min-w-[9.5rem] flex-col items-center rounded-full px-6 py-3 transition-colors duration-500 sm:min-w-[11.5rem] sm:px-9 sm:py-3.5 ${
          isMorning ? 'text-slate-ink' : 'text-white/95'
        }`}
      >
        <span className="font-heading text-[0.9375rem] font-semibold tracking-tight sm:text-base">
          {morningLabel}
        </span>
        <span
          className={`mt-0.5 text-[0.6875rem] sm:text-xs ${
            isMorning ? 'text-slate-500' : 'text-white/65'
          }`}
        >
          {subtext}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onChange('night')}
        aria-pressed={!isMorning}
        className={`relative z-10 flex min-w-[9.5rem] flex-col items-center rounded-full px-6 py-3 transition-colors duration-500 sm:min-w-[11.5rem] sm:px-9 sm:py-3.5 ${
          !isMorning ? 'text-slate-ink' : 'text-white/95'
        }`}
      >
        <span className="font-heading text-[0.9375rem] font-semibold tracking-tight sm:text-base">
          {nightLabel}
        </span>
        <span
          className={`mt-0.5 text-[0.6875rem] sm:text-xs ${
            !isMorning ? 'text-slate-500' : 'text-white/65'
          }`}
        >
          {subtext}
        </span>
      </button>
    </div>
  )
}
