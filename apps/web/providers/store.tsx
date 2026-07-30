'use client'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { StoreValues } from '../types/store.interface'
import { Project, Skill, WorkExperience } from '@repo/database'
import { handleScrollHelper } from '../lib/store.lib'
import { getProjects } from '../models/projects'
import { getSkills } from '../models/skills'
import { getWorkExperiences } from '../models/experience'

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
  const [storeProjects, setStoreProjects] = useState<Project[] | null>([])
  const [storeSkills, setStoreSkills] = useState<Skill[] | null>([])
  const [storeWorkExperiences, setStoreWorkExperiences] = useState<
    WorkExperience[] | null
  >([])

  const fetchStoreData = async () => {
    const [projectsResponse, skillResponse, workExperienceResponse] =
      await Promise.allSettled([
        getProjects(),
        getSkills(),
        getWorkExperiences(),
      ])

    if (projectsResponse.status === 'fulfilled') {
      const projectResult = projectsResponse.value
      if (projectResult.success && projectResult.data) {
        setStoreProjects(projectResult.data.projects ?? null)
      }
    } else {
      setStoreProjects(null)
    }

    if (skillResponse.status === 'fulfilled') {
      const skillResult = skillResponse.value
      if (skillResult.success && skillResult.data) {
        setStoreSkills(skillResult.data.skills ?? null)
      }
    } else {
      setStoreSkills(null)
    }

    if (workExperienceResponse.status === 'fulfilled') {
      const workExperienceResult = workExperienceResponse.value
      if (workExperienceResult.success && workExperienceResult.data) {
        setStoreWorkExperiences(
          workExperienceResult.data.workExperiences ?? null,
        )
      }
    } else {
      setStoreWorkExperiences(null)
    }
  }

  // Track scrolling to highlight active nav sections
  useEffect(() => {
    fetchStoreData()
    const handleScroll = () => handleScrollHelper(setActiveSection)

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
        storeProjects,
        storeSkills,
        storeWorkExperiences,
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
