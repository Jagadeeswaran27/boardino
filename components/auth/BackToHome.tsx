import { ROUTES } from "@/constants/routes";
import Link from "next/link";

const BackToHome = () => {
  return (
    <Link
      href={ROUTES.home}
      className=" text-neutral-600 hover:text-neutral-900 transition-all duration-200 group flex items-center gap-1"
    >
      <svg
        className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      <p className="text-sm font-medium">Back to Home</p>
    </Link>
  );
};

export default BackToHome;
