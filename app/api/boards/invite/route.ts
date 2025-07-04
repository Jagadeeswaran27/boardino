import { NextResponse } from "next/server";

import nodemailer from "nodemailer";

import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function createInviteEmailHTML({
  boardInvitationId,
  boardName,
  boardId,
  message,
  senderName,
  role,
}: {
  boardInvitationId: string;
  boardName: string;
  boardId: string;
  message: string;
  senderName: string;
  role: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://boardino.vercel.app";
  const joinUrl = `${baseUrl}/boards/${boardId}/join?${new URLSearchParams({
    boardInvitationId: boardInvitationId,
    role: role,
    boardName: boardName,
    referrer: "Invite",
  }).toString()}`;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Board Invitation</title>
      </head>
      <body style="font-family: Arial, sans-serif; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 24px; background: linear-gradient(135deg, #f7f9fc 0%, #ebf2fa 100%); border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb;">
        <!-- Header -->
        <div style="background: white; border-radius: 12px 12px 0 0; padding: 32px; text-align: center; border-bottom: 1px solid #e5e7eb; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
          <div style="font-size: 24px; font-weight: bold; color: #3b82f6; margin-bottom: 8px;">
            📋 Boardino
          </div>
          <h1 style="font-size: 20px; margin: 0; font-weight: 600; color: #1f2937;">
            You've been invited to join a board
          </h1>
        </div>

        <!-- Main Content -->
        <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
          <p style="margin-bottom: 24px; font-size: 16px;">
            <strong style="color: #3b82f6;">${senderName}</strong> has invited you
            to collaborate on the <strong style="color: #10b981;">${boardName}</strong> board as a
            <strong style="color: #10b981;">${role}</strong>.
          </p>

          ${
            message
              ? `
          <div style="background: #f0f9ff; border-left: 4px solid #10b981; padding: 16px; border-radius: 4px; margin-bottom: 24px; font-size: 14px;">
            <p style="margin: 0; font-style: italic;">${message}</p>
          </div>
          `
              : ""
          }

          <div style="text-align: center; margin-bottom: 32px;">
            <a href="${joinUrl}" style="background: #3b82f6; color: white; padding: 12px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; text-decoration: none; display: inline-block; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              Join Board
            </a>
          </div>

          <p style="margin-bottom: 8px; font-size: 14px; color: #6b7280;">
            Or copy this link into your browser:
          </p>
          <p style="overflow: hidden; text-overflow: ellipsis; font-size: 14px; padding: 8px; background: #f3f4f6; border-radius: 4px; word-break: break-all;">
            <a href="${joinUrl}" style="color: #3b82f6; text-decoration: none;">
              ${joinUrl}
            </a>
          </p>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding: 16px; font-size: 12px; color: #6b7280;">
          <p>
            This is an automated message from Boardino. If you weren't
            expecting this invitation, you can safely ignore this email.
          </p>
          <p style="margin-top: 16px;">
            &copy; ${new Date().getFullYear()} Boardino. All rights reserved.
          </p>
        </div>
      </body>
    </html>
  `;
}

export async function POST(request: Request) {
  try {
    console.log(transporter, process.env.SMTP_USER, process.env.SMTP_PASS);

    try {
      await transporter.verify();
      console.log("SMTP connection verified successfully");
    } catch (error) {
      console.error("SMTP connection verification failed:", error);
      return NextResponse.json("SMTP connection failed", { status: 500 });
    }

    const { email, boardId, boardName, message, senderName, role } =
      (await request.json()) as {
        email: string[];
        boardId: string;
        boardName: string;
        message: string;
        senderName: string;
        role: Role;
      };

    if (!email || !Array.isArray(email) || email.length === 0) {
      return NextResponse.json("Email is required", { status: 400 });
    }

    const emailPromises = email.map(async (email) => {
      const existingInvitation = await prisma.boardInvitation.findFirst({
        where: {
          boardId,
          email,
          AND: {
            status: "PENDING",
          },
        },
      });

      console.log("Existing Invitation:", existingInvitation);

      if (!existingInvitation) {
        const boardInvitation = await prisma.boardInvitation.create({
          data: {
            boardId,
            email,
            role,
            status: "PENDING",
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
          },
        });

        const htmlContent = createInviteEmailHTML({
          boardInvitationId: boardInvitation.id,
          boardName,
          boardId,
          message,
          senderName,
          role,
        });

        const mailOptions = {
          from: `Boardino-Admin <jagadeeswaran2705@gmail.com>`,
          to: email,
          subject: `You've been invited to join the ${boardName} board`,
          html: htmlContent,
        };

        await transporter.sendMail(mailOptions);
      }
    });

    await Promise.all(emailPromises);

    return NextResponse.json("Email sent successfully", { status: 200 });
  } catch (error) {
    console.error("Error sending invitation email:", error);
    return NextResponse.json("Failed to send invitation email", {
      status: 500,
    });
  }
}
