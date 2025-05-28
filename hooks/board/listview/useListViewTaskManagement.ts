import { useState, useEffect, useCallback } from "react";
import { Task } from "@/types/board";
import { getListViewTasks, updateTask } from "@/lib/services/boards";
import { toast } from "react-toastify";
import { useBoardContext } from "@/context/BoardContext";

export function useListViewTaskManagement() {
  const [listViewTasks, setListViewTasks] = useState<Task[]>([]);
  const [originalTasks, setOriginalTasks] = useState<Task[]>([]);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const { columns, filter, board } = useBoardContext();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const users = board.members?.map((member) => member.user) || [];

  const updateTasks = useCallback((newTask: Task) => {
    setListViewTasks((prevTasks) => [...prevTasks, newTask]);
    setOriginalTasks((prevTasks) => [...prevTasks, newTask]);
  }, []);

  const updateTaskAssignee = useCallback(
    async (taskId: string, userId: string | null) => {
      const task = listViewTasks.find((task) => task.id === taskId);
      const updatedTask = {
        ...task,
        assigneeId: userId,
        assignee: userId
          ? users.find((user) => user.id === userId) || null
          : null,
      } as Task;

      setListViewTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskId ? updatedTask : t))
      );
      const response = await updateTask(updatedTask);

      if (!response) {
        setListViewTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === taskId && updatedTask ? updatedTask : t
          )
        );
        toast.error("Failed to update task assignee");
      }
    },
    [listViewTasks, users]
  );

  const updateTaskColumn = useCallback(
    async (taskId: string, columnId: string) => {
      const task = listViewTasks.find((task) => task.id === taskId);

      const updatedTask = {
        ...task,
        columnId: columnId,
        column: columns.find((column) => column.id === columnId) || null,
      } as Task;

      setListViewTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskId ? updatedTask : t))
      );
      setOriginalTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskId ? updatedTask : t))
      );
      const response = await updateTask(updatedTask);

      if (!response) {
        setListViewTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === taskId && task ? task : t))
        );
        setOriginalTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === taskId && task ? task : t))
        );
        toast.error("Failed to update task column");
      }
    },
    [columns, listViewTasks]
  );

  const applyFilters = useCallback(() => {
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

    setListViewTasks(filteredTasks);
  }, [filter, originalTasks]);

  const loadTasks = useCallback(
    async (resetList = false) => {
      setIsLoading(true);
      const cursor = resetList ? undefined : nextCursor;

      const { nextCursor: newCursor, tasks } = await getListViewTasks({
        cursor: cursor,
        boardId: board.id,
      });

      setListViewTasks((prevTasks) =>
        resetList ? tasks : [...prevTasks, ...tasks]
      );
      setOriginalTasks((prevTasks) =>
        resetList ? tasks : [...prevTasks, ...tasks]
      );
      setNextCursor(newCursor);
      setIsLoading(false);
    },
    [nextCursor, board.id]
  );

  useEffect(() => {
    loadTasks(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return {
    listViewTasks,
    originalTasks,
    nextCursor,
    isLoading,
    updateTasks,
    updateTaskColumn,
    updateTaskAssignee,
    loadTasks,
  };
}
