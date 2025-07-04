import { User as PrismaUser } from "@prisma/client";

import { Board, BoardMember, Task } from "./board";

export type User = {
  id?: string;
  name: string;
  email: string;
  hashedPassword?: string;
  image: string | null;
  authenticationMethod: authenticationMethod;
};

export type UserWithAllDetails = PrismaUser & {
  boardsOwned?: Board[];
  assignedTasks?: Task[];
  boardMemberships?: BoardMember[];
};

export type authenticationMethod = "github" | "google" | "credentials";
