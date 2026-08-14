import { FadeIn } from '../ui/FadeIn'

type SectionHeadingProps = {
  title: string
  subtitle?: string
  light?: boolean
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  light = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`mx-auto mb-10 max-w-3xl text-center sm:mb-12 md:mb-16 ${className}`.trim()}>
      <FadeIn>
        <h2
          className={`text-fluid-section font-bold tracking-tight ${
            light ? 'text-white' : 'text-slate-ink'
          }`}
        >
          {title}
        </h2>
      </FadeIn>
      {subtitle ? (
        <FadeIn delay={0.08}>
          <p
            className={`mt-4 text-base leading-relaxed md:text-lg ${
              light ? 'text-stone-300' : 'text-stone-600'
            }`}
          >
            {subtitle}
          </p>
        </FadeIn>
      ) : null}
    </div>
  )
}
