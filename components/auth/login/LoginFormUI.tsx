import Link from "next/link";

import { ROUTES } from "@/constants/routes";

import LoginForm from "./LoginForm";
import BackToHome from "../BackToHome";

const LoginFormUI = () => {
  return (
    <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:px-12 md:py-10 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        <div className="mb-4">
          <BackToHome />
        </div>
        <div className="mb-8 animate-slide-up">
          <h2 className="text-3xl font-bold text-neutral-900 mb-3 leading-tight">
            Welcome back!
          </h2>
          <p className="text-neutral-700 text-lg leading-relaxed">
            Let&apos;s get back to organizing your projects
          </p>
        </div>

        <div className="animate-slide-up-delay">
          <LoginForm />
        </div>

        <div className="mt-8 text-center animate-fade-in-delay">
          <p className="text-neutral-700 text-base">
            Don&apos;t have an account?{" "}
            <Link
              href={ROUTES.signup}
              className="text-primary hover:text-primary-dark transition-all duration-200 hover:underline"
            >
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginFormUI;
