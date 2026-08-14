import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { faq } from '../content/site'
import { Container } from '../components/layout/Container'
import { SectionHeading } from '../components/layout/SectionHeading'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="faq" className="bg-cream py-16 sm:py-20 md:py-24">
      <Container>
        <SectionHeading title={faq.title} subtitle={faq.subtitle} />

        <div className="mx-auto max-w-[800px] space-y-3">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={item.question}
                className={`overflow-hidden rounded-2xl border bg-white/60 backdrop-blur-md transition-colors ${
                  isOpen ? 'border-primary/40 shadow-soft' : 'border-stone-300/60'
                }`}
              >
                <button
                  type="button"
                  className="flex min-h-11 w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-heading text-sm font-semibold text-slate-ink md:text-base">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                    className="shrink-0 text-stone-500"
                  >
                    <ChevronDown className="h-5 w-5" aria-hidden />
                  </motion.span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-stone-600 md:px-6 md:pb-6 md:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
