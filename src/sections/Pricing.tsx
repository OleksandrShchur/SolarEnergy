import { Check } from 'lucide-react'
import { pricing } from '../content/site'
import { Container } from '../components/layout/Container'
import { SectionHeading } from '../components/layout/SectionHeading'
import { FadeIn } from '../components/ui/FadeIn'
import { Magnet } from '../components/ui/Magnet'

export function Pricing() {
  return (
    <section id="pricing" className="bg-white py-20 md:py-24">
      <Container>
        <SectionHeading title={pricing.title} subtitle={pricing.subtitle} />

        <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5">
          {pricing.plans.map((plan, index) => (
            <FadeIn key={plan.id} delay={index * 0.1}>
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-6 md:p-8 ${
                  plan.popular
                    ? 'z-10 scale-[1.02] border-primary bg-white shadow-glow lg:scale-105'
                    : 'border-slate-200 bg-surface shadow-soft'
                }`}
              >
                {plan.popular ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-ink">
                    {pricing.popular}
                  </span>
                ) : null}

                <h3 className="font-heading text-xl font-bold text-slate-ink">{plan.title}</h3>
                <p className="mt-2 font-heading text-2xl font-extrabold text-primary md:text-3xl">
                  {plan.price}
                </p>
                <p className="mt-2 text-sm text-slate-600">{plan.description}</p>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Magnet className="mt-8 w-full">
                  <a
                    href="#quote"
                    className={`flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-105 ${
                      plan.popular
                        ? 'bg-primary text-slate-ink shadow-glow'
                        : 'bg-slate-ink text-white'
                    }`}
                  >
                    {plan.cta}
                  </a>
                </Magnet>
              </div>
            </FadeIn>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-slate-500">
          {pricing.disclaimer}
        </p>
      </Container>
    </section>
  )
}
