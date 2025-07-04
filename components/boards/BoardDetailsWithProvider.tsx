"use client";

import { BoardProvider } from "@/context/BoardContext";
import { Board, Column } from "@/types/board";

import BoardDetails from "./BoardDetails";

interface BoardDetailsWithProviderProps {
  board: Board;
  columns: Column[];
}

const BoardDetailsWithProvider = ({
  board,
  columns: initialColumns,
}: BoardDetailsWithProviderProps) => {
  return (
    <BoardProvider
      initialContext={{
        board,
        columns: initialColumns,
      }}
    >
      <BoardDetails />
    </BoardProvider>
  );
};

export default BoardDetailsWithProvider;
