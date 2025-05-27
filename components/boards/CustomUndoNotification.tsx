"use client";

import { Board } from "@/types/board";
import { FaTimes, FaUndo } from "react-icons/fa";

interface CustomUndoNotificationProps {
  showUndoNotification: boolean;
  handleUndoDelete: () => void;
  recentlyDeleted: { board: Board; index: number } | null;
  dismissNotification: () => void;
}

const CustomUndoNotification = ({
  showUndoNotification,
  handleUndoDelete,
  recentlyDeleted,
  dismissNotification,
}: CustomUndoNotificationProps) => {
  return (
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
  );
};

export default CustomUndoNotification;
