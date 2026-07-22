'use server'

import { prisma } from '@repo/database'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { SkillCategory } from '@repo/database'

const skillSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  emojiIcon: z.string().min(1, 'Icon is required'),
  competency: z.coerce.number().min(1).max(100),
  category: z.nativeEnum(SkillCategory),
})

export async function createSkill(formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  const parsed = skillSchema.safeParse(data)

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors }
  }

  await prisma.skill.create({
    data: parsed.data,
  })

  revalidatePath('/skills')
  return { success: true }
}

export async function updateSkill(id: string, formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  const parsed = skillSchema.safeParse(data)

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors }
  }

  await prisma.skill.update({
    where: { id },
    data: parsed.data,
  })

  revalidatePath('/skills')
  return { success: true }
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({
    where: { id },
  })

  revalidatePath('/skills')
  return { success: true }
}
