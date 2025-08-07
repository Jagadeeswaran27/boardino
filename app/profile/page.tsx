import { auth } from "@/auth";
import { getUserWithAllDetails } from "@/lib/services/auth";
import SignoutButton from "@/components/auth/SignoutButton";
import AssignedTasks from "@/components/profile/AssignedTasks";
import BoardsDetails from "@/components/profile/BoardsDetails";
import StatsCards from "@/components/profile/StatsCards";
import UserInfo from "@/components/profile/UserInfo";
import BackToHome from "@/components/auth/BackToHome";

const ProfilePage = async () => {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            Please sign in to view your profile
          </h1>
        </div>
      </div>
    );
  }
  const userInfo = await getUserWithAllDetails(session.user.id);

  if (!userInfo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            User not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-4 flex items-center justify-between">
        <BackToHome />
        <SignoutButton />
      </div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-neutral-900">Profile</h1>
        </div>
      </div>

      <UserInfo userInfo={userInfo} />
      <StatsCards userInfo={userInfo} />
      <BoardsDetails userInfo={userInfo} />
      {userInfo.assignedTasks && userInfo.assignedTasks.length > 0 && (
        <AssignedTasks userInfo={userInfo} />
      )}
    </div>
  );
};

export default ProfilePage;
