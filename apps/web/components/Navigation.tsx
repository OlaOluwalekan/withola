import { navItems } from '../data/nav'

interface NavigationProps {
  activeSection: string
  scrollToSection: (id: string) => void
}

const Navigation = ({ activeSection, scrollToSection }: NavigationProps) => {
  return (
    <div className='hidden md:flex items-center gap-1.5' id='desktop-nav-links'>
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSection === item.id
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                : 'text-custom-secondary hover:text-custom-primary hover:bg-custom-inner border border-transparent'
            }`}
            id={`nav-link-${item.id}`}
          >
            <Icon className='w-3.5 h-3.5' />
            <span>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default Navigation
