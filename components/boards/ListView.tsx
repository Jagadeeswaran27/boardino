import { getListViewTasks, updateTask } from "@/lib/services/boards";
import { useEffect, useRef, useState } from "react";
import { Task } from "@/types/board";
import Image from "next/image";
import Filter from "../columns/Filter";
import { MdAdd, MdFilterList } from "react-icons/md";
import TableSkeleton from "./TableSkeleton";
import { useBoardContext } from "@/context/BoardContext";
import { formatDate } from "@/lib/utils/date";
import { toast } from "react-toastify";
import AddTaskForm from "../tasks/AddTaskForm";

const ListView = () => {
  const [listViewTasks, setListViewTasks] = useState<Task[]>([]);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showLabelDropdown, setShowLabelDropdown] = useState<string | null>(
    null
  );
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState<
    string | null
  >(null);
  const filterDropdownRef = useRef<HTMLDivElement | null>(null);
  const labelDropdownRef = useRef<HTMLDivElement | null>(null);
  const assigneeDropdownRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLTableCellElement>(null);
  const assigneeRef = useRef<HTMLTableCellElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const [showModal, setShowModal] = useState(false);

  const updateTasks = (newTask: Task) => {
    setListViewTasks([...listViewTasks, newTask]);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const { columns, board } = useBoardContext();

  const users = board.members?.map((member) => member.user) || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showFilterDropdown &&
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setShowFilterDropdown(false);
      }

      if (
        showLabelDropdown &&
        labelDropdownRef.current &&
        !labelDropdownRef.current.contains(event.target as Node)
      ) {
        setShowLabelDropdown(null);
      }

      if (
        showAssigneeDropdown &&
        assigneeDropdownRef.current &&
        !assigneeDropdownRef.current.contains(event.target as Node)
      ) {
        setShowAssigneeDropdown(null);
      }
    };

    if (showFilterDropdown || showLabelDropdown || showAssigneeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilterDropdown, showLabelDropdown, showAssigneeDropdown]);

  const handleLabelClick = (taskId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setShowAssigneeDropdown(null);
    setShowLabelDropdown((prev) => (prev === taskId ? null : taskId));
  };

  const handleAssigneeClick = (taskId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setShowLabelDropdown(null);
    setShowAssigneeDropdown((prev) => (prev === taskId ? null : taskId));
  };

  const updateTaskColumn = async (taskId: string, columnId: string) => {
    const task = listViewTasks.find((task) => task.id === taskId);

    const updatedTask = {
      ...task,
      columnId: columnId,
      column: columns.find((column) => column.id === columnId) || null,
    } as Task;

    setListViewTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === taskId ? updatedTask : t))
    );
    const response = await updateTask(updatedTask);

    if (!response) {
      setListViewTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskId && task ? task : t))
      );
      toast.error("Failed to update task column");
      return;
    }
  };

  const updateTaskAssignee = async (taskId: string, userId: string | null) => {
    const task = listViewTasks.find((task) => task.id === taskId);
    const updatedTask = {
      ...task,
      assigneeId: userId,
      assignee: userId
        ? users.find((user) => user.id === userId) || null
        : null,
    } as Task;

    setListViewTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === taskId ? updatedTask : t))
    );
    const response = await updateTask(updatedTask);

    if (!response) {
      setListViewTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskId && updatedTask ? updatedTask : t))
      );
      toast.error("Failed to update task assignee");
      return;
    }
  };

  async function loadTasks(resetList = false) {
    setIsLoading(true);
    const cursor = resetList ? undefined : nextCursor;

    const { nextCursor: newCursor, tasks } = await getListViewTasks({
      cursor: cursor,
    });

    setListViewTasks((prevTasks) =>
      resetList ? tasks : [...prevTasks, ...tasks]
    );
    setNextCursor(newCursor);
    setIsLoading(false);
  }
  useEffect(() => {
    loadTasks(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading && listViewTasks.length === 0) {
    return (
      <div>
        <div className="relative mb-4 flex justify-end">
          <div className="p-2 border border-neutral-200 rounded-md w-20 h-9 bg-neutral-200 animate-pulse"></div>
        </div>
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div>
      <div className="relative mb-4 flex justify-between">
        <h2 className="text-xl font-semibold text-neutral-900">List View</h2>
        <div className="flex items-center gap-2">
          <button
            className="bg-primary text-white p-1.5 rounded-md hover:bg-primary-dark flex items-center px-3 cursor-pointer"
            onClick={handleOpenModal}
          >
            <MdAdd size={18} />
            <span className="text-sm">Add Task</span>
          </button>
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
      {listViewTasks.length === 0 ? (
        <div className="text-center py-10 bg-white p-4 rounded-lg shadow-md">
          <svg
            className="mx-auto h-12 w-12 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-neutral-900">
            No tasks
          </h3>
          <p className="mt-1 text-sm text-neutral-500">
            Get started by creating a new task.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white p-1 rounded-lg shadow-md">
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
                        ref={
                          showLabelDropdown === task.id ? labelRef : undefined
                        }
                        className="px-6 py-4 whitespace-nowrap hover:bg-neutral-100 transition-colors duration-150 cursor-pointer relative"
                        onClick={(e) => handleLabelClick(task.id, e)}
                      >
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-glow text-primary">
                          {task.column?.name || "N/A"}
                        </span>
                        {showLabelDropdown === task.id && (
                          <div
                            ref={labelDropdownRef}
                            className="absolute z-10 mt-2 bg-white rounded-md shadow-lg py-1 w-48 max-h-60 overflow-auto"
                            style={{ top: "100%", left: "0" }}
                          >
                            {columns.map((column) => (
                              <div
                                key={column.id}
                                className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                                onClick={() =>
                                  updateTaskColumn(task.id, column.id)
                                }
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
                          showAssigneeDropdown === task.id
                            ? assigneeRef
                            : undefined
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
                            className="absolute z-10 mt-2 bg-white rounded-md shadow-lg py-1 w-full max-h-60 overflow-auto"
                            style={{ top: "100%", left: "0" }}
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
                                onClick={() =>
                                  updateTaskAssignee(task.id, user.id)
                                }
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
                        {task.dueDate
                          ? formatDate(new Date(task.dueDate))
                          : "N/A"}
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
      )}
      {nextCursor && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => loadTasks(false)}
            disabled={isLoading}
            className="px-6 py-2 cursor-pointer border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light disabled:bg-neutral-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
      {showModal && (
        <AddTaskForm
          isOpen={showModal}
          columnId={""}
          updateTask={updateTasks}
          closeModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ListView;
