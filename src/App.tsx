import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { HeroThemeProvider } from './context/HeroThemeContext'
import { FAQ } from './sections/FAQ'
import { FinalCTA } from './sections/FinalCTA'
import { Hero } from './sections/Hero'
import { HowItWorks } from './sections/HowItWorks'
import { SavingsCalculator } from './sections/SavingsCalculator'
import { ServiceArea } from './sections/ServiceArea'
import { Technology } from './sections/Technology'
import { Testimonials } from './sections/Testimonials'
import { WhySolar } from './sections/WhySolar'

export default function App() {
  return (
    <HeroThemeProvider>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <WhySolar />
        <SavingsCalculator />
        <Technology />
        <Testimonials />
        <ServiceArea />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </HeroThemeProvider>
  )
}
