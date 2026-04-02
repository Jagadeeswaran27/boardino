"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { ROUTES } from "@/constants/routes";
import InputField from "../InputField";
import AuthButton from "../AuthButton";
import GoogleButton from "../GoogleButton";
import AuthDivider from "../AuthDivider";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || ROUTES.home;

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(returnUrl);
    }
  }, [status, router, returnUrl]);

  const validateForm = (data: LoginFormData) => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!data.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!data.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    setErrors(newErrors);

    setTimeout(() => {
      setErrors({ email: "", password: "" });
    }, 2000);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData) as LoginFormData;

    if (!validateForm(data)) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res.error) {
        toast.error("Incorrect Credentials");
      } else {
        router.replace(returnUrl);
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

  return (
    <>
      <GoogleButton handleOAuth={handleOAuthLogin} />

      <AuthDivider />

      <form onSubmit={handleSubmit}>
        <InputField
          label="Email address"
          name="email"
          type="email"
          placeholder="name@company.com"
          errors={errors}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          errors={errors}
          suffix={
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          }
        />

        <AuthButton
          text="Sign in"
          loadingText="Signing in..."
          isLoading={isLoading}
        />
      </form>
    </>
  );
};

export default LoginForm;
