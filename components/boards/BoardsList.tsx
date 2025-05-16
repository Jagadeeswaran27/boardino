"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaUndo, FaTimes } from "react-icons/fa";

import CreateBoardModal from "@/components/boards/CreateBoardModal";
import { Board } from "@/types/board";
import BoardCard from "@/components/boards/BoardCard";
import { deleteBoard } from "@/lib/services/boards";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

interface BoardsListProps {
  boards: Board[];
}

const BoardsList = ({ boards: initialBoards }: BoardsListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boards, setBoards] = useState<Board[]>(initialBoards);
  const [recentlyDeleted, setRecentlyDeleted] = useState<{
    board: Board;
    index: number;
  } | null>(null);
  const [showUndoNotification, setShowUndoNotification] = useState(false);
  const [notificationTimer, setNotificationTimer] =
    useState<NodeJS.Timeout | null>(null);
  const { data } = useSession();

  const filteredBoards = boards.filter(
    (board) =>
      board.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      board.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ownedBoards = filteredBoards.filter(
    (board) => board.ownerId === data?.user?.id
  );

  const contributedBoards = filteredBoards.filter(
    (board) =>
      board.ownerId !== data?.user?.id &&
      board.memberIds.includes(data?.user?.id || "")
  );

  useEffect(() => {
    return () => {
      if (notificationTimer) {
        clearTimeout(notificationTimer);
      }
    };
  }, [notificationTimer]);

  const updateBoardList = (newBoard: Board) => {
    setBoards((prevBoards) => [newBoard, ...prevBoards]);
    setSearchQuery("");
  };

  const handleDeleteBoard = async (boardId: string) => {
    if (notificationTimer) {
      clearTimeout(notificationTimer);
      setNotificationTimer(null);
    }

    const boardToDelete = boards.find((board) => board.id === boardId);
    const boardIndex = boards.findIndex((board) => board.id === boardId);
    if (boardIndex === -1) return;
    if (!boardToDelete) return;

    setBoards((prevBoards) =>
      prevBoards.filter((board) => board.id !== boardId)
    );
    setRecentlyDeleted({
      board: boardToDelete,
      index: boardIndex,
    });
    setShowUndoNotification(true);

    const timer = setTimeout(async () => {
      const response = await deleteBoard(boardId);
      if (response) {
        setSearchQuery("");
      } else {
        toast.error("Failed to delete the board. Please try again.");
      }
      setShowUndoNotification(false);
      setRecentlyDeleted(null);
      setNotificationTimer(null);
    }, 5000);

    setNotificationTimer(timer);
  };

  const handleUndoDelete = async () => {
    if (recentlyDeleted) {
      setRecentlyDeleted(null);
      setShowUndoNotification(false);
      setBoards((prevBoards) => [
        ...prevBoards.slice(0, recentlyDeleted.index),
        recentlyDeleted.board,
        ...prevBoards.slice(recentlyDeleted.index),
      ]);

      if (notificationTimer) {
        clearTimeout(notificationTimer);
        setNotificationTimer(null);
      }
    }
  };

  const dismissNotification = () => {
    setShowUndoNotification(false);
    setRecentlyDeleted(null);

    if (notificationTimer) {
      clearTimeout(notificationTimer);
      setNotificationTimer(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen relative bg-pattern">
      {/* Content wrapper with higher z-index to appear above decorative elements */}
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Your Boards</h1>
            <p className="text-neutral-700 mt-1">
              Manage and organize your projects
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow sm:max-w-xs">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder="Search boards..."
                className="p-2 px-3 border border-neutral-200 rounded-md w-full  outline-none transition-colors bg-white/80 backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <FaPlus size={14} />
              <span>Create Board</span>
            </button>
          </div>
        </div>

        {/* Owned Boards Section */}
        <div className="board-section p-6 rounded-xl mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Your Boards
          </h2>
          {ownedBoards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ownedBoards.map((board) => (
                <BoardCard
                  deleteBoard={handleDeleteBoard}
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

        {/* Contributed Boards Section */}
        <div className="board-section p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Shared With You
          </h2>
          {contributedBoards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {contributedBoards.map((board) => (
                <BoardCard
                  deleteBoard={handleDeleteBoard}
                  key={board.id}
                  board={board}
                />
              ))}
            </div>
          ) : (
            <div className="bg-neutral-50/80 backdrop-blur-sm rounded-lg p-8 text-center border border-neutral-100">
              <p className="text-neutral-700">
                {searchQuery
                  ? "No shared boards matching your search"
                  : "No boards have been shared with you"}
              </p>
            </div>
          )}
        </div>
      </div>

      <CreateBoardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        updateBoardList={updateBoardList}
      />

      {/* Custom Undo Notification */}
      <div
        className={`fixed bottom-6 right-6 undo-notification ${
          showUndoNotification ? "show" : ""
        }`}
      >
        <div className="flex items-center justify-between bg-white rounded-lg shadow-[0_4px_24px_0_rgba(0,0,0,0.15)] p-4 border-l-4 border-primary w-80">
          <div className="flex-1">
            <p className="font-medium text-neutral-900">Board deleted</p>
            <p className="text-sm text-neutral-700 truncate">
              {recentlyDeleted?.board.name || "Board"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleUndoDelete}
              className="undo-button flex items-center gap-1 text-primary hover:text-primary-dark"
              aria-label="Undo delete"
            >
              <FaUndo size={14} />
              <span>Undo</span>
            </button>
            <button
              onClick={dismissNotification}
              className="text-neutral-500 hover:text-neutral-700"
              aria-label="Dismiss notification"
            >
              <FaTimes size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardsList;
