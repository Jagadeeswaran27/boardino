import { User } from "./auth";

export interface Board {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  ownerId: string;
  memberIds: string[];
  owner?: Omit<User, "hashedPassword", "authenticationMethod">;
}

export interface Column {
  id: string;
  name: string;
  boardId: string;
  createdAt: Date;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  columnId?: string;
  assigneeId?: string;
  dueDate: Date;
  createdAt: Date;
  boardId: string;
}
