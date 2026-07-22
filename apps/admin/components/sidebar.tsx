import Link from 'next/link'
import {
  LayoutDashboard,
  Briefcase,
  FileCode2,
  MessageSquare,
} from 'lucide-react'

export function Sidebar() {
  return (
    <aside className='w-64 border-r bg-gray-50 dark:bg-gray-900 min-h-screen flex-col hidden md:flex'>
      <div className='p-4 border-b h-16 flex items-center'>
        <h1 className='text-xl font-bold'>Admin Dashboard</h1>
      </div>
      <nav className='p-4 flex-1 space-y-2'>
        <Link
          href='/'
          className='flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors'
        >
          <LayoutDashboard className='w-5 h-5' /> Dashboard
        </Link>
        <Link
          href='/projects'
          className='flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors'
        >
          <FileCode2 className='w-5 h-5' /> Projects
        </Link>
        <Link
          href='/skills'
          className='flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors'
        >
          <Briefcase className='w-5 h-5' /> Skills
        </Link>
        <Link
          href='/work'
          className='flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors'
        >
          <Briefcase className='w-5 h-5' /> Work Experience
        </Link>
        <Link
          href='/messages'
          className='flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors'
        >
          <MessageSquare className='w-5 h-5' /> Messages
        </Link>
      </nav>
    </aside>
  )
}
