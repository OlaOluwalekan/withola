'use client'

import { useSearchParams } from 'next/navigation'
import { useGlobalContext } from '../providers/store'
import { useEffect } from 'react'

const ScrollMaster = () => {
  const { setMobileMenuIsOpen } = useGlobalContext()
  const searchParams = useSearchParams()
  const section = searchParams.get('section')

  const scrollToSection = (id: string) => {
    setMobileMenuIsOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (section) {
      scrollToSection(section)
    }
  }, [section])

  return null
}

export default ScrollMaster
