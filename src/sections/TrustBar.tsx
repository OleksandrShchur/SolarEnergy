import { trustBar } from '../content/site'
import { Container } from '../components/layout/Container'
import { FadeIn } from '../components/ui/FadeIn'

export function TrustBar() {
  return (
    <section
      className="border-y border-stone-300/50 bg-cream/70 py-8 sm:py-10"
      aria-label={trustBar.text}
    >
      <Container>
        <FadeIn y={12}>
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <p className="text-center text-sm font-medium text-stone-600 md:text-left md:text-base">
              {trustBar.text}
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-8">
              {trustBar.partners.map((name) => (
                <li key={name}>
                  <span className="font-heading text-sm font-bold tracking-wide text-stone-400 transition-colors duration-300 hover:text-primary sm:text-base">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
