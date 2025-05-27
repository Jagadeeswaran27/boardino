"use client";
import { FaPlus, FaSearch } from "react-icons/fa";

interface BoardsHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}
const BoardsHeader = ({
  searchQuery,
  setSearchQuery,
  setIsModalOpen,
}: BoardsHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Boards</h1>
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
  );
};

export default BoardsHeader;
