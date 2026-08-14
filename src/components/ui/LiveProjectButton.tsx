import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { buttons } from '../../content/site'

type LiveProjectButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
  href?: string
}

const baseClass =
  'inline-flex min-h-11 items-center justify-center rounded-full border border-primary/50 px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-cream transition-[background-color,box-shadow,border-color] duration-300 ease-out hover:border-primary hover:bg-primary/10 hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

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
