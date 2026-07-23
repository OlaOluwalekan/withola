'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Briefcase,
  FileCode2,
  MessageSquare,
  Brain,
} from 'lucide-react'

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false
    return pathname.startsWith(path)
  }

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Projects', href: '/projects', icon: FileCode2 },
    { name: 'Skills', href: '/skills', icon: Brain },
    { name: 'Work', href: '/work', icon: Briefcase },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className='w-64 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 h-screen flex-col hidden md:flex shrink-0'>
        <div className='p-4 border-b border-gray-200 dark:border-gray-800 h-16 flex items-center shrink-0'>
          <h1 className='text-xl font-bold'>Admin Dashboard</h1>
        </div>
        <nav className='p-4 flex-1 space-y-2 overflow-y-auto'>
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
                  active
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                <item.icon className='w-5 h-5' /> {item.name}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className='md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center justify-around z-50 pb-[env(safe-area-inset-bottom)]'>
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                active
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <item.icon className='w-5 h-5' />
              <span className='text-[10px] font-medium'>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
