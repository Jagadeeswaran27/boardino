import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { User } from "@/types/auth";

export async function POST(request: Request) {
  try {
    // Parse request body to get the user IDs
    const body = await request.json();
    const userIds = body.userIds;

    // Validate that userIds is an array
    if (!Array.isArray(userIds)) {
      return NextResponse.json(
        { error: "userIds must be an array" },
        { status: 400 }
      );
    }

    // Fetch users from Prisma
    const users = (await prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        authenticationMethod: true,
      },
    })) as User[];

    // Return the users
    return NextResponse.json(users);
  } catch (error) {
    console.error("[GET_USER_DETAILS]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
