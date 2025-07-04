import { Session } from "next-auth";
import React from "react";

import { BoardInvitation } from "@prisma/client";
import { FaUserSlash } from "react-icons/fa";

import SignoutAndSwitchAccountsButtons from "../buttons/SignoutAndSwitchAccountsButtons";

interface NotAuthorizedCardProps {
  boardInvitation: BoardInvitation;
  session: Session;
  loginUrl: string;
}

const NotAuthorizedCard = ({
  boardInvitation,
  session,
  loginUrl,
}: NotAuthorizedCardProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-section-bg-start to-section-bg-end p-4">
      <div className="bg-white rounded-xl shadow-lg border border-neutral-100 max-w-md w-full p-0 overflow-hidden card-shadow transition-all">
        <div className="bg-gradient-to-r from-primary/15 to-accent/15 px-8 py-10 flex flex-col items-center">
          <div className="bg-white/80 p-4 rounded-full mb-5 shadow-sm">
            <FaUserSlash className="text-3xl text-error" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2 tracking-tight">
            Wrong Account
          </h1>
          <p className="text-sm text-neutral-700 font-medium text-center">
            You&apos;re signed in with the wrong email address
          </p>
        </div>

        <div className="px-8 py-8">
          <div className="bg-neutral-50 rounded-lg p-5 mb-6 border border-neutral-100">
            <p className="text-base font-medium text-neutral-700 leading-relaxed mb-3">
              This invitation was sent to:
              <span className="block font-bold text-primary mt-1">
                {boardInvitation.email}
              </span>
            </p>
            <p className="text-base font-medium text-neutral-700 leading-relaxed">
              You&apos;re currently signed in as:
              <span className="block font-bold text-error mt-1">
                {session.user?.email}
              </span>
            </p>
          </div>

          <SignoutAndSwitchAccountsButtons loginUrl={loginUrl} />

          <p className="mt-6 text-center text-neutral-500 text-sm">
            Please sign in with the email address where this invitation was sent
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorizedCard;
