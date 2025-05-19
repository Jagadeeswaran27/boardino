import { auth } from "@/auth";
import BoardDetails from "@/components/boards/BoardDetails";
import { ROUTES } from "@/constants/routes";
import { getBoard, getColumns } from "@/lib/services/boards";
import { redirect } from "next/navigation";

interface PageProps {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function Page({ params }: PageProps) {
  const { id } = params;

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
      <BoardDetails board={board} columns={columns} />
    </>
  );
}
