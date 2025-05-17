import { auth } from "@/auth";
import BoardDetails from "@/components/boards/BoardDetails";
import { ROUTES } from "@/constants/routes";
import { getBoard, getColumns } from "@/lib/services/boards";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const board = await getBoard(id);
  const session = await auth();
  if (!session?.user?.id) redirect(ROUTES.login);
  const isAutorized =
    board?.ownerId === session.user.id ||
    board?.memberIds?.includes(session.user.id);
  if (!board || !isAutorized) {
    redirect(ROUTES.boards);
  }
  const columns = await getColumns(id);
  return (
    <>
      <BoardDetails board={board} columns={columns} />
    </>
  );
};

export default page;
