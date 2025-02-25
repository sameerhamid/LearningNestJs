"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import Link from "next/link";
import React from "react";

const SignInForm = () => {
  return (
    <form>
      <div className="flex flex-col gap-2 w-64">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="john@example.com"
            type="email"
          />
        </div>

        <div>
          <Label htmlFor="passowrd">Password</Label>
          <Input id="passowrd" name="passowrd" type="passowrd" />
        </div>

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
