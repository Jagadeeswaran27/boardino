import { auth } from "@/auth";
import { prisma } from "../prisma";
import { Board } from "@/types/board";

export const getBoards = async (): Promise<Board[]> => {
  const session = await auth();
  if (!session?.user?.id) return [];
  const boards = await prisma.board.findMany({
    where: {
      OR: [
        { ownerId: session.user.id },
        { memberIds: { has: session.user.id } },
      ],
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return boards.map((board) => ({
    id: board.id,
    name: board.name,
    description: board.description,
    createdAt: board.createdAt,
    ownerId: board.ownerId,
    memberIds: board.memberIds,
    owner: {
      id: board.owner.id,
      name: board.owner.name,
      email: board.owner.email,
      image: board.owner.image,
    },
  }));
};

export const createBoard = async (
  board: Omit<Board, "id" | "createdAt" | "owner">
): Promise<Board | null> => {
  const response = await fetch("http://localhost:3000/api/boards/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(board),
  });
  if (!response.ok) {
    return null;
  }
  const data = (await response.json()) as Board;
  return {
    createdAt: new Date(data.createdAt),
    description: data.description,
    id: data.id,
    memberIds: data.memberIds,
    name: data.name,
    ownerId: data.ownerId,
  };
};

export const deleteBoard = async (boardId: string): Promise<boolean> => {
  const response = await fetch(`http://localhost:3000/api/boards/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ boardId }),
  });
  if (!response.ok) {
    return false;
  }
  return true;
};
