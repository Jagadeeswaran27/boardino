"use client";

import { User } from "@/types/auth";
import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaTimes } from "react-icons/fa";
import { addTask } from "@/lib/services/boards";
import { toast } from "react-toastify";
import { Task } from "@/types/board";

interface AddTaskFormProps {
  closeModal: () => void;
  users: Omit<User, "hashedPassword" | "authenticationMethod">[];
  isOpen: boolean;
  boardId: string;
  columnId: string | null;
  updateTask: (task: Task) => void;
}
const AddTaskForm = ({
  closeModal,
  users,
  isOpen,
  boardId,
  columnId,
  updateTask,
}: AddTaskFormProps) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    assigneeId: "",
    dueDate: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    dueDate: "",
  });

  const [loading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!form.name.trim()) {
      newErrors.name = "Task name is required";
      valid = false;
    }

    if (!form.description.trim()) {
      newErrors.description = "Description should be at least 5 characters";
      valid = false;
    }

    if (!form.dueDate) {
      newErrors.dueDate = "Due date is required";
      valid = false;
    } else {
      const selectedDate = new Date(form.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.dueDate = "Due date cannot be in the past";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsLoading(true);
    const taskData = {
      name: form.name,
      description: form.description,
      columnId,
      assigneeId: form.assigneeId === "" ? null : form.assigneeId,
      dueDate: new Date(form.dueDate),
      boardId,
    };
    const addedTaskId = await addTask(taskData);

    if (!addedTaskId) {
      toast.error("Failed to add task");
      return;
    }
    updateTask({
      ...taskData,
      id: addedTaskId,
      createdAt: new Date(),
    });
    setIsLoading(false);
    closeModal();
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

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-neutral-900"
                  >
                    Add New Task
                  </Dialog.Title>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-neutral-500 hover:text-neutral-700 focus:outline-none"
                  >
                    <FaTimes size={16} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={`w-full border ${errors.name ? "border-red-500" : "border-neutral-300"} rounded-md px-3 py-2`}
                      placeholder="Task name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="description"
                    >
                      Description<span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className={`w-full border ${errors.description ? "border-red-500" : "border-neutral-300"} rounded-md px-3 py-2`}
                      placeholder="Task description"
                      rows={3}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.description}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="assigneeId"
                    >
                      Assignee
                    </label>
                    <select
                      id="assigneeId"
                      name="assigneeId"
                      value={form.assigneeId}
                      onChange={handleChange}
                      className="w-full border border-neutral-300 rounded-md px-3 py-2"
                    >
                      <option value="">Unassigned</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="dueDate"
                    >
                      Due Date<span className="text-red-500">*</span>
                    </label>
                    <input
                      id="dueDate"
                      name="dueDate"
                      type="date"
                      value={form.dueDate}
                      onChange={handleChange}
                      className={`w-full border ${errors.dueDate ? "border-red-500" : "border-neutral-300"} rounded-md px-3 py-2`}
                    />
                    {errors.dueDate && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.dueDate}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-md bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary"
                    >
                      {loading ? "Adding..." : "Add Task"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddTaskForm;
