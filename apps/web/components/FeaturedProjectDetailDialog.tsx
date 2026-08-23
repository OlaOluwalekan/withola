'use client'

import { Project } from '@repo/database'
import { DynamicIcon } from '@repo/ui/dynamic-icon'
import { ExternalLink } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { BsGithub } from 'react-icons/bs'

interface FeaturedProjectDetailDialogProps {
  selectedProject: Project
  setSelectedProject: (val: null) => void
}

const FeaturedProjectDetailDialog = ({
  selectedProject,
  setSelectedProject,
}: FeaturedProjectDetailDialogProps) => {
  const readmeRef = useRef<HTMLDivElement | null>(null)
  const [plainContent, setPlainContent] = useState(selectedProject.readme)

  useEffect(() => {
    if (readmeRef.current) {
      const div = readmeRef.current
      div.innerHTML = selectedProject.readme

      setPlainContent(div.textContent)
    }
  }, [])

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      id='project-modal-wrapper'
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedProject(null)}
        className='absolute inset-0 bg-[#040609]/80 backdrop-blur-md'
        id='modal-backdrop'
      />

      {/* Modal Body with 3D Depth tilt */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30, rotateX: 10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className='relative w-full max-h-[calc(100vh-100px)] max-w-2xl bg-custom-card border border-custom-border rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto scrollbar-thin overflow-x-hidden text-left transition-colors duration-300'
        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
        id='project-modal-container'
      >
        {/* Corner Grid Grid Lines to invoke structural blueprints */}
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[24px_24px] opacity-25' />
        <div className='absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 blur-[100px] rounded-full' />

        <div
          className='relative space-y-6 pb-10'
          style={{ transform: 'translateZ(10px)' }}
        >
          {/* Header */}
          <div className='flex justify-between items-start'>
            <div className='flex gap-3 items-start'>
              <div className='p-3 rounded-xl bg-custom-inner border border-custom-border mt-1 transition-colors duration-300'>
                <DynamicIcon icon={selectedProject.icon} />
              </div>
              <div>
                <span className='text-[10px] font-mono tracking-widest text-emerald-400 uppercase'>
                  {selectedProject.majorFeature} System Blueprint
                </span>
                <h3 className='text-xl sm:text-2xl font-sans font-bold text-custom-heading mt-1 transition-colors duration-300'>
                  {selectedProject.title}
                </h3>
                <p className='text-xs font-mono text-custom-secondary mt-0.5 transition-colors duration-300'>
                  {selectedProject.tags.join(' • ')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedProject(null)}
              className='p-1 px-2.5 rounded-lg border border-custom-border hover:border-custom-secondary/30 bg-custom-inner text-custom-secondary hover:text-custom-primary transition-all text-xs font-mono cursor-pointer'
              id='btn-close-modal'
            >
              ESC
            </button>
          </div>

          <hr className='border-custom-border transition-colors duration-300' />

          {/* Main Content */}
          <div className='grid grid-cols-1 md:grid-cols-5 gap-6 md:items-start'>
            {/* Left Column: Descriptions */}
            <div className='md:col-span-3 space-y-4' ref={readmeRef}>
              <div className='space-y-2'>
                <h4 className='text-xs font-mono text-custom-secondary uppercase tracking-wider transition-colors duration-300'>
                  Architecture Overview
                </h4>
                <p className='text-sm text-custom-primary font-sans leading-relaxed transition-colors duration-300'>
                  {plainContent}
                </p>
              </div>

              <div className='space-y-2'>
                <h4 className='text-xs font-mono text-custom-secondary uppercase tracking-wider transition-colors duration-300'>
                  Core Specifications
                </h4>
                <ul className='space-y-1.5 text-xs text-custom-primary list-none font-sans transition-colors duration-300'>
                  {selectedProject.technologies.map((bullet, i) => (
                    <li key={i} className='flex items-start gap-2'>
                      <span className='text-emerald-400 font-mono mt-0.5'>
                        ↳
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Tech & Specs */}
            <div className='md:col-span-2 space-y-4 bg-custom-inner/40 p-4 rounded-2xl border border-custom-border transition-colors duration-300'>
              <div>
                <h4 className='text-[10px] font-mono text-custom-secondary uppercase tracking-wider mb-2 transition-colors duration-300'>
                  Technologies Integrated
                </h4>
                <div className='flex flex-wrap gap-1.5'>
                  {selectedProject.technologies.map((t) => (
                    <span
                      key={t}
                      className='text-[10px] font-mono text-custom-primary bg-custom-inner border border-custom-border px-2 py-0.5 rounded transition-colors duration-300'
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <hr className='border-custom-border transition-colors duration-300' />

              <div className='space-y-3 pt-1'>
                <h4 className='text-[10px] font-mono text-custom-secondary uppercase tracking-wider transition-colors duration-300'>
                  Access Codes
                </h4>
                <div className='flex flex-col gap-2'>
                  {selectedProject.sourceCodeLink && (
                    <a
                      href={selectedProject.sourceCodeLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center justify-between p-2 rounded-lg bg-custom-inner border border-custom-border hover:border-emerald-500/50 hover:bg-emerald-500/10 text-xs font-mono text-custom-primary hover:text-emerald-500 transition-all cursor-pointer'
                      id='modal-link-github'
                    >
                      <span className='flex items-center gap-1.5'>
                        <BsGithub className='w-4 h-4' />
                        <span>Source Repository</span>
                      </span>
                      <span className='text-[9px] text-slate-500'>→</span>
                    </a>
                  )}
                  {selectedProject.liveUrlLink && (
                    <a
                      href={selectedProject.liveUrlLink}
                      target='_blank'
                      className='flex items-center justify-between p-2 rounded-lg bg-[#0c0f17] border border-slate-800/80 hover:border-emerald-500/50 hover:bg-emerald-950/10 text-xs font-mono text-slate-300 hover:text-emerald-400 transition-all cursor-pointer text-left'
                      id='modal-link-demo'
                    >
                      <span className='flex items-center gap-1.5'>
                        <ExternalLink className='w-4 h-4' />
                        <span>Systems Demo</span>
                      </span>
                      <span className='text-[9px] text-slate-500'>→</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <hr className='border-slate-800' />

          {/* Footer status bar - simple and clean */}
          <div className='flex items-center justify-between text-[10px] font-mono text-slate-500'>
            <span>
              BLUEPRINT REF: {selectedProject.id.toUpperCase()}-v1.0.0
            </span>
            <span className='text-emerald-500'>SYSTEM SECURED</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default FeaturedProjectDetailDialog
