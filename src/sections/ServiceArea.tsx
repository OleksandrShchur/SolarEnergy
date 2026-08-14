import { serviceArea } from '../content/site'
import { Container } from '../components/layout/Container'
import { FadeIn } from '../components/ui/FadeIn'

const pins = [
  { x: 50, y: 48, label: 'Тернопіль' },
  { x: 38, y: 62, label: 'Чортків' },
  { x: 62, y: 35, label: 'Кременець' },
  { x: 28, y: 42, label: 'Бережани' },
  { x: 55, y: 28, label: 'Зборів' },
  { x: 72, y: 55, label: 'Теребовля' },
  { x: 42, y: 72, label: 'Борщів' },
]

export function ServiceArea() {
  return (
    <section id="service-area" className="bg-surface py-16 sm:py-20 md:py-24">
      <Container className="grid items-center gap-10 sm:gap-12 lg:grid-cols-2">
        <div>
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              {serviceArea.title}
            </p>
            <h2 className="mt-3 text-fluid-section font-bold text-slate-ink">
              {serviceArea.headline}
            </h2>
            <p className="mt-4 text-base text-stone-600 md:text-lg">{serviceArea.description}</p>
          </FadeIn>

          <FadeIn delay={0.12}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {serviceArea.cities.map((city) => (
                <li
                  key={city}
                  className="rounded-full border border-stone-300/70 bg-cream px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition-colors hover:border-primary hover:text-primary"
                >
                  {city}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <FadeIn y={20}>
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-primary/10 via-cream to-secondary/10 shadow-soft">
            <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
              <path
                d="M20,30 Q35,18 50,25 T80,28 Q90,45 78,60 T55,78 Q35,85 22,70 T20,30"
                fill="#E8D9C4"
                stroke="#D4C4A8"
                strokeWidth="0.5"
              />
              <path
                d="M35,40 Q48,35 58,42 T70,55 Q60,68 48,65 T35,50 Z"
                fill="#F0A61F"
                opacity="0.18"
              />
              {pins.map((pin, index) => (
                <g key={pin.label}>
                  {index % 2 === 0 ? (
                    <circle
                      className="pin-pulse"
                      cx={pin.x}
                      cy={pin.y}
                      r="3.2"
                      fill="#F0A61F"
                      opacity="0.28"
                      style={{ animationDelay: `${index * 0.35}s` }}
                    />
                  ) : null}
                  <circle cx={pin.x} cy={pin.y} r="2" fill="#F0A61F" stroke="#fff" strokeWidth="0.6" />
                </g>
              ))}
            </svg>
            <p className="absolute bottom-4 left-4 right-4 rounded-xl bg-cream/90 px-3 py-2 text-center text-xs font-medium text-stone-600 backdrop-blur">
              {serviceArea.mapCaption}
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
