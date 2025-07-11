"use client";

import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

import { ROUTES } from "@/constants/routes";
import { createUser } from "@/lib/services/auth";

const SignupForm = () => {
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
  const searchParams = useSearchParams();
  const { status } = useSession();
  const router = useRouter();

  const returnUrl = searchParams.get("returnUrl") || ROUTES.home;

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
    setTimeout(() => {
      setErrors({ email: "", name: "", password: "", confirmPassword: "" });
    }, 2000);
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
  return (
    <>
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
        {/* <button
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
        </button> */}
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
    </>
  );
};

export default SignupForm;
