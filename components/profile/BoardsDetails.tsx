import Link from "next/link";

import { FiCalendar, FiCheckSquare, FiPlus, FiUsers } from "react-icons/fi";

import { ROUTES } from "@/constants/routes";
import { UserWithAllDetails } from "@/types/auth";

interface BoardsDetailsProps {
  userInfo: UserWithAllDetails;
}
const BoardsDetails = ({ userInfo }: BoardsDetailsProps) => {
  const newBoardUrl = new URLSearchParams({
    ref: "create-board",
  });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
      {/* Created Boards */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-neutral-900">My Boards</h2>
          <Link
            href={`${ROUTES.boards}?${newBoardUrl.toString()}`}
            className="flex items-center gap-2 px-4 py-[6px] text-sm bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            New Board
          </Link>
        </div>
        <div className="space-y-4">
          {userInfo.boardsOwned && userInfo.boardsOwned.length > 0 ? (
            userInfo.boardsOwned.map((board) => (
              <div
                key={board.id}
                className="bg-white rounded-lg shadow-sm border border-neutral-200 card-shadow hover:card-shadow-hover cursor-pointer"
              >
                <Link href={`${ROUTES.boards}/${board.id}`}>
                  <div className="p-6">
                    <h3 className="font-semibold text-neutral-900 mb-2">
                      {board.name}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-4">
                      {board.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-neutral-500">
                      <div className="flex items-center gap-1">
                        <FiUsers className="w-4 h-4" />
                        {board.members?.length} members
                      </div>
                      <div className="flex items-center gap-1">
                        <FiCheckSquare className="w-4 h-4" />
                        {board.tasks?.length} tasks
                      </div>
                      <div className="flex items-center gap-1">
                        <FiCalendar className="w-4 h-4" />
                        {new Date(board.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="bg-white p-8 text-center h-full">
              <div className="text-neutral-400 mb-4">
                <FiCheckSquare className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                No boards created yet
              </h3>
              <p className="text-neutral-600 mb-4">
                Start organizing your projects by creating your first board.
              </p>
              <Link
                href={`${ROUTES.boards}?${newBoardUrl.toString()}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                <FiPlus className="w-4 h-4" />
                Create Your First Board
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Contributing Boards */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">
          Contributing To
        </h2>
        <div className="space-y-4">
          {userInfo.boardMemberships && userInfo.boardMemberships.length > 0 ? (
            userInfo.boardMemberships.map((membership) => (
              <div
                key={membership.id}
                className="bg-white rounded-lg shadow-sm border border-neutral-200 card-shadow hover:card-shadow-hover cursor-pointer"
              >
                <Link href={`${ROUTES.boards}/${membership.board.id}`}>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-neutral-900">
                        {membership.board.name}
                      </h3>
                      <span className="px-2 py-1 bg-secondary text-white text-xs rounded-full">
                        {membership.role}
                      </span>
                    </div>
                    <p className="text-neutral-600 text-sm mb-4">
                      {membership.board.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-neutral-500 flex-wrap">
                      <span>Owner: {membership.board.owner?.name}</span>
                      <div className="flex items-center gap-1">
                        <FiCheckSquare className="w-4 h-4" />
                        {membership.board.tasks?.length} tasks
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="bg-white p-8 text-center">
              <div className="text-neutral-400 mb-4">
                <FiUsers className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                Not contributing to any boards
              </h3>
              <p className="text-neutral-600">
                You&apos;ll see boards here when someone invites you to
                collaborate on their projects.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardsDetails;
