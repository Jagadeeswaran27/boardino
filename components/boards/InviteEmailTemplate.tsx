import Head from "next/head";
import React from "react";

interface InviteEmailTemplateProps {
  boardInvitationId: string;
  boardName: string;
  boardId: string;
  message: string;
  senderName: string;
  role: string;
}

const InviteEmailTemplate = ({
  boardInvitationId,
  boardName,
  boardId,
  message,
  senderName,
  role,
}: InviteEmailTemplateProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://boardino.app";
  const joinUrl = `${baseUrl}/boards/${boardId}/join?${new URLSearchParams({
    boardInvitationId: boardInvitationId,
    role: role,
    boardName: boardName,
    referrer: "Invite",
  }).toString()}`;

  return (
    <html>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Board Invitation</title>
      </Head>
      <body
        style={{
          fontFamily: "Arial, sans-serif",
          color: "#1f2937",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "24px",
          background: "linear-gradient(135deg, #f7f9fc 0%, #ebf2fa 100%)",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "white",
            borderRadius: "12px 12px 0 0",
            padding: "32px",
            textAlign: "center",
            borderBottom: "1px solid #e5e7eb",
            marginBottom: "24px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#3b82f6",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <span>📋</span>
            Boardino
          </div>
          <h1
            style={{
              fontSize: "20px",
              margin: "0",
              fontWeight: "600",
              color: "#1f2937",
            }}
          >
            You&apos;ve been invited to join a board
          </h1>
        </div>

        {/* Main Content */}
        <div
          style={{
            background: "white",
            padding: "32px",
            borderRadius: "0 0 12px 12px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ marginBottom: "24px", fontSize: "16px" }}>
            <strong style={{ color: "#3b82f6" }}>{senderName}</strong> has
            invited you to collaborate on the{" "}
            <strong style={{ color: "#10b981" }}>{boardName}</strong> board as a{" "}
            <strong style={{ color: "#10b981" }}>{role}</strong>.
          </p>

          {message && (
            <div
              style={{
                background: "#f0f9ff",
                borderLeft: "4px solid #10b981",
                padding: "16px",
                borderRadius: "4px",
                marginBottom: "24px",
                fontSize: "14px",
              }}
            >
              <p style={{ margin: "0", fontStyle: "italic" }}>{message}</p>
            </div>
          )}

          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <a
              href={joinUrl}
              style={{
                background: "#3b82f6",
                color: "white",
                padding: "12px 32px",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "16px",
                textDecoration: "none",
                display: "inline-block",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              Join Board
            </a>
          </div>

          <p
            style={{
              marginBottom: "8px",
              fontSize: "14px",
              color: "#6b7280",
            }}
          >
            Or copy this link into your browser:
          </p>
          <p
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "14px",
              padding: "8px",
              background: "#f3f4f6",
              borderRadius: "4px",
              wordBreak: "break-all",
            }}
          >
            <a
              href={joinUrl}
              style={{ color: "#3b82f6", textDecoration: "none" }}
            >
              {joinUrl}
            </a>
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            padding: "16px",
            fontSize: "12px",
            color: "#6b7280",
          }}
        >
          <p>
            This is an automated message from Boardino. If you weren&apos;t
            expecting this invitation, you can safely ignore this email.
          </p>
          <p style={{ marginTop: "16px" }}>
            &copy; {new Date().getFullYear()} Boardino. All rights reserved.
          </p>
        </div>
      </body>
    </html>
  );
};

export default InviteEmailTemplate;
