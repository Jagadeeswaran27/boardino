"use client";
import React, { useState } from "react";
import { MdAdd, MdViewWeek } from "react-icons/md";
import TaskDetail from "../tasks/TaskDetail";
import { Tabs } from "../boards/BoardDetails";
import { Task } from "@/types/board";
import AddTaskForm from "../tasks/AddTaskForm";

interface ColumnDetailsProps {
  activeTab: Tabs | string;
  columnName: string;
}
const getFilteredTasks = (t: Task[], activeTab: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  switch (activeTab) {
    case "In Progress":
      return t.filter((task) => {
        if (!task.dueDate) return true;
        const due = new Date(task.dueDate);
        due.setHours(0, 0, 0, 0);
        return due >= today;
      });

    case "Completed":
      return t.filter((task) => {
        if (!task.dueDate) return false;
        const due = new Date(task.dueDate);
        due.setHours(0, 0, 0, 0);
        return due < today;
      });

    default:
      return t.filter((task) => {
        if (!task.columnId) return false;
        return task.columnId === activeTab;
      });
  }
};

const t = [
  {
    columnId: "cmas9ctgi00010d0vpxz3ci4w",
    createdAt: new Date(),
    description:
      "This is a sample task with a longer description to show how the card handles more text content.",
    dueDate: new Date(),
    id: "task1",
    name: "Task 1",
    assigneeId: "cmarxm5gs0000yy0vklmvbev9",
    boardId: "cmarxmxdq0002yy0ve2geu0dj",
  },
  {
    createdAt: new Date(Date.now() - 86400000),
    description: "Research user behavior and preferences",
    dueDate: new Date(Date.now() - 86400000), // yesterday
    id: "task2",
    name: "Task 2",
    assigneeId: "cmarxm5gs0000yy0vklmvbev9",
    boardId: "cmarxmxdq0002yy0ve2geu0dj",
  },
  {
    // Due in the future (in 2 days)
    createdAt: new Date(Date.now() - 172800000),
    description: "Implement new authentication flow",
    dueDate: new Date(Date.now() + 2 * 86400000), // in 2 days
    id: "task3",
    name: "Task 3",
    assigneeId: "cmarxm5gs0000yy0vklmvbev9",
    boardId: "cmarxmxdq0002yy0ve2geu0dj",
  },
  {
    // No due date
    columnId: "cmas9ctgi00010d0vpxz3ci4w",
    createdAt: new Date(Date.now() - 172800000),
    description: "Implement new authentication flow",
    dueDate: new Date(), // no due date
    id: "task4",
    name: "Task 4",
    assigneeId: "cmarxm5gs0000yy0vklmvbev9",
    boardId: "cmarxmxdq0002yy0ve2geu0dj",
  },
  {
    columnId: "cmas9ctgi00010d0vpxz3ci4w",
    createdAt: new Date(),
    description:
      "This is a sample task with a longer description to show how the card handles more text content.",
    dueDate: new Date(),
    id: "task5",
    name: "Task 5",
    assigneeId: "cmarxm5gs0000yy0vklmvbev9",
    boardId: "cmarxmxdq0002yy0ve2geu0dj",
  },
];
const users = [
  {
    id: "cmarxm5gs0000yy0vklmvbev9",
    name: "John Doe",
    email: "john@example.com",
    image:
      "https://ui-avatars.com/api/?name=John+Doe&background=0052cc&color=fff",
  },
];
const ColumnDetails = ({ activeTab, columnName }: ColumnDetailsProps) => {
  const [tasks, setTasks] = useState(t);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
                {filteredTasks.length > 0 && (
                  <span className="ml-3 text-xs bg-primary-glow text-primary py-1 px-3 rounded-full font-bold">
                    {filteredTasks.length} tasks
                  </span>
                )}
              </div>
              <button
                className="bg-primary text-white p-1.5 rounded-md hover:bg-primary-dark flex items-center gap-1 px-3"
                onClick={handleOpenModal}
              >
                <MdAdd size={18} />
                <span className="text-sm">Add Task</span>
              </button>
            </h3>

            <div className="max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
              {filteredTasks.length > 0 ? (
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
                  <p className="text-neutral-700 mb-2">
                    No tasks in this column yet
                  </p>
                  <button
                    className="mt-2 bg-primary-glow text-primary py-2 px-4 rounded-md flex items-center gap-1 mx-auto hover:bg-primary hover:text-white transition-colors"
                    onClick={handleOpenModal}
                  >
                    <MdAdd size={18} />
                    <span>Create first task</span>
                  </button>
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
        />
      )}
    </div>
  );
};

export default ColumnDetails;
