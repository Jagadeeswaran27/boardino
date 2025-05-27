"use client";
import { IMAGES } from "@/constants/Images";
import { useBoardContext } from "@/context/BoardContext";
import { formatDate } from "@/lib/utils/date";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { MdAccessTime, MdAdd, MdPeopleOutline } from "react-icons/md";

interface BoardInfoProps {
  setIsInviteModalOpen: (open: boolean) => void;
}
const BoardInfo = ({ setIsInviteModalOpen }: BoardInfoProps) => {
  const { board } = useBoardContext();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return (
    <div className="lg:w-1/4 w-full">
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden sticky top-[140px]">
        {/* Board Stats */}
        <div className="p-4 border-b border-neutral-200">
          <h3 className="font-medium text-neutral-900 mb-3">Board Info</h3>
          <div className="flex items-center text-sm text-neutral-500 mb-2">
            <MdAccessTime className="mr-2" size={16} />
            <span>Created {formatDate(new Date(board.createdAt))}</span>
          </div>
          <div className="flex items-center text-sm text-neutral-500 mb-3">
            <MdPeopleOutline className="mr-2" size={16} />
            <span>{board.members!.length} members</span>
          </div>

          <div className="pt-2 border-t border-neutral-100">
            <h4 className="text-xs uppercase text-neutral-500 mb-2">Owner</h4>
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
  );
};

export default BoardInfo;
