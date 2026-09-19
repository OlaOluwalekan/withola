"use server";

import { requireAdmin } from "../../lib/auth-check";
import { prisma } from "@repo/database";
import { revalidatePath } from "next/cache";

export async function getAboutMe() {
  try {
    const aboutMe = await prisma.aboutMe.findFirst();
    return aboutMe;
  } catch (error) {
    console.error("Error fetching AboutMe:", error);
    return null;
  }
}

export async function updateAboutMe(data: {
  about: string;
  emails: string[];
  phones: string[];
  socials: { name: string; value: string; icon?: string }[];
}) {
  await requireAdmin();
  try {
    const existing = await prisma.aboutMe.findFirst();

    if (existing) {
      await prisma.aboutMe.update({
        where: { id: existing.id },
        data,
      });
    } else {
      await prisma.aboutMe.create({
        data,
      });
    }

    revalidatePath("/about");
    return { success: true };
  } catch (error) {
    console.error("Error updating AboutMe:", error);
    return { success: false, error: "Failed to update About Me" };
  }
}
