import { auth } from "@/auth";
import { ROUTES } from "@/constants/routes";
import NotAuthenticatedCard from "@/components/boards/invitation/auth/NotAuthenticatedCard";
import { redirect } from "next/navigation";
import { getBoardInvitation } from "@/lib/services/boards";
import NotAuthorizedCard from "@/components/boards/invitation/auth/NotAuthorizedCard";
import BoardInvitationCard from "@/components/boards/invitation/BoardInvitationCard";

interface Props {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    boardInvitationId?: string;
    role?: string;
    referrer?: string;
    boardName?: string;
  }>;
}
const Page = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const { boardInvitationId, referrer, role, boardName } = await searchParams;
  if (!boardInvitationId) redirect(ROUTES.home);
  const session = await auth();
  const isAuthenticated = session?.user !== undefined && session !== null;

  const returnUrl = `/boards/${id}/join?${new URLSearchParams({
    boardInvitationId: boardInvitationId || "",
    role: role || "",
    boardName: boardName || "",
    referrer: referrer || "",
  }).toString()}`;

  const loginUrl = `${ROUTES.login}?returnUrl=${encodeURIComponent(returnUrl)}`;
  const signupUrl = `${ROUTES.signup}?returnUrl=${encodeURIComponent(
    returnUrl
  )}`;

  if (!isAuthenticated) {
    return (
      <NotAuthenticatedCard
        boardName={boardName!}
        loginUrl={loginUrl}
        signupUrl={signupUrl}
      />
    );
  }

  const boardInvitation = await getBoardInvitation(boardInvitationId as string);
  const validBoardId = boardInvitation?.boardId === id;
  const validRole = boardInvitation?.role === role;
  if (!boardInvitation || !validBoardId || !validRole) {
    redirect(ROUTES.home);
  }

  const isAuthorized = boardInvitation.email === session.user?.email;

  if (!isAuthorized) {
    return (
      <NotAuthorizedCard
        boardInvitation={boardInvitation}
        session={session}
        loginUrl={loginUrl}
      />
    );
  }

  const isAccepted = boardInvitation.status === "ACCEPTED";

  if (isAccepted) {
    redirect(`${ROUTES.boards}/${id}`);
  }

  return (
    <BoardInvitationCard
      boardName={boardName}
      role={role}
      boardInvitation={boardInvitation}
    />
  );
};

export default Page;
