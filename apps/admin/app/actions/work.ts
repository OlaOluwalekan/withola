'use server'

import { prisma } from '@repo/database'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { WorkLocationType, WorkType } from '@repo/database'

const workSchema = z.object({
  jobTitle: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company is required'),
  startDate: z
    .string()
    .min(1)
    .transform((str) => new Date(str)),
  endDate: z
    .union([z.string().length(0), z.string().min(1)])
    .optional()
    .transform((str) => (str ? new Date(str) : null)),
  companyLocation: z.string().min(1, 'Location is required'),
  workLocationType: z.nativeEnum(WorkLocationType),
  workType: z.nativeEnum(WorkType),
  responsibilities: z.array(z.string()).default([]),
})

export async function createWork(formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  let responsibilities: string[] = []
  try {
    responsibilities = JSON.parse((data.responsibilities as string) || '[]')
  } catch (e) {}

  const parsed = workSchema.safeParse({ ...data, responsibilities })

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors }
  }

  await prisma.workExperience.create({
    data: parsed.data,
  })

  revalidatePath('/work')
  return { success: true }
}

export async function updateWork(id: string, formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  let responsibilities: string[] = []
  try {
    responsibilities = JSON.parse((data.responsibilities as string) || '[]')
  } catch (e) {}

  const parsed = workSchema.safeParse({ ...data, responsibilities })

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors }
  }

  await prisma.workExperience.update({
    where: { id },
    data: parsed.data,
  })

  revalidatePath('/work')
  return { success: true }
}

export async function deleteWork(id: string) {
  await prisma.workExperience.delete({
    where: { id },
  })

  revalidatePath('/work')
  return { success: true }
}
