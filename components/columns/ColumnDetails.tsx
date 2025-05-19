"use client";
import React, { useEffect, useState } from "react";
import { MdAdd, MdViewWeek } from "react-icons/md";
import TaskDetail from "../tasks/TaskDetail";
import { Task } from "@/types/board";
import AddTaskForm from "../tasks/AddTaskForm";
import { User } from "@/types/auth";
import { getTasks } from "@/lib/services/boards";
import { BoardTabs, getFilteredTasks, Tabs, TABS } from "@/lib/utils/board";
import TasksLoadingSkeleton from "./TasksLoadingSkeleton";

interface ColumnDetailsProps {
  activeTab: Tabs | string;
  columnName: string;
  isOwner: boolean;
  users: Omit<User, "hashedPassword" | "authenticationMethod">[];
  boardId: string;
}

const ColumnDetails = ({
  activeTab,
  columnName,
  isOwner,
  users,
  boardId,
}: ColumnDetailsProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleGetTasks = async () => {
      setLoading(true);
      const tasks = await getTasks(boardId);
      setTasks(tasks);
      setLoading(false);
    };
    handleGetTasks();
  }, [boardId]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const updateTasks = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const filteredTasks = getFilteredTasks(tasks, activeTab);

  return (
    <div className="lg:w-3/4 w-full">
      {activeTab && (
        <div className="grid grid-cols-1 gap-4">
          <div
            key={activeTab}
            className={`bg-gradient-to-b from-section-bg-start to-section-bg-end rounded-lg border border-neutral-200 p-5 `}
          >
            <h3 className="font-medium text-neutral-900 mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <MdViewWeek className="text-accent mr-2" size={20} />
                <span className="text-lg">{columnName}</span>
                {!loading && filteredTasks.length > 0 && (
                  <span className="ml-3 text-xs bg-primary-glow text-primary py-1 px-3 rounded-full font-bold">
                    {filteredTasks.length} tasks
                  </span>
                )}
              </div>
              {isOwner && activeTab !== BoardTabs.COMPLETED && (
                <button
                  className="bg-primary text-white p-1.5 rounded-md hover:bg-primary-dark flex items-center gap-1 px-3"
                  onClick={handleOpenModal}
                  disabled={loading}
                >
                  <MdAdd size={18} />
                  <span className="text-sm">Add Task</span>
                </button>
              )}
            </h3>

            <div className="max-h-[calc(100vh-220px)] overflow-y-auto pr-1 transition-opacity duration-300">
              {loading ? (
                <TasksLoadingSkeleton />
              ) : filteredTasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTasks.map((task) => (
                    <TaskDetail
                      key={task.id}
                      task={task}
                      assignee={users.find(
                        (user) => user.id === task.assigneeId
                      )}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-8 bg-white rounded-lg border border-dashed border-neutral-300 text-center shadow-sm">
                  <p className="text-neutral-700">
                    No tasks in this column yet
                  </p>
                  {isOwner && activeTab !== BoardTabs.COMPLETED && (
                    <button
                      className="mt-4 bg-primary-glow text-primary py-2 px-4 rounded-md flex items-center gap-1 mx-auto hover:bg-primary hover:text-white transition-colors"
                      onClick={handleOpenModal}
                    >
                      <MdAdd size={18} />
                      <span>Create first task</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding a new task */}
      {showModal && (
        <AddTaskForm
          closeModal={handleCloseModal}
          users={users}
          isOpen={showModal}
          boardId={boardId}
          columnId={TABS.includes(activeTab) ? null : activeTab}
          updateTask={updateTasks}
        />
      )}
    </div>
  );
};

export default ColumnDetails;
