import { NextResponse } from "next/server";

import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";

import { Board } from "@/types/board";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, ownerId } = body;

    const board = await prisma.board.create({
      data: {
        name,
        description,
        ownerId,
      },
    });

    // Create board membership for the owner
    await prisma.boardMember.create({
      data: {
        boardId: board.id,
        userId: ownerId,
        role: Role.OWNER,
      },
    });

    const fullBoard = await prisma.board.findUnique({
      where: { id: board.id },
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

    if (!fullBoard) {
      return NextResponse.json(
        { error: "Board not found after creation" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        id: fullBoard.id,
        name: fullBoard.name,
        description: fullBoard.description,
        createdAt: fullBoard.createdAt,
        ownerId: fullBoard.ownerId,
        members: fullBoard.members,
        owner: {
          id: fullBoard.owner.id,
          name: fullBoard.owner.name,
          email: fullBoard.owner.email,
          image: fullBoard.owner.image ?? "",
        },
      } as Board,
      { status: 201 }
    );
  } catch (error) {
    console.error("[BOARD_CREATE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
