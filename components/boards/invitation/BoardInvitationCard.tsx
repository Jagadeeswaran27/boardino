import React from "react";
import { SiGooglemessages } from "react-icons/si";

import { BoardInvitation } from "@prisma/client";

import AcceptInvitationButton from "./buttons/AcceptInvitationButton";

interface BoardInvitationCardProps {
  boardName?: string;
  role?: string;
  boardInvitation: BoardInvitation;
}
const BoardInvitationCard = ({
  boardName,
  role,
  boardInvitation,
}: BoardInvitationCardProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-section-bg-start to-section-bg-end p-4">
      <h1 className="text-3xl font-bold text-neutral-800 mb-6 text-center">
        Boardino Invitation
        <span className="block text-lg font-medium text-neutral-600 mt-2">
          You&apos;ve received an invitation to collaborate
        </span>
      </h1>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 max-w-md w-full overflow-hidden transition-all hover:shadow-md">
        {/* Card Header - More subtle design */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-8 py-8 flex flex-col items-center border-b border-neutral-100">
          <SiGooglemessages className="text-4xl text-primary mb-4" />
          <h1 className="text-xl font-bold text-neutral-800 mb-1 tracking-tight">
            Board Invitation
          </h1>
          <p className="text-sm text-neutral-600 font-medium">
            You&apos;ve been invited to collaborate
          </p>
        </div>

        {/* Card Content - More subtle design */}
        <div className="px-8 py-8">
          <div className="bg-neutral-50 rounded-lg p-5 mb-6 text-center border border-neutral-100">
            <p className="text-base font-medium text-neutral-700 leading-relaxed">
              You have been invited to join{" "}
              <span className="font-bold text-primary inline-block">
                {boardName || "Boardino"}
              </span>{" "}
              as a{" "}
              <span className="font-semibold capitalize text-neutral-800">
                {role || "member"}
              </span>
            </p>
          </div>
          <AcceptInvitationButton boardInvitation={boardInvitation} />
        </div>
      </div>

      <p className="mt-6 text-center text-neutral-500 text-sm">
        If you didn&apos;t expect this invitation, you can safely ignore it.
      </p>
    </div>
  );
};

export default BoardInvitationCard;
