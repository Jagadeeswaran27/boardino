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
  tasks?: PrismaTask[];
};

export type Column = PrismaColumn;

export type Task = PrismaTask & {
  column?: Pick<PrismaColumn, "id" | "name">;
  assignee?: Pick<User, "id" | "name" | "image"> | null;
  board?: Pick<Board, "id" | "name">;
};

export type BoardMember = PrismaBoardMember & {
  user: Omit<User, "hashedPassword" | "authenticationMethod">;
  board: Board;
};
