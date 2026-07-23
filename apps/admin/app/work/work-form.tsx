'use client'

import { useActionState, useState } from 'react'
import { createWork, updateWork } from '../actions/work'
import { useRouter } from 'next/navigation'
import { WorkLocationType, WorkType } from '@repo/database/enums'
import { Plus, Trash2 } from 'lucide-react'
import { MiniRichTextEditor } from '../../components/mini-rich-text-editor'

export function WorkForm({ initialData }: { initialData?: any }) {
  const router = useRouter()

  const action = initialData
    ? updateWork.bind(null, initialData.id)
    : createWork

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      formData.set(
        'responsibilities',
        JSON.stringify(responsibilities.filter((r) => r.trim() !== '')),
      )
      const res = await action(formData)
      if (res?.success) {
        router.push('/work')
        router.refresh()
        return { success: true }
      }
      return res
    },
    undefined,
  )

  // Parse dates properly
  const startDate = initialData?.startDate
    ? new Date(initialData.startDate).toISOString().split('T')[0]
    : ''
  const endDate = initialData?.endDate
    ? new Date(initialData.endDate).toISOString().split('T')[0]
    : ''

  const [responsibilities, setResponsibilities] = useState<string[]>(
    initialData?.responsibilities?.length ? initialData.responsibilities : [''],
  )

  return (
    <form
      action={formAction}
      className='space-y-6 max-w-2xl bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border dark:border-gray-800'
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>Job Title</label>
          <input
            name='jobTitle'
            defaultValue={initialData?.jobTitle}
            required
            className='w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700'
            placeholder='Software Engineer'
          />
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>Company</label>
          <input
            name='company'
            defaultValue={initialData?.company}
            required
            className='w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700'
            placeholder='Google'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>Start Date</label>
          <input
            type='date'
            name='startDate'
            defaultValue={startDate}
            required
            className='w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700'
          />
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>
            End Date (Leave blank if present)
          </label>
          <input
            type='date'
            name='endDate'
            defaultValue={endDate}
            className='w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700'
          />
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>
          Company Location
        </label>
        <input
          name='companyLocation'
          defaultValue={initialData?.companyLocation}
          required
          className='w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700'
          placeholder='Mountain View, CA'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>
            Work Location Type
          </label>
          <select
            name='workLocationType'
            defaultValue={
              initialData?.workLocationType || WorkLocationType.REMOTE
            }
            required
            className='w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700'
          >
            {Object.values(WorkLocationType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>Work Type</label>
          <select
            name='workType'
            defaultValue={initialData?.workType || WorkType.FULL_TIME}
            required
            className='w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700'
          >
            {Object.values(WorkType).map((type) => (
              <option key={type} value={type}>
                {type.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium mb-2'>
          Responsibilities / Achievements
        </label>
        <div className='space-y-3'>
          {responsibilities.map((resp, i) => (
            <div key={i} className='flex gap-2'>
              <div className="flex-1">
                <MiniRichTextEditor
                  value={resp}
                  onChange={(val) => {
                    const newResps = [...responsibilities]
                    newResps[i] = val
                    setResponsibilities(newResps)
                  }}
                />
              </div>
              <button
                type='button'
                onClick={() =>
                  setResponsibilities(
                    responsibilities.filter((_, index) => index !== i),
                  )
                }
                className='p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors'
              >
                <Trash2 className='w-5 h-5' />
              </button>
            </div>
          ))}
          <button
            type='button'
            onClick={() => setResponsibilities([...responsibilities, ''])}
            className='flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium'
          >
            <Plus className='w-4 h-4' /> Add Achievement
          </button>
        </div>
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
          className='px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors'
        >
          {isPending ? 'Saving...' : 'Save Work Experience'}
        </button>
      </div>
    </form>
  )
}
