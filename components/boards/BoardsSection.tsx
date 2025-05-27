"use client";

import { Board } from "@/types/board";
import BoardCard from "./BoardCard";
import { FaPlus } from "react-icons/fa";

interface BoardsSectionProps {
  boards: Board[];
  searchQuery: string;
  setIsModalOpen: (isOpen: boolean) => void;
  handleDeleteBoard: (boardId: string) => Promise<void>;
  title: string;
}
const BoardsSection = ({
  boards,
  searchQuery,
  setIsModalOpen,
  handleDeleteBoard,
  title,
}: BoardsSectionProps) => {
  return (
    <div className="board-section p-6 rounded-xl mb-8">
      <h2 className="text-xl font-semibold text-neutral-900 mb-4">{title}</h2>
      {boards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {boards.map((board) => (
            <BoardCard
              deleteBoard={() => handleDeleteBoard(board.id)}
              key={board.id}
              board={board}
            />
          ))}
        </div>
      ) : (
        <div className="bg-neutral-50/80 backdrop-blur-sm rounded-lg p-8 text-center border border-neutral-100">
          <p className="text-neutral-700">
            {searchQuery
              ? "No owned boards matching your search"
              : "You haven't created any boards yet"}
          </p>
          {!searchQuery && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 inline-flex items-center text-primary hover:underline"
            >
              <FaPlus size={12} className="mr-1" /> Create your first board
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BoardsSection;
