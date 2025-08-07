import Image from "next/image";
import Link from "next/link";

import { auth } from "@/auth";
import { ROUTES } from "@/constants/routes";
import { IMAGES } from "@/constants/Images";
import HeaderNav from "../common/HeaderNav";
const Header = async () => {
  const session = await auth();

  const user = session?.user;

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-neutral-100">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link
            href={ROUTES.home}
            className="text-2xl font-bold text-neutral-900 hover:text-primary transition-colors"
          >
            <Image
              src={IMAGES.logo}
              alt="Boardino Logo"
              width={100}
              height={100}
            />
          </Link>
        </div>

        <HeaderNav />

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href={ROUTES.boards}
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-neutral-700 hover:text-primary rounded-md font-medium transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                Boards
              </Link>
              <div className="relative">
                <Link href={ROUTES.profile}>
                  <Image
                    src={user?.image || IMAGES.avatarPlaceholder}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full ring-2 ring-transparent hover:ring-primary/20 transition-all"
                  />
                </Link>
              </div>
              {/* Mobile menu button */}
              <button className="lg:hidden p-2 text-neutral-700 hover:text-primary transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <>
              <Link
                href={ROUTES.login}
                className="hidden md:block px-4 py-2 text-neutral-700 hover:text-primary transition-colors font-medium"
              >
                Log in
              </Link>
              <Link
                href={ROUTES.signup}
                className="btn-primary font-medium shadow-sm hover:shadow-md"
              >
                Get started
              </Link>
              <button className="lg:hidden p-2 text-neutral-700 hover:text-primary transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
