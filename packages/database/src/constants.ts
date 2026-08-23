/**
 * Browser-safe constants derived from the Prisma schema.
 *
 * ⚠️  This file MUST remain free of any imports from '@prisma/client', 'pg',
 *     or any other Node.js-only package. It is the single source of truth for
 *     enum values and is safe to import in both Server and Client Components.
 *
 * When you add/remove a value in the Prisma schema (schema.prisma), update the
 * corresponding array here — this is the ONE place you need to change.
 */

// Mirrors: enum SkillCategory in schema.prisma
export const SKILL_CATEGORIES = [
  'PROGRAMMING_LANGUAGE',
  'FRONTEND',
  'BACKEND',
  'DATABASE',
  'MOBILE',
  'DEVOPS',
  'DESIGN',
  'SOFT_SKILL',
  'OTHER',
] as const

export type SkillCategory = (typeof SKILL_CATEGORIES)[number]

// Mirrors: enum WorkLocationType in schema.prisma
export const WORK_LOCATION_TYPES = [
  'REMOTE',
  'ONSITE',
  'HYBRID',
] as const

export type WorkLocationType = (typeof WORK_LOCATION_TYPES)[number]

// Mirrors: enum WorkType in schema.prisma
export const WORK_TYPES = [
  'FULL_TIME',
  'PART_TIME',
  'CONTRACT',
  'FREELANCE',
  'INTERNSHIP',
] as const

export type WorkType = (typeof WORK_TYPES)[number]
