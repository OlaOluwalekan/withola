'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Save, Plus, Trash2, Loader2 } from 'lucide-react'
import { getAboutMe, updateAboutMe } from '../actions/about'
import { IconPicker } from '../../components/icon-picker'

interface Social {
  name: string
  value: string
  icon?: string
}

export default function AboutPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [about, setAbout] = useState('')
  const [emails, setEmails] = useState<string[]>([''])
  const [phones, setPhones] = useState<string[]>([''])
  const [socials, setSocials] = useState<Social[]>([
    { name: '', value: '', icon: '' },
  ])

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAboutMe()
        if (data) {
          setAbout(data.about || '')
          setEmails(data.emails?.length ? data.emails : [''])
          setPhones(data.phones?.length ? data.phones : [''])

          if (data.socials && Array.isArray(data.socials)) {
            setSocials(
              data.socials.length
                ? (data.socials as unknown as Social[])
                : [{ name: '', value: '', icon: '' }],
            )
          } else {
            setSocials([{ name: '', value: '', icon: '' }])
          }
        }
      } catch {
        toast.error('Failed to load About Me data')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const cleanEmails = emails.filter((e) => e.trim() !== '')
      const cleanPhones = phones.filter((p) => p.trim() !== '')
      const cleanSocials = socials.filter(
        (s) => s.name.trim() !== '' && s.value.trim() !== '',
      )

      const result = await updateAboutMe({
        about,
        emails: cleanEmails,
        phones: cleanPhones,
        socials: cleanSocials,
      })

      if (result.success) {
        toast.success('About Me updated successfully')
      } else {
        toast.error(result.error || 'Failed to update About Me')
      }
    } catch {
      toast.error('An unexpected error occurred')
    } finally {
      setSaving(false)
    }
  }

  const handleArrayChange = (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    array: string[],
  ) => {
    const newArray = [...array]
    newArray[index] = value
    setter(newArray)
  }

  const addArrayItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    array: string[],
  ) => {
    setter([...array, ''])
  }

  const removeArrayItem = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    array: string[],
  ) => {
    if (array.length > 1) {
      const newArray = array.filter((_, i) => i !== index)
      setter(newArray)
    } else {
      setter([''])
    }
  }

  const handleSocialChange = (
    index: number,
    field: keyof Social,
    value: string,
  ) => {
    const newSocials = [...socials]
    const updatedSocial = { ...newSocials[index], [field]: value }
    newSocials[index] = {
      name: updatedSocial.name || '',
      value: updatedSocial.value || '',
      icon: updatedSocial.icon,
    }
    setSocials(newSocials)
  }

  const addSocial = () => {
    setSocials([...socials, { name: '', value: '', icon: '' }])
  }

  const removeSocial = (index: number) => {
    if (socials.length > 1) {
      setSocials(socials.filter((_, i) => i !== index))
    } else {
      setSocials([{ name: '', value: '', icon: '' }])
    }
  }

  if (loading) {
    return (
      <div className='flex h-[50vh] items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-gray-500' />
      </div>
    )
  }

  return (
    <div className='space-y-6 max-w-4xl'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight'>About Me</h1>
      </div>

      <div className='rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm'>
        <form onSubmit={handleSubmit} className='p-6 space-y-8'>
          {/* About Section */}
          <div className='space-y-3'>
            <label
              htmlFor='about'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              About Content
            </label>
            <textarea
              id='about'
              rows={6}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder='Write a little bit about yourself...'
              className='w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
              required
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Emails Section */}
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Email Addresses
                </label>
                <button
                  type='button'
                  onClick={() => addArrayItem(setEmails, emails)}
                  className='flex items-center text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
                >
                  <Plus className='w-3 h-3 mr-1' /> Add
                </button>
              </div>
              {emails.map((email, index) => (
                <div key={index} className='flex gap-2'>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) =>
                      handleArrayChange(
                        index,
                        e.target.value,
                        setEmails,
                        emails,
                      )
                    }
                    placeholder='example@domain.com'
                    className='flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                  <button
                    type='button'
                    onClick={() => removeArrayItem(index, setEmails, emails)}
                    className='p-2 text-gray-400 hover:text-red-500 transition-colors'
                  >
                    <Trash2 className='w-4 h-4' />
                  </button>
                </div>
              ))}
            </div>

            {/* Phones Section */}
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Phone Numbers
                </label>
                <button
                  type='button'
                  onClick={() => addArrayItem(setPhones, phones)}
                  className='flex items-center text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
                >
                  <Plus className='w-3 h-3 mr-1' /> Add
                </button>
              </div>
              {phones.map((phone, index) => (
                <div key={index} className='flex gap-2'>
                  <input
                    type='tel'
                    value={phone}
                    onChange={(e) =>
                      handleArrayChange(
                        index,
                        e.target.value,
                        setPhones,
                        phones,
                      )
                    }
                    placeholder='+1 (555) 123-4567'
                    className='flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                  <button
                    type='button'
                    onClick={() => removeArrayItem(index, setPhones, phones)}
                    className='p-2 text-gray-400 hover:text-red-500 transition-colors'
                  >
                    <Trash2 className='w-4 h-4' />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Socials Section */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Social Links
              </label>
              <button
                type='button'
                onClick={addSocial}
                className='flex items-center text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
              >
                <Plus className='w-3 h-3 mr-1' /> Add Social
              </button>
            </div>

            {socials.map((social, index) => (
              <div
                key={index}
                className='flex flex-col sm:flex-row gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 relative'
              >
                <button
                  type='button'
                  onClick={() => removeSocial(index)}
                  className='absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 sm:static sm:p-2 sm:mt-6 transition-colors'
                >
                  <Trash2 className='w-4 h-4' />
                </button>
                <div className='flex-1 space-y-1'>
                  <label className='text-xs text-gray-500'>Platform Name</label>
                  <input
                    type='text'
                    value={social.name}
                    onChange={(e) =>
                      handleSocialChange(index, 'name', e.target.value)
                    }
                    placeholder='e.g. LinkedIn'
                    className='w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex-2 space-y-1'>
                  <label className='text-xs text-gray-500'>Link URL</label>
                  <input
                    type='url'
                    value={social.value}
                    onChange={(e) =>
                      handleSocialChange(index, 'value', e.target.value)
                    }
                    placeholder='https://...'
                    className='w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex-1 space-y-1'>
                  <label className='text-xs text-gray-500'>Icon</label>
                  <div className='w-full'>
                    <IconPicker
                      value={social.icon || ''}
                      onChange={(val) => handleSocialChange(index, 'icon', val)}
                      align='right'
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='flex justify-end pt-4 border-t border-gray-200 dark:border-gray-800'>
            <button
              type='submit'
              disabled={saving}
              className='inline-flex items-center gap-2 rounded-md bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 transition-colors'
            >
              {saving ? (
                <>
                  <Loader2 className='w-4 h-4 animate-spin' /> Saving...
                </>
              ) : (
                <>
                  <Save className='w-4 h-4' /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
