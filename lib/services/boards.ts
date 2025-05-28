import { auth } from "@/auth";
import { prisma } from "../prisma";
import { Board, Column, Task } from "@/types/board";
import { BoardInvitation } from "@prisma/client";
import { PaginatedListViewTasks, TAB, TAB_TYPE } from "../utils/board";

const url = process.env.NEXT_PUBLIC_URL;

export const createBoard = async (
  board: Omit<Board, "id" | "createdAt" | "owner">
): Promise<Board | null> => {
  const response = await fetch(`${url}/api/boards/create`, {
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
  return data;
};

export const getBoards = async (): Promise<Board[]> => {
  const session = await auth();
  if (!session?.user?.id) return [];

  const userId = session.user.id;

  const boardMemberships = await prisma.boardMember.findMany({
    where: {
      userId,
    },
    select: {
      boardId: true,
    },
  });

  const memberBoardIds = boardMemberships.map(
    (membership) => membership.boardId
  );

  const boards = await prisma.board.findMany({
    where: {
      OR: [{ ownerId: userId }, { id: { in: memberBoardIds } }],
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
      members: {
        select: {
          userId: true,
          id: true,
          boardId: true,
          role: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
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
    members: board.members,
    owner: {
      id: board.owner.id,
      name: board.owner.name,
      email: board.owner.email,
      image: board.owner.image ?? "",
    },
  }));
};

export const getBoard = async (boardId: string): Promise<Board | null> => {
  const session = await auth();
  if (!session?.user?.id) return null;
  const board = await prisma.board.findUnique({
    where: {
      id: boardId,
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
      members: {
        select: {
          userId: true,
          id: true,
          boardId: true,
          role: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
    },
  });
  if (!board) return null;
  return {
    id: board.id,
    name: board.name,
    description: board.description,
    createdAt: board.createdAt,
    ownerId: board.ownerId,
    members: board.members,
    owner: {
      id: board.owner.id,
      name: board.owner.name,
      email: board.owner.email,
      image: board.owner.image ?? "",
    },
  };
};

export const deleteBoard = async (boardId: string): Promise<boolean> => {
  const response = await fetch(`${url}/api/boards/delete`, {
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

export const createColumn = async (
  boardId: string,
  name: string
): Promise<Column | null> => {
  const response = await fetch(`${url}/api/boards/columns/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, boardId }),
  });
  if (!response.ok) {
    return null;
  }
  const data = (await response.json()) as Column;
  return data;
};

export const getColumns = async (boardId: string): Promise<Column[]> => {
  const session = await auth();
  if (!session?.user?.id) return [];
  const columns = await prisma.column.findMany({
    where: {
      boardId,
    },
  });
  return columns.map((column) => ({
    id: column.id,
    name: column.name,
    boardId: column.boardId,
    createdAt: column.createdAt,
  }));
};

export const addTask = async (
  task: Omit<Task, "id" | "createdAt">
): Promise<Task | null> => {
  const response = await fetch(`${url}/api/boards/task/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    return null;
  }
  const data = (await response.json()) as Task;
  return data;
};

export const getTasks = async (
  boardId: string,
  tabType: TAB_TYPE,
  columnId: string,
  tabName: TAB
): Promise<Task[]> => {
  const response = await fetch(`${url}/api/boards/task/getAll`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ boardId, tabType, columnId, tabName }),
  });
  if (!response.ok) {
    return [];
  }
  const data = (await response.json()) as Task[];
  return data;
};

export const sendInviteEmail = async (
  email: string[],
  boardId: string,
  boardName: string,
  message: string,
  senderName: string,
  role: string
): Promise<boolean> => {
  const response = await fetch(`${url}/api/boards/invite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      boardId,
      boardName,
      message,
      senderName,
      role,
    }),
  });
  if (!response.ok) {
    return false;
  }
  return true;
};

export const getListViewTasks = async ({
  boardId,
  cursor,
}: {
  boardId: string;
  cursor?: string;
}): Promise<PaginatedListViewTasks> => {
  const params = new URLSearchParams();
  if (cursor) {
    params.append("cursor", cursor);
  }
  params.append("boardId", boardId);
  const response = await fetch(
    `${url}/api/boards/task/getListViewTasks?${params.toString()}`
  );
  if (!response.ok) {
    return {
      tasks: [],
      nextCursor: undefined,
    };
  }
  const data = (await response.json()) as PaginatedListViewTasks;
  return data;
};

export const updateTask = async (
  task: Omit<Task, "assignee" | "column">
): Promise<Task | null> => {
  const params = new URLSearchParams();
  params.append("taskId", task.id);
  const urlWithParams = `${url}/api/boards/task/update?${params.toString()}`;
  const response = await fetch(urlWithParams, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    return null;
  }
  const data = (await response.json()) as Task;
  return data;
};

export const getBoardInvitation = async (
  boardInvitationId: string
): Promise<BoardInvitation | null> => {
  try {
    const invitation = await prisma.boardInvitation.findUnique({
      where: {
        id: boardInvitationId,
      },
    });
    if (!invitation) throw new Error("Board invitation not found");
    return invitation;
  } catch (error) {
    console.error("Error fetching board invitation:", error);
    return null;
  }
};

export const acceptBoardInvitation = async (
  boardInvitation: BoardInvitation
): Promise<boolean> => {
  const response = await fetch(`${url}/api/boards/invite/accept`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ boardInvitation }),
  });
  if (!response.ok) {
    return false;
  }
  const res = (await response.json()) as boolean;
  return res;
};
