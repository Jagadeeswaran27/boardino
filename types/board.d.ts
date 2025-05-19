import {
  User,
  Board as PrismaBoard,
  Column as PrismaColumn,
  Task as PrismaTask,
  BoardMember as PrismaBoardMember,
} from "@prisma/client";

export type Board = PrismaBoard & {
  owner?: Omit<User, "hashedPassword" | "authenticationMethod">;
  members?: (PrismaBoardMember & {
    user: Omit<User, "hashedPassword" | "authenticationMethod">;
  })[];
};

export type Column = PrismaColumn;

export type Task = PrismaTask;
