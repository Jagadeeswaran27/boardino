import { NextResponse } from "next/server";
import { Board } from "@/types/board";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Board;
    const board = await prisma.board.create({
      data: {
        name: body.name,
        description: body.description,
        ownerId: body.ownerId,
        memberIds: body.memberIds,
      },
    });
    const { data, error } = await resend.emails.send({
      from: "Boardino <onboarding@resend.dev>",
      to: ["jagadeeswaran2705@gmail.com"],
      subject: "Hello world",
      react: await EmailTemplate({ firstName: "Jags" }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    console.log("Email sent successfully:", data);
    return NextResponse.json(board, { status: 201 });
  } catch (error) {
    console.error("[BOARD_CREATE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
