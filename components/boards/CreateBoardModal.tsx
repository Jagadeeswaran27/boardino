"use client";

import { useState } from "react";
import { Fragment } from "react";

import { FaTimes } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import { createBoard } from "@/lib/services/boards";
import { Board } from "@/types/board";

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  updateBoardList: (newBoard: Board) => void;
}

const CreateBoardModal = ({
  isOpen,
  onClose,
  updateBoardList,
}: CreateBoardModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ name: "", description: "" });
  const { data: session } = useSession();

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", description: "" };

    if (!name.trim()) {
      newErrors.name = "Board name is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (!session?.user?.id) return;
      const newBoard = await createBoard({
        name,
        description,
        ownerId: session.user.id,
      });
      if (!newBoard) {
        return;
      }
      updateBoardList(newBoard);
      setName("");
      setDescription("");
      onClose();
    } catch (error) {
      console.error("Failed to create board:", error);
      toast.error("Failed to create board. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                    Create a new board
                  </Dialog.Title>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-neutral-500 hover:text-neutral-700 focus:outline-none"
                  >
                    <FaTimes size={16} />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-neutral-700 mb-1"
                    >
                      Board name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                      placeholder="Enter board name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-neutral-700 mb-1"
                    >
                      Description (optional)
                    </label>
                    <textarea
                      id="description"
                      rows={3}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors resize-none"
                      placeholder="What's this board for?"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 border border-neutral-200 rounded-md text-neutral-700 hover:bg-neutral-50 transition-colors"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                          Creating...
                        </>
                      ) : (
                        "Create board"
                      )}
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

export default CreateBoardModal;
