import { createContext, useContext, useState, type ReactNode } from 'react'

export type HeroTheme = 'morning' | 'night'

type HeroThemeContextValue = {
  theme: HeroTheme
  setTheme: (theme: HeroTheme) => void
}

const HeroThemeContext = createContext<HeroThemeContextValue | null>(null)

export function HeroThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<HeroTheme>('morning')

  return (
    <HeroThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </HeroThemeContext.Provider>
  )
}

export function useHeroTheme() {
  const ctx = useContext(HeroThemeContext)
  if (!ctx) {
    throw new Error('useHeroTheme must be used within HeroThemeProvider')
  }
  return ctx
}
