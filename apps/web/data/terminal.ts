import { Project, Skill, WorkExperience } from '@repo/database'
import { LogLine } from '../types/terminal.interface'

export const quickCommands = [
  'neofetch',
  'about',
  'skills',
  'projects',
  'experience',
  'contact',
]

export const helpResponse: LogLine = {
  text: `Available commands:\n  neofetch    - Show developer details & workspace metadata\n  about       - Read Olalekan\'s story (transition from Civil Engineering)\n  skills      - List core engineering technologies & competencies\n  projects    - Show catalog of engineering projects\n  experience  - Print employment history logs\n  contact     - Reveal email, social links & terminal parameters\n  clear       - Wipe terminal logs`,
  type: 'output',
}

export const errorResponse = (cmd: string): LogLine => ({
  text: `Command not found: "${cmd}". Type "help" to view diagnostic codes.`,
  type: 'error',
})

export const neoFetchResponse: LogLine = {
  text: `      .-::::::::-.             olalekan@withola-dev-core
             -::::::::::::::-           -----------------------
           -::::::::::::::::::-         OS: Lagos Dev Env v5.0.0 (Ubuntu-based)
          ::::::::::::::::::::::        Kernel: Node.js/React19 Engine
         ::::::::::::::::::::::::       Uptime: 5+ Years of Professional Dev
        ::::::::::::::::::::::::::      Shell: Gemini AI Interactive Agent
        :::::::::::    :::::::::::      Resolution: Full Responsive Adaptive View
        ::::::::::      ::::::::::      DE: Tailwind Visual Core
        ::::::::::      ::::::::::      WM: Framer Motion 3D
        :::::::::::    :::::::::::      Terminal: Antigravity-IDE-v1
         ::::::::::::::::::::::::       CPU: JavaScript / Python Full Stack
          ::::::::::::::::::::::        Memory: React + Next.js + Socket.IO (Optimized)
           -::::::::::::::::::-         Database: PostgreSQL / MongoDB Core
             -::::::::::::::-           Location: Lagos, Nigeria (GMT+1)
               .-::::::::-.             Status: Open to Full-time & Lead Positions`,
  type: 'success',
}

export const aboutResponse: LogLine = {
  // TODO: Replace with server response
  text: `ABOUT OLALEKAN BELLO:\n=====================\nI am a Frontend & Full-Stack Engineer with over 4 years of professional experience delivering scalable, production-grade solutions. Originally, I graduated with a B.Eng. in Civil Engineering from the University of Ilorin in 2018. Driven by a deep passion for computing systems, I self-taught software architecture, structuralizing elegant web systems instead of physical buildings.\n\nMy primary stack is TypeScript/JavaScript (React, Next.js, Node.js). I excel at creating reactive client experiences (such as advertiser dashboards and real-time sockets) and securing them with backend API structures using Express and FastAPI. I love performance auditing, unit testing, and building custom developer CLI engines.`,
  type: 'output',
}

export const contactResponse: LogLine = {
  // TODO: Replace with server response
  text: `ESTABLISH CONNECTION:\n=====================\n• Email:    olalekanbello534@gmail.com\n• Phone:    +2348142659447\n• GitHub:   github.com/OlaOluwalekan\n• LinkedIn: linkedin.com/in/olaoluwalekanmi/\n• Twitter:  x.com/OlaOluwalekanMi\n\nFeel free to reach out via email or fill in the contact section below.`,
  type: 'success',
}

export const getProjectsCommandResponse = (storeProjects: Project[] | null) => {
  let projectsCommandResponse: LogLine = { text: '', type: 'output' }
  if (storeProjects) {
    if (storeProjects.length === 0) {
      projectsCommandResponse = {
        text: 'The project inventory is currently empty',
        type: 'output',
      }
    } else {
      const projectString = storeProjects
        .map((project, index) => {
          return `\n[${index + 1}] ${project.title} - ${project.technologies.join(', ')}`
        })
        .join(' ')
      const projectText = `NOTABLE PROJECT INDEX:\n======================${projectString}\n\nType 'inspect <project-id>' or click on the Project Cards above to see full layouts.`
      projectsCommandResponse = { text: projectText, type: 'output' }
    }
  } else {
    projectsCommandResponse = {
      text: 'Error fetching my projects. Check the projects section or try again',
      type: 'error',
    }
  }

  return projectsCommandResponse
}

export const getSkillsCommandResponse = (storeSkills: Skill[] | null) => {
  let skillCommandResponse: LogLine = { text: '', type: 'output' }
  if (storeSkills) {
    if (storeSkills.length === 0) {
      skillCommandResponse = { text: 'No skill saved yet', type: 'output' }
    } else {
      const skillsString = storeSkills
        .map((skill, index) => {
          const competency = skill.competency
          const competencyInFives = Math.round(competency / 5)
          let blocks = ''
          for (let i = 0; i < competencyInFives; i++) {
            blocks += '█'
          }
          return `\n[${index + 1}] ${skill.name} [${blocks.padEnd(20, '░')}] (${competency}%)`
        })
        .join(' ')
      const skillsText = `CORE TECHNICAL MATRIX:\n======================${skillsString}`
      skillCommandResponse = { text: skillsText, type: 'output' }
    }
  } else {
    skillCommandResponse = {
      text: 'Error fetching my skills. check the skill section or try again later',
      type: 'error',
    }
  }

  return skillCommandResponse
}

const formatDate = (dateStr: string | Date | null) => {
  if (!dateStr) {
    return 'Till date'
  }
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' }

  return new Intl.DateTimeFormat('en-US', options).format(date)
}

export const getWorkExperienceCommandResponse = (
  storeWorkExperience: WorkExperience[] | null,
) => {
  let workExperienceCommandResponse: LogLine = { text: '', type: 'output' }

  if (storeWorkExperience) {
    if (storeWorkExperience.length === 0) {
      workExperienceCommandResponse = {
        text: 'Work experience is currently empty',
        type: 'output',
      }
    } else {
      const workExperiencesString = storeWorkExperience.map((exp, index) => {
        return `\n[${index + 1}] ${exp.jobTitle} | ${exp.company} (${formatDate(exp.startDate)} - ${formatDate(exp.endDate)})`
      })
      const workExperienceText = `PROFESSIONAL CHRONOLOGY:\n========================${workExperiencesString}`

      workExperienceCommandResponse = {
        text: workExperienceText,
        type: 'output',
      }
    }
  } else {
    workExperienceCommandResponse = {
      text: 'Error fetching my experiences. check the work experience section or try again later',
      type: 'error',
    }
  }

  return workExperienceCommandResponse
}
