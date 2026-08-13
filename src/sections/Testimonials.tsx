import { Star } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { testimonials } from '../content/site'
import { Container } from '../components/layout/Container'
import { SectionHeading } from '../components/layout/SectionHeading'

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    let frame = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = now - last
      last = now
      if (!pausedRef.current) {
        el.scrollLeft += dt * 0.035
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0
        }
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  const items = [...testimonials.items, ...testimonials.items]

  return (
    <section id="reviews" className="bg-surface py-20 md:py-24">
      <Container>
        <SectionHeading title={testimonials.title} subtitle={testimonials.subtitle} />
      </Container>

      <div
        ref={trackRef}
        className="flex cursor-grab gap-5 overflow-x-auto px-4 pb-4 scrollbar-none active:cursor-grabbing sm:px-6"
        style={{ scrollbarWidth: 'none' }}
        onMouseEnter={() => {
          pausedRef.current = true
        }}
        onMouseLeave={() => {
          pausedRef.current = false
        }}
        onTouchStart={() => {
          pausedRef.current = true
        }}
        onTouchEnd={() => {
          pausedRef.current = false
        }}
      >
        {items.map((item, index) => (
          <article
            key={`${item.name}-${index}`}
            className="w-[min(100%,20rem)] shrink-0 rounded-2xl border border-slate-100 bg-white p-6 shadow-soft"
          >
            <div className="flex gap-0.5" aria-label={`${item.rating} з 5`}>
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" aria-hidden />
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">«{item.quote}»</p>
            <div className="mt-6 flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light font-heading text-sm font-bold text-white"
                aria-hidden
              >
                {item.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-ink">{item.name}</p>
                <p className="text-xs text-slate-500">{item.city}</p>
              </div>
              <span className="ml-auto rounded-full bg-secondary/15 px-2.5 py-1 text-xs font-semibold text-secondary">
                {item.savings}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
