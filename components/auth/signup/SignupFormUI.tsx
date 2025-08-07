import Link from "next/link";

import { ROUTES } from "@/constants/routes";

import SignupForm from "./SignupForm";
import BackToHome from "../BackToHome";

const SignupFormUI = () => {
  return (
    <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:px-12 md:py-10">
      <div className="w-full max-w-md">
        <div className="mb-4">
          <BackToHome />
        </div>
        <div className="animate-slide-up">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">
            Create an account
          </h2>
          <p className="text-neutral-700 mb-8">
            Start organizing your projects in minutes
          </p>
        </div>
        <div className="animate-slide-up-delay">
          <SignupForm />
        </div>

        <p className="mt-8 text-center text-neutral-700 animate-fade-in-delay">
          Already have an account?{" "}
          <Link href={ROUTES.login} className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupFormUI;
