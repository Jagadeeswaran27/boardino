import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { BoardInvitation } from "@prisma/client";

export async function POST(request: Request) {
  const { boardInvitation } = (await request.json()) as {
    boardInvitation: BoardInvitation;
  };
  const session = await auth();
  try {
    if (!session?.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }
    const userId = session.user.id;

    const existingMembership = await prisma.boardMember.findFirst({
      where: {
        boardId: boardInvitation.boardId,
        userId,
      },
    });

    if (existingMembership) {
      return new Response(JSON.stringify(false), { status: 200 });
    }

    await prisma.boardMember.create({
      data: {
        userId,
        boardId: boardInvitation.boardId,
        role: boardInvitation.role,
      },
    });

    await prisma.boardInvitation.update({
      where: {
        id: boardInvitation.id,
      },
      data: {
        status: "ACCEPTED",
      },
    });
    return new Response(JSON.stringify(true), { status: 200 });
  } catch (error) {
    console.error("Error accepting board invitation:", error);
    return new Response("Error accepting board invitation", { status: 500 });
  }
}
