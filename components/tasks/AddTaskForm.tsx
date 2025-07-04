"use client";

import { useState, useEffect } from "react";
import { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Link from "@tiptap/extension-link";
import { FaTimes } from "react-icons/fa";

import { addTask } from "@/lib/services/boards";
import { Task } from "@/types/board";
import RichTextDescription from "./RichTextDescription";
import { useBoardContext } from "@/context/BoardContext";

interface AddTaskFormProps {
  isOpen: boolean;
  columnId: string | null;
  updateTask: (task: Task) => void;
  closeModal: () => void;
}

type DescriptionType = "text" | "rich-text";
const AddTaskForm = ({
  isOpen,
  columnId,
  updateTask,
  closeModal,
}: AddTaskFormProps) => {
  const { columns, tabType, board, activeTab } = useBoardContext();
  const [form, setForm] = useState({
    name: "",
    description: "",
    assigneeId: "",
    dueDate: "",
    columnId: columns[0]?.id,
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });

  const [loading, setIsLoading] = useState(false);
  const [descriptionType, setDescriptionType] =
    useState<DescriptionType>("text");

  const users = board.members?.map((member) => member.user) || [];

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {},
        orderedList: {},
      }),
      BulletList.configure({
        keepMarks: true,
        keepAttributes: false,
      }),
      ListItem,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "text-blue-500 underline cursor-pointer",
          rel: "noopener noreferrer nofollow",
          target: "_blank",
        },
      }),
    ],
    content: form.description || "<p></p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setForm((prevForm) => ({ ...prevForm, description: html }));
      if (errors.description) {
        setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
      }
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[100px] p-2 border border-neutral-300 rounded-b-md",
      },
    },
  });

  useEffect(() => {
    if (editor && isOpen) {
      editor.commands.setContent(form.description || "<p></p>");
    }
  }, [isOpen, editor, form.description]);

  useEffect(() => {
    if (editor && descriptionType === "rich-text") {
      const content = form.description || "<p></p>";
      if (editor.getHTML() !== content) {
        editor.commands.setContent(content);
      }
    }
  }, [descriptionType, form.description, editor]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (
      errors[e.target.name as keyof typeof errors] &&
      e.target.name !== "description"
    ) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", description: "" };

    if (!form.name.trim()) {
      newErrors.name = "Task name is required";
      valid = false;
    }

    if (descriptionType === "rich-text") {
      if (!editor || editor.getText().trim().length < 5) {
        newErrors.description = "Description should be at least 5 characters";
        valid = false;
      }
    } else {
      if (form.description.trim().length < 5) {
        newErrors.description = "Description should be at least 5 characters";
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
      columnId:
        tabType === "Kanban View" || tabType === "List View"
          ? form.columnId
          : columnId,
      assigneeId: form.assigneeId === "" ? null : form.assigneeId,
      dueDate: form.dueDate.trim().length > 0 ? form.dueDate : null,
      boardId: board.id,
    } as Task;
    const addedTask = await addTask(taskData);

    if (!addedTask) {
      toast.error("Failed to add task");
      return;
    }

    updateTask(addedTask);
    setIsLoading(false);
    closeModal();
  };

  const canDueDateShown =
    (tabType === "Kanban View" && activeTab !== "To Do") ||
    tabType === "Column View" ||
    tabType === "List View";

  // Toggle function for description type
  const toggleDescriptionType = (type: DescriptionType) => {
    if (type === descriptionType) return;

    // Convert content when switching modes
    if (type === "rich-text" && editor) {
      // Plain text to rich text - wrap in paragraph tags if needed
      const textContent = form.description.trim();
      if (textContent && !textContent.startsWith("<")) {
        const htmlContent = `<p>${textContent.replace(/\n/g, "</p><p>")}</p>`;
        editor.commands.setContent(htmlContent);
        setForm((prev) => ({ ...prev, description: htmlContent }));
      }
    } else if (type === "text" && editor) {
      // Rich text to plain text - extract just the text content
      const plainText = editor.getText();
      setForm((prev) => ({ ...prev, description: plainText }));
    }

    setDescriptionType(type);
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
                      className={`w-full border ${
                        errors.name ? "border-red-500" : "border-neutral-300"
                      } rounded-md px-3 py-2`}
                      placeholder="Task name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                  {tabType !== "Kanban View" && (
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="columnId"
                      >
                        Select Label(Column)
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="columnId"
                        name="columnId"
                        value={form.columnId}
                        onChange={handleChange}
                        className="w-full border border-neutral-300 rounded-md px-3 py-2"
                      >
                        {columns.map((column) => (
                          <option key={column.id} value={column.id}>
                            {column.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label
                        className="block text-sm font-medium"
                        htmlFor="description"
                      >
                        Description<span className="text-red-500">*</span>
                      </label>
                      <div className="flex rounded-md overflow-hidden border border-neutral-300">
                        <button
                          type="button"
                          onClick={() => toggleDescriptionType("text")}
                          className={`px-3 py-1 text-xs font-medium cursor-pointer ${
                            descriptionType === "text"
                              ? "bg-primary text-white"
                              : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                          }`}
                        >
                          Plain Text
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleDescriptionType("rich-text")}
                          className={`px-3 py-1 text-xs font-medium cursor-pointer ${
                            descriptionType === "rich-text"
                              ? "bg-primary text-white"
                              : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                          }`}
                        >
                          Rich Text
                        </button>
                      </div>
                    </div>

                    {descriptionType === "rich-text" ? (
                      <>
                        <RichTextDescription editor={editor} />
                        <EditorContent editor={editor} />
                      </>
                    ) : (
                      <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className={`w-full border ${
                          errors.description
                            ? "border-red-500"
                            : "border-neutral-300"
                        } rounded-md px-3 py-2 min-h-[150px]`}
                        placeholder="Enter task description"
                      />
                    )}

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
                  {canDueDateShown && (
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="dueDate"
                      >
                        Due Date
                      </label>
                      <input
                        id="dueDate"
                        name="dueDate"
                        type="date"
                        value={form.dueDate}
                        onChange={handleChange}
                        className={`w-full border border-neutral-300 rounded-md px-3 py-2`}
                      />
                    </div>
                  )}
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
