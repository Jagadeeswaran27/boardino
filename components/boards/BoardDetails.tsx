"use client";

import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import { Column } from "@/types/board";
import { createColumn } from "@/lib/services/boards";
import { useBoardContext } from "@/context/BoardContext";

import ColumnDetails from "../columns/ColumnDetails";
import InviteMembersModal from "./InviteMembersModal";
import BoardHeader from "./BoardHeader";
import ViewDrawer from "./ViewDrawer";
import BoardInfo from "./BoardInfo";
import ListView from "./listview/ListView";

const BoardDetails = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);

  const { setColumns, tabType, board } = useBoardContext();

  const handleAddColumn = useCallback(
    async (newColumnName: string) => {
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

      setIsAddingColumn(false);
      const response = await createColumn(board.id, newColumnName);

      if (!response) {
        toast.error("Failed to create column");
        setColumns((prev) => prev.filter((col) => col.id !== tempId));
        return;
      }

      setColumns((prev) =>
        prev.map((col) => (col.id === tempId ? response : col))
      );
    },
    [board.id, setColumns]
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Board Header */}
      <BoardHeader
        isAddingColumn={isAddingColumn}
        setIsInviteModalOpen={setIsInviteModalOpen}
        setIsAddingColumn={setIsAddingColumn}
        handleAddColumn={handleAddColumn}
        setIsViewDrawerOpen={setIsViewDrawerOpen}
      />

      <div className="container mx-auto py-6 max-w-[90%]">
        <div className="flex lg:flex-row flex-col justify-center  gap-6">
          {tabType === "List View" ? (
            <>
              <ListView />
            </>
          ) : (
            <ColumnDetails />
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
