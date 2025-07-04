import { UserWithAllDetails } from "@/types/auth";

interface StatsCardsProps {
  userInfo: UserWithAllDetails;
}

const StatsCards = ({ userInfo }: StatsCardsProps) => {
  const userInProgressTasks = userInfo.assignedTasks?.filter((task) => {
    const now = new Date();
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    return dueDate >= now;
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 card-shadow">
        <div className="p-6 text-center">
          <div className="text-2xl font-bold text-primary mb-2">
            {userInfo.boardsOwned?.length || 0}
          </div>
          <div className="text-neutral-600">Boards Created</div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 card-shadow">
        <div className="p-6 text-center">
          <div className="text-2xl font-bold text-secondary mb-2">
            {userInfo.boardMemberships?.length || 0}
          </div>
          <div className="text-neutral-600">Contributing</div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 card-shadow">
        <div className="p-6 text-center">
          <div className="text-2xl font-bold text-accent mb-2">
            {userInfo.assignedTasks?.length || 0}
          </div>
          <div className="text-neutral-600">Assigned Tasks</div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 card-shadow">
        <div className="p-6 text-center">
          <div className="text-2xl font-bold text-info mb-2">
            {userInProgressTasks?.length || 0}
          </div>
          <div className="text-neutral-600">In Progress</div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
