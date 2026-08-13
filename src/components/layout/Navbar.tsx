import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { a11y, brand, navCta, navLinks } from '../../content/site'
import { useHeroTheme } from '../../context/HeroThemeContext'
import { useScrolled } from '../../hooks/useScrolled'
import { Container } from './Container'

export function Navbar() {
  const scrolled = useScrolled()
  const { theme } = useHeroTheme()
  const isMorning = theme === 'morning'
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const linkClass = scrolled
    ? 'text-slate-600 hover:text-slate-ink'
    : isMorning
      ? 'text-slate-700 hover:text-slate-ink'
      : 'text-white/90 hover:text-white'

  const logoTextClass = scrolled
    ? 'text-slate-ink'
    : isMorning
      ? 'text-slate-ink'
      : 'text-white'

  const logoIconClass = scrolled
    ? 'bg-primary/15 text-primary'
    : isMorning
      ? 'bg-slate-ink/10 text-slate-ink'
      : 'bg-white/15 text-white'

  const hamburgerClass = scrolled
    ? 'bg-slate-100 text-slate-ink ring-1 ring-slate-200'
    : isMorning
      ? 'bg-slate-ink/10 text-slate-ink ring-1 ring-slate-ink/15'
      : 'bg-white/15 text-white ring-1 ring-white/20 backdrop-blur-sm'

  const ctaClass = scrolled
    ? 'bg-primary text-slate-ink shadow-glow hover:bg-primary-light'
    : isMorning
      ? 'bg-slate-ink text-white hover:bg-slate-800'
      : 'bg-white text-slate-ink hover:bg-white/90'

  const mobileMenu =
    mounted && open
      ? createPortal(
          <>
            <AnimatePresence>
              <motion.button
                type="button"
                aria-label={a11y.closeMenu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[55] bg-slate-ink/50 lg:hidden"
                onClick={() => setOpen(false)}
              />
            </AnimatePresence>
            <AnimatePresence>
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="fixed inset-y-0 right-0 z-[60] flex w-[min(100%,20rem)] flex-col bg-white p-6 shadow-2xl lg:hidden"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-heading text-lg font-bold text-slate-ink">{brand.name}</span>
                  <button
                    type="button"
                    aria-label={a11y.closeMenu}
                    className="rounded-xl p-2 text-slate-ink"
                    onClick={() => setOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <nav className="flex flex-col gap-4" aria-label="Мобільна навігація">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="rounded-xl px-3 py-3 text-base font-medium text-slate-700 hover:bg-surface"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href={navCta.href}
                    className="mt-4 inline-flex justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-slate-ink"
                    onClick={() => setOpen(false)}
                  >
                    {navCta.label}
                  </a>
                </nav>
              </motion.div>
            </AnimatePresence>
          </>,
          document.body,
        )
      : null

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'border-b border-slate-200/60 bg-white/95 shadow-soft backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <Container className="flex h-16 items-center justify-between md:h-20">
          <a href="#home" className="flex items-center gap-2">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-500 ${logoIconClass}`}
            >
              <Zap className="h-5 w-5" aria-hidden />
            </span>
            <span
              className={`font-heading text-lg font-bold tracking-tight transition-colors duration-500 ${logoTextClass}`}
            >
              {brand.name}
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Основна навігація">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-500 ${linkClass}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href={navCta.href}
              className={`inline-flex rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-500 hover:scale-105 ${ctaClass}`}
            >
              {navCta.label}
            </a>
          </div>

          <button
            type="button"
            className={`rounded-xl p-2 transition-colors duration-500 lg:hidden ${hamburgerClass}`}
            aria-label={open ? a11y.closeMenu : a11y.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </Container>
      </header>
      {mobileMenu}
    </>
  )
}
