import Filter from "@/components/columns/Filter";
import { useBoardContext } from "@/context/BoardContext";
import { useSession } from "next-auth/react";
import React from "react";
import { MdAdd, MdFilterList } from "react-icons/md";

interface ListViewHeaderProps {
  showFilterDropdown: boolean;
  filterDropdownRef: React.RefObject<HTMLDivElement | null>;
  filterButtonRef: React.RefObject<HTMLButtonElement | null>;
  handleOpenModal: () => void;
  setShowFilterDropdown: (value: boolean) => void;
}

const ListViewHeader: React.FC<ListViewHeaderProps> = ({
  handleOpenModal,
  showFilterDropdown,
  setShowFilterDropdown,
  filterDropdownRef,
  filterButtonRef,
}) => {
  const { board } = useBoardContext();
  const { data } = useSession();

  const isOwner = board.ownerId === data?.user?.id;
  const isEditor = board.members?.find(
    (member) => member.userId === data?.user?.id && member.role === "EDITOR"
  );

  const canAddTask = isOwner || isEditor;
  return (
    <div className="relative mb-4 flex justify-between">
      <h2 className="text-xl font-semibold text-neutral-900">List View</h2>
      <div className="flex items-center gap-2">
        {canAddTask && (
          <button
            className="bg-primary text-white p-1.5 rounded-md hover:bg-primary-dark flex items-center px-3 cursor-pointer"
            onClick={handleOpenModal}
          >
            <MdAdd size={18} />
            <span className="text-sm">Add Task</span>
          </button>
        )}
        <button
          ref={filterButtonRef}
          onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          className="p-2 border border-neutral-200 rounded-md text-sm text-neutral-700 bg-white hover:bg-neutral-50 flex items-center gap-1 cursor-pointer"
        >
          <MdFilterList className="text-neutral-600" size={16} />
          <span>Filters</span>
        </button>
        {showFilterDropdown && (
          <div className="absolute right-0 top-full mt-1 z-10">
            <Filter filterDropdownRef={filterDropdownRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListViewHeader;
