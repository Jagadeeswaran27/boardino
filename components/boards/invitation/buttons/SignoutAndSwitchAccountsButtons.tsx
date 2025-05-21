"use client";

import { signOut } from "next-auth/react";

const SignoutAndSwitchAccountsButtons = ({
  loginUrl,
}: {
  loginUrl: string;
}) => {
  const handleSignOutAndSwitch = async () => {
    await signOut({
      callbackUrl: loginUrl,
    });
  };
  return (
    <button
      onClick={handleSignOutAndSwitch}
      className="w-full py-3.5 text-base font-medium rounded-lg transition-all duration-300 bg-primary text-white border border-primary hover:bg-primary-dark flex items-center justify-center cursor-pointer"
    >
      Sign out and switch accounts
    </button>
  );
};

export default SignoutAndSwitchAccountsButtons;
