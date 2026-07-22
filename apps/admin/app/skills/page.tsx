import { prisma } from '@repo/database'
import Link from 'next/link'
import { deleteSkill } from '../actions/skills'
import { Trash2, Edit } from 'lucide-react'

export default async function SkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Skills</h1>
        <Link
          href='/skills/new'
          className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-sm transition-colors'
        >
          Add Skill
        </Link>
      </div>

      <div className='bg-white dark:bg-gray-900 shadow-sm rounded-xl overflow-hidden border dark:border-gray-800'>
        <table className='w-full text-left'>
          <thead className='bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-800'>
            <tr>
              <th className='p-4 font-medium text-gray-500 dark:text-gray-400'>
                Skill
              </th>
              <th className='p-4 font-medium text-gray-500 dark:text-gray-400'>
                Category
              </th>
              <th className='p-4 font-medium text-gray-500 dark:text-gray-400'>
                Competency
              </th>
              <th className='p-4 font-medium text-right text-gray-500 dark:text-gray-400'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y dark:divide-gray-800'>
            {skills.map((skill) => (
              <tr
                key={skill.id}
                className='hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors'
              >
                <td className='p-4 flex items-center gap-3 font-medium'>
                  <span className='text-2xl bg-gray-100 dark:bg-gray-800 w-10 h-10 flex items-center justify-center rounded-lg'>
                    {skill.emojiIcon}
                  </span>
                  {skill.name}
                </td>
                <td className='p-4 text-gray-600 dark:text-gray-300'>
                  {skill.category.replace(/_/g, ' ')}
                </td>
                <td className='p-4'>
                  <div className='flex items-center gap-2'>
                    <div className='w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 max-w-30'>
                      <div
                        className='bg-blue-500 h-2 rounded-full'
                        style={{ width: `${skill.competency}%` }}
                      ></div>
                    </div>
                    <span className='text-xs text-gray-500'>
                      {skill.competency}%
                    </span>
                  </div>
                </td>
                <td className='p-4'>
                  <div className='flex items-center justify-end gap-2'>
                    <Link
                      href={`/skills/${skill.id}`}
                      className='p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors'
                    >
                      <Edit className='w-4 h-4' />
                    </Link>
                    <form
                      action={async () => {
                        'use server'
                        await deleteSkill(skill.id)
                      }}
                    >
                      <button
                        type='submit'
                        className='p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors'
                      >
                        <Trash2 className='w-4 h-4' />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {skills.length === 0 && (
              <tr>
                <td colSpan={4} className='p-12 text-center text-gray-500'>
                  No skills added yet. Click "Add Skill" to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
