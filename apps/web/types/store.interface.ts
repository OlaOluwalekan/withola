import { Project, Skill, WorkExperience } from '@repo/database'

export type ThemeType = 'light' | 'dark'

export interface StoreValues {
  mobileMenuIsOpen: boolean
  setMobileMenuIsOpen: (val: boolean) => void
  activeSection: string
  setActiveSection: (val: string) => void
  theme: ThemeType
  setTheme: (val: ThemeType) => void
  storeProjects: Project[] | null
  storeSkills: Skill[] | null
  storeWorkExperiences: WorkExperience[] | null
}
