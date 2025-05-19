import { prisma } from "@/lib/prisma";
import { Task } from "@/types/board";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, columnId, assigneeId, dueDate, boardId } =
      body as Task;

    if (!name || !description || !dueDate || !boardId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        name,
        description,
        dueDate: new Date(dueDate),
        assigneeId: assigneeId,
        columnId: columnId,
        boardId,
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
