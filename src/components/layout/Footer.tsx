import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import type { ReactNode } from 'react'
import { brand, footer, navLinks } from '../../content/site'
import { Container } from './Container'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-ink text-stone-300">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <Container className="relative grid gap-10 py-14 sm:py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div>
          <p className="font-heading text-xl font-bold text-cream">{brand.name}</p>
          <p className="mt-4 text-sm leading-relaxed text-stone-400">{footer.blurb}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <SocialLink href="#" label={footer.aria.facebook}>
              <Facebook className="h-4 w-4" />
            </SocialLink>
            <SocialLink href="#" label={footer.aria.instagram}>
              <Instagram className="h-4 w-4" />
            </SocialLink>
            <SocialLink href="#" label={footer.aria.youtube}>
              <Youtube className="h-4 w-4" />
            </SocialLink>
            <SocialLink href="#" label={footer.aria.tiktok}>
              <TikTokIcon className="h-4 w-4" />
            </SocialLink>
            <SocialLink href="#" label={footer.aria.threads}>
              <ThreadsIcon className="h-4 w-4" />
            </SocialLink>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-cream">
            {footer.columns.links}
          </h3>
          <ul className="mt-4 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-sm transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-cream">
            {footer.columns.services}
          </h3>
          <ul className="mt-4 space-y-3">
            {footer.services.map((service) => (
              <li key={service}>
                <span className="text-sm">{service}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-cream">
            {footer.columns.contact}
          </h3>
          <ul className="mt-4 space-y-1 text-sm">
            <li>
              <a
                href={`tel:${footer.contact.phone.replace(/\s/g, '')}`}
                className="inline-flex min-h-11 items-center gap-2 hover:text-primary"
              >
                <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                {footer.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${footer.contact.email}`}
                className="inline-flex min-h-11 items-center gap-2 hover:text-primary"
              >
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                {footer.contact.email}
              </a>
            </li>
            <li className="flex min-h-11 items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>{footer.contact.address}</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-sm text-stone-500 sm:flex-row">
          <p>{footer.copyright}</p>
          <div className="flex gap-4">
            {footer.legal.map((item) => (
              <a key={item.label} href={item.href} className="inline-flex min-h-11 items-center hover:text-primary">
                {item.label}
              </a>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-stone-300 transition-colors hover:border-primary hover:text-primary hover:shadow-glow"
    >
      {children}
    </a>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  )
}

function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M19 7.5c-1.333-3-3.667-4.5-7-4.5-5 0-8 2.5-8 9s3.5 9 8 9 7-3 7-5-1-5-7-5c-2.5 0-3 1.25-3 2.5 0 1.5 1 2.5 2.5 2.5 2.5 0 3.5-1.5 3.5-5s-2-5-5-5-3 1-3.5 3" />
    </svg>
  )
}
