import { useState } from "react";

import { useListViewTaskManagement } from "@/hooks/board/listview/useListViewTaskManagement";
import { useListViewDropdown } from "@/hooks/board/listview/useListViewDropdown";

import TableSkeleton from "../TableSkeleton";
import AddTaskForm from "../../tasks/AddTaskForm";
import ListViewTable from "./ListViewTable";
import ListViewHeader from "./ListViewHeader";

const ListView = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    isLoading,
    listViewTasks,
    nextCursor,
    loadTasks,
    updateTaskAssignee,
    updateTaskColumn,
    updateTasks,
  } = useListViewTaskManagement();

  const {
    showFilterDropdown,
    filterDropdownRef,
    filterButtonRef,
    showLabelDropdown,
    labelDropdownRef,
    labelRef,
    showAssigneeDropdown,
    assigneeDropdownRef,
    assigneeRef,
    dropdownPosition,
    tableContainerRef,
    handleAssigneeClick,
    handleLabelClick,
    setShowFilterDropdown,
  } = useListViewDropdown();

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

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
    <div className="lg:w-[90%] w-full">
      <ListViewHeader
        showFilterDropdown={showFilterDropdown}
        filterDropdownRef={filterDropdownRef}
        filterButtonRef={filterButtonRef}
        handleOpenModal={handleOpenModal}
        setShowFilterDropdown={setShowFilterDropdown}
      />
      {listViewTasks.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-br from-section-bg-start to-section-bg-end rounded-xl shadow-sm border border-neutral-100">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <div className="mx-auto h-20 w-20 bg-subtle-accent rounded-full flex items-center justify-center mb-4">
                <svg
                  className="h-10 w-10 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              No tasks yet
            </h3>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              Your task list is empty. Create your first task to get started
              with organizing your work.
            </p>
            <button
              onClick={handleOpenModal}
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark cursor-pointer"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Your First Task
            </button>
          </div>
        </div>
      ) : (
        <ListViewTable
          listViewTasks={listViewTasks}
          showLabelDropdown={showLabelDropdown}
          labelRef={labelRef}
          assigneeRef={assigneeRef}
          labelDropdownRef={labelDropdownRef}
          dropdownPosition={dropdownPosition}
          assigneeDropdownRef={assigneeDropdownRef}
          showAssigneeDropdown={showAssigneeDropdown}
          tableContainerRef={tableContainerRef}
          handleLabelClick={handleLabelClick}
          updateTaskColumn={updateTaskColumn}
          updateTaskAssignee={updateTaskAssignee}
          handleAssigneeClick={handleAssigneeClick}
        />
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
