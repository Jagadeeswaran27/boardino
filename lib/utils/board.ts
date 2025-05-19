import { Task } from "@/types/board";

export type Tabs = "In Progress" | "Completed";
export const TABS: string[] = ["In Progress", "Completed"];
export enum BoardTabs {
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

export const getFilteredTasks = (t: Task[], activeTab: string) => {
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
