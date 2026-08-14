import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { hero } from '../content/site'
import { Container } from '../components/layout/Container'
import { DayNightToggle } from '../components/ui/DayNightToggle'
import { useHeroTheme } from '../context/HeroThemeContext'

const MORNING_BG = '#FAF6EE'
const NIGHT_BG = '#0c0a08'
const SURFACE = '#F3EBDC'
const EASE = [0.4, 0, 0.2, 1] as const
const IMAGE_EASE = [0.25, 0.1, 0.25, 1] as const
const IMAGE_DURATION = 0.5
/** Shared crop so morning/night facades stay locked during dissolve */
const HERO_IMG_CLASS =
  'absolute inset-0 h-full w-full object-cover object-[50%_42%] lg:object-[50%_48%]'

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

  const washTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.9, ease: EASE }

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      {/* Fallback background while images load / during transition */}
      <motion.div
        className="absolute inset-0"
        aria-hidden
        animate={{ backgroundColor: isMorning ? MORNING_BG : NIGHT_BG }}
        transition={washTransition}
      />

      {/* Full-bleed hero images — dissolve via Morning/Night toggle */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <img
          src="/assets/hero/night.png"
          alt=""
          draggable={false}
          className={HERO_IMG_CLASS}
        />
        <motion.img
          src="/assets/hero/morning.png"
          alt=""
          draggable={false}
          className={HERO_IMG_CLASS}
          initial={false}
          animate={{ opacity: isMorning ? 1 : 0 }}
          transition={fadeTransition}
        />
      </div>

      {/* Top vignette — navbar contrast over sky */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[38%] sm:h-[34%]"
        aria-hidden
        animate={{
          background: isMorning
            ? 'linear-gradient(to bottom, rgba(250,246,238,0.88) 0%, rgba(250,246,238,0.55) 38%, rgba(250,246,238,0.18) 68%, transparent 100%)'
            : 'linear-gradient(to bottom, rgba(12,10,8,0.82) 0%, rgba(12,10,8,0.45) 42%, rgba(12,10,8,0.12) 72%, transparent 100%)',
        }}
        transition={washTransition}
      />

      {/* Warm morning sun glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden
        animate={{ opacity: isMorning ? 1 : 0 }}
        transition={washTransition}
        style={{
          background:
            'radial-gradient(ellipse 90% 50% at 50% 8%, rgba(240, 166, 31, 0.22) 0%, transparent 62%)',
        }}
      />

      {/* Subtle edge vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-10 hero-fullbleed-vignette"
        aria-hidden
      />

      {/* Bottom fade into next section — opaque through the subheadline */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[28%] sm:h-[24%] lg:h-[22%]"
        aria-hidden
        animate={{
          background: isMorning
            ? `linear-gradient(to top, ${SURFACE} 0%, ${SURFACE} 36%, rgba(243,235,220,0.9) 58%, rgba(243,235,220,0.35) 78%, transparent 100%)`
            : `linear-gradient(to top, ${SURFACE} 0%, ${SURFACE} 36%, rgba(243,235,220,0.88) 58%, rgba(243,235,220,0.32) 78%, rgba(12,10,8,0.12) 90%, transparent 100%)`,
        }}
        transition={washTransition}
      />

      {/* Content layered over full-bleed images */}
      <Container className="relative z-20 flex min-h-[100svh] flex-col px-4 pt-[5.5rem] pb-4 text-center sm:px-6 sm:pt-28 sm:pb-5 md:pb-6 lg:px-8 lg:pt-32">
        <h1 className="sr-only lg:hidden">{hero.headline}</h1>
        <motion.h1
          className="mx-auto hidden max-w-[16ch] text-balance font-heading text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:block"
          animate={{ color: isMorning ? '#15120E' : '#F8F2E6' }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.75, ease: EASE }}
        >
          {hero.headline}
        </motion.h1>

        <div className="flex flex-1 flex-col justify-end pb-10 sm:pb-12 md:pb-14">
          <div className="flex justify-center">
            <DayNightToggle
              theme={theme}
              onChange={setTheme}
              morningLabel={hero.toggle.morning}
              nightLabel={hero.toggle.night}
              subtext={hero.toggle.subtext}
              ariaLabel={hero.toggle.ariaLabel}
            />
          </div>
        </div>

        <p className="relative mx-auto max-w-xl text-[0.9375rem] font-medium leading-relaxed text-slate-ink sm:max-w-2xl sm:text-base md:text-lg md:leading-[1.65]">
          <span
            className="pointer-events-none absolute -inset-x-8 -inset-y-5 -z-10 sm:-inset-x-12"
            aria-hidden
            style={{
              background:
                'radial-gradient(ellipse 85% 95% at 50% 65%, rgba(243,235,220,0.97) 0%, rgba(243,235,220,0.82) 48%, transparent 78%)',
            }}
          />
          {hero.subheadline}
        </p>
      </Container>
    </section>
  )
}
