import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { Task } from "@/types/board";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, columnId, assigneeId, dueDate, boardId } =
      body as Task;

    if (!name || !description || !boardId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        name,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        assigneeId,
        columnId,
        boardId,
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

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("[TASK_CREATE]", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
