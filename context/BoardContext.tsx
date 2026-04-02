import { createContext, useState, useContext, ReactNode } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Filter, TAB, TAB_TYPE, TAB_TYPES, TABS } from "@/lib/utils/board";
import { Board, Column } from "@/types/board";

interface BoardContextProps {
  board: Board;
  activeTab: TAB;
  activeColumn: Column | undefined;
  columns: Column[];
  tabType: TAB_TYPE;
  cid: string | null;
  filter: Filter;
  setActiveTab: (tab: TAB) => void;
  setActiveColumn: (column: Column) => void;
  setColumns: (
    newColumns: Column[] | ((prevColumns: Column[]) => Column[])
  ) => void;
  updateTabType: (newType: TAB_TYPE) => void;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  modifyBoardName: (newName: string) => void;
}

export const BoardContext = createContext<BoardContextProps | undefined>(
  undefined
);

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoardContext must be used within a BoardProvider");
  }
  return context;
};

interface BoardProviderProps {
  initialContext: {
    board: Board;
    columns: Column[];
  };
  children: ReactNode;
}

export const BoardProvider = ({
  initialContext,
  children,
}: BoardProviderProps) => {
  const [board, setBoard] = useState<Board>(initialContext.board);
  const [columns, setColumns] = useState(initialContext.columns);
  const [filter, setFilter] = useState<Filter>({
    userId: "",
    columnId: "",
    createdDate: null,
    dueDate: null,
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const tabType = searchParams.get("view") as TAB_TYPE;

  const activeColumn = columns.find(
    (col) => col.id === searchParams.get("cid")
  );

  if (!tabType || !TAB_TYPES.includes(tabType)) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", "Column View");
    router.push(`?${params.toString()}`);
    return null;
  }

  const cid = searchParams.get("cid");

  if (tabType === "Column View" && !cid && columns.length > 0) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tab");
    params.set("cid", columns[0].id);
    router.push(`?${params.toString()}`);
    return null;
  }

  let activeTab = searchParams.get("tab") as TAB;

  if (tabType !== "Kanban View") {
    activeTab = "To Do";
  }

  if (tabType === "Kanban View" && (!activeTab || !TABS.includes(activeTab))) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("cid");
    params.set("tab", "To Do" as TAB);
    router.push(`?${params.toString()}`);
    return null;
  }

  const updateTabType = (newType: TAB_TYPE) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", newType);
    router.push(`?${params.toString()}`);
  };

  const modifyBoardName = (newName: string) => {
    setBoard((prevBoard) => ({
      ...prevBoard,
      name: newName.trim(),
    }));
  };

  const handleSetActiveColumnById = (column: Column) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("cid", column.id);
    router.push(`?${params.toString()}`);
  };

  const handleSetActiveTab = (tab: TAB) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`?${params.toString()}`);
  };

  return (
    <BoardContext.Provider
      value={{
        board,
        activeTab,
        activeColumn,
        columns,
        tabType,
        cid,
        filter,
        setFilter,
        setActiveColumn: handleSetActiveColumnById,
        setActiveTab: handleSetActiveTab,
        setColumns,
        updateTabType,
        modifyBoardName,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
