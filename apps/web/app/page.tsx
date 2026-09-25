import { getDefaultResume } from '../actions/resume'
import { Suspense } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import MobileDrawer from '../components/MobileDrawer'
import ScrollMaster from '../components/ScrollMaster'
import Terminal3D from '../components/Terminal3D'
import Projects3D from '../components/Projects3D'
import Skills3D from '../components/Skills3D'
import WorkExperience from '../components/WorkExperience'
import ContactMe from '../components/ContactMe'
import { getFeaturedProjects } from '../models/projects'
import { getSkills } from '../models/skills'
import { getWorkExperiences } from '../models/experience'
import { Project, Skill, WorkExperience as WorkExperienceType } from "@repo/database"

export const dynamic = 'force-dynamic'

const HomePage = async () => {
  const resume = await getDefaultResume()
  const hasResume = !!resume

  const [projectsRes, skillsRes, experiencesRes] = await Promise.all([
    getFeaturedProjects(),
    getSkills(),
    getWorkExperiences(),
  ])

  const featuredProjects = projectsRes.data?.projects as Project[] || []
  const skills = skillsRes.data?.skills as Skill[] || []
  const experiences = experiencesRes.data?.workExperiences as WorkExperienceType[] || []

  return (
    <div
      className='min-h-screen text-custom-primary bg-custom-bg font-sans selection:bg-emerald-500/20 selection:text-emerald-400 relative transition-colors duration-300'
      id='portfolio-app-root'
    >
      <Header hasResume={hasResume} />
      <MobileDrawer hasResume={hasResume} />

      <main
        className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 space-y-12'
        id='main-content'
      >
        <Suspense fallback={null}>
          <ScrollMaster />
        </Suspense>
        <Hero />

        <div id='terminal' className='scroll-mt-16'>
          <Terminal3D />
        </div>

        <div id='projects' className='scroll-mt-16'>
          <Projects3D featuredProjects={featuredProjects} />
        </div>

        {/* SKILLS SECTION */}
        <section id='skills' className='scroll-mt-16'>
          <Skills3D skills={skills} />
        </section>

        {/* TIMELINE SECTION */}
        <section id='experience' className='scroll-mt-16'>
          <WorkExperience experiences={experiences} />
        </section>

        {/* CONTACT SECTION */}
        <section id='contact' className='scroll-mt-16'>
          <ContactMe />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
