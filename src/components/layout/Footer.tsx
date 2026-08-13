import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import type { ReactNode } from 'react'
import { brand, footer, navLinks } from '../../content/site'
import { Container } from './Container'

export function Footer() {
  return (
    <footer className="bg-slate-ink text-slate-300">
      <Container className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div>
          <p className="font-heading text-xl font-bold text-white">{brand.name}</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">{footer.blurb}</p>
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
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
            {footer.columns.links}
          </h3>
          <ul className="mt-4 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm transition-colors hover:text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
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
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
            {footer.columns.contact}
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <a href={`tel:${footer.contact.phone.replace(/\s/g, '')}`} className="hover:text-primary">
                {footer.contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <a href={`mailto:${footer.contact.email}`} className="hover:text-primary">
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

      <div className="border-t border-slate-700/80">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-sm text-slate-500 sm:flex-row">
          <p>{footer.copyright}</p>
          <div className="flex gap-4">
            {footer.legal.map((item) => (
              <a key={item.label} href={item.href} className="hover:text-primary">
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
      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 text-slate-300 transition-colors hover:border-primary hover:text-primary"
    >
      {children}
    </a>
  )
}
