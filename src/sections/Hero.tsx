import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { hero } from '../content/site'
import { Container } from '../components/layout/Container'
import { DayNightToggle } from '../components/ui/DayNightToggle'
import { useHeroTheme } from '../context/HeroThemeContext'

const MORNING_BG = '#FAFAF8'
const NIGHT_BG = '#0c1220'
const EASE = [0.4, 0, 0.2, 1] as const
const IMAGE_EASE = [0.25, 0.1, 0.25, 1] as const
const IMAGE_DURATION = 0.5
/** Shared crop so morning/night facades stay locked during dissolve */
const HERO_OBJECT_POSITION = '50% 42%'
const HERO_IMG_CLASS =
  'absolute inset-0 h-full w-full object-cover'

export function Hero() {
  const { theme, setTheme } = useHeroTheme()
  const isMorning = theme === 'morning'
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    ;['/assets/hero/morning.png', '/assets/hero/night.png'].forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  const fadeTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: IMAGE_DURATION, ease: IMAGE_EASE }

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      {/* Fallback background while images load / during transition */}
      <motion.div
        className="absolute inset-0"
        aria-hidden
        animate={{ backgroundColor: isMorning ? MORNING_BG : NIGHT_BG }}
        transition={{ duration: 0.9, ease: EASE }}
      />

      {/* Full-bleed hero images — dissolve via Morning/Night toggle */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <img
          src="/assets/hero/night.png"
          alt=""
          draggable={false}
          className={HERO_IMG_CLASS}
          style={{ objectPosition: HERO_OBJECT_POSITION }}
        />
        <motion.img
          src="/assets/hero/morning.png"
          alt=""
          draggable={false}
          className={HERO_IMG_CLASS}
          style={{ objectPosition: HERO_OBJECT_POSITION }}
          initial={false}
          animate={{ opacity: isMorning ? 1 : 0 }}
          transition={fadeTransition}
        />
      </div>

      {/* Top vignette — headline legibility over sky */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[38%] sm:h-[34%]"
        aria-hidden
        animate={{
          background: isMorning
            ? 'linear-gradient(to bottom, rgba(250,250,248,0.88) 0%, rgba(250,250,248,0.55) 38%, rgba(250,250,248,0.18) 68%, transparent 100%)'
            : 'linear-gradient(to bottom, rgba(12,18,32,0.82) 0%, rgba(12,18,32,0.45) 42%, rgba(12,18,32,0.12) 72%, transparent 100%)',
        }}
        transition={{ duration: 0.9, ease: EASE }}
      />

      {/* Warm morning sun glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden
        animate={{ opacity: isMorning ? 1 : 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        style={{
          background:
            'radial-gradient(ellipse 90% 50% at 50% 8%, rgba(245, 158, 11, 0.14) 0%, transparent 62%)',
        }}
      />

      {/* Subtle edge vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-10 hero-fullbleed-vignette"
        aria-hidden
      />

      {/* Bottom fade into next section — strongest wash stays below subheadline */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[36%] sm:h-[32%]"
        aria-hidden
        animate={{
          background: isMorning
            ? 'linear-gradient(to top, #f8fafc 0%, rgba(248,250,252,0.95) 18%, rgba(248,250,252,0.45) 48%, rgba(248,250,252,0.12) 72%, transparent 100%)'
            : 'linear-gradient(to top, #f8fafc 0%, rgba(248,250,252,0.9) 20%, rgba(248,250,252,0.4) 50%, rgba(12,18,32,0.2) 70%, transparent 100%)',
        }}
        transition={{ duration: 0.9, ease: EASE }}
      />

      {/* Content layered over full-bleed images */}
      <Container className="relative z-20 flex min-h-[100svh] flex-col px-4 pt-[5.5rem] pb-10 text-center sm:px-6 sm:pt-28 sm:pb-12 md:pb-14 lg:px-8 lg:pt-32">
        <motion.h1
          className="max-w-[18ch] text-fluid-hero font-extrabold leading-[1.06] tracking-[-0.025em] sm:mx-auto sm:max-w-4xl sm:tracking-tight"
          animate={{ color: isMorning ? '#0f172a' : '#f5f0e6' }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          {hero.headline}
        </motion.h1>

        <div className="flex flex-1 flex-col justify-end">
          <div className="flex justify-center pb-6 sm:pb-8 md:pb-10">
            <DayNightToggle
              theme={theme}
              onChange={setTheme}
              morningLabel={hero.toggle.morning}
              nightLabel={hero.toggle.night}
              subtext={hero.toggle.subtext}
            />
          </div>

          <motion.p
            className="mx-auto max-w-xl pb-2 text-[0.9375rem] leading-relaxed sm:max-w-2xl sm:pb-3 sm:text-base md:text-lg md:leading-[1.65]"
            style={{
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.85)',
            }}
            // Dark slate in both themes — sits in the light #f8fafc bottom fade
            animate={{ color: isMorning ? '#475569' : '#334155' }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            {hero.subheadline}
          </motion.p>
        </div>
      </Container>
    </section>
  )
}
