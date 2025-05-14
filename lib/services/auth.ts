"use server";
import { User } from "@/types/auth";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
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

export const createUser = async (
  user: User,
  password: string
): Promise<boolean> => {
  try {
    const isExistingUser = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (isExistingUser) {
      return false;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;

    await prisma.user.create({
      data: user,
    });

    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
};
