"use server";

import bcrypt from "bcryptjs";

import { User, UserWithAllDetails } from "@/types/auth";

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

export const getUsersInfoById = async (userIds: string[]): Promise<User[]> => {
  const response = await fetch(
    "http://localhost:3000/api/auth/getUserDetails",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userIds }),
    }
  );
  if (!response.ok) {
    return [];
  }
  const data = (await response.json()) as User[];
  return data.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image ?? "",
    hashedPassword: user.hashedPassword ?? "",
    authenticationMethod: user.authenticationMethod,
  }));
};

export const getUserWithAllDetails = async (
  userId: string
): Promise<UserWithAllDetails | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        boardsOwned: {
          include: {
            tasks: true,
          },
        },
        assignedTasks: {
          include: {
            board: {
              include: {
                tasks: true,
              },
            },
          },
        },
        boardMemberships: {
          include: {
            board: {
              include: {
                owner: true,
                tasks: true,
              },
            },
            user: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image ?? "",
      hashedPassword: user.hashedPassword ?? "",
      authenticationMethod: user.authenticationMethod,
      boardsOwned: user.boardsOwned ?? [],
      assignedTasks: user.assignedTasks ?? [],
      boardMemberships: user.boardMemberships ?? [],
    };
  } catch (error) {
    console.error("Error fetching user with all details:", error);
    return null;
  }
};
