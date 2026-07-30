'use server'

import { prisma, Project } from '@repo/database'
import { ResponseStructure } from '../types/general.interface'

export const getProjects = async (): Promise<ResponseStructure<Project[]>> => {
  try {
    const projects = await prisma.project.findMany({})

    return { success: true, error: null, data: { projects } }
  } catch (error) {
    console.log('Projects ==>', error)

    return { success: false, error: 'Error fetching projects', data: null }
  }
}
