import { AnimatePresence, motion } from 'framer-motion'
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

  return (
    <section id="technology" className="bg-white py-20 md:py-24">
      <Container>
        <SectionHeading title={technology.title} subtitle={technology.subtitle} />

        <FadeIn>
          <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2 rounded-2xl bg-surface p-2">
            {technology.tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  active === item.id
                    ? 'bg-white text-slate-ink shadow-soft'
                    : 'text-slate-500 hover:text-slate-ink'
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
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid items-center gap-8 rounded-3xl border border-slate-100 bg-surface p-6 shadow-soft md:grid-cols-2 md:p-10"
            >
              <div
                className={`flex aspect-[4/3] items-center justify-center rounded-2xl ${
                  tab.id === 'panels'
                    ? 'bg-gradient-to-br from-sky-100 to-amber-50'
                    : tab.id === 'battery'
                      ? 'bg-gradient-to-br from-emerald-50 to-slate-100'
                      : 'bg-gradient-to-br from-violet-50 to-amber-50'
                }`}
              >
                <Icon className="h-24 w-24 text-primary" strokeWidth={1.25} aria-hidden />
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-slate-ink">{tab.title}</h3>
                <p className="mt-3 text-slate-600">{tab.description}</p>
                <ul className="mt-6 space-y-3">
                  {tab.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                      {spec}
                    </li>
                  ))}
                </ul>
                <a
                  href="#quote"
                  className="mt-8 inline-flex text-sm font-semibold text-primary transition-colors hover:text-primary-light"
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
