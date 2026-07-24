import {
  Briefcase,
  Flame,
  Handshake,
  Layers,
  LayoutGrid,
  Terminal,
} from 'lucide-react'
import { FaXTwitter } from 'react-icons/fa6'
import { FiGithub, FiLinkedin } from 'react-icons/fi'

export const navItems = [
  { id: 'home', label: 'Home', icon: LayoutGrid },
  { id: 'terminal', label: 'Terminal', icon: Terminal },
  { id: 'projects', label: 'Projects', icon: Layers },
  { id: 'skills', label: 'Skills', icon: Flame },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'contact', label: 'Contact', icon: Handshake },
]

export const socials = [
  {
    id: 'desktop-link-github',
    href: 'https://github.com/OlaOluwalekan',
    label: 'GitHub Profile',
    Icon: FiGithub,
  },
  {
    id: 'desktop-link-linkedin',
    href: 'https://linkedin.com/in/olaoluwalekanmi',
    label: 'Linkedin Profile',
    Icon: FiLinkedin,
  },
  {
    id: 'desktop-link-x',
    href: 'https://x.com/OlaOluwalekanMi',
    label: 'X Profile',
    Icon: FaXTwitter,
  },
]
