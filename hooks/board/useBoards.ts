import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { deleteBoard } from "@/lib/services/boards";
import { toast } from "react-toastify";
import { Board } from "@/types/board";

export const useBoards = (initialBoards: Board[]) => {
  const [boards, setBoards] = useState<Board[]>(initialBoards);
  const [recentlyDeleted, setRecentlyDeleted] = useState<{
    board: Board;
    index: number;
  } | null>(null);
  const [showUndoNotification, setShowUndoNotification] = useState(false);
  const [notificationTimer, setNotificationTimer] =
    useState<NodeJS.Timeout | null>(null);
  const { data } = useSession();

  useEffect(() => {
    return () => {
      if (notificationTimer) {
        clearTimeout(notificationTimer);
      }
    };
  }, [notificationTimer]);

  const updateBoardList = useCallback((newBoard: Board) => {
    setBoards((prevBoards) => [newBoard, ...prevBoards]);
  }, []);

  const handleDeleteBoard = useCallback(
    async (boardId: string) => {
      if (notificationTimer) {
        clearTimeout(notificationTimer);
        setNotificationTimer(null);
      }

      const boardToDelete = boards.find((board) => board.id === boardId);
      const boardIndex = boards.findIndex((board) => board.id === boardId);
      if (boardIndex === -1 || !boardToDelete) return;

      setBoards((prevBoards) =>
        prevBoards.filter((board) => board.id !== boardId)
      );
      setRecentlyDeleted({ board: boardToDelete, index: boardIndex });
      setShowUndoNotification(true);

      const timer = setTimeout(async () => {
        const response = await deleteBoard(boardId);
        if (!response) {
          toast.error("Failed to delete the board. Please try again.");
        }
        setShowUndoNotification(false);
        setRecentlyDeleted(null);
        setNotificationTimer(null);
      }, 3000);

      setNotificationTimer(timer);
    },
    [boards, notificationTimer]
  );

  const handleUndoDelete = useCallback(() => {
    if (recentlyDeleted && notificationTimer) {
      setBoards((prevBoards) => [
        ...prevBoards.slice(0, recentlyDeleted.index),
        recentlyDeleted.board,
        ...prevBoards.slice(recentlyDeleted.index),
      ]);

      clearTimeout(notificationTimer);
      setNotificationTimer(null);
      setRecentlyDeleted(null);
      setShowUndoNotification(false);
    }
  }, [recentlyDeleted, notificationTimer]);

  const dismissNotification = useCallback(() => {
    if (notificationTimer) {
      clearTimeout(notificationTimer);
      setNotificationTimer(null);
    }
    setShowUndoNotification(false);
    setRecentlyDeleted(null);
  }, [notificationTimer]);

  const getFilteredBoards = (searchQuery: string) => {
    return boards.filter(
      (board) =>
        board.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        board.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getOwnedBoards = (filteredBoards: Board[]) => {
    return filteredBoards.filter((board) => board.ownerId === data?.user?.id);
  };

  const getContributedBoards = (filteredBoards: Board[]) => {
    return filteredBoards.filter(
      (board) =>
        board.ownerId !== data?.user?.id &&
        board.members?.some((member) => member.userId === data?.user?.id)
    );
  };

  return {
    boards,
    recentlyDeleted,
    showUndoNotification,
    updateBoardList,
    handleDeleteBoard,
    handleUndoDelete,
    dismissNotification,
    getFilteredBoards,
    getOwnedBoards,
    getContributedBoards,
  };
};
