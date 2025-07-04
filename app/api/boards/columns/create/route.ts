import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { name, boardId } = await request.json();

    const column = await prisma.column.create({
      data: {
        name,
        boardId,
      },
    });

    return NextResponse.json(column, { status: 201 });
  } catch (error) {
    console.error("Failed to create column:", error);
    return NextResponse.json(
      { error: "Failed to create column" },
      { status: 500 }
    );
  }
}
