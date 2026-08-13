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
    <section id="service-area" className="bg-surface py-20 md:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              {serviceArea.title}
            </p>
            <h2 className="mt-3 text-fluid-section font-bold text-slate-ink">
              {serviceArea.headline}
            </h2>
            <p className="mt-4 text-base text-slate-600 md:text-lg">{serviceArea.description}</p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {serviceArea.cities.map((city) => (
                <li
                  key={city}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-primary hover:text-primary"
                >
                  {city}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <FadeIn x={40} y={0}>
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-amber-50 shadow-soft">
            <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
              <path
                d="M20,30 Q35,18 50,25 T80,28 Q90,45 78,60 T55,78 Q35,85 22,70 T20,30"
                fill="#e2e8f0"
                stroke="#cbd5e1"
                strokeWidth="0.5"
              />
              <path
                d="M35,40 Q48,35 58,42 T70,55 Q60,68 48,65 T35,50 Z"
                fill="#fef3c7"
                opacity="0.7"
              />
              {pins.map((pin) => (
                <g key={pin.label}>
                  <circle cx={pin.x} cy={pin.y} r="3.2" fill="#F59E0B" opacity="0.25">
                    <animate
                      attributeName="r"
                      values="3;7;3"
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.35;0;0.35"
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx={pin.x} cy={pin.y} r="2" fill="#F59E0B" stroke="#fff" strokeWidth="0.6" />
                </g>
              ))}
            </svg>
            <p className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/90 px-3 py-2 text-center text-xs font-medium text-slate-600 backdrop-blur">
              {serviceArea.mapCaption}
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
