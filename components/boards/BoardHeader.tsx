import { useRouter } from "next/navigation";
import React, { useRef } from "react";

import { useSession } from "next-auth/react";
import { HiOutlineViewBoards } from "react-icons/hi";
import {
  IoGridOutline,
  IoListOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { MdAdd, MdArrowBack, MdClose, MdEdit } from "react-icons/md";
import { TbLayoutKanban } from "react-icons/tb";
import { toast } from "react-toastify";

import { ROUTES } from "@/constants/routes";
import { useBoardContext } from "@/context/BoardContext";
import { updateBoardName } from "@/lib/services/boards";
import { TABS } from "@/lib/utils/board";

interface BoardHeaderProps {
  isAddingColumn: boolean;
  setIsInviteModalOpen: (open: boolean) => void;
  setIsAddingColumn: (open: boolean) => void;
  handleAddColumn: (newColumnName: string) => void;
  setIsViewDrawerOpen: (open: boolean) => void;
  handleEditBoardName?: (newName: string) => void;
}

const BoardHeader = ({
  isAddingColumn,
  setIsInviteModalOpen,
  setIsAddingColumn,
  handleAddColumn,
  setIsViewDrawerOpen,
}: BoardHeaderProps) => {
  const router = useRouter();
  const newColumnInputRef = useRef<HTMLInputElement>(null);
  const editBoardNameInputRef = useRef<HTMLInputElement>(null);

  const {
    activeColumn,
    activeTab,
    board,
    columns,
    tabType,
    modifyBoardName,
    setActiveColumn,
    setActiveTab,
  } = useBoardContext();

  const { data } = useSession();

  const isOwner = board.ownerId === data?.user?.id;
  const isEditor = board.members?.find(
    (member) => member.userId === data?.user?.id && member.role === "EDITOR"
  );

  const [isEditingBoardName, setIsEditingBoardName] = React.useState(false);

  const canAddColumn = isOwner || isEditor;

  const handleSaveBoardName = async () => {
    const newName = editBoardNameInputRef.current?.value?.trim();
    if (newName && newName !== board.name) {
      modifyBoardName(newName);
      setIsEditingBoardName(false);
      const response = await updateBoardName(board.id, newName);
      if (!response) {
        setIsEditingBoardName(true);
        toast.error("Failed to update board name");
        console.error("Failed to update board name");
      }
    }
  };

  return (
    <div
      className={`bg-white border-b border-neutral-200 ${tabType !== "List View" ? "sticky top-[-5px] z-20" : ""}`}
    >
      <div className="container mx-auto py-4 max-w-[90%]">
        <div className="flex items-center gap-2 md:gap-3 mb-4">
          <button
            onClick={() => router.push(ROUTES.boards)}
            className="text-neutral-500 hover:text-neutral-700 p-1 md:p-2 rounded-full hover:bg-neutral-100 transition-colors flex-shrink-0"
            aria-label="Go back to boards"
          >
            <MdArrowBack size={18} className="md:w-5 md:h-5" />
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              {isEditingBoardName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    ref={editBoardNameInputRef}
                    defaultValue={board.name}
                    className="text-lg md:text-2xl font-bold text-neutral-900 bg-transparent border-b border-primary outline-none w-full"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveBoardName();
                      if (e.key === "Escape") setIsEditingBoardName(false);
                    }}
                    onBlur={handleSaveBoardName}
                  />
                  <button
                    onClick={handleSaveBoardName}
                    className="text-primary hover:text-primary-dark p-1 rounded-full hover:bg-neutral-100 flex-shrink-0"
                  >
                    <MdAdd size={16} className="md:w-[18px] md:h-[18px]" />
                  </button>
                  <button
                    onClick={() => setIsEditingBoardName(false)}
                    className="text-neutral-500 hover:text-neutral-700 p-1 rounded-full hover:bg-neutral-100 flex-shrink-0"
                  >
                    <MdClose size={16} className="md:w-[18px] md:h-[18px]" />
                  </button>
                </div>
              ) : (
                <>
                  <h1 className="text-lg md:text-2xl font-bold text-neutral-900 truncate">
                    {board.name}
                  </h1>
                  {isOwner && (
                    <button
                      onClick={() => setIsEditingBoardName(true)}
                      className="text-neutral-500 hover:text-neutral-700 p-1 rounded-full hover:bg-neutral-100 cursor-pointer flex-shrink-0"
                    >
                      <MdEdit size={16} className="md:w-[18px] md:h-[18px]" />
                    </button>
                  )}
                </>
              )}
            </div>
            <p className="text-neutral-600 text-xs md:text-sm truncate">
              {board.description}
            </p>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            {/* View Drawer Button */}
            <button
              onClick={() => setIsViewDrawerOpen(true)}
              className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 text-xs md:text-sm font-medium bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 shadow-sm transition-colors cursor-pointer"
            >
              {tabType === "Column View" && (
                <IoGridOutline size={16} className="md:w-[18px] md:h-[18px]" />
              )}
              {tabType === "Kanban View" && (
                <TbLayoutKanban size={16} className="md:w-[18px] md:h-[18px]" />
              )}
              {tabType === "List View" && (
                <IoListOutline size={16} className="md:w-[18px] md:h-[18px]" />
              )}
              <span className="hidden sm:inline">{tabType}</span>
              <span className="sm:hidden">{tabType.split(" ")[0]}</span>
              <IoSettingsOutline
                size={14}
                className="md:w-4 md:h-4 text-neutral-500"
              />
            </button>
            {isOwner && (
              <button
                onClick={() => setIsInviteModalOpen(true)}
                className="btn-primary flex items-center gap-1 px-2 md:px-3 py-2 text-xs md:text-sm"
              >
                <MdAdd size={16} className="md:w-[18px] md:h-[18px]" />
                <span className="hidden sm:inline">Invite</span>
              </button>
            )}
          </div>
        </div>

        {/* Board Tabs */}
        <div
          className={`flex ${tabType !== "List View" ? "border-b border-neutral-200" : ""} overflow-x-auto scrollbar-hide gap-1 md:gap-0`}
        >
          {tabType === "Kanban View" &&
            TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 md:px-4 py-2 flex items-center gap-1 text-xs md:text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap cursor-pointer flex-shrink-0 min-w-fit ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <HiOutlineViewBoards
                  size={16}
                  className="md:w-[18px] md:h-[18px]"
                />
                <span className="hidden sm:inline">{tab}</span>
                <span className="sm:hidden">{tab.split(" ")[0]}</span>
              </button>
            ))}
          {tabType === "Column View" && (
            <>
              {columns.map((column) => (
                <button
                  key={column.id}
                  onClick={() => setActiveColumn(column)}
                  className={`px-3 md:px-4 py-2 flex items-center gap-1 text-xs md:text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap cursor-pointer flex-shrink-0 max-w-[120px] md:max-w-none ${
                    activeColumn?.id === column.id
                      ? "border-primary text-primary"
                      : "border-transparent text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  <HiOutlineViewBoards
                    size={16}
                    className="md:w-[18px] md:h-[18px] flex-shrink-0"
                  />
                  <span className="truncate">{column.name}</span>
                </button>
              ))}

              {/* Add Column Button */}
              {isAddingColumn ? (
                <div className="flex items-center border-b-2 border-transparent -mb-px px-2 flex-shrink-0">
                  <input
                    type="text"
                    ref={newColumnInputRef}
                    placeholder="Column name..."
                    className="px-2 py-1 text-xs md:text-sm border-b border-primary outline-none w-24 md:w-auto"
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
                    <MdAdd size={16} className="md:w-[18px] md:h-[18px]" />
                  </button>
                  <button
                    onClick={() => setIsAddingColumn(false)}
                    className="p-1 text-neutral-500 hover:text-neutral-700"
                  >
                    <MdClose size={16} className="md:w-[18px] md:h-[18px]" />
                  </button>
                </div>
              ) : (
                canAddColumn && (
                  <button
                    onClick={() => setIsAddingColumn(true)}
                    className="px-3 md:px-4 py-2 flex items-center gap-1 text-xs md:text-sm font-medium text-neutral-600 hover:text-neutral-900 border-b-2 border-transparent -mb-px cursor-pointer flex-shrink-0"
                  >
                    <MdAdd size={16} className="md:w-[18px] md:h-[18px]" />
                    <span className="hidden sm:inline">Add Column</span>
                    <span className="sm:hidden">Add</span>
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
