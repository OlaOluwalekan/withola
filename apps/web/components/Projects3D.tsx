'use client'

import { Project } from '@repo/database'
import { useEffect, useRef, useState } from 'react'
import { getFeaturedProjects } from '../models/projects'
import SingleFeaturedProject from './SingleFeaturedProject'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { DynamicIcon } from '@repo/ui/dynamic-icon'
import FeaturedProjectDetailDialog from './FeaturedProjectDetailDialog'

const Projects3D = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [radius, setRadius] = useState(300) // Translate Z radius
  const containerRef = useRef<HTMLDivElement>(null)
  const [cardCount, setCardCount] = useState(0)
  const [angleStep, setAngleStep] = useState(0)
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const response = await getFeaturedProjects()

      if (response.data) {
        setFeaturedProjects(response.data.projects as Project[])
      }

      setIsLoading(false)
    })()

    // Adapt 3D translateZ radius based on responsive screen width
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setRadius(190) // Closer for mobile screens
      } else if (width < 1024) {
        setRadius(280)
      } else {
        setRadius(380) // Spacious for desktops
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const cardCount = featuredProjects.length
    const angleStep = 360 / cardCount
    setCardCount(cardCount)
    setAngleStep(angleStep)
  }, [featuredProjects])

  // Sync index rotation with state
  const rotateTo = (index: number) => {
    setCurrentIndex(index)
    setRotation(-index * angleStep)
  }

  const handlePrev = () => {
    const nextIndex = (currentIndex - 1 + cardCount) % cardCount
    rotateTo(nextIndex)
  }

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % cardCount
    rotateTo(nextIndex)
  }

  // Touch and Drag handlers for intuitive rotation
  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    setDragStartX(clientX)
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return
    const deltaX = clientX - dragStartX
    // Multiplier dictates rotation sensitivity
    const dragMultiplier = 0.25
    setRotation((prev) => prev + deltaX * dragMultiplier)
    setDragStartX(clientX)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    // Snap to the closest card angle
    const normalizedRotation = rotation % 360
    // Calculate nearest card slot
    let snappedIndex = Math.round(-normalizedRotation / angleStep)
    // Boundary wrapping
    snappedIndex = ((snappedIndex % cardCount) + cardCount) % cardCount

    setCurrentIndex(snappedIndex)
    // Animate smoothly to the snapped position
    setRotation(-snappedIndex * angleStep)
  }

  return (
    <div
      className='relative w-full py-16 flex flex-col items-center justify-center select-none overflow-hidden'
      id='carousel-outer-wrapper'
    >
      <div className='text-center mb-10 max-w-2xl px-4'>
        <div className='inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-widest rounded-sm mb-3'>
          <span>Interactive 3D Carousel</span>
        </div>
        <h2
          className='text-3xl sm:text-4xl font-sans font-bold tracking-tight text-custom-heading mb-2'
          id='portfolio-title'
        >
          Featured Projects
        </h2>
        <p className='text-sm text-custom-secondary font-mono'>
          Drag to spin the 3D wheel, or click any card below to inspect full
          system architecture.
        </p>
      </div>

      {/* 3D Scene Viewport */}
      <div
        ref={containerRef}
        className='relative w-full h-95 flex items-center justify-center cursor-grab active:cursor-grabbing'
        style={{ perspective: '1200px' }}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) =>
          e.touches[0] && handleDragStart(e.touches[0].clientX)
        }
        onTouchMove={(e) =>
          e.touches[0] && handleDragMove(e.touches[0].clientX)
        }
        onTouchEnd={handleDragEnd}
        id='scene-viewport'
      >
        {/* The 3D Rotating Ring */}
        <div
          className='relative w-70 sm:w-87.5 h-75 flex items-center justify-center transition-transform duration-500 ease-out'
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
          }}
          id='rotating-ring'
        >
          {featuredProjects.map((project, index) => {
            return (
              <SingleFeaturedProject
                key={project.id}
                project={project}
                index={index}
                angleStep={angleStep}
                radius={radius}
                cardCount={cardCount}
                currentIndex={currentIndex}
                setSelectedProject={setSelectedProject}
              />
            )
          })}
        </div>
      </div>

      {/* Manual Left/Right Controls & Dot Indicators */}
      <div className='flex items-center gap-6 mt-4 z-20' id='carousel-controls'>
        <button
          onClick={handlePrev}
          className='p-2.5 rounded-full border border-slate-800 bg-[#0c0f17]/90 text-slate-400 hover:text-white hover:border-slate-600 transition-colors cursor-pointer'
          aria-label='Previous Project'
          id='btn-carousel-prev'
        >
          <ChevronLeft className='w-5 h-5' />
        </button>

        <div className='flex gap-2'>
          {featuredProjects.map((_, idx) => (
            <button
              key={idx}
              // onClick={() => rotateTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? 'w-6 bg-emerald-400'
                  : 'w-2 bg-custom-border hover:bg-custom-secondary/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
              id={`btn-carousel-dot-${idx}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className='p-2.5 rounded-full border border-custom-border bg-custom-card text-custom-secondary hover:text-custom-primary transition-colors cursor-pointer'
          aria-label='Next Project'
          id='btn-carousel-next'
        >
          <ChevronRight className='w-5 h-5' />
        </button>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <FeaturedProjectDetailDialog
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Projects3D
