"use server";

import { requireAdmin } from "../../lib/auth-check";
import { prisma } from "@repo/database";
import { revalidatePath } from "next/cache";

export async function deleteMessage(id: string) {
  await requireAdmin();
  await prisma.message.delete({
    where: { id },
  });
  revalidatePath("/messages");
  return { success: true };
}

export async function markAsRead(id: string) {
  await requireAdmin();
  await prisma.message.update({
    where: { id },
    data: { isRead: true },
  });
  revalidatePath("/messages");
  revalidatePath(`/messages/${id}`);
  return { success: true };
}
