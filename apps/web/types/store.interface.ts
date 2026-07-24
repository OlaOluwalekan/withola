export type ThemeType = 'light' | 'dark'

export interface StoreValues {
  mobileMenuIsOpen: boolean
  setMobileMenuIsOpen: (val: boolean) => void
  activeSection: string
  setActiveSection: (val: string) => void
  theme: ThemeType
  setTheme: (val: ThemeType) => void
}
