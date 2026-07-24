'use client'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { StoreValues } from '../types/store.interface'

const StoreContext = createContext<StoreValues | null>(null)

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('portfolio-theme')
      if (stored === 'light' || stored === 'dark') return stored
      return window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark'
    }
    return 'dark'
  })

  // Track scrolling to highlight active nav sections
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home',
        'terminal',
        'projects',
        'skills',
        'experience',
        'contact',
      ]
      const scrollPos = window.scrollY + 180

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme)
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
      root.classList.remove('light')
    }
  }, [theme])

  return (
    <StoreContext.Provider
      value={{
        mobileMenuIsOpen,
        setMobileMenuIsOpen,
        activeSection,
        setActiveSection,
        theme,
        setTheme,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export const useGlobalContext = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useGlobalContext must be used within StoreProvider')
  }

  return context
}
