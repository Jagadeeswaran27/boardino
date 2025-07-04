import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

const LIMIT = 5;
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor");
  const boardId = searchParams.get("boardId");
  if (!boardId) {
    return new Response(JSON.stringify({ error: "Board ID is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        boardId: boardId,
      },
      take: LIMIT + 1,
      orderBy: {
        id: "desc",
      },
      ...(cursor && {
        skip: 1,
        cursor: {
          id: cursor,
        },
      }),

      include: {
        column: {
          select: {
            id: true,
            name: true,
          },
        },
        assignee: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    const hasNextPage = tasks.length > LIMIT;
    const paginatedTasks = hasNextPage ? tasks.slice(0, -1) : tasks;
    return NextResponse.json({
      tasks: paginatedTasks,
      nextCursor: hasNextPage
        ? paginatedTasks[paginatedTasks.length - 1].id
        : null,
    });
  } catch (error) {
    console.error("Error fetching list view tasks:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch tasks" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
