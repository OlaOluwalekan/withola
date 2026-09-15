"use server";

import { Message, prisma } from "@repo/database";
import { ResponseStructure } from "../types/general.interface";

interface MessagePayload {
  email: string;
  name: string;
  subject: string;
  message: string;
}

export const createMessage = async ({
  email,
  name,
  subject,
  message: content,
}: MessagePayload): Promise<ResponseStructure<Message>> => {
  try {
    const message = await prisma.message.create({
      data: {
        senderEmail: email,
        senderName: name,
        subject,
        content,
      },
    });

    return { success: true, error: null, data: { message } };
  } catch (error) {
    console.log("Send Message ==>", error);

    return { success: false, error: "Error sending message", data: null };
  }
};
