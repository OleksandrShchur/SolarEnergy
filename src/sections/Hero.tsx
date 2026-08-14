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
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[46%] sm:h-[42%]"
        aria-hidden
        animate={{
          background: isMorning
            ? `linear-gradient(to top, ${SURFACE} 0%, ${SURFACE} 34%, rgba(243,235,220,0.94) 50%, rgba(243,235,220,0.42) 70%, rgba(243,235,220,0.08) 86%, transparent 100%)`
            : `linear-gradient(to top, ${SURFACE} 0%, ${SURFACE} 34%, rgba(243,235,220,0.92) 50%, rgba(243,235,220,0.38) 70%, rgba(12,10,8,0.16) 86%, transparent 100%)`,
        }}
        transition={washTransition}
      />

      {/* Content layered over full-bleed images */}
      <Container className="relative z-20 flex min-h-[100svh] flex-col px-4 pt-[5.5rem] pb-10 text-center sm:px-6 sm:pt-28 sm:pb-12 md:pb-14 lg:px-8 lg:pt-32">
        <motion.h1
          className="max-w-[18ch] text-fluid-hero font-extrabold leading-[1.06] tracking-[-0.025em] sm:mx-auto sm:max-w-4xl sm:tracking-tight"
          animate={{ color: isMorning ? '#15120E' : '#F8F2E6' }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.75, ease: EASE }}
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
              ariaLabel={hero.toggle.ariaLabel}
            />
          </div>

          <p className="relative mx-auto max-w-xl pb-2 text-[0.9375rem] font-medium leading-relaxed text-slate-ink sm:max-w-2xl sm:pb-3 sm:text-base md:text-lg md:leading-[1.65]">
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
        </div>
      </Container>
    </section>
  )
}
