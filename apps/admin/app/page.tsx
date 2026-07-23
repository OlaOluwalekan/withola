import { prisma } from '@repo/database'
import Link from 'next/link'
import {
  FileCode2,
  Briefcase,
  Mail,
  LayoutDashboard,
  Calendar,
  ArrowRight,
} from 'lucide-react'
import { DynamicIcon } from '../components/dynamic-icon'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // Fetch stats concurrently
  const [
    totalProjects,
    featuredProjects,
    totalSkills,
    totalWork,
    totalMessages,
    unreadMessages,
    recentProjects,
    recentMessages,
    skillsByCategory,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { isFeatured: true } }),
    prisma.skill.count(),
    prisma.workExperience.count(),
    prisma.message.count(),
    prisma.message.count({ where: { isRead: false } }),
    prisma.project.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        icon: true,
        isFeatured: true,
        createdAt: true,
      },
    }),
    prisma.message.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
    prisma.skill.groupBy({ by: ['category'], _count: true }),
  ])

  const maxCategoryCount = Math.max(...skillsByCategory.map((s) => s._count), 1)

  return (
    <div className='space-y-8 pb-8'>
      {/* Hero Section */}
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Dashboard Overview
          </h1>
          <p className='text-gray-500 dark:text-gray-400 mt-1'>
            Welcome back! Here's what's happening across your portfolio today.
          </p>
        </div>
        <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-4 py-2 rounded-lg border dark:border-gray-800 shrink-0'>
          <Calendar className='w-4 h-4' />
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-900/50 relative overflow-hidden group hover:shadow-md transition-shadow'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='text-blue-600 dark:text-blue-400 text-sm font-medium mb-1'>
                Total Projects
              </p>
              <h2 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
                {totalProjects}
              </h2>
            </div>
            <div className='p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400'>
              <FileCode2 className='w-6 h-6' />
            </div>
          </div>
          <p className='text-xs text-blue-600/80 dark:text-blue-400/80 mt-4 font-medium'>
            {featuredProjects} Featured
          </p>
        </div>

        <div className='bg-linear-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-900/50 hover:shadow-md transition-shadow'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-1'>
                Technical Skills
              </p>
              <h2 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
                {totalSkills}
              </h2>
            </div>
            <div className='p-3 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400'>
              <LayoutDashboard className='w-6 h-6' />
            </div>
          </div>
          <p className='text-xs text-emerald-600/80 dark:text-emerald-400/80 mt-4 font-medium'>
            Across {skillsByCategory.length} Categories
          </p>
        </div>

        <div className='bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-900/50 hover:shadow-md transition-shadow'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='text-purple-600 dark:text-purple-400 text-sm font-medium mb-1'>
                Work Experiences
              </p>
              <h2 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
                {totalWork}
              </h2>
            </div>
            <div className='p-3 bg-purple-500/10 dark:bg-purple-500/20 rounded-lg text-purple-600 dark:text-purple-400'>
              <Briefcase className='w-6 h-6' />
            </div>
          </div>
          <p className='text-xs text-purple-600/80 dark:text-purple-400/80 mt-4 font-medium'>
            Career Timeline
          </p>
        </div>

        <div className='bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-950/40 dark:to-orange-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-900/50 hover:shadow-md transition-shadow'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='text-orange-600 dark:text-orange-400 text-sm font-medium mb-1'>
                Total Messages
              </p>
              <h2 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
                {totalMessages}
              </h2>
            </div>
            <div className='relative p-3 bg-orange-500/10 dark:bg-orange-500/20 rounded-lg text-orange-600 dark:text-orange-400'>
              <Mail className='w-6 h-6' />
              {unreadMessages > 0 && (
                <span className='absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-3 w-3 bg-red-500'></span>
                </span>
              )}
            </div>
          </div>
          <p className='text-xs text-orange-600/80 dark:text-orange-400/80 mt-4 font-medium flex items-center gap-1'>
            {unreadMessages > 0 ? (
              <span className='text-red-500 dark:text-red-400 font-bold'>
                {unreadMessages} Unread
              </span>
            ) : (
              'All caught up!'
            )}
          </p>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Recent Projects */}
        <div className='bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl shadow-sm flex flex-col'>
          <div className='p-6 border-b dark:border-gray-800 flex justify-between items-center'>
            <h3 className='font-semibold text-lg'>Recent Projects</h3>
            <Link
              href='/projects'
              className='text-sm text-blue-600 dark:text-blue-400 hover:underline'
            >
              View all
            </Link>
          </div>
          <div className='p-4 flex-1 flex flex-col gap-2'>
            {recentProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}/view`}
                className='flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors group'
              >
                <span className='text-2xl bg-gray-100 dark:bg-gray-800 w-12 h-12 flex items-center justify-center rounded-lg group-hover:scale-105 transition-transform'>
                  <DynamicIcon icon={project.icon} className="w-6 h-6" />
                </span>
                <div className='flex-1 min-w-0'>
                  <p className='font-medium truncate flex items-center gap-2 text-gray-900 dark:text-gray-100'>
                    {project.title}
                    {project.isFeatured && (
                      <span
                        className='w-2 h-2 rounded-full bg-blue-500'
                        title='Featured'
                      />
                    )}
                  </p>
                  <p className='text-xs text-gray-500 truncate'>
                    Added {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <ArrowRight className='w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity' />
              </Link>
            ))}
            {recentProjects.length === 0 && (
              <p className='text-gray-500 text-sm text-center py-6'>
                No projects yet.
              </p>
            )}
          </div>
        </div>

        {/* Skills Distribution */}
        <div className='bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl shadow-sm flex flex-col'>
          <div className='p-6 border-b dark:border-gray-800'>
            <h3 className='font-semibold text-lg'>Skills Distribution</h3>
          </div>
          <div className='p-6 flex-1 flex flex-col justify-center space-y-5'>
            {skillsByCategory.length > 0 ? (
              skillsByCategory.map((skill) => {
                const percentage = (skill._count / maxCategoryCount) * 100
                return (
                  <div key={skill.category}>
                    <div className='flex justify-between text-sm mb-1.5'>
                      <span className='font-medium text-gray-700 dark:text-gray-300 capitalize'>
                        {skill.category.replace(/_/g, ' ').toLowerCase()}
                      </span>
                      <span className='text-gray-500 font-medium'>
                        {skill._count}
                      </span>
                    </div>
                    <div className='w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden'>
                      <div
                        className='bg-emerald-500 dark:bg-emerald-600 h-full rounded-full'
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })
            ) : (
              <p className='text-gray-500 text-sm text-center py-6'>
                No skills added yet.
              </p>
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className='bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl shadow-sm flex flex-col'>
          <div className='p-6 border-b dark:border-gray-800 flex justify-between items-center'>
            <h3 className='font-semibold text-lg'>Inbox Preview</h3>
            <Link
              href='/messages'
              className='text-sm text-blue-600 dark:text-blue-400 hover:underline'
            >
              Go to Inbox
            </Link>
          </div>
          <div className='flex-1 divide-y dark:divide-gray-800'>
            {recentMessages.map((msg) => (
              <Link
                key={msg.id}
                href={`/messages/${msg.id}`}
                className='block p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors'
              >
                <div className='flex justify-between items-start mb-1'>
                  <p
                    className={`font-medium truncate pr-4 ${!msg.isRead ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}
                  >
                    {msg.senderName}
                  </p>
                  <span className='text-xs text-gray-500 shrink-0 whitespace-nowrap'>
                    {new Date(msg.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <p
                  className={`text-sm truncate mb-1 ${!msg.isRead ? 'text-gray-800 dark:text-gray-200 font-medium' : 'text-gray-500'}`}
                >
                  {msg.subject}
                </p>
                <div className='flex items-center justify-between mt-1.5'>
                  <span className='text-xs text-gray-400 truncate max-w-[80%]'>
                    {msg.senderEmail}
                  </span>
                  {!msg.isRead && (
                    <span
                      className='w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]'
                      title='Unread'
                    />
                  )}
                </div>
              </Link>
            ))}
            {recentMessages.length === 0 && (
              <p className='text-gray-500 text-sm text-center p-6'>
                Your inbox is empty.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
