import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

import { TAB, TAB_TYPE } from "@/lib/utils/board";
import { Task } from "@/types/board";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { boardId, tabType, columnId, tabName } = body as {
      boardId: string;
      tabType: TAB_TYPE;
      columnId: string;
      tabName: TAB;
    };

    if (!boardId) {
      return NextResponse.json(
        { error: "Board ID is required" },
        { status: 400 }
      );
    }

    const tasks: Task[] = [];

    if (tabType === "Column View") {
      const t = await prisma.task.findMany({
        where: {
          boardId: boardId,
          columnId: columnId,
        },
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
      tasks.push(...t);
    }
    if (tabType === "Kanban View") {
      const t = await prisma.task.findMany({
        where: {
          boardId: boardId,
          dueDate:
            tabName === "In Progress"
              ? { gte: new Date() }
              : tabName == "Completed"
                ? { lt: new Date() }
                : null,
        },
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
      tasks.push(...t);
    }
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
