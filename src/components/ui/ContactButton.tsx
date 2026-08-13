import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { buttons } from '../../content/site'

type ContactButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
  href?: string
}

const baseClass =
  'inline-flex items-center justify-center rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white transition-transform duration-300 ease-out hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

const gradientStyle = {
  background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
  boxShadow:
    '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset, 0 0 0 2px #fff, 0 0 0 -1px transparent',
  outline: '2px solid #fff',
  outlineOffset: '-3px',
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
      <a href={href} className={classes} style={gradientStyle}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} style={gradientStyle} {...props}>
      {children}
    </button>
  )
}
