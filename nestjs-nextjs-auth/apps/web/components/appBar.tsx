import Link from "next/link";
import React from "react";
import SignInButton from "./signInButton";

const AppBar = () => {
  return (
    <div className="p-6 pr-14 pl-14 shadow flex gap-4 bg-gradient-to-br from-blue-400 to-cyan-400 text-white">
      <Link href={"/"}>Home</Link>
      <Link href={"/dashboard"}>Dashboard</Link>
      <SignInButton />
    </div>
  );
};

export default AppBar;
