"use client";
import CreateBoardModal from "./CreateBoardModal";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { deleteBoard } from "@/lib/services/boards";
import { toast } from "react-toastify";
import { Board } from "@/types/board";
import BoardsHeader from "./BoardsHeader";
import BoardsSection from "./BoardsSection";
import CustomUndoNotification from "./CustomUndoNotification";

const BoardsList = ({ initialBoards }: { initialBoards: Board[] }) => {
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
      board.members?.some((member) => member.userId === data?.user?.id)
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
    }, 3000);

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
