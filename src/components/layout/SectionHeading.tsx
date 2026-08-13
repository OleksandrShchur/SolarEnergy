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
    <div className={`mx-auto mb-12 max-w-3xl text-center md:mb-16 ${className}`.trim()}>
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
        <FadeIn delay={0.1}>
          <p className={`mt-4 text-base md:text-lg ${light ? 'text-slate-300' : 'text-slate-600'}`}>
            {subtitle}
          </p>
        </FadeIn>
      ) : null}
    </div>
  )
}
