'use client'

import { Mail } from 'lucide-react'
import { navItems, socials } from '../data/nav'
import { useGlobalContext } from '../providers/store'

const Footer = () => {
  const { setMobileMenuIsOpen } = useGlobalContext()

  const scrollToSection = (id: string) => {
    setMobileMenuIsOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer
      className='bg-custom-inner border-t border-custom-border py-12 mt-16 text-custom-secondary font-mono text-xs text-center relative z-10 transition-colors duration-300'
      id='footer-section'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6'>
        <div className='text-left space-y-1.5' id='footer-brand-info'>
          <span className='text-custom-primary font-sans font-semibold transition-colors duration-300'>
            WithOla
          </span>
          <p className='text-[10px] text-custom-secondary/60'>
            Built with Next.js • Tailwind CSS v4 • Framer Motion 3D
          </p>
        </div>

        <div className='flex gap-6' id='footer-menu-links'>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className='hover:text-emerald-400 transition-colors cursor-pointer text-[11px]'
              id={`footer-link-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div
          className='flex items-center gap-4 text-custom-secondary transition-colors duration-300'
          id='footer-icons'
        >
          {socials.map((item) => {
            const { id, label, href, Icon } = item
            return (
              <a
                key={id}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-white'
                id={`footer-${id}`}
                aria-label={label}
              >
                <Icon className='w-4 h-4' />
              </a>
            )
          })}

          <a
            href='mailto:olalekanbello534@gmail.com'
            className='hover:text-white'
            id='footer-link-mail'
          >
            <Mail className='w-4 h-4' />
          </a>
        </div>
      </div>

      <div className='mt-8 text-[9px] text-slate-700' id='footer-copyright'>
        © {new Date().getFullYear()} WithOla. All rights reserved.
        Structuralizing Elegant Software Solutions.
      </div>
    </footer>
  )
}

export default Footer
