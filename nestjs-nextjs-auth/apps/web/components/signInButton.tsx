import { getSession } from "@/lib/session";
import Link from "next/link";
import React from "react";

const SignInButton = async () => {
  const session = await getSession();
  return (
    <div className="flex items-center gap-4 ml-auto">
      {!session || !session.user ? (
        <>
          <Link href={"/auth/signin"}>Sign In</Link>
          <Link href={"/auth/signup"}>Sign Up</Link>
        </>
      ) : (
        <>
          <p>
            {session.user.name.charAt(0).toUpperCase() +
              session.user.name.slice(1)}
          </p>
          <Link href={"/auth/signout"}>Sign Out</Link>
        </>
      )}
    </div>
  );
};

export default SignInButton;
