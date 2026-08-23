'use client'

import { Skill } from '@repo/database'
import { Flame } from 'lucide-react'
import { DynamicIcon } from '@repo/ui/dynamic-icon'
import { useRef, useState } from 'react'

const SkillCard = ({ group, skills }: { group: string; skills: Skill[] }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Gentle 3D Tilt: -8 to 8 degrees
    const rotateX = -(y / rect.height - 0.5) * 16
    const rotateY = (x / rect.width - 0.5) * 16

    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className='relative rounded-2xl border border-custom-border bg-custom-card backdrop-blur-md p-6 transition-all duration-150 ease-out flex flex-col'
      style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
        boxShadow: isHovered
          ? '0 20px 40px -15px rgba(16, 185, 129, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)'
          : '0 10px 30px -15px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.02)',
      }}
      id={`skill-card-${group.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div>
        <h3 className='text-base font-sans font-bold text-custom-heading flex items-center gap-2 mb-4 border-b border-custom-border pb-2 transition-colors duration-300'>
          <span className='text-emerald-400 p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20 block'>
            <Flame className='w-4 h-4' />
          </span>
          <span className='capitalize'>
            {group.replace('_', ' ').toLowerCase()}
          </span>
        </h3>
      </div>

      <div className='space-y-4'>
        {skills.map((skill) => {
          return (
            <div
              key={skill.name}
              className='space-y-1.5'
              id={`skill-item-${skill.name.toLowerCase()}`}
            >
              <div className='flex items-center justify-between text-xs font-mono text-custom-primary transition-colors duration-300'>
                <span className='flex items-center gap-2'>
                  <DynamicIcon
                    icon={skill.emojiIcon}
                    className='w-4 h-4 text-custom-secondary'
                  />
                  <span>{skill.name}</span>
                </span>
                <span className='text-emerald-400/80'>{skill.competency}%</span>
              </div>

              {/* Visual Glow Bar */}
              <div className='h-1.5 w-full bg-custom-inner rounded-full overflow-hidden border border-custom-border transition-colors duration-300'>
                <div
                  className='h-full bg-linear-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-1000'
                  style={{ width: `${skill.competency}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SkillCard
