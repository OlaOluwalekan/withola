'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import EmojiPicker, { Theme } from 'emoji-picker-react'
import * as LucideIcons from 'lucide-react'
import { useTheme } from 'next-themes'
import { Search, X } from 'lucide-react'
import { DynamicIcon } from './dynamic-icon'

interface IconPickerProps {
  value: string
  onChange: (value: string) => void
}

// Extract all valid icon components
const allIconNames = Object.keys(LucideIcons).filter(
  (key) =>
    /^[A-Z]/.test(key) &&
    !['createLucideIcon', 'default', 'Icon', 'LucideIcon'].includes(key),
)

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'emoji' | 'lucide'>('emoji')
  const [search, setSearch] = useState('')
  const pickerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredIcons = useMemo(() => {
    if (!search) return allIconNames.slice(0, 100)
    return allIconNames
      .filter((name) => name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 100)
  }, [search])

  const handleSelectLucide = (name: string) => {
    onChange(`lucide:${name}`)
    setIsOpen(false)
  }

  const handleSelectEmoji = (emojiData: any) => {
    onChange(emojiData.emoji)
    setIsOpen(false)
  }

  return (
    <div className='relative' ref={pickerRef}>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors w-full justify-between'
      >
        <div className='flex items-center gap-2'>
          {value ? (
            <span className='flex items-center justify-center w-6 h-6'>
              <DynamicIcon icon={value} className='w-5 h-5' />
            </span>
          ) : (
            <span className='text-gray-500'>Select Icon...</span>
          )}
        </div>
      </button>

      {isOpen && (
        <div className='absolute z-50 mt-2 bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-lg shadow-xl w-87.5 max-h-112.5 flex flex-col overflow-hidden'>
          <div className='flex border-b dark:border-gray-800 p-2 gap-2 shrink-0 bg-gray-50 dark:bg-gray-800/50'>
            <button
              type='button'
              onClick={() => setActiveTab('emoji')}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'emoji' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
            >
              Emoji
            </button>
            <button
              type='button'
              onClick={() => setActiveTab('lucide')}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'lucide' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
            >
              Lucide
            </button>
            <button
              type='button'
              onClick={() => setIsOpen(false)}
              className='p-1.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors'
            >
              <X className='w-4 h-4' />
            </button>
          </div>

          <div className='flex-1 overflow-hidden h-95'>
            {activeTab === 'emoji' ? (
              <EmojiPicker
                onEmojiClick={handleSelectEmoji}
                theme={resolvedTheme === 'dark' ? Theme.DARK : Theme.LIGHT}
                lazyLoadEmojis={true}
                width='100%'
                height='100%'
                style={{
                  border: 'none',
                  borderRadius: 0,
                  backgroundColor: 'transparent',
                }}
              />
            ) : (
              <div className='flex flex-col h-full bg-white dark:bg-gray-900'>
                <div className='p-3 border-b dark:border-gray-800 shrink-0 relative bg-white dark:bg-gray-900 z-10'>
                  <Search className='w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-gray-400' />
                  <input
                    type='text'
                    placeholder='Search icons...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div className='flex-1 overflow-y-auto p-3'>
                  {filteredIcons.length > 0 ? (
                    <div className='grid grid-cols-6 gap-2'>
                      {filteredIcons.map((name) => {
                        const Icon = (LucideIcons as any)[name]
                        return (
                          <button
                            key={name}
                            type='button'
                            onClick={() => handleSelectLucide(name)}
                            className='p-2 flex flex-col items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                            title={name}
                          >
                            <Icon className='w-5 h-5 text-gray-700 dark:text-gray-300' />
                          </button>
                        )
                      })}
                    </div>
                  ) : (
                    <p className='text-center text-sm text-gray-500 mt-8'>
                      No icons found.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
