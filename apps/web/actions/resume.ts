"use server";

import { prisma } from "@repo/database";

export async function getDefaultResume() {
  try {
    const resume = await prisma.resume.findFirst({
      where: {
        isDefault: true,
      },
    });
    return resume;
  } catch (error) {
    console.error("Error fetching default resume:", error);
    return null;
  }
}
