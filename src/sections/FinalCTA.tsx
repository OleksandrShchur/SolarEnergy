import { finalCta } from '../content/site'
import { Container } from '../components/layout/Container'
import { ContactButton } from '../components/ui/ContactButton'
import { FadeIn } from '../components/ui/FadeIn'
import { Magnet } from '../components/ui/Magnet'

export function FinalCTA() {
  return (
    <section id="contact-cta" className="relative overflow-hidden bg-slate-ink py-16 sm:py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 sun-ray-gradient" />
      <div className="pointer-events-none absolute -left-10 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 top-0 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />

      <Container className="relative px-4 text-center">
        <FadeIn>
          <h2 className="text-fluid-section font-bold text-cream">{finalCta.title}</h2>
        </FadeIn>
        <FadeIn delay={0.08}>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-300 md:text-lg">
            {finalCta.subtitle}
          </p>
        </FadeIn>
        <FadeIn delay={0.16}>
          <div className="mt-8 flex justify-center">
            <Magnet>
              <ContactButton href="#quote">{finalCta.cta}</ContactButton>
            </Magnet>
          </div>
        </FadeIn>
        <FadeIn delay={0.24}>
          <p className="mt-6 text-sm text-stone-400">{finalCta.trust}</p>
        </FadeIn>
      </Container>
    </section>
  )
}
