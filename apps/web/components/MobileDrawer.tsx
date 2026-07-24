'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useGlobalContext } from '../providers/store'
import { navItems, socials } from '../data/nav'
import { FileText } from 'lucide-react'

const MobileDrawer = () => {
  const { mobileMenuIsOpen, setMobileMenuIsOpen, activeSection } =
    useGlobalContext()

  const scrollToSection = (id: string) => {
    setMobileMenuIsOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {mobileMenuIsOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className='fixed top-16 inset-x-0 z-30 md:hidden bg-custom-card border-b border-custom-border backdrop-blur-md overflow-hidden transition-colors duration-300'
          id='mobile-drawer'
        >
          <div className='p-4 space-y-2 flex flex-col'>
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-mono font-medium flex items-center gap-3 transition-colors cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'text-custom-secondary hover:text-custom-primary hover:bg-custom-inner'
                  }`}
                  id={`mobile-link-${item.id}`}
                >
                  <Icon className='w-4.5 h-4.5' />
                  <span>{item.label}</span>
                </button>
              )
            })}
            <hr className='border-custom-border my-2 transition-colors duration-300' />
            <div className='flex items-center justify-between px-2 pt-1'>
              <div className='flex gap-4'>
                {socials.map((item) => {
                  const { id, href, label, Icon } = item
                  return (
                    <a
                      key={id}
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-slate-400 hover:text-white'
                      aria-label={label}
                    >
                      <Icon className='w-5 h-5' />
                    </a>
                  )
                })}
              </div>
              <button
                onClick={() =>
                  alert(
                    "Olalekan Bello's verified PDF Resume can be requested directly via olalekanbello534@gmail.com!",
                  )
                }
                className='bg-custom-inner text-custom-secondary border border-custom-border px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors duration-300'
                id='mobile-link-resume'
              >
                <FileText className='w-3.5 h-3.5 text-emerald-400' />
                <span>Resume</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileDrawer
