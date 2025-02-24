"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import { signUp } from "@/lib/auth";
import React from "react";
import { useFormState } from "react-dom";

const SignupForm = () => {
  const [state, action] = useFormState(signUp, undefined);
  return (
    <form action={action}>
      <div className="flex flex-col gap-2">
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="John Doe" />
        </div>
        {state?.error?.name && (
          <p className="text-sm text-red-500">{state.error.name[0]}</p>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" placeholder="john@example.com" />
        </div>

        {state?.error?.email && (
          <p className="text-sm text-red-500">{state.error.email[0]}</p>
        )}
        <div>
          <Label htmlFor="passowrd">Password</Label>
          <Input id="password" name="password" placeholder="password" />
        </div>

        {state?.error?.password && (
          <div className="text-sm text-red-500">
            <ul>
              {state.error.password.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <SubmitButton>Sign Up</SubmitButton>
      </div>
    </form>
  );
};

export default SignupForm;
