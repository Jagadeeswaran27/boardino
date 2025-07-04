import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { boardId, newName } = await request.json();
  if (!boardId || !newName) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
  try {
    await prisma.board.update({
      data: {
        name: newName,
      },
      where: {
        id: boardId,
      },
    });
    return NextResponse.json({ message: "Board name updated successfully" });
  } catch (error) {
    console.error("Error updating board name:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
