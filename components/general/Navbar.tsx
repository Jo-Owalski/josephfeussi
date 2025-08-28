"use client"
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const Navbar = () => {
  // Reoving this one permits to use cache rather than fetching the nav again fron server
  // const { getUser } = getKindeServerSession();
  const {getUser} = useKindeBrowserClient()
  const user = getUser();

  return (
    <nav className="py-5 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/">
          <h1 className="text-3xl font-semibold">
            Jo<span className="text-blue-500">Owaldski</span>
          </h1>
        </Link>
        <div className="hidden sm:flex items-center gap-7">
          {user && (
            <Link
              className="text-sm font-medium hover:text-blue-500 transition-colors"
              href="/dashboard"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
      {user ? (
        <div className="flex items-center gap-4">
          <p>{user.given_name}</p>
          <LogoutLink className={buttonVariants({ variant: "secondary" })}>Logout</LogoutLink>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <LoginLink className={buttonVariants()}>Sign In</LoginLink>
          <RegisterLink className={buttonVariants({ variant: "secondary" })}>Sign Up</RegisterLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;