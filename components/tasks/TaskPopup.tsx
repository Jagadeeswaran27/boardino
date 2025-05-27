import { IMAGES } from "@/constants/Images";
import { useBoardContext } from "@/context/BoardContext";
import { Task } from "@/types/board";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment, useState } from "react"; // Add useState
import { MdAccessTime, MdCalendarToday, MdClose, MdEdit } from "react-icons/md";
import { toast } from "react-toastify"; // Add this import

interface TaskPopupProps {
  task: Task;
  closeModal: () => void;
  isDueSoon: boolean | null;
  isPastDue: boolean | null;
  isOpen: boolean;
}
const TaskPopup = ({
  task,
  closeModal,
  isDueSoon,
  isPastDue,
  isOpen,
}: TaskPopupProps) => {
  const [isAddingDueDate, setIsAddingDueDate] = useState(false);
  const [newDueDate, setNewDueDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { columns } = useBoardContext();

  const columnName = columns.find(
    (column) => column.id === task.columnId
  )?.name;

  const handleAddDueDate = async () => {
    if (!newDueDate) {
      toast.error("Please select a due date");
      return;
    }

    setIsSubmitting(true);
    // try {
    //   // Call API to update the task with the new due date
    //   const success = await updateTaskDueDate(task.id, newDueDate);

    //   if (success) {
    //     // Update local task state
    //     const updatedTask = { ...task, dueDate: newDueDate };
    //     if (onTaskUpdated) {
    //       onTaskUpdated(updatedTask);
    //     }
    //     toast.success("Due date added successfully");
    //     setIsAddingDueDate(false);
    //   } else {
    //     toast.error("Failed to add due date");
    //   }
    // } catch (error) {
    //   toast.error("An error occurred while adding due date");
    // } finally {
    // }
    setIsSubmitting(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-900/50" />
        </Transition.Child>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative scrollbar-hide">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900">
                {task.name}
              </h3>
              <button
                onClick={closeModal}
                className="text-neutral-500 hover:text-neutral-700 cursor-pointer focus:outline-none"
                aria-label="Close task details"
              >
                <MdClose size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-5">
              {/* Column Name / Status */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-neutral-700 w-24">
                  Label:
                </span>
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  {columnName}
                </span>
              </div>

              {/* Assignee */}
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-neutral-700 w-24">
                    Assignee:
                  </span>
                  <div className="flex items-center gap-2 text-sm text-neutral-800 bg-neutral-50 p-1.5 px-2.5 rounded-md">
                    <Image
                      src={task.assignee?.image || IMAGES.avatarPlaceholder}
                      alt={task.assignee?.name || "User"}
                      width={22}
                      height={22}
                      className="rounded-full"
                    />
                    <span className="font-medium">
                      {task.assignee?.name || "Unassigned"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-3">
                {task.createdAt && (
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-neutral-700 w-24">
                      Created:
                    </span>
                    <div className="flex items-center gap-2 text-sm text-neutral-700 bg-neutral-50 p-1.5 px-2.5 rounded-md">
                      <MdCalendarToday className="text-primary" size={16} />
                      <span>
                        {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}

                {task.dueDate ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-neutral-700 w-24">
                      Due Date:
                    </span>
                    <div
                      className={`flex items-center gap-2 text-sm ${isDueSoon ? "text-yellow-700 bg-red-50" : isPastDue ? "text-white bg-red-500" : "text-neutral-700 bg-neutral-50"} p-1.5 px-2.5 rounded-md`}
                    >
                      <MdAccessTime
                        className={
                          isDueSoon
                            ? "text-yellow-700"
                            : isPastDue
                              ? "text-white"
                              : "text-secondary"
                        }
                        size={16}
                      />
                      <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-neutral-700 w-24">
                      Due Date:
                    </span>
                    {isAddingDueDate ? (
                      <div className="flex flex-col w-[50%] space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="date"
                            value={newDueDate}
                            onChange={(e) => setNewDueDate(e.target.value)}
                            className="border border-neutral-300 rounded-md px-3 py-1.5 text-sm w-full"
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleAddDueDate}
                            disabled={isSubmitting}
                            className="bg-primary text-white text-sm px-3 py-1 rounded-md hover:bg-primary-dark transition-colors"
                          >
                            {isSubmitting ? "Adding..." : "Add Due Date"}
                          </button>
                          <button
                            onClick={() => setIsAddingDueDate(false)}
                            className="text-neutral-700 text-sm px-3 py-1 rounded-md hover:bg-neutral-100 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsAddingDueDate(true)}
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary-dark border border-dashed border-primary rounded-md py-1 px-2.5 transition-colors cursor-pointer"
                      >
                        <MdEdit size={16} />
                        <span>Add due date</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Description */}
              {task.description && (
                <div>
                  <h5 className="text-sm font-medium text-neutral-700 mb-1.5">
                    Description:
                  </h5>
                  <div
                    className="mb-3 flex items-start gap-2 bg-subtle-accent p-2 rounded-md"
                    dangerouslySetInnerHTML={{ __html: task.description }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TaskPopup;
