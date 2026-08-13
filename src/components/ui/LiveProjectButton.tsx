import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { buttons } from '../../content/site'

type LiveProjectButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
  href?: string
}

const baseClass =
  'inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-[#D7E2EA] transition-all duration-300 ease-out hover:bg-[#D7E2EA]/10 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D7E2EA]'

export function LiveProjectButton({
  children = buttons.liveProject,
  href,
  className = '',
  ...props
}: LiveProjectButtonProps) {
  const classes = `${baseClass} ${className}`.trim()

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
