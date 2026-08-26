import { WorkExperience } from '@repo/database'
import { Calendar, CheckCircle2, MapPin } from 'lucide-react'
import { motion } from 'motion/react'

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-Us', { month: 'long', year: 'numeric' })
}

const WorkExperienceCard = ({
  experience,
  activeTab,
}: {
  experience: WorkExperience
  activeTab: string | null
}) => {
  if (experience.id !== activeTab) return null

  const workTypeMap = {
    FULL_TIME: 'Full-time',
    PART_TIME: 'Part-time',
    CONTRACT: 'Contract',
    INTERNSHIP: 'Internship',
    FREELANCE: 'Freelance',
  }

  const period = `${formatDate(experience.startDate)} - ${experience.endDate ? formatDate(experience.endDate) : 'current'}`

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className='rounded-2xl border border-custom-border bg-custom-card backdrop-blur-md p-6 sm:p-8 space-y-6 shadow-xl relative'
      id={`experience-detail-${experience.id}`}
    >
      {/* Decorative Blueprint Corner Mark */}
      <div className='absolute top-0 right-0 w-8 h-8 border-t border-r border-custom-border rounded-tr-2xl' />

      {/* Header metadata */}
      <div className='space-y-2'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <h3 className='text-xl font-sans font-bold text-custom-heading'>
            {experience.jobTitle}{' '}
            <span className='text-emerald-400'>@ {experience.company}</span>
          </h3>
          <span className='text-[10px] font-mono px-2.5 py-1 rounded bg-custom-inner border border-custom-border text-custom-secondary transition-colors duration-300'>
            {workTypeMap[experience.workType]}
          </span>
        </div>

        <div className='flex flex-wrap items-center gap-4 text-xs font-mono text-custom-secondary pt-1'>
          <span className='flex items-center gap-1.5'>
            <Calendar className='w-3.5 h-3.5 text-emerald-400/80' />
            <span>{period}</span>
          </span>
          <span className='flex items-center gap-1.5'>
            <MapPin className='w-3.5 h-3.5 text-blue-400/80' />
            <span>
              {experience.companyLocation} ({experience.workLocationType})
            </span>
          </span>
        </div>
      </div>

      <hr className='border-custom-border transition-colors duration-300' />

      {/* Core bullet accomplishments */}
      <div className='space-y-4'>
        <h4 className='text-[10px] font-mono text-custom-muted uppercase tracking-widest transition-colors duration-300'>
          Key Architectural Impact
        </h4>
        <ul className='space-y-3.5 list-none text-sm text-custom-primary font-sans transition-colors duration-300'>
          {experience.responsibilities.map((bullet, idx) => (
            <li
              key={idx}
              className='flex items-start gap-3 group'
              id={`exp-bullet-${experience.id}-${idx}`}
            >
              <CheckCircle2 className='w-4 h-4 text-emerald-400/80 mt-0.5 shrink-0 group-hover:scale-110 transition-transform' />
              <div
                className='leading-relaxed prose prose-sm text-gray-700 dark:text-white'
                dangerouslySetInnerHTML={{ __html: bullet }}
              />
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default WorkExperienceCard
