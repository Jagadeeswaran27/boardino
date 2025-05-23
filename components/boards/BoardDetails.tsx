"use client";
import { IMAGES } from "@/constants/Images";
import { formatDate } from "@/lib/utils/date";
import { Board, Column } from "@/types/board";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  MdAdd,
  MdArrowBack,
  MdEdit,
  MdPeopleOutline,
  MdAccessTime,
  MdClose,
} from "react-icons/md";
import { HiOutlineViewBoards } from "react-icons/hi";
import { ROUTES } from "@/constants/routes";
import { toast } from "react-toastify";
import { createColumn } from "@/lib/services/boards";
import ColumnDetails from "../columns/ColumnDetails";
import { TABS, Tabs } from "@/lib/utils/board";
import InviteMembersModal from "./InviteMembersModal";

interface BoardDetailsProps {
  board: Board;
  columns: Column[];
}

const BoardDetails = ({ board, columns: initialColums }: BoardDetailsProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<Tabs | string>("In Progress");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [columns, setColumns] = useState<Column[]>(initialColums);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const userId = session?.user?.id;

  const isOwner =
    board.members?.find((m) => m.userId === userId)?.role === "OWNER";

  const handleAddColumn = async () => {
    if (newColumnTitle.trim() === "") {
      toast.error("Column title cannot be empty");
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const tempColumn = {
      boardId: board.id,
      id: tempId,
      name: newColumnTitle,
      createdAt: new Date(),
    };

    setColumns([...columns, tempColumn]);
    setNewColumnTitle("");
    setIsAddingColumn(false);

    const response = await createColumn(board.id, newColumnTitle);

    if (!response) {
      setColumns((cols) => cols.filter((col) => col.id !== tempId));
      toast.error("Failed to create column");
      return;
    }

    setColumns((cols) =>
      cols.map((col) => (col.id === tempId ? response : col))
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Board Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-[-5px] z-20">
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
                onClick={() => setIsInviteModalOpen(true)}
                className="btn-primary flex items-center gap-1"
              >
                <MdAdd size={18} />
                <span>Invite</span>
              </button>
            </div>
          </div>

          {/* Board Tabs */}
          <div className="flex border-b border-neutral-200">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 flex items-center gap-1 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <HiOutlineViewBoards size={18} />
                <span>{tab}</span>
              </button>
            ))}
            {columns.map((column) => (
              <button
                key={column.id}
                onClick={() => setActiveTab(column.id)}
                className={`px-4 py-2 flex items-center gap-1 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${
                  activeTab === column.id
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
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                  placeholder="Column name..."
                  className="px-2 py-1 text-sm border-b border-primary outline-none"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddColumn();
                    if (e.key === "Escape") setIsAddingColumn(false);
                  }}
                />
                <button
                  onClick={handleAddColumn}
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
                  className="px-4 py-2 flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-900 border-b-2 border-transparent -mb-px"
                >
                  <MdAdd size={18} />
                  <span>Add Column</span>
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Column Details */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex lg:flex-row flex-col gap-6">
          {/* Main Content Area */}
          <ColumnDetails
            activeTab={activeTab}
            columnName={
              TABS.includes(activeTab)
                ? activeTab
                : columns.find((c) => c.id === activeTab)!.name
            }
            isOwner={isOwner}
            users={board.members?.map((m) => m.user) || []}
            boardId={board.id}
          />

          {/* Sidebar with Board Info */}
          <div className="lg:w-1/4 w-full">
            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden sticky top-[140px]">
              {/* Board Stats */}
              <div className="p-4 border-b border-neutral-200">
                <h3 className="font-medium text-neutral-900 mb-3">
                  Board Info
                </h3>
                <div className="flex items-center text-sm text-neutral-500 mb-2">
                  <MdAccessTime className="mr-2" size={16} />
                  <span>Created {formatDate(new Date(board.createdAt))}</span>
                </div>
                <div className="flex items-center text-sm text-neutral-500 mb-3">
                  <MdPeopleOutline className="mr-2" size={16} />
                  <span>{board.members!.length} members</span>
                </div>

                <div className="pt-2 border-t border-neutral-100">
                  <h4 className="text-xs uppercase text-neutral-500 mb-2">
                    Owner
                  </h4>
                  <div className="flex items-center gap-2">
                    <Image
                      src={board.owner?.image || IMAGES.avatarPlaceholder}
                      alt={board.owner?.name || "Board Owner"}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="text-sm text-neutral-800 font-medium">
                      {board.owner?.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Members List */}
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-neutral-900">Members</h3>
                  <button
                    onClick={() => setIsInviteModalOpen(true)}
                    className="text-primary hover:text-primary-dark text-sm flex items-center gap-1"
                  >
                    <MdAdd size={16} />
                    <span>Invite</span>
                  </button>
                </div>

                <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1">
                  {board.members &&
                    board.members.map((member) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <Image
                          src={member.user.image || IMAGES.avatarPlaceholder}
                          alt={member.user.name || "Member"}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-neutral-800 truncate">
                            {member.user.name}
                            {member.userId === userId && (
                              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                You
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-neutral-500 truncate">
                            {member.user.email}
                          </p>
                        </div>
                        {member.role === "OWNER" && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            Owner
                          </span>
                        )}
                        {member.role === "EDITOR" && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            Editor
                          </span>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Members Modal */}
      {isInviteModalOpen && (
        <InviteMembersModal
          setIsInviteModalOpen={setIsInviteModalOpen}
          boardId={board.id}
          boardName={board.name}
          senderName={session!.user!.name!}
        />
      )}
    </div>
  );
};

export default BoardDetails;
