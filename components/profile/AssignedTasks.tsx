import { FiClock } from "react-icons/fi";

import { TAB } from "@/lib/utils/board";
import { UserWithAllDetails } from "@/types/auth";

interface AssignedTasksProps {
  userInfo: UserWithAllDetails;
}

const getStatusColor = (status: TAB) => {
  switch (status) {
    case "In Progress":
      return "bg-blue-500 text-white";
    case "To Do":
      return "bg-gray-400 text-white";
    case "Completed":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-400 text-white";
  }
};

const getStatus = (dueDate?: Date): TAB => {
  if (!dueDate) return "To Do";

  const now = new Date();
  if (dueDate < now) return "In Progress";

  return "Completed";
};

const AssignedTasks = ({ userInfo }: AssignedTasksProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">My Tasks</h2>
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 card-shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold text-neutral-900">
                  Task
                </th>
                <th className="text-left p-4 font-semibold text-neutral-900">
                  Board
                </th>
                <th className="text-left p-4 font-semibold text-neutral-900">
                  Due Date
                </th>
                <th className="text-left p-4 font-semibold text-neutral-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {userInfo.assignedTasks?.map((task, index) => (
                <tr
                  key={task.id}
                  className={`border-b hover:bg-neutral-50 ${
                    index === (userInfo.assignedTasks?.length ?? 0) - 1
                      ? "border-b-0"
                      : ""
                  }`}
                >
                  <td className="p-4">
                    <div className="font-medium text-neutral-900">
                      {task.name}
                    </div>
                  </td>
                  <td className="p-4 text-neutral-600">{task.board?.name}</td>
                  <td className="p-4 text-neutral-600 flex items-center gap-1">
                    <FiClock className="w-4 h-4" />
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                        getStatus(task.dueDate || undefined)
                      )}`}
                    >
                      {getStatus(task.dueDate || undefined)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignedTasks;
