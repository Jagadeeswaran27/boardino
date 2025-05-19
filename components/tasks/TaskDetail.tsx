import { Task } from "@/types/board";
import { User } from "@/types/auth";
import React from "react";
import { MdAccessTime, MdCalendarToday, MdDescription } from "react-icons/md";
import Image from "next/image";
import { IMAGES } from "@/constants/Images";

interface TaskDetailProps {
  task: Task;
  assignee?: Omit<User, "hashedPassword" | "authenticationMethod">;
}

const TaskDetail = ({ task, assignee }: TaskDetailProps) => {
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
  return (
    <div className="p-4 bg-white rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors cursor-pointer card-shadow flex flex-col h-full">
      {/* Color indicator at top of card */}
      <div className="h-1 w-full bg-gradient-to-r from-primary to-accent rounded-t-lg -mt-4 mb-3"></div>

      <h4 className="font-medium text-neutral-900 text-base mb-2">
        {task.name}
      </h4>

      {task.description && (
        <div className="mb-3 flex items-start gap-2 bg-subtle-accent p-2 rounded-md">
          <MdDescription className="text-accent mt-0.5" size={14} />
          <p className="text-neutral-700 text-xs line-clamp-2">
            {task.description}
          </p>
        </div>
      )}

      <div className="mt-auto pt-2 space-y-2 border-t border-neutral-100">
        {task.createdAt && (
          <div className="flex items-center gap-2 text-xs text-neutral-600 bg-neutral-50 p-1.5 pl-2 rounded-md">
            <MdCalendarToday className="text-primary" size={14} />
            <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        )}

        {task.dueDate && (
          <div
            className={`flex items-center gap-2 text-xs ${isDueSoon ? "text-yellow-700 bg-red-50" : isPastDue ? "text-white bg-red-500" : "text-neutral-600 bg-neutral-50"} p-1.5 pl-2 rounded-md`}
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
            src={assignee?.image || IMAGES.avatarPlaceholder}
            alt={assignee?.name || "User"}
            width={20}
            height={20}
            className="rounded-full"
          />

          <span className="font-medium">{assignee?.name || "Unassigned"}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
