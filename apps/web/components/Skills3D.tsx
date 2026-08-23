'use client'

import { useEffect, useMemo, useState } from 'react'
import { SkillCategoryValue } from '../data/skills'
import { Skill } from '@repo/database'
import { getSkills } from '../models/skills'
import SkillCard from './SkillCard'

const Skills3D = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { groupedSkills, groups } = useMemo(() => {
    const groupedSkills = skills.reduce(
      (acc, curr) => {
        ;(acc[curr.category] ??= []).push(curr)

        return acc
      },
      {} as Partial<Record<SkillCategoryValue, Skill[]>>,
    )

    const groups = Object.keys(groupedSkills) as SkillCategoryValue[]

    return { groupedSkills, groups }
  }, [skills])

  //   console.log(groupedSkills)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const response = await getSkills()

      if (response.data && response.data.skills) {
        setSkills(response.data.skills)
      }
    })()
  }, [])

  return (
    <div
      className='relative w-full py-16 px-4 flex flex-col items-center justify-center overflow-hidden'
      id='skills-root'
    >
      {/* Aesthetic grid pattern background overlay */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#0c1017_1px,transparent_1px),linear-gradient(to_bottom,#0c1017_1px,transparent_1px)] bg-size-[32px_32px] opacity-20 pointer-events-none -z-10' />

      <div className='max-w-3xl text-center mb-12'>
        <div className='inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-widest rounded-sm mb-3'>
          <span>Core Competencies Matrix</span>
        </div>
        <h2
          className='text-3xl sm:text-4xl font-sans font-bold tracking-tight text-custom-heading mb-2'
          id='skills-section-title'
        >
          Technical Stack & Tools
        </h2>
        <p className='text-sm text-custom-secondary font-mono'>
          Hover over the category nodes to inspect architectural depth and
          relative proficiency levels.
        </p>
      </div>

      {/* Grid containing tilting blocks */}
      <div
        className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl'
        id='skills-grid'
        style={{ perspective: '1000px' }}
      >
        {groups.map((group) => (
          <SkillCard
            key={group}
            group={group}
            skills={groupedSkills[group] ?? []}
          />
        ))}
      </div>
    </div>
  )
}

export default Skills3D
