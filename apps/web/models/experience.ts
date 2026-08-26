'use server'

import { prisma, WorkExperience } from '@repo/database'
import { ResponseStructure } from '../types/general.interface'

export const getWorkExperiences = async (): Promise<
  ResponseStructure<WorkExperience[]>
> => {
  try {
    const workExperiences = await prisma.workExperience.findMany({
      orderBy: {
        endDate: {
          sort: 'desc',
          nulls: 'first',
        },
      },
    })

    return { success: true, error: null, data: { workExperiences } }
  } catch (error) {
    return {
      success: false,
      error: 'Error fetching work experiences',
      data: null,
    }
  }
}
