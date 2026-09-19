"use server";

import { requireAdmin } from "../../lib/auth-check";
import { prisma } from "@repo/database";
import { revalidatePath } from "next/cache";
import { deleteCloudinaryFile } from "./cloudinary";

export async function createResume(name: string, url: string) {
  await requireAdmin();
  try {
    const existingCount = await prisma.resume.count();
    const isDefault = existingCount === 0;

    await prisma.resume.create({
      data: {
        name,
        url,
        isDefault,
      },
    });

    revalidatePath("/resume");
    return { success: true };
  } catch (error) {
    console.error("Error creating resume:", error);
    return { success: false, error: "Failed to create resume" };
  }
}

export async function deleteResume(id: string) {
  await requireAdmin();
  try {
    const resume = await prisma.resume.findUnique({
      where: { id },
    });

    if (!resume) {
      return { success: false, error: "Resume not found" };
    }

    // Delete from Cloudinary
    await deleteCloudinaryFile(resume.url);

    // Delete from Database
    await prisma.resume.delete({
      where: { id },
    });

    // If we deleted the default, set another one as default if it exists
    if (resume.isDefault) {
      const nextResume = await prisma.resume.findFirst();
      if (nextResume) {
        await prisma.resume.update({
          where: { id: nextResume.id },
          data: { isDefault: true },
        });
      }
    }

    revalidatePath("/resume");
    return { success: true };
  } catch (error) {
    console.error("Error deleting resume:", error);
    return { success: false, error: "Failed to delete resume" };
  }
}

export async function setDefaultResume(id: string) {
  await requireAdmin();
  try {
    // We use a transaction to ensure atomic updates
    await prisma.$transaction([
      prisma.resume.updateMany({
        where: { isDefault: true },
        data: { isDefault: false },
      }),
      prisma.resume.update({
        where: { id },
        data: { isDefault: true },
      }),
    ]);

    revalidatePath("/resume");
    return { success: true };
  } catch (error) {
    console.error("Error setting default resume:", error);
    return { success: false, error: "Failed to set default resume" };
  }
}
