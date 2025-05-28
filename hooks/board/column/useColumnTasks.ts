import { useState, useEffect } from "react";
import { Task } from "@/types/board";
import { getTasks } from "@/lib/services/boards";
import { useBoardContext } from "@/context/BoardContext";

export function useColumnTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [originalTasks, setOriginalTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { activeColumn, activeTab, tabType, board, filter } = useBoardContext();

  // Load tasks when dependencies change
  useEffect(() => {
    const handleGetTasks = async () => {
      setLoading(true);
      const tasks = await getTasks(
        board.id,
        tabType,
        activeColumn ? activeColumn.id : "",
        activeTab
      );
      setTasks(tasks);
      setOriginalTasks(tasks);
      setLoading(false);
    };
    handleGetTasks();
  }, [board.id, tabType, activeColumn, activeTab]);

  // Apply filters when filter changes
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const applyFilters = () => {
    const filteredTasks = originalTasks.filter((task) => {
      const matchesUser =
        !filter.userId ||
        (filter.userId === "unassigned" && task.assigneeId === null) ||
        task.assigneeId === filter.userId;
      const matchesColumn =
        !filter.columnId || task.columnId === filter.columnId;
      const matchesCreatedDate =
        !filter.createdDate ||
        (filter.createdDate.from &&
          new Date(task.createdAt) >= filter.createdDate.from &&
          filter.createdDate.to &&
          new Date(task.createdAt) <= filter.createdDate.to);
      const matchesDueDate =
        !filter.dueDate ||
        (filter.dueDate.from &&
          new Date(task.dueDate!) >= filter.dueDate.from &&
          filter.dueDate.to &&
          new Date(task.dueDate!) <= filter.dueDate.to);

      return (
        matchesUser && matchesColumn && matchesCreatedDate && matchesDueDate
      );
    });

    setTasks(filteredTasks);
  };

  const updateTasks = (newTask: Task) => {
    if (tabType === "Column View" && newTask.dueDate !== null) {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setOriginalTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };

  return {
    tasks,
    originalTasks,
    loading,
    updateTasks,
  };
}
