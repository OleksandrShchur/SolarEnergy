import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { whySolar } from '../content/site'
import { Container } from '../components/layout/Container'
import { SectionHeading } from '../components/layout/SectionHeading'
import { FadeIn } from '../components/ui/FadeIn'

export function WhySolar() {
  return (
    <section id="why-solar" className="bg-surface py-20 md:py-24">
      <Container>
        <SectionHeading title={whySolar.title} subtitle={whySolar.subtitle} />

        <div className="space-y-16 md:space-y-24">
          {whySolar.rows.map((row, index) => {
            const hasChart = row.chart !== 'none'
            const reverse = hasChart && index % 2 === 1

            if (!hasChart) {
              return (
                <FadeIn key={row.title} y={28}>
                  <div className="mx-auto max-w-2xl">
                    <h3 className="font-heading text-2xl font-bold text-slate-ink md:text-3xl">
                      {row.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                      {row.description}
                    </p>
                  </div>
                </FadeIn>
              )
            }

            return (
              <div
                key={row.title}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  reverse ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <FadeIn x={reverse ? 48 : -48} y={0}>
                  <ChartVisual type={row.chart} />
                </FadeIn>
                <FadeIn delay={0.15} y={28}>
                  <h3 className="font-heading text-2xl font-bold text-slate-ink md:text-3xl">
                    {row.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                    {row.description}
                  </p>
                </FadeIn>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

function ChartVisual({ type }: { type: 'bill' | 'co2' }) {
  if (type === 'bill') {
    const c = whySolar.charts.bill
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft md:p-8">
        <p className="text-sm font-medium text-slate-500">{c.title}</p>
        <p className="mt-1 text-xs text-slate-400">{c.subtitle}</p>

        <div className="mt-6 flex gap-4">
          <div className="flex min-h-[10rem] flex-col justify-between py-1 text-right text-[10px] text-slate-400">
            {c.yAxis.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>

          <div className="flex min-h-[10rem] flex-1 items-end justify-center gap-8 border-b border-l border-slate-200 pb-2 pl-2">
            <Bar label={c.before} height="90%" color="bg-slate-300" value={c.beforeValue} />
            <svg
              className="mb-16 h-8 w-6 shrink-0 text-slate-300"
              viewBox="0 0 24 32"
              fill="none"
              aria-hidden
            >
              <path
                d="M12 2v20M12 22l-6-6M12 22l6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Bar label={c.after} height="18%" color="bg-secondary" value={c.afterValue} />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full bg-primary/15 px-4 py-1.5 text-sm font-bold text-primary">
            {c.savingsBadge}
          </span>
          <span className="rounded-full bg-secondary/15 px-4 py-1.5 text-sm font-semibold text-secondary">
            {c.delta}
          </span>
        </div>
      </div>
    )
  }

  return <Co2Counter />
}

function Bar({
  label,
  height,
  color,
  value,
}: {
  label: string
  height: string
  color: string
  value: string
}) {
  return (
    <div className="flex h-40 w-16 flex-col items-center justify-end gap-2 sm:w-20">
      <span className="text-xs font-semibold text-slate-ink">{value}</span>
      <motion.div
        className={`w-full rounded-t-xl ${color}`}
        initial={{ height: 0 }}
        whileInView={{ height }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      />
      <span className="text-sm text-slate-500">{label}</span>
    </div>
  )
}

function Co2Counter() {
  const c = whySolar.charts.co2
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20 })
  const displayRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (inView) motionValue.set(4.2)
  }, [inView, motionValue])

  useEffect(() => {
    return spring.on('change', (v) => {
      if (displayRef.current) {
        displayRef.current.textContent = v.toFixed(1).replace('.', ',')
      }
    })
  }, [spring])

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 shadow-soft"
    >
      <p className="text-sm font-medium text-slate-500">{c.title}</p>
      <p className="mt-4 font-heading text-5xl font-extrabold text-secondary md:text-6xl">
        <span ref={displayRef}>0,0</span>
        <span className="ml-2 text-2xl font-semibold text-slate-ink">т</span>
      </p>
      <p className="mt-2 text-sm text-slate-500">{c.comparison}</p>
      <p className="mt-3 text-center text-sm text-slate-600">{c.trees}</p>
    </div>
  )
}
