'use client'

import { ChevronRight, Terminal } from 'lucide-react'
import { useGlobalContext } from '../providers/store'

const Hero = () => {
  const { setMobileMenuIsOpen } = useGlobalContext()

  const scrollToSection = (id: string) => {
    setMobileMenuIsOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id='home'
      className='min-h-[85vh] flex flex-col justify-center items-center text-center relative py-16 sm:py-24'
    >
      {/* Aesthetic grid overlay */}
      <div className='absolute inset-0 bg-radial-[circle_at_center,rgba(16,185,129,0.02)_0%,transparent_60%] pointer-events-none' />

      <div className='space-y-6 max-w-4xl px-4 z-10' id='hero-headlines'>
        <div
          className='inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-widest rounded-sm mb-2'
          id='hero-status-tag'
        >
          Software Engineer
        </div>

        <h1
          className='text-5xl sm:text-7xl font-bold leading-[0.95] tracking-tight text-custom-heading transition-colors duration-300'
          id='hero-main-header'
        >
          Olalekan
          <br />
          <span className='text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-500'>
            Bello
          </span>
        </h1>

        <p
          className='text-base sm:text-lg text-custom-secondary font-sans max-w-2xl mx-auto leading-relaxed pt-2 transition-colors duration-300'
          id='hero-sub-text'
        >
          Crafting robust software solutions with the JavaScript/TypeScript
          frameworks and FastAPI. Specialized in scaling AI-powered applications
          from Lagos to the world.
        </p>

        <div
          className='flex flex-col sm:flex-row items-center justify-center gap-4 pt-6'
          id='hero-cta-buttons'
        >
          <button
            onClick={() => scrollToSection('projects')}
            className='w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold rounded-lg shadow-lg shadow-emerald-500/20 text-xs tracking-wider uppercase cursor-pointer transition-all flex items-center justify-center gap-2 group'
            id='hero-btn-blueprints'
          >
            <span>View Blueprints</span>
            <ChevronRight className='w-4 h-4 group-hover:translate-x-0.5 transition-transform' />
          </button>
          <button
            onClick={() => scrollToSection('terminal')}
            className='w-full sm:w-auto px-6 py-3 border border-custom-border bg-custom-inner/50 hover:bg-custom-inner text-custom-primary font-bold rounded-lg backdrop-blur-sm text-xs tracking-wider uppercase cursor-pointer transition-all flex items-center justify-center gap-2'
            id='hero-btn-terminal'
          >
            <Terminal className='w-4 h-4 text-emerald-400' />
            <span>Initialize Shell</span>
          </button>
        </div>
      </div>

      {/* Artistic stats metrics block inspired by design code */}
      <div
        className='hidden lg:flex absolute bottom-8 left-0 gap-12 border-l border-custom-border pl-8 text-left transition-colors duration-300'
        id='hero-stats-metrics'
      >
        <div>
          <div className='text-2xl font-bold font-mono text-emerald-400'>
            5+
          </div>
          <div className='text-[10px] text-custom-secondary uppercase tracking-wider'>
            Years Exp
          </div>
        </div>
        <div>
          <div className='text-2xl font-bold font-mono text-custom-primary transition-colors duration-300'>
            20+
          </div>
          <div className='text-[10px] text-custom-secondary uppercase tracking-wider'>
            Projects
          </div>
        </div>
        <div>
          <div className='text-2xl font-bold font-mono text-blue-400'>5k+</div>
          <div className='text-[10px] text-custom-secondary uppercase tracking-wider'>
            Commits
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
