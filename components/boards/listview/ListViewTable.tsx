import { useBoardContext } from "@/context/BoardContext";
import { formatDate } from "@/lib/utils/date";
import { Task } from "@/types/board";
import Image from "next/image";
import React from "react";

interface ListViewTableProps {
  listViewTasks: Task[];
  showLabelDropdown: string | null;
  labelRef: React.RefObject<HTMLTableCellElement | null>;
  assigneeRef: React.RefObject<HTMLTableCellElement | null>;
  labelDropdownRef: React.RefObject<HTMLDivElement | null>;
  dropdownPosition: "top" | "bottom";
  assigneeDropdownRef: React.RefObject<HTMLDivElement | null>;
  showAssigneeDropdown: string | null;
  tableContainerRef: React.RefObject<HTMLDivElement | null>;
  handleLabelClick: (id: string, event: React.MouseEvent) => void;
  updateTaskColumn: (taskId: string, columnId: string) => void;
  updateTaskAssignee: (taskId: string, userId: string | null) => void;
  handleAssigneeClick: (id: string, event: React.MouseEvent) => void;
}

const ListViewTable = ({
  listViewTasks,
  showLabelDropdown,
  labelRef,
  labelDropdownRef,
  dropdownPosition,
  showAssigneeDropdown,
  assigneeRef,
  assigneeDropdownRef,
  tableContainerRef,
  updateTaskColumn,
  updateTaskAssignee,
  handleAssigneeClick,
  handleLabelClick,
}: ListViewTableProps) => {
  const { columns, board } = useBoardContext();
  const users = board.members?.map((member) => member.user) || [];

  return (
    <div
      className="overflow-x-auto bg-white p-1 rounded-lg shadow-md"
      ref={tableContainerRef}
    >
      <div className="align-middle inline-block min-w-full">
        <div className="shadow overflow-hidden border-b border-neutral-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider"
                >
                  Task Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider"
                >
                  Label
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider"
                >
                  Assignee
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider"
                >
                  Due Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider"
                >
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {listViewTasks.map((task) => (
                <tr key={task.id}>
                  <td className="px-6 py-4 whitespace-nowrap ">
                    <div className="text-sm font-medium text-neutral-900">
                      {task.name}
                    </div>
                    {task.description && (
                      <div
                        className="text-xs text-neutral-500 truncate max-w-xs"
                        dangerouslySetInnerHTML={{
                          __html: task.description,
                        }}
                      />
                    )}
                  </td>
                  <td
                    ref={showLabelDropdown === task.id ? labelRef : undefined}
                    className="px-6 py-4 whitespace-nowrap hover:bg-neutral-100 transition-colors duration-150 cursor-pointer relative"
                    onClick={(e) => handleLabelClick(task.id, e)}
                  >
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-glow text-primary">
                      {task.column?.name || "N/A"}
                    </span>
                    {showLabelDropdown === task.id && (
                      <div
                        ref={labelDropdownRef}
                        className="absolute z-10 bg-white rounded-md shadow-lg py-1 w-48 max-h-60 overflow-auto"
                        style={{
                          [dropdownPosition === "top" ? "bottom" : "top"]:
                            "100%",
                          left: "0",
                        }}
                      >
                        {columns.map((column) => (
                          <div
                            key={column.id}
                            className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                            onClick={() => updateTaskColumn(task.id, column.id)}
                          >
                            <div className="flex items-center">
                              <span className="ml-2">{column.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                  <td
                    ref={
                      showAssigneeDropdown === task.id ? assigneeRef : undefined
                    }
                    className="px-6 py-4 whitespace-nowrap hover:bg-neutral-100 transition-colors duration-150 cursor-pointer relative"
                    onClick={(e) => handleAssigneeClick(task.id, e)}
                  >
                    <div className="flex items-center">
                      {task.assignee ? (
                        <>
                          {task.assignee.image ? (
                            <div className="flex-shrink-0 h-8 w-8">
                              <Image
                                src={task.assignee.image}
                                alt={task.assignee.name || "Assignee"}
                                width={32}
                                height={32}
                                className="rounded-full"
                              />
                            </div>
                          ) : (
                            <div className="flex-shrink-0 h-8 w-8 bg-neutral-200 rounded-full flex items-center justify-center text-neutral-500 text-xs font-semibold">
                              {task.assignee.name?.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="ml-3">
                            <div className="text-sm font-medium text-neutral-900">
                              {task.assignee.name}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-sm text-neutral-500">
                          Unassigned
                        </div>
                      )}
                    </div>
                    {showAssigneeDropdown === task.id && (
                      <div
                        ref={assigneeDropdownRef}
                        className="absolute z-10 bg-white rounded-md shadow-lg py-1 w-full max-h-60 overflow-auto"
                        style={{
                          [dropdownPosition === "top" ? "bottom" : "top"]:
                            "100%",
                          left: "0",
                        }}
                      >
                        <div
                          className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                          onClick={() => updateTaskAssignee(task.id, null)}
                        >
                          <div className="flex items-center">
                            <span className="ml-2">Unassigned</span>
                          </div>
                        </div>
                        {users.map((user) => (
                          <div
                            key={user.id}
                            className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                            onClick={() => updateTaskAssignee(task.id, user.id)}
                          >
                            <div className="flex items-center">
                              {user.image ? (
                                <Image
                                  src={user.image}
                                  alt={user.name || "User"}
                                  width={24}
                                  height={24}
                                  className="rounded-full"
                                />
                              ) : (
                                <div className="h-6 w-6 bg-neutral-200 rounded-full flex items-center justify-center text-neutral-500 text-xs font-semibold">
                                  {user.name?.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <span className="ml-2">{user.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 ">
                    {task.dueDate ? formatDate(new Date(task.dueDate)) : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 ">
                    {formatDate(new Date(task.createdAt))}
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

export default ListViewTable;
