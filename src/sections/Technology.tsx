import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Battery, LayoutGrid, Smartphone } from 'lucide-react'
import { useState } from 'react'
import { technology } from '../content/site'
import { Container } from '../components/layout/Container'
import { SectionHeading } from '../components/layout/SectionHeading'
import { FadeIn } from '../components/ui/FadeIn'

const icons = {
  panels: LayoutGrid,
  battery: Battery,
  monitoring: Smartphone,
} as const

export function Technology() {
  const [active, setActive] = useState(technology.tabs[0].id)
  const tab = technology.tabs.find((t) => t.id === active) ?? technology.tabs[0]
  const Icon = icons[tab.id as keyof typeof icons]
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="technology" className="relative overflow-hidden bg-cream py-16 sm:py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 solar-wash" aria-hidden />
      <Container className="relative">
        <SectionHeading title={technology.title} subtitle={technology.subtitle} />

        <FadeIn>
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-2 rounded-2xl border border-white/70 bg-white/50 p-2 backdrop-blur-md sm:flex-row sm:flex-wrap sm:justify-center">
            {technology.tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={`min-h-11 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-300 sm:flex-1 ${
                  active === item.id
                    ? 'bg-cream text-slate-ink shadow-soft'
                    : 'text-stone-500 hover:text-slate-ink'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="relative mt-10 min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid items-center gap-8 rounded-3xl border border-white/70 bg-white/70 p-6 shadow-soft backdrop-blur-md md:grid-cols-2 md:p-10"
            >
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 via-cream to-secondary/10">
                <Icon
                  className="h-20 w-20 text-primary drop-shadow-[0_0_18px_rgba(240,166,31,0.45)] sm:h-24 sm:w-24"
                  strokeWidth={1.25}
                  aria-hidden
                />
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-slate-ink">{tab.title}</h3>
                <p className="mt-3 text-stone-600">{tab.description}</p>
                <ul className="mt-6 space-y-3">
                  {tab.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-2 text-sm text-stone-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {spec}
                    </li>
                  ))}
                </ul>
                <a
                  href="#quote"
                  className="mt-8 inline-flex min-h-11 items-center text-sm font-semibold text-primary transition-colors hover:text-primary-light"
                >
                  {tab.learnMore} →
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}
