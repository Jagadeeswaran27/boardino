"use client";
import { Column } from "@/types/board";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { createColumn } from "@/lib/services/boards";
import ColumnDetails from "../columns/ColumnDetails";
import InviteMembersModal from "./InviteMembersModal";
import BoardHeader from "./BoardHeader";
import ViewDrawer from "./ViewDrawer";
import BoardInfo from "./BoardInfo";
import { useBoardContext } from "@/context/BoardContext";
import ListView from "./ListView";

const BoardDetails = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const { data: session } = useSession();

  const { setColumns, tabType, board } = useBoardContext();

  const userId = session?.user?.id;

  const isOwner =
    board.members?.find((m) => m.userId === userId)?.role === "OWNER";

  const handleAddColumn = async (newColumnName: string) => {
    if (!newColumnName.trim()) {
      toast.error("Column title cannot be empty");
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const tempColumn = {
      boardId: board.id,
      id: tempId,
      name: newColumnName,
      createdAt: new Date(),
    } as Column;

    setColumns((prev) => [...prev, tempColumn]);

    const response = await createColumn(board.id, newColumnName);

    if (!response) {
      toast.error("Failed to create column");
      setColumns((prev) => prev.filter((col) => col.id !== tempId));
      return;
    }

    setColumns((prev) =>
      prev.map((col) => (col.id === tempId ? response : col))
    );

    setIsAddingColumn(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Board Header */}
      <BoardHeader
        isOwner={isOwner}
        isAddingColumn={isAddingColumn}
        setIsInviteModalOpen={setIsInviteModalOpen}
        setIsAddingColumn={setIsAddingColumn}
        handleAddColumn={handleAddColumn}
        setIsViewDrawerOpen={setIsViewDrawerOpen}
      />

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex lg:flex-row flex-col justify-center  gap-6">
          {tabType === "List View" ? (
            <>
              <ListView />
            </>
          ) : (
            <ColumnDetails isOwner={isOwner} />
          )}

          <BoardInfo setIsInviteModalOpen={setIsInviteModalOpen} />
        </div>
      </div>

      {isInviteModalOpen && (
        <InviteMembersModal setIsInviteModalOpen={setIsInviteModalOpen} />
      )}

      {/* View Settings Drawer */}
      <ViewDrawer
        isOpen={isViewDrawerOpen}
        onClose={() => setIsViewDrawerOpen(false)}
      />
    </div>
  );
};

export default BoardDetails;
