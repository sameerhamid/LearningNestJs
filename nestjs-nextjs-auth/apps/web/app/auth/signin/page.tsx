import React from "react";
import SignInForm from "./signInForm";

const SignInPage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col items-center justify-center">
      <h1 className="text-center text-2xl font-bold mb-4">Sign In Page</h1>

      <SignInForm />

      <div className="flex gap-2 flex-col"></div>
    </div>
  );
};

export default SignInPage;
