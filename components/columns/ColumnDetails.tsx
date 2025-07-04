"use client";

import React, { useState } from "react";

import { MdAdd, MdViewWeek, MdFilterList } from "react-icons/md";
import { useSession } from "next-auth/react";

import { BoardTabs } from "@/lib/utils/board";
import { useBoardContext } from "@/context/BoardContext";
import { useColumnDropdown } from "@/hooks/board/column/useColumnDropdown";
import { useColumnTasks } from "@/hooks/board/column/useColumnTasks";

import TaskDetail from "../tasks/TaskDetail";
import AddTaskForm from "../tasks/AddTaskForm";
import TasksLoadingSkeleton from "./TasksLoadingSkeleton";
import Filter from "./Filter";

const ColumnDetails = () => {
  const [showModal, setShowModal] = useState(false);

  const { data } = useSession();

  const { activeColumn, activeTab, tabType, board } = useBoardContext();
  const {
    filterButtonRef,
    filterDropdownRef,
    showFilterDropdown,
    setShowFilterDropdown,
  } = useColumnDropdown();

  const { loading, tasks, updateTasks } = useColumnTasks();

  const isOwner = board.ownerId === data?.user?.id;
  const isEditor = board.members?.find(
    (member) => member.userId === data?.user?.id && member.role === "EDITOR"
  );

  const canAddTask = isOwner || isEditor;

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="lg:w-[90%] w-full">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-neutral-900">Board Tasks</h2>
        <div className="relative">
          <button
            ref={filterButtonRef}
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="p-2 border border-neutral-200 rounded-md text-sm text-neutral-700 bg-white hover:bg-neutral-50 flex items-center gap-1 cursor-pointer"
          >
            <MdFilterList className="text-neutral-600" size={16} />
            <span>Filters</span>
          </button>
          {showFilterDropdown && (
            <Filter filterDropdownRef={filterDropdownRef} />
          )}
        </div>
      </div>
      {activeTab && (
        <div className="grid grid-cols-1 gap-4">
          <div
            key={activeTab}
            className={`bg-gradient-to-b from-section-bg-start to-section-bg-end rounded-lg border border-neutral-200 p-5 `}
          >
            <h3 className="font-medium text-neutral-900 mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <MdViewWeek className="text-accent mr-2" size={20} />
                <span className="text-lg">
                  {tabType === "Kanban View" ? activeTab : activeColumn?.name}
                </span>
                {!loading && tasks.length > 0 && (
                  <span className="ml-3 text-xs bg-primary-glow text-primary py-1 px-3 rounded-full font-bold">
                    {tasks.length} tasks
                  </span>
                )}
              </div>
              {canAddTask && activeTab !== "Completed" && (
                <button
                  className="bg-primary text-white p-1.5 rounded-md hover:bg-primary-dark flex items-center gap-1 px-3 cursor-pointer"
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
              ) : tasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tasks.map((task) => (
                    <TaskDetail key={task.id} task={task} />
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

      {showModal && (
        <AddTaskForm
          isOpen={showModal}
          columnId={tabType === "Column View" ? activeColumn!.id : ""}
          updateTask={updateTasks}
          closeModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ColumnDetails;
