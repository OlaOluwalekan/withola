'use client'

import { Menu, Moon, Sun, X } from 'lucide-react'
import { useGlobalContext } from '../providers/store'
import Logo from './Logo'
import Navigation from './Navigation'
import SocialProfile from './SocialProfile'

const Header = () => {
  const {
    setMobileMenuIsOpen,
    mobileMenuIsOpen,
    activeSection,
    theme,
    setTheme,
  } = useGlobalContext()

  const scrollToSection = (id: string) => {
    setMobileMenuIsOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className='fixed top-0 inset-x-0 z-40 bg-custom-nav backdrop-blur-md border-b border-custom-border transition-colors duration-300'
      id='header-nav'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
        <Logo
          width='40'
          height='40'
          goBackHome={() => scrollToSection('home')}
        />

        <Navigation
          activeSection={activeSection}
          scrollToSection={scrollToSection}
        />

        <SocialProfile theme={theme} setTheme={setTheme} />

        <div className='md:hidden flex items-center gap-1.5'>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className='p-2 text-custom-secondary hover:text-custom-primary hover:bg-custom-inner rounded-lg transition-colors cursor-pointer'
            aria-label='Toggle Theme'
            id='theme-toggle-mobile'
          >
            {theme === 'dark' ? (
              <Sun className='w-4.5 h-4.5 text-amber-400' />
            ) : (
              <Moon className='w-4.5 h-4.5 text-blue-500' />
            )}
          </button>
          <button
            onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
            className='p-2 text-custom-secondary hover:text-custom-primary hover:bg-custom-inner rounded-lg transition-colors cursor-pointer'
            aria-label='Toggle Menu'
            id='mobile-menu-toggle-btn'
          >
            {mobileMenuIsOpen ? (
              <X className='w-5 h-5' />
            ) : (
              <Menu className='w-5 h-5' />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
