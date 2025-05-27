import { prisma } from "@/lib/prisma";
import { Task } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const taskId = searchParams.get("taskId");
  if (!taskId) {
    return new Response("Task ID is required", { status: 400 });
  }

  try {
    const {
      assigneeId,
      boardId,
      columnId,
      createdAt,
      description,
      dueDate,
      name,
    } = (await req.json()) as Task;

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        assigneeId: assigneeId || null,
        boardId: boardId,
        columnId: columnId,
        createdAt: new Date(createdAt),
        description: description,
        dueDate: dueDate,
        name: name,
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

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}
