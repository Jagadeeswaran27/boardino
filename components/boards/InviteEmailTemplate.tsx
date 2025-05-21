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
    <div className="font-sans text-neutral-900 max-w-[600px] mx-auto p-6 bg-gradient-to-br from-[#f7f9fc] to-[#ebf2fa] rounded-xl shadow-lg border border-neutral-100">
      {/* Header */}
      <div className="bg-white rounded-t-xl p-8 text-center border-b border-neutral-200 mb-6 shadow-sm">
        <div className="text-3xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
          <span>📋</span>
          Boardino
        </div>
        <h1 className="text-xl m-0 font-semibold text-neutral-900">
          You&apos;ve been invited to join a board
        </h1>
      </div>

      {/* Main Content */}
      <div className="bg-white p-8 rounded-b-xl shadow-sm">
        <p className="mb-6 text-base">
          <strong className="text-primary">{senderName}</strong> has invited you
          to collaborate on the{" "}
          <strong className="text-accent">{boardName}</strong> board as a{" "}
          <strong className="text-accent">{role}</strong>.
        </p>

        {message && (
          <div className="bg-subtle-accent border-l-4 border-accent p-4 rounded mb-6 text-sm">
            <p className="m-0 italic">{message}</p>
          </div>
        )}

        <div className="text-center mb-8">
          <a
            href={joinUrl}
            className="bg-primary hover:bg-primary-dark text-white py-3 px-8 rounded-lg font-semibold text-base inline-block shadow transition-colors"
          >
            Join Board
          </a>
        </div>

        <p className="mb-2 text-sm text-neutral-700">
          Or copy this link into your browser:
        </p>
        <p className="overflow-hidden text-ellipsis text-sm p-2 bg-neutral-100 rounded break-all">
          <a
            href={joinUrl}
            className="text-primary no-underline hover:underline"
          >
            {joinUrl}
          </a>
        </p>
      </div>

      {/* Footer */}
      <div className="text-center p-4 text-xs text-neutral-700">
        <p>
          This is an automated message from Boardino. If you weren&apos;t
          expecting this invitation, you can safely ignore this email.
        </p>
        <p className="mt-4">
          &copy; {new Date().getFullYear()} Boardino. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default InviteEmailTemplate;
