'use client'

import { WorkExperience as WorkExperienceType } from '@repo/database'
import { useEffect, useState } from 'react'
import { getWorkExperiences } from '../models/experience'
import { AnimatePresence } from 'motion/react'
import WorkExperienceCard from './WorkExperienceCard'

const WorkExperience = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [experiences, setExperiences] = useState<WorkExperienceType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const response = await getWorkExperiences()

      if (response.data && response.data.workExperiences) {
        setExperiences(response.data.workExperiences)
      }

      setIsLoading(false)
    })()
  }, [])

  useEffect(() => {
    console.log(experiences)

    if (experiences.length > 0) {
      setActiveTab(experiences[0]?.id as string)
    }
  }, [experiences])

  return (
    <div
      className='relative w-full py-16 px-4 flex flex-col items-center justify-center overflow-hidden'
      id='experience-root'
    >
      <div className='max-w-3xl text-center mb-12'>
        <div className='inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-widest rounded-sm mb-3'>
          <span>Professional Ledger</span>
        </div>
        <h2
          className='text-3xl sm:text-4xl font-sans font-bold tracking-tight text-custom-heading mb-2'
          id='experience-title'
        >
          Career Timeline
        </h2>
        <p className='text-sm text-custom-secondary font-mono'>
          An overview of my engineering engagements, systems delivered, and
          technical roles.
        </p>
      </div>

      {/* Responsive Ledger Layout */}
      <div
        className='w-full max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-6 items-start'
        id='experience-grid'
      >
        {/* Left Side: Interactive Sidebar Company Selectors */}
        <div
          className='flex md:flex-col overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 gap-2 border-b md:border-b-0 md:border-l border-custom-border md:pl-2'
          id='experience-tabs'
        >
          {experiences.map((exp) => {
            return (
              <button
                key={exp.id}
                onClick={() => setActiveTab(exp.id)}
                className={`shrink-0 text-left px-4 py-3 rounded-xl transition-all duration-200 font-mono text-xs cursor-pointer flex items-center justify-between gap-3 ${
                  activeTab === exp.id
                    ? 'bg-custom-inner border border-custom-border text-emerald-400 font-bold md:translate-x-1.5'
                    : 'text-custom-secondary hover:text-custom-primary hover:bg-custom-inner/40 border border-transparent'
                }`}
                id={`tab-btn-${exp.id}`}
              >
                <span>{exp.company}</span>
                <span
                  className={`w-1.5 h-1.5 rounded-full block transition-transform ${
                    activeTab === exp.id
                      ? 'bg-emerald-400 scale-125'
                      : 'bg-transparent'
                  }`}
                />
              </button>
            )
          })}
        </div>

        {/* Right Side: Tab Details content with staggered animated loading */}
        <div className='md:col-span-3 min-h-75' id='experience-content-box'>
          <AnimatePresence mode='wait'>
            {experiences.map((exp) => {
              return (
                <WorkExperienceCard
                  key={exp.id}
                  experience={exp}
                  activeTab={activeTab}
                />
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default WorkExperience
