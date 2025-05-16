"use client";
import { Board } from "@/types/board";
import {
  MdMoreVert,
  MdPeopleOutline,
  MdAccessTime,
  MdArrowForward,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { User } from "@/types/auth";
import { getUsersInfoById } from "@/lib/services/auth";
import Image from "next/image";
import { IMAGES } from "@/constants/Images";
import { formatDate } from "@/lib/utils/date";
import { useSession } from "next-auth/react";

interface BoardCardProps {
  board: Board;
  deleteBoard: (boardId: string) => Promise<void>;
}

const BoardCard = ({ board, deleteBoard }: BoardCardProps) => {
  const [membersDetails, setMembersDetails] = useState<User[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data } = useSession();

  const isOwner = board.ownerId === data?.user?.id;
  useEffect(() => {
    const handleGetMembersDetails = async () => {
      const details = await getUsersInfoById(board.memberIds);
      setMembersDetails(details);
    };
    handleGetMembersDetails();
  }, [board.memberIds]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <motion.div
      whileHover={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.1 }}
      className="bg-white border border-neutral-200 rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden group relative"
    >
      <div className="h-3 bg-gradient-to-r from-primary to-accent"></div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-neutral-900 mb-1 truncate max-w-[80%] group-hover:text-primary transition-colors">
            {board.name}
          </h3>
          {isOwner && (
            <div className="flex items-center gap-2 relative" ref={dropdownRef}>
              <button
                className="text-neutral-400 hover:text-neutral-700 transition-colors p-1 rounded-full hover:bg-neutral-100"
                aria-label="Board options"
                onClick={toggleDropdown}
              >
                <MdMoreVert size={18} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white shadow-md rounded-md py-1 z-10 min-w-[120px] border border-neutral-200">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-left text-neutral-700 hover:bg-neutral-50">
                    <MdEdit className="mr-2" size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBoard(board.id)}
                    className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-neutral-50"
                  >
                    <MdDelete className="mr-2" size={16} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="text-neutral-700 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
          {board.description || "No description"}
        </p>

        <div className="flex items-center mb-3 text-xs text-neutral-500">
          <MdAccessTime className="mr-1" />
          <span>Created {formatDate(board.createdAt)}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {membersDetails.slice(0, 3).map((member, index) => (
                <Image
                  className="h-8 w-8 rounded-full"
                  key={index}
                  src={member.image || IMAGES.avatarPlaceholder}
                  alt={member.name || "User"}
                  width={32}
                  height={32}
                  priority
                />
              ))}
              {board.memberIds.length > 3 && (
                <div className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center border-2 border-white text-xs font-medium text-neutral-700">
                  +{board.memberIds.length - 3}
                </div>
              )}
            </div>
            <div className="ml-2 flex items-center text-neutral-500 text-xs">
              <MdPeopleOutline className="mr-1" />
              <span>{board.memberIds.length}</span>
            </div>
          </div>

          <button className="text-primary cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-sm font-medium">
            Open <MdArrowForward className="ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BoardCard;
