import { redirect } from "next/navigation";

import { auth } from "@/auth";
import BoardDetailsWithProvider from "@/components/boards/BoardDetailsWithProvider";
import { ROUTES } from "@/constants/routes";
import { getBoard, getColumns } from "@/lib/services/boards";

interface PageProps {
  params: Promise<{ id: string }>;
}
export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const board = await getBoard(id);

  const session = await auth();

  if (!session?.user?.id) redirect(ROUTES.login);

  const userId = session.user.id;

  const isAuthorized =
    board?.ownerId === userId ||
    board?.members?.some((member) => member.userId === userId);

  if (!board || !isAuthorized) {
    redirect(ROUTES.boards);
  }

  const columns = await getColumns(id);

  return (
    <>
      <BoardDetailsWithProvider board={board} columns={columns} />
    </>
  );
}
