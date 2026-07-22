'use client'

import { useActionState } from 'react'
import { createSkill, updateSkill } from '../actions/skills'
import { useRouter } from 'next/navigation'
import { SkillCategory } from '@repo/database/enums'

export function SkillForm({ initialData }: { initialData?: any }) {
  const router = useRouter()

  const action = initialData
    ? updateSkill.bind(null, initialData.id)
    : createSkill

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const res = await action(formData)
      if (res?.success) {
        router.push('/skills')
        router.refresh()
        return { success: true }
      }
      return res
    },
    undefined,
  )

  return (
    <form
      action={formAction}
      className='space-y-4 max-w-xl bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border dark:border-gray-800'
    >
      <div>
        <label className='block text-sm font-medium mb-1'>Name</label>
        <input
          name='name'
          defaultValue={initialData?.name}
          required
          className='w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700'
          placeholder='e.g. React'
        />
        {state?.error?.name && (
          <p className='text-red-500 text-sm mt-1'>{state.error.name[0]}</p>
        )}
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Emoji / Icon</label>
        <input
          name='emojiIcon'
          defaultValue={initialData?.emojiIcon}
          required
          className='w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700'
          placeholder='⚛️'
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>
          Competency (1-100)
        </label>
        <input
          type='number'
          name='competency'
          min='1'
          max='100'
          defaultValue={initialData?.competency}
          required
          className='w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700'
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Category</label>
        <select
          name='category'
          defaultValue={initialData?.category || SkillCategory.FRONTEND}
          required
          className='w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700'
        >
          {Object.values(SkillCategory).map((cat) => (
            <option key={cat} value={cat}>
              {cat.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
      </div>

      <div className='pt-4 flex justify-end'>
        <button
          type='button'
          onClick={() => router.back()}
          className='px-4 py-2 mr-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md'
        >
          Cancel
        </button>
        <button
          type='submit'
          disabled={isPending}
          className='px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50'
        >
          {isPending ? 'Saving...' : 'Save Skill'}
        </button>
      </div>
    </form>
  )
}
