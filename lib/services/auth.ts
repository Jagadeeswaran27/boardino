"use server";
import { User } from "@/types/auth";
import { prisma } from "../prisma";

export const addUserInfo = async (user: User): Promise<boolean> => {
  try {
    const isExistingUser = await prisma.user.findFirst({
      where: {
        email: user.email,
        authenticationMethod: user.authenticationMethod,
      },
    });

    if (isExistingUser) {
      return true;
    }

    await prisma.user.create({
      data: user,
    });

    return true;
  } catch (error) {
    console.error("Error adding user info:", error);
    return false;
  }
};
