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
          <div className="mt-6 flex gap-3">
            <SocialLink href="#" label={footer.aria.facebook}>
              <Facebook className="h-4 w-4" />
            </SocialLink>
            <SocialLink href="#" label={footer.aria.instagram}>
              <Instagram className="h-4 w-4" />
            </SocialLink>
            <SocialLink href="#" label={footer.aria.youtube}>
              <Youtube className="h-4 w-4" />
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
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <a href={`tel:${footer.contact.phone.replace(/\s/g, '')}`} className="inline-flex min-h-11 items-center hover:text-primary">
                {footer.contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <a href={`mailto:${footer.contact.email}`} className="inline-flex min-h-11 items-center hover:text-primary">
                {footer.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
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
