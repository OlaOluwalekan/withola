"use server";

import { prisma, AboutMe } from "@repo/database";
import { ResponseStructure } from "../types/general.interface";

export const getAboutMe = async (): Promise<
  ResponseStructure<AboutMe>
> => {
  try {
    const aboutMe = await prisma.aboutMe.findFirst();

    if (!aboutMe) {
      return {
        success: false,
        error: "About me not found",
        data: null,
      };
    }

    return { success: true, error: null, data: { aboutMe } };
  } catch {
    return {
      success: false,
      error: "Error fetching about me",
      data: null,
    };
  }
};
