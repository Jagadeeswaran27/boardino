import { Filter, TAB, TAB_TYPE, TAB_TYPES } from "@/lib/utils/board";
import { Board, Column } from "@/types/board";
import { useSearchParams } from "next/navigation";
import { createContext, useState, useContext } from "react";

interface BoardContextProps {
  board: Board;
  activeTab: TAB;
  activeColumn: Column | undefined;
  columns: Column[];
  tabType: TAB_TYPE;
  filter: Filter;
  setActiveTab: (tab: TAB) => void;
  setActiveColumn: (column: Column | undefined) => void;
  setColumns: (
    newColumns: Column[] | ((prevColumns: Column[]) => Column[])
  ) => void;
  updateTabType: (newType: TAB_TYPE) => void;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
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
  children: React.ReactNode;
}

export const BoardProvider = ({
  initialContext,
  children,
}: BoardProviderProps) => {
  const [activeTab, setActiveTab] = useState<TAB>("To Do");
  const [activeColumn, setActiveColumn] = useState<Column | undefined>(
    initialContext.columns[0]
  );
  const [columns, setColumns] = useState(initialContext.columns);
  const [filter, setFilter] = useState<Filter>({
    userId: "",
    columnId: "",
    createdDate: null,
    dueDate: null,
  });
  const searchParams = useSearchParams();

  const tabType = searchParams.get("view") as TAB_TYPE;
  if (!tabType || !TAB_TYPES.includes(tabType)) {
    history.pushState(null, "", `?view=Column View`);
    return null;
  }

  const updateTabType = (newType: TAB_TYPE) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", newType);
    history.pushState(null, "", `?${params.toString()}`);
  };

  return (
    <BoardContext.Provider
      value={{
        board: initialContext.board,
        activeTab,
        activeColumn,
        columns,
        tabType,
        filter,
        setFilter,
        setActiveColumn,
        setActiveTab,
        setColumns,
        updateTabType,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
