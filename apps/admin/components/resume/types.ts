import { AboutMe, Project, Skill, WorkExperience } from '@repo/database'

export type Step = 'content' | 'template' | 'preview'

export interface ResumeSelectionState {
  aboutMe: {
    selected: boolean
    fields: {
      about: boolean
      emails: boolean
      phones: boolean
      socials: boolean
    }
  }
  projects: Record<
    string,
    {
      selected: boolean
      fields: {
        title: boolean
        description: boolean
        technologies: boolean
        majorFeature: boolean
        keyHighlights: boolean
        sourceCodeLink: boolean
        liveUrlLink: boolean
      }
    }
  >
  skills: Record<
    string,
    {
      selected: boolean
      fields: {
        name: boolean
        category: boolean
        competency: boolean
      }
    }
  >
  workExperiences: Record<
    string,
    {
      selected: boolean
      fields: {
        jobTitle: boolean
        company: boolean
        startDate: boolean
        endDate: boolean
        companyLocation: boolean
        workLocationType: boolean
        workType: boolean
        responsibilities: boolean
      }
    }
  >
}

export function generateDefaultState(data: {
  aboutMe: AboutMe | null
  projects: Project[]
  skills: Skill[]
  workExperiences: WorkExperience[]
}): ResumeSelectionState {
  const state: ResumeSelectionState = {
    aboutMe: {
      selected: !!data.aboutMe,
      fields: {
        about: true,
        emails: true,
        phones: true,
        socials: true,
      },
    },
    projects: {},
    skills: {},
    workExperiences: {},
  }

  data.projects.forEach((project) => {
    state.projects[project.id] = {
      selected: project.isFeatured,
      fields: {
        title: true,
        description: true,
        technologies: true,
        majorFeature: true,
        keyHighlights: true,
        sourceCodeLink: true,
        liveUrlLink: true,
      },
    }
  })

  data.skills.forEach((skill) => {
    state.skills[skill.id] = {
      selected: skill.competency > 2,
      fields: {
        name: true,
        category: false,
        competency: false,
      },
    }
  })

  data.workExperiences.forEach((work) => {
    state.workExperiences[work.id] = {
      selected: true,
      fields: {
        jobTitle: true,
        company: true,
        startDate: true,
        endDate: true,
        companyLocation: true,
        workLocationType: false,
        workType: false,
        responsibilities: true,
      },
    }
  })

  return state
}
