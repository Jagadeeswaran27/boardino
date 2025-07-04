import Image from "next/image";

import { UserWithAllDetails } from "@/types/auth";

interface UserInfoProps {
  userInfo: UserWithAllDetails;
}

const getAuthenticationMethodLogo = (method: string) => {
  switch (method) {
    case "google":
      return (
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
          width={20}
          height={20}
          alt="Google logo"
          className="mr-2"
        />
      );
    case "github":
      return (
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
          width={20}
          height={20}
          alt="GitHub logo"
          className="mr-2"
        />
      );
    case "email":
      return (
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/email/email-original.svg"
          width={20}
          height={20}
          alt="Email logo"
          className="mr-2"
        />
      );
    default:
      return "Unknown";
  }
};
const UserInfo = async ({ userInfo }: UserInfoProps) => {
  return (
    <div className="mb-8">
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 card-shadow">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary text-white flex items-center justify-center text-xl sm:text-2xl font-bold user-avatar mx-auto sm:mx-0">
              {userInfo.image ? (
                <Image
                  width={80}
                  height={80}
                  src={userInfo.image}
                  alt={userInfo.name || ""}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span>
                  {userInfo.name?.charAt(0) || userInfo.email?.charAt(0) || "U"}
                </span>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
                {userInfo.name || "Anonymous User"}
              </h1>
              <p className="text-neutral-600 mb-4 text-sm sm:text-base">
                {userInfo.email}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs sm:text-sm text-neutral-500">
                <span className="flex items-center justify-center sm:justify-start gap-2">
                  Authentication :{" "}
                  {getAuthenticationMethodLogo(userInfo.authenticationMethod)}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="text-center sm:text-left">
                  {userInfo.boardsOwned?.length ?? 0} boards created
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="text-center sm:text-left">
                  {userInfo.boardMemberships?.length ?? 0} boards contributing
                </span>
              </div>
            </div>
            <button className="w-full sm:w-auto px-4 py-2 border border-neutral-300 rounded-md hover:bg-neutral-50 transition-colors text-sm sm:text-base">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
