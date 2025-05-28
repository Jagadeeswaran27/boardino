import { Task } from "@/types/board";

export type TAB = "To Do" | "In Progress" | "Completed";
export const TABS: TAB[] = ["To Do", "In Progress", "Completed"];
export type TAB_TYPE = "Column View" | "Kanban View" | "List View";
export const TAB_TYPES: TAB_TYPE[] = [
  "Column View",
  "Kanban View",
  "List View",
];
export enum BoardTabs {
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

export type Filter = {
  userId: string;
  columnId: string;
  createdDate: {
    from: Date;
    to: Date;
  } | null;
  dueDate: {
    from: Date;
    to: Date;
  } | null;
};
export const getKanbanFilteredTasks = (t: Task[], activeTab: string) => {
  if (t.length === 0) return [];
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

export type PaginatedListViewTasks = {
  tasks: Task[];
  nextCursor: string | undefined;
};
