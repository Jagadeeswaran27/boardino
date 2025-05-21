"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import { ROUTES } from "@/constants/routes";
import { createUser } from "@/lib/services/auth";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [mounted, setMounted] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
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
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
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
      const isCreated = await createUser(
        {
          name,
          email,
          image: "",
          authenticationMethod: "credentials",
        },
        password
      );

      if (isCreated) {
        toast.success("Account created successfully. Redirecting now...");
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
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred during registration. Please try again.");
    }
    setIsLoading(false);
  };

  const handleOAuthSignup = async (provider: "github" | "google") => {
    setIsLoading(true);
    try {
      await signIn(provider, {
        callbackUrl: returnUrl,
      });
    } catch (error) {
      console.error("Error during OAuth signup:", error);
      toast.error("An error occurred during OAuth signup. Please try again.");
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
            Create an account
          </h2>
          <p className="text-neutral-700 mb-8">
            Start organizing your projects in minutes
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={() => handleOAuthSignup("google")}
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
              onClick={() => handleOAuthSignup("github")}
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
                htmlFor="name"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Full name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

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

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Password
              </label>
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

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword}
                </p>
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
              {isLoading ? "Creating account..." : "Create account"}
              {!isLoading && <FaArrowRight className="ml-2" />}
            </button>
          </form>

          <p className="mt-8 text-center text-neutral-700">
            Already have an account?{" "}
            <Link href={ROUTES.login} className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-section-bg-start to-section-bg-end relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute h-40 w-40 bg-accent rounded-full -top-10 -right-10"></div>
          <div className="absolute h-60 w-60 bg-primary rounded-full -bottom-20 -left-20"></div>
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
            <div className="inline-block px-3 py-1 bg-accent/10 rounded-full text-accent font-medium mb-4 text-sm">
              Task Management
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Plan, <span className="text-secondary">Execute</span>, and{" "}
              <span className="text-primary">Succeed</span>
            </h3>
            <p className="text-neutral-700">
              Create beautiful Kanban boards, track progress, and deliver
              projects on time.
            </p>
          </div>

          {/* Gantt Chart Visualization */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-1">
                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
              </div>
              <div className="bg-secondary/10 px-3 py-1 rounded-full text-secondary text-xs">
                Project Timeline
              </div>
            </div>

            {/* Simplified Gantt Chart */}
            <div className="mb-4">
              <div className="flex justify-between mb-2 text-xs text-neutral-500">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>
              <div className="h-1 w-full bg-neutral-100 rounded-full mb-4"></div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Research Phase</span>
                  <span className="text-xs text-neutral-500">25%</span>
                </div>
                <div className="bg-neutral-100 h-6 w-full rounded-md relative">
                  <div className="bg-primary h-full rounded-md absolute top-0 left-0 w-1/4"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Design Mockups</span>
                  <span className="text-xs text-neutral-500">60%</span>
                </div>
                <div className="bg-neutral-100 h-6 w-full rounded-md relative">
                  <div className="bg-secondary h-full rounded-md absolute top-0 left-0 w-3/5"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Development</span>
                  <span className="text-xs text-neutral-500">10%</span>
                </div>
                <div className="bg-neutral-100 h-6 w-full rounded-md relative">
                  <div className="bg-accent h-full rounded-md absolute top-0 left-0 w-1/10"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Testing</span>
                  <span className="text-xs text-neutral-500">0%</span>
                </div>
                <div className="bg-neutral-100 h-6 w-full rounded-md relative"></div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 bg-primary rounded-full border-2 border-white"></div>
                  <div className="h-8 w-8 bg-secondary rounded-full border-2 border-white"></div>
                  <div className="h-8 w-8 bg-accent rounded-full border-2 border-white"></div>
                </div>
                <span className="ml-2 text-xs text-neutral-500">+2 more</span>
              </div>
              <div className="text-xs px-2 py-1 bg-subtle-accent rounded-full text-accent">
                On track
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
