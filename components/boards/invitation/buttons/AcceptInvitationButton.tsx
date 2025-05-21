"use client";

import { ROUTES } from "@/constants/routes";
import { acceptBoardInvitation } from "@/lib/services/boards";
import { BoardInvitation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface AcceptInvitationButtonProps {
  boardInvitation: BoardInvitation;
}

const AcceptInvitationButton = ({
  boardInvitation,
}: AcceptInvitationButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAccept = async () => {
    setIsLoading(true);
    const success = await acceptBoardInvitation(boardInvitation);
    setIsLoading(false);
    if (success) {
      router.replace(`${ROUTES.boards}/${boardInvitation.boardId}`);
    } else {
      toast.error("Failed to accept the invitation. Please try again.");
    }
  };

  return (
    <button
      onClick={handleAccept}
      className="w-full py-3 text-base font-medium rounded-lg transition-all duration-300 bg-primary text-white border border-primary hover:bg-primary-dark cursor-pointer"
      type="button"
    >
      {isLoading ? "Accepting..." : "Accept Invitation"}
    </button>
  );
};

export default AcceptInvitationButton;
