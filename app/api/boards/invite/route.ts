import InviteEmailTemplate from "@/components/boards/InviteEmailTemplate";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(request: Request) {
  try {
    const { email, boardId, boardName, message, senderName, role } =
      (await request.json()) as {
        email: string[];
        boardId: string;
        boardName: string;
        message: string;
        senderName: string;
        role: Role;
      };

    email.forEach(async (email) => {
      const boardInvitation = await prisma.boardInvitation.create({
        data: {
          boardId,
          email,
          role,
          status: "PENDING",
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      const data = {
        from: "Boardino <onboarding@resend.dev>",
        to: email,
        subject: `You've been invited to join the ${boardName} board`,
        react: InviteEmailTemplate({
          boardInvitationId: boardInvitation.id,
          boardName,
          boardId,
          message,
          senderName,
          role,
        }),
      };

      await resend.emails.send(data);
    });

    return new Response("Email sent successfully", { status: 200 });
  } catch (error) {
    console.error("Error sending invitation email:", error);
    return new Response("Failed to send invitation email", { status: 500 });
  }
}
