import { Project } from '@repo/database'
import { borderStylesList, glowStylesList } from '../data/projects'
import { DynamicIcon } from '@repo/ui/dynamic-icon'
import { ExternalLink } from 'lucide-react'

interface ProjectProps {
  project: Project
  index: number
  angleStep: number
  radius: number
  cardCount: number
  currentIndex: number
}

const SingleFeaturedProject = ({
  project,
  index,
  angleStep,
  radius,
  cardCount,
  currentIndex,
}: ProjectProps) => {
  const currentBorderStyleIndex = index % borderStylesList.length
  const cardAngle = index * angleStep
  // Calculate distance to active selection to fade/deemphasize background cards
  const diff = Math.abs((index - currentIndex + cardCount) % cardCount)
  const isCenter = diff === 0
  const opacity = isCenter
    ? 1
    : diff === 1 || diff === cardCount - 1
      ? 0.6
      : 0.15
  const isClickable = isCenter

  return (
    <div
      className={`absolute w-full h-full rounded-2xl border backdrop-blur-md p-6 flex flex-col justify-between transition-all duration-300 group shadow-lg bg-custom-card/80 ${
        borderStylesList[currentBorderStyleIndex]
      }`}
      style={{
        transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'visible', // Keep background cards visible for true 3D hologram look!
        opacity: opacity,
        pointerEvents: isClickable ? 'auto' : 'none',
      }}
      id={`project-card-${project.id}`}
    >
      {/* 3D Floating Accents inside card */}
      <div
        className='absolute top-3 right-4 flex items-center gap-2'
        style={{ transform: 'translateZ(15px)' }}
      >
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border ${glowStylesList[currentBorderStyleIndex]}`}
        >
          {project.majorFeature}
        </span>
      </div>

      <div className='space-y-3' style={{ transform: 'translateZ(20px)' }}>
        <div className='flex items-center gap-2.5'>
          <div className='p-2 rounded-lg bg-custom-inner border border-custom-border transition-colors duration-300'>
            <DynamicIcon icon={project.icon} />
          </div>
          <div>
            <h3 className='text-lg font-sans font-bold text-custom-heading group-hover:text-emerald-500 transition-colors duration-300'>
              {project.title}
            </h3>
            <p className='text-[10px] font-mono text-custom-secondary mt-0.5'>
              {project.tags.join(' • ')}
            </p>
          </div>
        </div>

        <p className='text-xs text-custom-primary font-sans leading-relaxed line-clamp-3 transition-colors duration-300'>
          {project.description}
        </p>
      </div>

      <div className='space-y-4' style={{ transform: 'translateZ(25px)' }}>
        {/* Tech Stack Bubbles */}
        <div className='flex flex-wrap gap-1'>
          {project.technologies.slice(0, 3).map((t) => (
            <span
              key={t}
              className='text-[9px] font-mono text-custom-secondary px-1.5 py-0.5 rounded bg-custom-inner border border-custom-border transition-colors duration-300'
            >
              {t}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className='text-[9px] font-mono text-emerald-500/80 px-1.5 py-0.5 rounded bg-custom-inner border border-custom-border transition-colors duration-300'>
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Open details overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            // setSelectedProject(project)
          }}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            currentBorderStyleIndex === 0
              ? 'bg-emerald-500 hover:bg-emerald-400 text-[#090b11] shadow-[0_4px_12px_rgba(16,185,129,0.2)]'
              : currentBorderStyleIndex === 1
                ? 'bg-blue-500 hover:bg-blue-400 text-white shadow-[0_4px_12px_rgba(59,130,246,0.2)]'
                : 'bg-violet-500 hover:bg-violet-400 text-white shadow-[0_4px_12px_rgba(139,92,246,0.2)]'
          }`}
          id={`btn-inspect-${project.id}`}
        >
          <span>Inspect Blueprint</span>
          <ExternalLink className='w-3.5 h-3.5' />
        </button>
      </div>
    </div>
  )
}

export default SingleFeaturedProject
