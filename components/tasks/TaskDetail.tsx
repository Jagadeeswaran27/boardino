import { useState } from "react";
import Image from "next/image";

import { MdAccessTime, MdCalendarToday } from "react-icons/md";

import { Task } from "@/types/board";
import { IMAGES } from "@/constants/Images";
import { useBoardContext } from "@/context/BoardContext";

import TaskPopup from "./TaskPopup";
interface TaskDetailProps {
  task: Task;
}

const TaskDetail = ({ task }: TaskDetailProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { columns } = useBoardContext();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const normalizeDay = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const now = new Date();
  const today = normalizeDay(now);
  const dueDate = task.dueDate ? normalizeDay(new Date(task.dueDate)) : null;

  const isPastDue = dueDate && dueDate < today;
  const isDueSoon =
    dueDate &&
    dueDate >= today &&
    (dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24) < 2;

  const columnName = columns.find(
    (column) => column.id === task.columnId
  )?.name;

  return (
    <>
      <div
        onClick={openModal}
        className="p-4 bg-white rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors cursor-pointer card-shadow flex flex-col h-full"
      >
        {/* Color indicator at top of card */}
        <div className="h-1 w-full bg-gradient-to-r from-primary to-accent rounded-t-lg -mt-4 mb-3"></div>

        <h4 className="font-medium text-neutral-900 text-base mb-2">
          {task.name}
        </h4>

        <div className="inline-flex items-center rounded-md bg-blue-50 mb-2 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
          {columnName}
        </div>

        {task.description && (
          <div className="mb-3 bg-subtle-accent p-2 rounded-md relative overflow-hidden">
            <div
              className="prose prose-sm line-clamp-2 text-sm"
              dangerouslySetInnerHTML={{ __html: task.description }}
            />
          </div>
        )}

        <div className="mt-auto pt-2 space-y-2 border-t border-neutral-100">
          {task.createdAt && (
            <div className="flex items-center gap-2 text-xs text-neutral-600 bg-neutral-50 p-1.5 pl-2 rounded-md">
              <MdCalendarToday className="text-primary" size={14} />
              <span>
                Created {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          )}

          {task.dueDate && (
            <div
              className={`flex items-center gap-2 text-xs ${isDueSoon ? "text-yellow-700 bg-red-50" : isPastDue ? "text-white bg-red-400" : "text-neutral-600 bg-neutral-50"} p-1.5 pl-2 rounded-md`}
            >
              <MdAccessTime
                className={
                  isDueSoon
                    ? "text-yellow-700"
                    : isPastDue
                      ? "text-white"
                      : "text-secondary"
                }
                size={14}
              />
              <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-neutral-600 bg-neutral-50 p-1.5 pl-2 rounded-md">
            <Image
              src={task.assignee?.image || IMAGES.avatarPlaceholder}
              alt={task.assignee?.name || "User"}
              width={20}
              height={20}
              className="rounded-full"
            />

            <span className="font-medium">
              {task.assignee?.name || "Unassigned"}
            </span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TaskPopup
          task={task}
          isDueSoon={isDueSoon}
          isPastDue={isPastDue}
          isOpen={isModalOpen}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default TaskDetail;
