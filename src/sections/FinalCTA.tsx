import { finalCta } from '../content/site'
import { Container } from '../components/layout/Container'
import { AnimatedText } from '../components/ui/AnimatedText'
import { ContactButton } from '../components/ui/ContactButton'
import { FadeIn } from '../components/ui/FadeIn'
import { Magnet } from '../components/ui/Magnet'

export function FinalCTA() {
  return (
    <section id="contact-cta" className="relative overflow-hidden bg-slate-ink py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 sun-ray-gradient" />
      <div className="pointer-events-none absolute -left-10 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 top-0 h-72 w-72 rounded-full bg-primary-light/10 blur-3xl" />

      <Container className="relative text-center">
        <FadeIn>
          <h2 className="text-fluid-section font-bold text-white">{finalCta.title}</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <AnimatedText
            text={finalCta.subtitle}
            className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg"
          />
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-8 flex justify-center">
            <Magnet>
              <ContactButton href="#quote">{finalCta.cta}</ContactButton>
            </Magnet>
          </div>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p className="mt-6 text-sm text-slate-400">{finalCta.trust}</p>
        </FadeIn>
      </Container>
    </section>
  )
}
