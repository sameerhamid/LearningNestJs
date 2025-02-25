"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import { signIn } from "@/lib/auth";
import Link from "next/link";
import React, { useActionState } from "react";

const SignInForm = () => {
  const [state, action] = useActionState(signIn, undefined);
  console.log("state>>>", state);

  return (
    <form action={action}>
      <div className="flex flex-col gap-2 w-64">
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="john@example.com"
            type="email"
            defaultValue={state?.data?.email ?? ""} // Use defaultValue
          />
        </div>
        {state?.error?.email && (
          <p className="text-sm text-red-500">{state.error.email[0]}</p>
        )}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            defaultValue={state?.data?.password ?? ""}
          />
        </div>

        {state?.error?.password && (
          <p className="text-sm text-red-500">{state.error.password[0]}</p>
        )}
        <Link href={"#"} className="text-sm underline">
          Forget Your Password
        </Link>

        <SubmitButton>Sign In</SubmitButton>

        <div className="flex justify-center text-sm">
          <p className="mr-1">Don't have an account? </p>
          <Link href={"/auth/signup"}>Sign Up</Link>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
