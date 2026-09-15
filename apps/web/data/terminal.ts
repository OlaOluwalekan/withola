import { Project, Skill, WorkExperience, AboutMe } from '@repo/database'
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

export const getAboutCommandResponse = (
  storeAboutMe: AboutMe | null,
): LogLine => {
  if (storeAboutMe) {
    return {
      text: `ABOUT OLALEKAN BELLO:\n=====================\n${storeAboutMe.about}`,
      type: 'output',
    }
  }
  return {
    text: 'Error fetching my about information. Please try again later.',
    type: 'error',
  }
}

export const getContactCommandResponse = (
  storeAboutMe: AboutMe | null,
): LogLine => {
  if (storeAboutMe) {
    const emailsStr = storeAboutMe.emails
      .map((email) => `• Email:    ${email}`)
      .join('\n')
    const phonesStr = storeAboutMe.phones
      .map((phone) => `• Phone:    ${phone}`)
      .join('\n')

    // Parse social media object (assuming it's a JSON object like Record<string, string>)
    let socialsStr = ''
    if (storeAboutMe.socials && Array.isArray(storeAboutMe.socials)) {
      const socialsFlatArr = storeAboutMe.socials.map((social, index) => {
        const socialObj: { name: string; value: string } = social as {
          name: string
          value: string
        }
        return `[0${index + 1}] ${socialObj.name} => ${socialObj.value}`
      })

      socialsStr = socialsFlatArr.join('\n')
    }

    return {
      text: `ESTABLISH CONNECTION:\n=====================\n${emailsStr}\n${phonesStr}\nLET'S CONNECT ON SOCIALS\n${socialsStr}\n\nFeel free to reach out via email or fill in the contact section below.`,
      type: 'success',
    }
  }
  return {
    text: 'Error fetching contact information. Please try again later.',
    type: 'error',
  }
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
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
  }

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
