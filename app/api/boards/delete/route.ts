import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function DELETE(request: Request) {
  try {
    const { boardId } = (await request.json()) as { boardId: string };
    const board = await prisma.board.delete({
      where: {
        id: boardId,
      },
    });

    return NextResponse.json(board, { status: 200 });
  } catch (error) {
    console.error("[BOARD_DELETE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
