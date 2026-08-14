import { animate, useMotionValue, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { calculator } from '../content/site'
import { Container } from '../components/layout/Container'
import { Magnet } from '../components/ui/Magnet'

function formatUah(value: number) {
  return `${Math.round(value).toLocaleString('uk-UA')} грн`
}

function computeSavings(bill: number) {
  const monthly = bill * 0.72
  const yearly25 = monthly * 12 * 25
  const systemCost = Math.max(180000, bill * 55)
  const payback = systemCost / (monthly * 12)
  return { monthly, yearly25, payback }
}

export function SavingsCalculator() {
  const [bill, setBill] = useState(3500)
  const results = computeSavings(bill)

  return (
    <section id="quote" className="relative overflow-hidden bg-slate-ink py-16 sm:py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 sun-ray-gradient" aria-hidden />
      <Container className="relative">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1C1814] to-[#12100C] shadow-2xl">
          <div className="grid lg:grid-cols-2">
            <div className="border-b border-white/10 p-6 sm:p-8 md:p-10 lg:border-b-0 lg:border-r">
              <h2 className="font-heading text-fluid-section font-bold text-cream">
                {calculator.title}
              </h2>
              <p className="mt-3 text-stone-300">{calculator.subtitle}</p>

              <div className="mt-8">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <label htmlFor="bill-slider" className="font-medium text-stone-300">
                    {calculator.billLabel}
                  </label>
                  <span className="shrink-0 font-heading font-bold text-primary">{formatUah(bill)}</span>
                </div>
                <input
                  id="bill-slider"
                  type="range"
                  min={calculator.billMin}
                  max={calculator.billMax}
                  step={calculator.billStep}
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                  className="mt-4 h-11 w-full accent-primary"
                />
                <div className="mt-1 flex justify-between text-xs text-stone-500">
                  <span>{formatUah(calculator.billMin)}</span>
                  <span>{formatUah(calculator.billMax)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-6 p-6 sm:p-8 md:p-10">
              <ResultRow
                label={calculator.results.monthly}
                value={results.monthly}
                format={(v) => formatUah(v)}
              />
              <ResultRow
                label={calculator.results.yearly25}
                value={results.yearly25}
                format={(v) => formatUah(v)}
              />
              <ResultRow
                label={calculator.results.payback}
                value={results.payback}
                format={(v) => `${v.toFixed(1).replace('.', ',')} років`}
              />

              <Magnet className="mt-2 w-full self-start sm:w-auto">
                <a href="#contact-cta" className="btn-solar w-full px-8 py-3.5 uppercase tracking-wide sm:w-auto">
                  {calculator.cta}
                </a>
              </Magnet>
              <p className="text-xs text-stone-500">{calculator.note}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function ResultRow({
  label,
  value,
  format,
}: {
  label: string
  value: number
  format: (v: number) => string
}) {
  const prefersReducedMotion = useReducedMotion()
  const mv = useMotionValue(value)
  const [display, setDisplay] = useState(format(value))

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(format(value))
      return
    }
    const controls = animate(mv, value, { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] })
    return controls.stop
  }, [value, mv, format, prefersReducedMotion])

  useMotionValueEvent(mv, 'change', (v) => {
    if (!prefersReducedMotion) setDisplay(format(v))
  })

  return (
    <div className="glass-card-dark p-5">
      <p className="text-sm text-stone-400">{label}</p>
      <p className="mt-1 font-heading text-2xl font-bold text-cream md:text-3xl">{display}</p>
    </div>
  )
}
