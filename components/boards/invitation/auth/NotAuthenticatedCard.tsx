import Link from "next/link";

import { FaArrowRight, FaLock } from "react-icons/fa";

interface NotAuthenticatedCardProps {
  boardName: string;
  loginUrl: string;
  signupUrl: string;
}
const NotAuthenticatedCard = ({
  boardName,
  loginUrl,
  signupUrl,
}: NotAuthenticatedCardProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-section-bg-start to-section-bg-end p-4">
      <div className="bg-white rounded-xl shadow-lg border border-neutral-100 max-w-md w-full p-0 overflow-hidden card-shadow transition-all">
        <div className="bg-gradient-to-r from-primary/15 to-accent/15 px-8 py-10 flex flex-col items-center">
          <div className="bg-white/80 p-4 rounded-full mb-5 shadow-sm">
            <FaLock className="text-3xl text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2 tracking-tight">
            Authentication Required
          </h1>
          <p className="text-sm text-neutral-700 font-medium text-center">
            You need to sign in to access this invitation
          </p>
        </div>

        <div className="px-8 py-8">
          <div className="bg-neutral-50 rounded-lg p-5 mb-6 text-center border border-neutral-100">
            <p className="text-base font-medium text-neutral-700 leading-relaxed">
              This invitation is for board{" "}
              <span className="font-bold text-primary">{boardName}</span>
            </p>
          </div>

          <Link
            href={loginUrl}
            className="w-full py-3.5 text-base font-medium rounded-lg transition-all duration-300 bg-primary text-white border border-primary hover:bg-primary-dark flex items-center justify-center"
          >
            Sign in to continue
            <FaArrowRight className="ml-2" />
          </Link>

          <p className="mt-6 text-center text-neutral-500 text-sm">
            Don&apos;t have an account?{" "}
            <Link href={signupUrl} className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotAuthenticatedCard;
