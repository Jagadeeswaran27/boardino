"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import { ROUTES } from "@/constants/routes";
import { useRouter, useSearchParams } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [mounted, setMounted] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || ROUTES.home;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(returnUrl);
    }
  }, [status, router, returnUrl]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        toast.error("Incorrect Credentials");
      } else {
        window.location.href = returnUrl;
      }
    } catch (error) {
      console.error("Error during OAuth login:", error);
      toast.error("An error occurred during login. Please try again.");
    }
    setIsLoading(false);
  };

  const handleOAuthLogin = async (provider: "github" | "google") => {
    setIsLoading(true);
    try {
      await signIn(provider, {
        callbackUrl: returnUrl,
      });
    } catch (error) {
      console.error("Error during OAuth login:", error);
      toast.error("An error occurred during OAuth login. Please try again.");
    }
    setIsLoading(false);
  };

  // This prevents hydration errors because the server version won't include client-side attributes
  if (!mounted || status === "loading") {
    return (
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16">
          <div className="w-full max-w-md">
            <div className="animate-pulse">
              <div className="h-10 w-40 bg-gray-200 rounded mb-12"></div>
              <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-48 bg-gray-200 rounded mb-8"></div>
              <div className="h-12 w-full bg-gray-200 rounded mb-6"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-8"></div>
              <div className="h-12 w-full bg-gray-200 rounded mb-6"></div>
              <div className="h-12 w-full bg-gray-200 rounded mb-6"></div>
              <div className="h-12 w-full bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <div className="hidden md:block md:w-1/2 bg-neutral-50"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:px-12 md:py-10">
        <div className="w-full max-w-md">
          <div className="mb-12 flex items-center">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-xl mr-2">
              B
            </div>
            <h1 className="text-2xl font-bold text-neutral-900">Boardino</h1>
          </div>

          <h2 className="text-3xl font-bold text-neutral-900 mb-2">
            Welcome back
          </h2>
          <p className="text-neutral-700 mb-8">
            Let&apos;s get back to organizing your projects
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={() => handleOAuthLogin("google")}
              type="button"
              className="cursor-pointer flex-1 px-4 py-3 border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors flex items-center justify-center"
            >
              <Image
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                width={18}
                height={18}
                alt="Google logo"
                className="mr-2"
              />
              <span>Google</span>
            </button>
            <button
              onClick={() => handleOAuthLogin("github")}
              type="button"
              className="cursor-pointer flex-1 px-4 py-3 border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors flex items-center justify-center"
            >
              <Image
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                width={18}
                height={18}
                alt="GitHub logo"
                className="mr-2"
              />
              <span>GitHub</span>
            </button>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-neutral-500">
                or continue with
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`cursor-pointer w-full px-6 py-3 bg-primary text-white rounded-md text-lg hover:bg-primary-dark transition-colors flex items-center justify-center ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : null}
              {isLoading ? "Signing in..." : "Sign in"}
              {!isLoading && <FaArrowRight className="ml-2" />}
            </button>
          </form>

          <p className="mt-8 text-center text-neutral-700">
            Don&apos;t have an account?{" "}
            <Link href={ROUTES.signup} className="text-primary hover:underline">
              Create one now
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 bg-neutral-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute h-40 w-40 bg-primary rounded-full -top-10 -left-10"></div>
          <div className="absolute h-60 w-60 bg-accent rounded-full -bottom-20 -right-20"></div>
          <div className="grid grid-cols-20 grid-rows-20 gap-8 opacity-10">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="h-2 w-2 bg-neutral-400 rounded-full"
              ></div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
          <div className="bg-white rounded-2xl p-8 shadow-xl mb-8 max-w-md">
            <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary font-medium mb-4 text-sm">
              Project Management
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Organize, <span className="text-primary">Track</span>, and{" "}
              <span className="text-accent">Collaborate</span>
            </h3>
            <p className="text-neutral-700">
              Keep your projects moving forward with intuitive boards, charts,
              and collaboration tools.
            </p>
          </div>

          {/* Simplified board visualization */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-1">
                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
              </div>
              <div className="bg-primary/10 px-3 py-1 rounded-full text-primary text-xs">
                My Dashboard
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  color: "bg-yellow-100 border-yellow-400",
                  text: "Design Research",
                },
                {
                  color: "bg-blue-100 border-blue-400",
                  text: "User Interviews",
                },
                { color: "bg-green-100 border-green-400", text: "Prototyping" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-md border-l-4 ${item.color}`}
                >
                  <div className="h-4 bg-neutral-200 rounded-md w-3/4 mb-2"></div>
                  <div className="h-3 bg-neutral-200 rounded-md w-1/2 mb-3"></div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-1">
                      <div className="h-6 w-6 bg-primary rounded-full"></div>
                      <div className="h-6 w-6 bg-accent rounded-full"></div>
                    </div>
                    <div className="h-2 w-16 bg-neutral-200 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
