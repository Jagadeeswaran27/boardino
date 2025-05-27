import { ROUTES } from "@/constants/routes";
import { useBoardContext } from "@/context/BoardContext";
import { TABS } from "@/lib/utils/board";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { HiOutlineViewBoards } from "react-icons/hi";
import {
  IoGridOutline,
  IoListOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { MdAdd, MdArrowBack, MdClose, MdEdit } from "react-icons/md";
import { TbLayoutKanban } from "react-icons/tb";

interface BoardHeaderProps {
  isOwner: boolean;
  isAddingColumn: boolean;
  setIsInviteModalOpen: (open: boolean) => void;
  setIsAddingColumn: (open: boolean) => void;
  handleAddColumn: (newColumnName: string) => void;
  setIsViewDrawerOpen: (open: boolean) => void;
}

const BoardHeader = ({
  isOwner,
  isAddingColumn,
  setIsInviteModalOpen,
  setIsAddingColumn,
  handleAddColumn,
  setIsViewDrawerOpen,
}: BoardHeaderProps) => {
  const router = useRouter();
  const newColumnInputRef = useRef<HTMLInputElement>(null);

  const {
    activeColumn,
    setActiveColumn,
    activeTab,
    setActiveTab,
    board,
    columns,
    tabType,
  } = useBoardContext();

  return (
    <div
      className={`bg-white border-b border-neutral-200 ${tabType !== "List View" ? "sticky top-[-5px] z-20" : ""}`}
    >
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => router.push(ROUTES.boards)}
            className="text-neutral-500 hover:text-neutral-700 p-2 rounded-full hover:bg-neutral-100 transition-colors"
            aria-label="Go back to boards"
          >
            <MdArrowBack size={20} />
          </button>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900">
                {board.name}
              </h1>
              {isOwner && (
                <button className="text-neutral-500 hover:text-neutral-700 p-1 rounded-full hover:bg-neutral-100">
                  <MdEdit size={18} />
                </button>
              )}
            </div>
            <p className="text-neutral-600 text-sm">{board.description}</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Invite Members Button */}
            <button
              onClick={() => setIsViewDrawerOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 shadow-sm transition-colors cursor-pointer"
            >
              {tabType === "Column View" && <IoGridOutline size={18} />}
              {tabType === "Kanban View" && <TbLayoutKanban size={18} />}
              {tabType === "List View" && <IoListOutline size={18} />}
              <span>{tabType}</span>
              <IoSettingsOutline size={16} className="text-neutral-500" />
            </button>
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="btn-primary flex items-center gap-1"
            >
              <MdAdd size={18} />
              <span>Invite</span>
            </button>
          </div>
        </div>

        {/* Board Tabs */}
        <div
          className={`flex ${tabType !== "List View" ? "border-b border-neutral-200" : ""} overflow-x-auto scrollbar-hide`}
        >
          {tabType === "Kanban View" &&
            TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 flex items-center gap-1 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap cursor-pointer ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <HiOutlineViewBoards size={18} />
                <span>{tab}</span>
              </button>
            ))}
          {tabType === "Column View" && (
            <>
              {columns.map((column) => (
                <button
                  key={column.id}
                  onClick={() => setActiveColumn(column)}
                  className={`px-4 py-2 flex items-center gap-1 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap cursor-pointer ${
                    activeColumn?.id === column.id
                      ? "border-primary text-primary"
                      : "border-transparent text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  <HiOutlineViewBoards size={18} />
                  <span>{column.name}</span>
                </button>
              ))}

              {/* Add Column Button */}
              {isAddingColumn ? (
                <div className="flex items-center border-b-2 border-transparent -mb-px px-2">
                  <input
                    type="text"
                    ref={newColumnInputRef}
                    placeholder="Column name..."
                    className="px-2 py-1 text-sm border-b border-primary outline-none"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter")
                        handleAddColumn(newColumnInputRef.current?.value || "");
                      if (e.key === "Escape") setIsAddingColumn(false);
                    }}
                  />
                  <button
                    onClick={() =>
                      handleAddColumn(newColumnInputRef.current?.value || "")
                    }
                    className="p-1 text-primary hover:text-primary-dark"
                  >
                    <MdAdd size={18} />
                  </button>
                  <button
                    onClick={() => setIsAddingColumn(false)}
                    className="p-1 text-neutral-500 hover:text-neutral-700"
                  >
                    <MdClose size={18} />
                  </button>
                </div>
              ) : (
                isOwner && (
                  <button
                    onClick={() => setIsAddingColumn(true)}
                    className="px-4 py-2 flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-900 border-b-2 border-transparent -mb-px cursor-pointer"
                  >
                    <MdAdd size={18} />
                    <span>Add Column</span>
                  </button>
                )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardHeader;
