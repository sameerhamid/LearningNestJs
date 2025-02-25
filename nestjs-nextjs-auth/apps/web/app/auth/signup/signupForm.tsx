"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import { signUp } from "@/lib/auth";
import React from "react";
import { useActionState } from "react";

const SignupForm = () => {
  const [state, action] = useActionState(signUp, undefined);

  return (
    <form action={action}>
      <div className="flex flex-col gap-2 w-64">
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            defaultValue={state?.data?.name} // Use defaultValue instead of value
          />
        </div>
        {state?.error?.name && (
          <p className="text-sm text-red-500">{state.error.name[0]}</p>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="john@example.com"
            type="email"
            defaultValue={state?.data?.email} // Use defaultValue
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
            placeholder="password"
            type="password"
            defaultValue={state?.data?.password} // Use defaultValue
          />
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
