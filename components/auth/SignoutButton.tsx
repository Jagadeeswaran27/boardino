"use client";

import { signOut } from "next-auth/react";

import { ROUTES } from "@/constants/routes";

const SignoutButton = () => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: ROUTES.login });
  };
  return (
    <button
      onClick={handleSignOut}
      className="btn-primary"
      type="submit"
      suppressHydrationWarning={true}
    >
      Logout
    </button>
  );
};

export default SignoutButton;
