import { auth } from "@/auth";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import SignoutButton from "../auth/SignoutButton";
import Image from "next/image";
import { IMAGES } from "@/constants/Images";

const Header = async () => {
  const session = await auth();

  const user = session?.user;

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-primary rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <Link
            href={ROUTES.home}
            className="text-2xl font-bold text-neutral-900"
          >
            Boardino
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-neutral-700 hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="#solutions"
            className="text-neutral-700 hover:text-primary transition-colors"
          >
            Solutions
          </Link>
          <Link
            href="#pricing"
            className="text-neutral-700 hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#resources"
            className="text-neutral-700 hover:text-primary transition-colors"
          >
            Resources
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <SignoutButton />
              <Link href={ROUTES.boards}>
                <Image
                  src={user?.image || IMAGES.avatarPlaceholder}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                />
              </Link>
            </>
          ) : (
            <>
              <Link
                href={ROUTES.login}
                className="hidden md:block px-4 py-2 text-neutral-700 hover:text-primary transition-colors"
              >
                Log in
              </Link>
              <button className="btn-primary">Get started</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
