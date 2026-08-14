import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ClipboardList, Hammer, LineChart, PencilRuler } from 'lucide-react'
import { useRef } from 'react'
import { howItWorks } from '../content/site'
import { Container } from '../components/layout/Container'
import { SectionHeading } from '../components/layout/SectionHeading'
import { FadeIn } from '../components/ui/FadeIn'

const icons = [ClipboardList, PencilRuler, Hammer, LineChart]

export function HowItWorks() {
  const lineRef = useRef<SVGSVGElement>(null)
  const inView = useInView(lineRef, { once: true, margin: '-40px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-cream py-16 sm:py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 solar-wash" aria-hidden />
      <Container className="relative">
        <SectionHeading title={howItWorks.title} subtitle={howItWorks.subtitle} />

        <div className="relative">
          <svg
            ref={lineRef}
            className="pointer-events-none absolute left-0 right-0 top-10 hidden h-4 w-full lg:block"
            viewBox="0 0 1000 16"
            preserveAspectRatio="none"
            aria-hidden
          >
            <motion.path
              d="M 80 8 H 920"
              fill="none"
              stroke="#F0A61F"
              strokeWidth="2"
              strokeDasharray="8 10"
              initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
              animate={inView || prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </svg>

          <ol className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {howItWorks.steps.map((step, index) => {
              const Icon = icons[index]
              return (
                <FadeIn key={step.number} delay={index * 0.08} as="li">
                  <div className="relative h-full rounded-2xl border border-white/70 bg-white/70 p-6 shadow-soft backdrop-blur-md">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary shadow-[0_0_20px_rgba(240,166,31,0.25)]">
                        <Icon className="h-6 w-6" aria-hidden />
                      </span>
                      <span className="font-heading text-2xl font-bold text-primary/40">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-slate-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">{step.description}</p>
                  </div>
                </FadeIn>
              )
            })}
          </ol>
        </div>
      </Container>
    </section>
  )
}
