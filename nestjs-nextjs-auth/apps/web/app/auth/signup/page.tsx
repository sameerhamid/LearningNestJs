import Link from "next/link";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center  ">
      <h1 className="text-center text-2xl font-bold mb-4">Sign Up Page</h1>

      {/* signup form */}

      {/* already account */}
      <div className="flex justify-center text-sm">
        <p>Alerady have an Accound? </p>
        <Link href="/auth/signin" className="underline ml-1">
          Singin
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
