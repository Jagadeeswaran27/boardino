import { auth } from "@/auth";
import BoardsList from "@/components/boards/BoardsList";
import { ROUTES } from "@/constants/routes";
import { getBoards } from "@/lib/services/boards";
import { redirect } from "next/navigation";
import React from "react";

const BoardsPage = async () => {
  const session = await auth();
  if (!session) {
    redirect(ROUTES.login);
  }
  const boards = await getBoards();

  return (
    <>
      <BoardsList boards={boards} />
    </>
  );
};

export default BoardsPage;
