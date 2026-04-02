"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { ROUTES } from "@/constants/routes";
import { createUser } from "@/lib/services/auth";
import InputField from "../InputField";
import AuthButton from "../AuthButton";
import GoogleButton from "../GoogleButton";
import AuthDivider from "../AuthDivider";

type SignupFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupForm = () => {
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

  const validateForm = (data: SignupFormData) => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!data.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

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

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (data.confirmPassword !== data.password) {
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

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData) as SignupFormData;

    console.log(data);

    if (!validateForm(data)) {
      return;
    }

    setIsLoading(true);

    try {
      const isCreated = await createUser(
        {
          name: data.name,
          email: data.email,
          image: "",
          authenticationMethod: "credentials",
        },
        data.password
      );

      if (isCreated) {
        const res = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        toast.success("Account created successfully. Redirecting now...");
        if (res.error) {
          toast.error("Incorrect Credentials");
        } else {
          router.replace(returnUrl);
        }
      } else {
        toast.error("Account creation failed!");
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
      <GoogleButton handleOAuth={handleOAuthSignup} />

      <AuthDivider />

      <form onSubmit={handleSubmit}>
        <InputField
          label="Full name"
          name="name"
          type="text"
          placeholder="John Doe"
          errors={errors}
        />

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
        />

        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          errors={errors}
        />

        <AuthButton
          text="Create account"
          loadingText="Creating account..."
          isLoading={isLoading}
        />
      </form>
    </>
  );
};

export default SignupForm;
