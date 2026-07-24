import { FileText, Moon, Sun } from 'lucide-react'
import { ThemeType } from '../types/store.interface'
import { socials } from '../data/nav'

interface SocialProfileProps {
  theme: ThemeType
  setTheme: (val: ThemeType) => void
}

const SocialProfile = ({ theme, setTheme }: SocialProfileProps) => {
  return (
    <div
      className='hidden md:flex items-center gap-3'
      id='desktop-social-links'
    >
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className='p-1.5 text-custom-secondary hover:text-custom-primary hover:bg-custom-inner rounded-lg transition-colors cursor-pointer'
        aria-label='Toggle Theme'
        id='theme-toggle-desktop'
      >
        {theme === 'dark' ? (
          <Sun className='w-4 h-4 text-amber-400' />
        ) : (
          <Moon className='w-4 h-4 text-blue-500' />
        )}
      </button>
      {socials.map((item) => {
        const { id, label, href, Icon } = item
        return (
          <a
            key={id}
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='p-1.5 text-custom-secondary hover:text-custom-primary hover:bg-custom-inner rounded-lg transition-colors cursor-pointer'
            aria-label={label}
            id={id}
          >
            <Icon className='w-4.5 h-4.5' />
          </a>
        )
      })}

      <button
        onClick={() =>
          alert(
            "Olalekan Bello's verified PDF Resume can be requested directly via olalekanbello534@gmail.com!",
          )
        }
        className='ml-2 bg-custom-inner hover:bg-custom-card text-custom-secondary hover:text-custom-primary border border-custom-border px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors'
        id='desktop-link-resume'
      >
        <FileText className='w-3.5 h-3.5 text-emerald-400' />
        <span>Resume</span>
      </button>
    </div>
  )
}

export default SocialProfile
