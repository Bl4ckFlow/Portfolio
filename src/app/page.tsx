'use client'

import About from '../components/About'
import Contact from '../components/Contact'
import Findings from '../components/Findings'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import Overlays from '../components/Overlays'
import Project from '../components/Project'
import Research from '../components/Research'
import { SiteProvider } from '../components/site-context'
import Skills from '../components/Skills'
import Timeline from '../components/Timeline'

export default function Home() {
  return (
    <SiteProvider>
      <div style={{ position: 'relative', minHeight: '100vh', isolation: 'isolate', overflowX: 'clip' }}>
        {/* grid + bloom, masked to the top-left where the hero sits */}
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: -1,
            pointerEvents: 'none',
            backgroundImage:
              'linear-gradient(color-mix(in srgb, var(--color-accent) 4.5%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-accent) 4.5%, transparent) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 25% 5%, #000 15%, transparent 80%)',
            maskImage: 'radial-gradient(ellipse 90% 70% at 25% 5%, #000 15%, transparent 80%)',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: -1,
            pointerEvents: 'none',
            background:
              'radial-gradient(55% 45% at 10% -5%, color-mix(in srgb, var(--color-accent) 8%, transparent), transparent 70%)',
          }}
        />

        <a href="#main" className="skip-link">
          skip to content
        </a>

        <Navbar />

        <main id="main">
          <Hero />
          <About />
          <Findings />
          <Research />
          <Project />
          <Skills />
          <Timeline />
          <Contact />
        </main>

        <Footer />
        <Overlays />
      </div>
    </SiteProvider>
  )
}
