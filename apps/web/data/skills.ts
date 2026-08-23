// Single source of truth lives in @repo/database/constants.
// That file is browser-safe (no Prisma/pg imports) so it can be
// imported here without breaking Client Components.
export { SKILL_CATEGORIES as skillsGroup } from '@repo/database/constants'
export type { SkillCategory as SkillCategoryValue } from '@repo/database/constants'

export const groupedSkills = () => {}
