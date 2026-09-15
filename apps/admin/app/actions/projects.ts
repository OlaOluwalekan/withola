"use server";

import { prisma } from "@repo/database";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateAiSummary } from "./ai";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  isFeatured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  keyHighlights: z.array(z.string()).default([]),
  majorFeature: z.string().min(1, "Major feature is required"),
  description: z.string().min(1, "Description is required"),
  readme: z.string().min(1, "Readme content is required"),
  aiSummary: z.string().optional(),
  sourceCodeLink: z.string().optional(),
  liveUrlLink: z.string().optional(),
  icon: z.string().min(1, "Icon is required"),
  screenShots: z.array(z.string()).default([]),
});

export async function createProject(formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  let tags: string[] = [];
  let technologies: string[] = [];
  let screenShots: string[] = [];
  let keyHighlights: string[] = [];
  const isFeatured = data.isFeatured === "true";

  try {
    tags = JSON.parse((data.tags as string) || "[]");
    technologies = JSON.parse((data.technologies as string) || "[]");
    screenShots = JSON.parse((data.screenShots as string) || "[]");
    keyHighlights = JSON.parse((data.keyHighlights as string) || "[]");
  } catch (e) {}

  let aiSummary = data.aiSummary as string | undefined;
  const readme = data.readme as string;

  if (!aiSummary && readme && readme.length > 400) {
    const aiResponse = await generateAiSummary(readme);
    if (aiResponse.summary) {
      aiSummary = aiResponse.summary;
    }
  }

  const parsed = projectSchema.safeParse({
    ...data,
    tags,
    technologies,
    screenShots,
    keyHighlights,
    aiSummary,
    isFeatured,
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  await prisma.project.create({
    data: parsed.data,
  });

  revalidatePath("/projects");
  return { success: true };
}

export async function updateProject(id: string, formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  let tags: string[] = [];
  let technologies: string[] = [];
  let screenShots: string[] = [];
  let keyHighlights: string[] = [];
  const isFeatured = data.isFeatured === "true";

  try {
    tags = JSON.parse((data.tags as string) || "[]");
    technologies = JSON.parse((data.technologies as string) || "[]");
    screenShots = JSON.parse((data.screenShots as string) || "[]");
    keyHighlights = JSON.parse((data.keyHighlights as string) || "[]");
  } catch (e) {}

  let aiSummary = data.aiSummary as string | undefined;
  const readme = data.readme as string;

  if (!aiSummary && readme && readme.length > 400) {
    const aiResponse = await generateAiSummary(readme);
    if (aiResponse.summary) {
      aiSummary = aiResponse.summary;
    }
  }

  const parsed = projectSchema.safeParse({
    ...data,
    tags,
    technologies,
    screenShots,
    keyHighlights,
    aiSummary,
    isFeatured,
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  await prisma.project.update({
    where: { id },
    data: parsed.data,
  });

  revalidatePath("/projects");
  return { success: true };
}

export async function deleteProject(id: string) {
  await prisma.project.delete({
    where: { id },
  });

  revalidatePath("/projects");
  return { success: true };
}
