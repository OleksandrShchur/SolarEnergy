import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { buttons } from '../../content/site'

type ContactButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
  href?: string
}

const baseClass =
  'inline-flex min-h-11 items-center justify-center rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-widest text-slate-ink transition-[filter,box-shadow] duration-300 ease-out hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

const solarStyle = {
  background: 'linear-gradient(135deg, #F6C85A 0%, #F0A61F 48%, #E07B3A 100%)',
  boxShadow:
    '0 10px 32px rgba(240, 166, 31, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.45)',
} as const

export function ContactButton({
  children = buttons.contact,
  href,
  className = '',
  ...props
}: ContactButtonProps) {
  const classes = `${baseClass} ${className}`.trim()

  if (href) {
    return (
      <a href={href} className={classes} style={solarStyle}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} style={solarStyle} {...props}>
      {children}
    </button>
  )
}
