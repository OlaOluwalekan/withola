'use server'

import { prisma, Skill } from '@repo/database'
import { ResponseStructure } from '../types/general.interface'

export const getSkills = async (): Promise<ResponseStructure<Skill[]>> => {
  try {
    const skills = await prisma.skill.findMany({})

    return { success: true, error: null, data: { skills } }
  } catch (error) {
    return { success: false, error: 'Error fetching skills', data: null }
  }
}
