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

const HomePage = () => {
  return (
    <div
      className='min-h-screen text-custom-primary bg-custom-bg font-sans selection:bg-emerald-500/20 selection:text-emerald-400 relative transition-colors duration-300'
      id='portfolio-app-root'
    >
      <Header />
      <MobileDrawer />

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
          <Projects3D />
        </div>

        {/* SKILLS SECTION */}
        <section id='skills' className='scroll-mt-16'>
          <Skills3D />
        </section>

        {/* TIMELINE SECTION */}
        <section id='experience' className='scroll-mt-16'>
          <WorkExperience />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
