"use client";

import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderNav = () => {
  const pathname = usePathname();

  const isHomePage = pathname === ROUTES.home;

  if (!isHomePage) return null;

  return (
    <nav className="hidden lg:flex items-center gap-8">
      <Link
        href="#features"
        className="text-neutral-700 hover:text-primary transition-colors font-medium relative group"
      >
        Features
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
      </Link>
      <Link
        href="#solutions"
        className="text-neutral-700 hover:text-primary transition-colors font-medium relative group"
      >
        Solutions
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
      </Link>
      <Link
        href="#resources"
        className="text-neutral-700 hover:text-primary transition-colors font-medium relative group"
      >
        Resources
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
      </Link>
    </nav>
  );
};

export default HeaderNav;
