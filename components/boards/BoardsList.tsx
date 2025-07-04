"use client";
import { useState } from "react";

import { Board } from "@/types/board";
import { useBoards } from "@/hooks/board/useBoards";

import CreateBoardModal from "./CreateBoardModal";
import BoardsHeader from "./BoardsHeader";
import BoardsSection from "./BoardsSection";
import CustomUndoNotification from "./CustomUndoNotification";

const BoardsList = ({ initialBoards }: { initialBoards: Board[] }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    recentlyDeleted,
    showUndoNotification,
    isModalOpen,
    getFilteredBoards,
    getContributedBoards,
    getOwnedBoards,
    dismissNotification,
    handleDeleteBoard,
    handleUndoDelete,
    updateBoardList,
    setIsModalOpen,
  } = useBoards(initialBoards);

  const filteredBoards = getFilteredBoards(searchQuery);
  const ownedBoards = getOwnedBoards(filteredBoards);
  const contributedBoards = getContributedBoards(filteredBoards);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen relative bg-pattern">
      <div className="relative z-10">
        <BoardsHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setIsModalOpen={setIsModalOpen}
        />

        {/* Owned Boards Section */}
        <BoardsSection
          boards={ownedBoards}
          searchQuery={searchQuery}
          setIsModalOpen={setIsModalOpen}
          handleDeleteBoard={handleDeleteBoard}
          title="Your Boards"
        />

        {/* Contributed Boards Section */}
        <BoardsSection
          boards={contributedBoards}
          searchQuery={searchQuery}
          setIsModalOpen={setIsModalOpen}
          handleDeleteBoard={handleDeleteBoard}
          title="Contributed Boards"
        />
      </div>

      <CreateBoardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        updateBoardList={updateBoardList}
      />

      <CustomUndoNotification
        dismissNotification={dismissNotification}
        handleUndoDelete={handleUndoDelete}
        showUndoNotification={showUndoNotification}
        recentlyDeleted={recentlyDeleted}
      />
    </div>
  );
};

export default BoardsList;
